import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";


export default function TeamDetails() {
    const { id } = useParams();
    const teamId = id;
    const year = 2013;

    const [races, setRaces] = useState([]);
    const [team, setTeam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!teamId) return;

        const getTeamDetails = async () => {
            try {
                setIsLoading(true);

                const url = `https://api.jolpi.ca/ergast/f1/${year}/constructors/${teamId}/results.json`;



                const response = await axios.get(url);

                const raceList =
                    response.data.MRData.RaceTable.Races;

                setRaces(raceList);

                if (raceList.length > 0) {
                    setTeam(raceList[0].Results[0].Constructor);
                } else {
                    setTeam(null);
                }

            } catch (error) {
                console.log("Error fetching team data:", error);
                setTeam(null);
            } finally {
                setIsLoading(false);
            }
        };

        getTeamDetails();
    }, [teamId]);

    if (!teamId) {
        return <p>No team selected</p>;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (!team) {
        return <p>No team data found</p>;
    }

    return (
        <div>
            <h1>{team.name}</h1>

            <p>
                <strong>Country:</strong> {team.nationality}
            </p>

            <p>
                <a
                    href={team.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    History
                </a>
            </p>

            <h2>Formula 1 {year} Results</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>{races[0].Results[0].Driver.familyName}</th>
                        <th>{races[1].Results[0].Driver.familyName}</th>
                        <th>Points</th>
                    </tr>
                </thead>

                <tbody>
                    {races.map((race) => {
                        const driver1 = race.Results?.[0];
                        const driver2 = race.Results?.[1];

                        return (
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td>{race.raceName}</td>
                                <td>{driver1?.position}</td>
                                <td>{driver2?.position || "-"}</td>
                                <td>
                                    {Number(driver1?.points || 0) +
                                        Number(driver2?.points || 0)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}