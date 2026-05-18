import { useEffect, useState } from "react";
export default function TeamDetails({ teamId }) {
    const year = 2013;

    const [races, setRaces] = useState([]);
    const [team, setTeam] = useState(null);

    useEffect(() => {
        if (!teamId) return;

        fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors/${teamId}/results.json`)
            .then((res) => res.json())
            .then((data) => {
                const raceList =
                    data.MRData.RaceTable.Races;

                setRaces(raceList);

                if (raceList.length > 0) {

                    setTeam(raceList[0].Results[0].Constructor);

                }
            });
    }, [teamId]);
    if (!teamId) {
        return <p>No team selected</p>;
    }

    if (!team) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{team.name}</h1>
            <p>
                <strong>Country</strong>
                {team.nationality}
            </p>

            <p>
                <a href={team.url} target="_blank"
                    rel="noreferrer">
                    History
                </a>
            </p>
            <h2>Formula 1 {year} Results</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Vettel</th>
                        <th>Webber</th>
                        <th>Points</th>

                    </tr>
                </thead>
                <tbody>
                    {races.map((race) => {
                        const driver1 = race.Results[0];
                        const driver2 = race.Results[1];

                        return (
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td>{race.raceName}</td>
                                <td>{driver1.position}</td>
                                <td>{driver2.position}</td>
                                <td>{Number(driver1.points) + Number(driver2.points)}</td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    );
}