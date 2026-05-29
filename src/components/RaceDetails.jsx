import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getCountryCodeByShortName } from "../helpers/getCountryCode";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import Breadcrumb from "./Breadcrumb";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";
import Error from "./Error";
import getPositionColor from "../helpers/positionColors";

export default function RaceDetails(props) {
    const [raceQualifiers, setRaceQualifiers] = useState(null);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRaceQualifiers();
        console.log("useEffect");
    }, [props.year]);


    const getBestTime = (qualifier) => {
        const times = [];
        times.push(qualifier.Q1, qualifier.Q2, qualifier.Q3);
        times.sort();
        return times[0];
    };

    const getRaceQualifiers = async () => {
        try {
            const urlRaceQualifiers = `https://api.jolpi.ca/ergast/f1/${props.year}/${params.id}/qualifying.json`;
            const urlRaceResults = `https://api.jolpi.ca/ergast/f1/${props.year}/${params.id}/results.json`;

            const raceQualifiersResponse = await axios.get(urlRaceQualifiers);
            const raceResultsResponse = await axios.get(urlRaceResults);

            const qualifiers =
                raceQualifiersResponse.data?.MRData?.RaceTable?.Races?.[0] || null;
            const results =
                raceResultsResponse.data.MRData.RaceTable.Races[0]?.Results || [];

            setRaceQualifiers(qualifiers);
            setRaceResults(results);

        } catch (e) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getRaceTime = (result) => {
        if (result.Time?.time) return result.Time.time;
        return "DNQ";
    };

    const handleClickDriver = (driverId) => {
        navigate(`/driverDetails/${driverId}`);
    };

    const handleClickTeam = (constructorId) => {
        navigate(`/teamDetails/${constructorId}`);
    }

    if (isLoading || !raceQualifiers) {
        return <Loader />
    };

    if (error) {
        return <Error />
    }

    const breadcrumbsRaceDetails = [
        { text: "Races", route: "/races" },
        { text: `${raceQualifiers.raceName}`, route: "" }
    ];

    return (
        <div className="team-details-page">
            <Breadcrumb
       items={breadcrumbsRaceDetails}
       year={props.year}
       onYearChange={props.setYear}
   />
            <div className="team-details-content">
                <div className="team-card">
                    <div className="team-card-header">
                        <Flag
                            country={getCountryCodeByShortName
                                (props.flags, raceQualifiers.Circuit.Location.country)}
                            size={100} />

                        <div className="team-info">

                            <p className="team-country-pill">
                                {raceQualifiers.raceName}</p>
                            <p className="team-country-pill">Country:
                                {raceQualifiers.Circuit.Location.country}
                            </p>
                            <p className="team-country-pill">Location:
                                {raceQualifiers.Circuit.Location.locality}
                            </p>
                            <p className="team-country-pill">Date:
                                {raceQualifiers.date}
                            </p>
                            <a className="team-history-link"
                                href={raceQualifiers.url}
                                target="_blank"
                                rel="noreferrer">
                                Full Report:
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="team-results-section">

                <h2 className="team-results-title">Qualifying Results {props.year}</h2>

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
                                <th>Pos</th>
                                <th colSpan={2}>Driver</th>
                                <th>Team</th>
                                <th>Best Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {raceQualifiers?.QualifyingResults?.map((qualifier) => {

                                return (
                                    <tr key={qualifier.position}>
                                        <td>{qualifier.position}</td>
                                        <td>
                                            <div className="flag-text">

                                                <Flag
                                                    country={getCountryCodeByNationality(
                                                        props.flags,
                                                        qualifier.Driver.nationality)}
                                                    size={20} />
                                            </div>
                                        </td>
                                        <td
                                            onClick={() => handleClickDriver(qualifier.Driver.driverId)}>
                                            <span >
                                                {qualifier.Driver.familyName}
                                            </span>
                                        </td>
                                        <td
                                            onClick={() => handleClickTeam(qualifier.Constructor.constructorId)}>
                                            <span>
                                                {qualifier.Constructor.name}
                                            </span>
                                        </td>
                                        <td>{getBestTime(qualifier)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="results-table-wrapper">
                    <div className="race-results">
                        <h3>Races Results</h3>
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
                                    <th>Pos</th>
                                    <th colSpan={2}>Driver</th>
                                    <th>Team</th>
                                    <th>Result</th>
                                    <th>Points</th>
                                </tr>
                            </thead>

                            <tbody>
                                {raceResults.map((result) => {
                                    return (

                                        <tr key={result.position}>

                                            <td>{result.position}</td>

                                            <td>
                                                <div className="flag-text">
                                                    <Flag country={getCountryCodeByNationality(
                                                        props.flags,
                                                        result.Driver.nationality)}
                                                        size={20} />
                                                </div>
                                            </td>

                                            <td
                                                onClick={() => handleClickDriver(result.Driver.driverId)} >
                                                <span>
                                                    {result.Driver.familyName}
                                                </span>
                                            </td>

                                            <td onClick={() => handleClickTeam(result.Constructor.constructorId)}>
                                                {result.Constructor.name}
                                            </td>

                                            <td>{getRaceTime(result)}</td>

                                            <td className="position-cell">
                                                <span className="position-badge"
                                                    style={{
                                                        backgroundColor: getPositionColor(result.points, 25)
                                                    }}>{result.points}</span>
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