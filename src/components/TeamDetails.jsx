import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getCountryCodeByNationality, getCountryCodeByShortName } from "../helpers/getCountryCode";
import Breadcrumb from "./Breadcrumb";
import getPositionColor from "../helpers/positionColors";

export default function TeamDetails(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [standing, setStanding] = useState(null);
    const [races, setRaces] = useState([]);
    const [filteredRaces, setFilteredRaces] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const teamId = id;
    const year = props.year || 2013;
    const team = races[0]?.Results?.[0]?.Constructor || null;

    useEffect(() => {

        const searchedRaces = races.filter((race) =>
            race.raceName
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                        .trim()
                        .replace(/\s+/g, " ")
                )
        );
        setFilteredRaces(searchedRaces);
    }, [races, search]);

    useEffect(() => {
        if (!teamId) return;

        const getTeamDetails = async () => {
            try {
                const url = `https://api.jolpi.ca/ergast/f1/${year}/constructors/${teamId}/results.json`;

                const response = await axios.get(url);

                const standingResponse = await axios.get(
                    `https://api.jolpi.ca/ergast/f1/${year}/constructors/${teamId}/constructorStandings.json`
                );
                const standingData =
                    standingResponse.data.MRData.StandingsTable.StandingsLists?.[0]
                        ?.ConstructorStandings?.[0] || null;
                setStanding(standingData);

                const raceList =
                    response.data.MRData.RaceTable.Races || [];

                setRaces(raceList);

            } catch (error) {

                setRaces([]);
                setStanding(null);
                setError(true);
            } finally {
                setIsLoading(false);
            }

        };

        getTeamDetails();

    }, [teamId, year]);

    if (!teamId) {
        return <p>No team selected</p>;
    }
    if (isLoading) {
        return <Loader />;
    }
    if (!team) {
        return <p>No team data found</p>;
    }

    const breadcrumbsTeamDetails = [
        { text: "Teams", route: "/teams" },
        { text: `${team.name}`, route: "" }
    ];

    const handleClickRaceDetails = (position) => {
        navigate(`/raceDetails/${position}`);
    };

    return (

        <div className="team-details-page">
            <Breadcrumb
                items={breadcrumbsTeamDetails}
                search={search}
                onSearch={setSearch}
                placeholder="Search races..."
                year={props.year}
                onYearChange={props.setYear}
            />


            {filteredRaces.length === 0 && (
                <p>No results found</p>
            )}


            <div className="team-details-content">
                <div className="team-card">
                    <div className="team-card-header">
                        <img
                            src={`/img/${team.constructorId}.png`}
                            className="team-logo"
                            alt={team.name}
                        />

                        <div className="team-title-box">
                            <h1 className="team-title">{team.name}</h1>

                        </div>
                    </div>
                    <div className="team-info">
                        <p className="team-country-pill">
                            <strong>Country:</strong>
                            <span className="team-country-name">
                                {team.nationality}
                            </span>
                            <Flag
                                country={getCountryCodeByNationality
                                    (props.flags, team.nationality)}
                                size={20}
                            />
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
                            href={team.url}
                            target="_blank"
                            rel="noreferrer"
                            className="team-history-link"
                        >
                            History
                        </a>
                    </div>
                </div>
                <div className="team-results-section">
                    <h2 className="team-results-title">Formula 1 {year} Results</h2>

                    <div className="results-table-wrapper">
                        <table className="results-table">
                            <colgroup>
                                <col className="col-round" />
                                <col className="col-grand-prix" />
                                <col className="col-driver" />
                                <col className="col-driver" />
                                <col className="col-points" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Round</th>
                                    <th>Grand Prix</th>
                                    <th>{races[0]?.Results?.[0]?.Driver?.familyName}</th>
                                    <th>{races[0]?.Results?.[1]?.Driver?.familyName}</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRaces.map((race) => {
                                    const driver1 = race.Results?.[0];
                                    const driver2 = race.Results?.[1];

                                    return (
                                        <tr key={race.round}
                                            onClick={() => handleClickRaceDetails(race.round)}>
                                            <td>{race.round}</td>
                                            <td>
                                                <div className="flag-text">
                                                    <Flag
                                                        country={getCountryCodeByShortName(
                                                            props.flags,
                                                            race.Circuit.Location.country
                                                        )}
                                                        size={20}
                                                    />
                                                    <span>{race.raceName}</span>
                                                </div>
                                            </td>
                                            <td className="position-cell">
                                                <span className="position-badge" style={{ backgroundColor: getPositionColor(driver1?.position, 10) }}>
                                                    {driver1?.position}
                                                </span>
                                            </td>
                                            <td className="position-cell">
                                                <span className="position-badge"
                                                    style={{ backgroundColor: getPositionColor(driver2?.position, 10) }}>
                                                    {driver2?.position}
                                                </span>
                                            </td>
                                            <td>
                                                {Number(driver1?.points || 0) + Number(driver2?.points || 0)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}