import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getCountryCodeByNationality, getCountryCodeByShortName } from "../helpers/getCountryCode";



export default function TeamDetails(props) {
    const { id } = useParams();
    const teamId = id;
    const year = 2013;


    const [team, setTeam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [standing, setStanding] = useState(null);
    const [races, setRaces] = useState([]);

    const positionColors = {
        1: "yellow",
        2: "gray",
        3: "orange",
        4: "lightgreen",
        5: "lightblue",
        6: "thistle",
        7: "pink",
        8: "paleturquoise",
        9: "mediumaquamarine",
        10: "salmon",
    };



    useEffect(() => {
        if (!teamId) return;

        const getTeamDetails = async () => {
            try {
                setIsLoading(true);

                const url = `https://api.jolpi.ca/ergast/f1/${year}/constructors/${teamId}/results.json`;



                const response = await axios.get(url);

                const standingResponse = await axios.get(
                    `https://api.jolpi.ca/ergast/f1/${year}/constructors/${teamId}/constructorStandings.json`
                );
                const standingData = standingResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
                setStanding(standingData);

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
    console.log(team);
    return (
        <div>

            <div>
                <img src={`/img/${team.constructorId}.png`} className="team-logo" alt={team.name} />
                <p><Flag country={getCountryCodeByNationality(props.flags, team.nationality)} size={20} />{team.name}
                </p>
            </div>

            <h1>{team.name}</h1>



            <p>
                <strong>Country:</strong> {team.nationality}
            </p>

            <p>Position:{standing?.position}</p>
            <p>Points:{standing?.points}</p>

            <p>

                <a
                    href={team.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    History
                </a>
            </p>

            <h2>Formula 1 2013 Results</h2>

            <table className="results-table">
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>{races[0].Results[0].Driver.familyName}</th>
                        <th>{races[0].Results[1].Driver.familyName}</th>
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
                                <td>
                                    <Flag country={getCountryCodeByShortName(props.flags, race.Circuit.Location.country)} size={20} /> {race.raceName}
                                </td>

                                {/* <td>{driver1?.position}</td>
                                <td>{driver2?.position || "-"}</td> */}

                                <td style={{ backgroundColor: positionColors[driver1?.position] || "darkgray" }}>
                                    {driver1?.position || "-"}
                                </td>

                                <td style={{ backgroundColor: positionColors[driver2?.position] || "darkgray" }}>
                                    {driver2?.position || "-"}
                                </td>
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