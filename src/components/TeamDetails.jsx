import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getCountryCodeByNationality, getCountryCodeByShortName } from "../helpers/getCountryCode";
import Breadcrumb from "./Breadcrumb";



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
        <div className="team-details-page">

            {/* <div className="team-card">
                <div className="team-card-header">
                    <img
                        src={`/img/${team.constructorId}.png`}
                        className="team-logo"
                        alt={team.name}
                    />

                    <div className="team-title-box">
                        <p className="team-name-with-flag">
                            <Flag
                                country={getCountryCodeByNationality(props.flags, team.nationality)}
                                size={20}
                            />
                            <span>{team.name}</span>
                        </p>




                        <h1 className="team-title">{team.name}</h1>
                    </div>
                </div>

                <div className="time-info">

                    <p className="team-info-row">

                        <strong>Country:</strong>

                        <span>{team.nationality}</span>
                    </p>

                    <div className="team-stats">

                        <p className="team-stat">

                            <span className="team-stat-label">Position</span>
                            <span className="team-stat-value">{standing?.position}</span>
                        </p>

                        <p className="team-stat">

                            <span className="team-stat-label">Points</span>
                            <span className="team-stat-value">{standing?.points}</span>
                        </p>
                    </div>



                    <a className="team-wiki-link"
                        href={team.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        History
                    </a>
                </div>
            </div> */}

            <div className="team-card">
                <div className="team-logo-box">
                    <img
                        src={`/img/${team.constructorId}.png`}
                        className="team-logo"
                        alt={team.name}
                    />
                </div>

                <div className="team-card-content">
                    <p className="team-name-with-flag">
                        <Flag
                            country={getCountryCodeByNationality(props.flags, team.nationality)}
                            size={20}
                        />
                        <span>{team.name}</span>
                    </p>

                    <h1 className="team-title">{team.name}</h1>

                    <div className="team-info">
                        <p className="team-info-row">
                            <strong>Country:</strong>
                            <span>{team.nationality}</span>
                        </p>

                        <div className="team-stats">
                            <p className="team-stat">
                                <span className="team-stat-label">Position</span>
                                <span className="team-stat-value">{standing?.position}</span>
                            </p>

                            <p className="team-stat">
                                <span className="team-stat-label">Points</span>
                                <span className="team-stat-value">{standing?.points}</span>
                            </p>
                        </div>

                        <a
                            className="team-wiki-link"
                            href={team.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            History
                        </a>
                    </div>
                </div>
            </div>


            {/* Donja tabela */}

            {/* <div className="team-result-section"></div>
            <h2 className="team-results-title">Formula 1   2013 Results</h2>


            <div className="results-table-wrapper"></div> */}

            <div className="team-results-section">
                <h2 className="team-results-title">Formula 1 2013 Results</h2>

                <div className="results-table-wrapper">
                    <table className="results-table">
                        ...
                    </table>
                </div>
            </div>



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

                                {/* <td>
                                    <Flag country={getCountryCodeByShortName(props.flags, race.Circuit.Location.country)} size={20} /> {race.raceName}
                                </td> */}


                                <td>
                                    <div className="flag-text">
                                        <Flag
                                            country={getCountryCodeByShortName(props.flags, race.Circuit.Location.country)}
                                            size={20}
                                        />
                                        <span>{race.raceName}</span>
                                    </div>
                                </td>



                                {/* <td>{driver1?.position}</td>
                                <td>{driver2?.position || "-"}</td> */}

                                {/* <td style={{ backgroundColor: positionColors[driver1?.position] || "darkgray" }}>
                                    {driver1?.position || "-"}
                                </td> */}

                                <td className="position-cell">
                                    <span className={`position-badge pos-${driver1?.position || "default"}`}>
                                        {driver1?.position || "-"}
                                    </span>
                                </td>

                                {/* <td style={{ backgroundColor: positionColors[driver2?.position] || "darkgray" }}>
                                    {driver2?.position || "-"}
                                </td> */}

                                <td className="position-cell">
                                    <span className={`position-badge pos-${driver2?.position || "default"}`}>
                                        {driver2?.position || "-"}
                                    </span>
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
        </div >


    );
}