import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";
import { getCountryCodeByShortName } from "../helpers/getCountryCode";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import getPositionColor from "../helpers/positionColors";
import Breadcrumb from "./Breadcrumb";

export default function RaceDetails(props) {
    const [raceQualifiers, setRaceQualifiers] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRaceQualifiers();
        console.log("useEffect");
    }, [props.year]);

    const getRaceQualifiers = async () => {
        console.log("params", params);
        const urlRaceQualifiers = `https://api.jolpi.ca/ergast/f1/${props.year}/${params.id}/qualifying.json`;
        const urlRaceResults = `https://api.jolpi.ca/ergast/f1/${props.year}/${params.id}/results.json`;

        const raceQualifiers = await axios.get(urlRaceQualifiers);
        const raceResults = await axios.get(urlRaceResults);

        setRaceQualifiers(raceQualifiers.data.MRData.RaceTable.Races[0]);
        setRaceResults(raceResults.data.MRData.RaceTable.Races[0].Results)

        setIsLoading(false);

    };

    const getBestTime = (qualifier) => {
        const times = [];
        times.push(qualifier.Q1, qualifier.Q2, qualifier.Q3);
        times.sort();

        return times[0];
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

    const breadcrumbsRaceDetails = [
        { text: "Races", route: "/races" },
        { text: `${raceQualifiers.raceName}`, route: "" }
    ];

    return (
        <div className="container">
            <Breadcrumb items={breadcrumbsRaceDetails} />
            <div className="grand-prix">

                <Flag country={getCountryCodeByShortName(
                    props.flags,
                    raceQualifiers.Circuit.Location.country)}
                    size={100} />
                <p>{raceQualifiers.raceName}</p>
                <p>Country:  {raceQualifiers.Circuit.Location.country}</p>
                <p>Location: {raceQualifiers.Circuit.Location.locality}</p>
                <p>Date: {raceQualifiers.date}</p>
                <a href={raceQualifiers.url}
                    target="_blank"
                    rel="noreferrer">
                    Full Report:
                </a>
            </div>

            <div className="qualifying-results">
                <h3>Qualifying Results {props.year}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th colSpan={2}>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {raceQualifiers.QualifyingResults.map((qualifier) => {
                            return (
                                <tr key={qualifier.position}>
                                    <td>{qualifier.position}</td>
                                    <td>
                                        <Flag country={getCountryCodeByNationality(
                                            props.flags,
                                            qualifier.Driver.nationality)}
                                            size={20} />

                                    </td>
                                    <td onClick={() => handleClickDriver(qualifier.Driver.driverId)}> {qualifier.Driver.familyName}</td>

                                    <td onClick={() => handleClickTeam(qualifier.Constructor.constructorId)}>{qualifier.Constructor.name}</td>
                                    <td>{getBestTime(qualifier)}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
            <div className="race-results">
                <h3>Races Results</h3>
                <table>
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
                                        <Flag country={getCountryCodeByNationality(
                                            props.flags,
                                            result.Driver.nationality)}
                                            size={20} />

                                    </td>
                                    <td onClick={() => handleClickDriver(result.Driver.driverId)}>{result.Driver.familyName}</td>
                                    <td onClick={() => handleClickTeam(result.Constructor.constructorId)}>{result.Constructor.name}</td>
                                    <td>{getRaceTime(result)}</td>
                                    <td style={{ backgroundColor: getPositionColor(result.position) }}>{result.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div >
    );
}