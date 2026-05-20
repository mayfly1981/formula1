import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";

export default function RaceDetails() {
    const [raceQualifiers, setRaceQualifiers] = useState(null);
    const [raceResults, setRaceResults] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const params = useParams();

    const handleClick = () => {
        console.log("click");
    }

    useEffect(() => {
        getRaceQualifiers();
        console.log("useEffect");
    }, []);

    const getRaceQualifiers = async () => {
        console.log("params", params);
        const urlRaceQualifiers = `https://api.jolpi.ca/ergast/f1/2013/${params.id}/qualifying.json`;
        const urlRaceResults = `https://api.jolpi.ca/ergast/f1/2013/${params.id}/results.json`;
        const urlFlag = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";

        const response1 = await axios.get(urlRaceQualifiers);
        const response2 = await axios.get(urlRaceResults);

        console.log("responseRaces1", response1);
        console.log("responseRaces2", response2);

        console.log(response1.data.MRData.RaceTable.Races);
        console.log(response2.data.MRData.RaceTable.Races);

        setRaceQualifiers(response1.data.MRData.RaceTable.Races);
        setRaceResults(response2.data.MRData.RaceTable.Races)

        setIsLoading(false);

        console.log("getRaceQualifiers");
        console.log("getRaceResults");
    };

    const getBestTime = (qualifier) => {
        const times = [];
        times.push(qualifier.Q1, qualifier.Q2, qualifier.Q3);
        times.sort();

        return times[0];
    };


    const getRaceTime = (result) => {
        if (result.Time?.time) return result.Time.time;
        return "DNQ"; // ili "-"
    };

    if (isLoading) {
        return <Loader />
    };

    console.log("races " + raceQualifiers);
    console.log("raceQualifiers ", raceQualifiers);
    console.log("raceResults ", raceResults);

    return (
        <div className="container">
            <div className="grand-prix">
                {raceQualifiers.map((raceQualifier) => {
                    return (
                        <div key={raceQualifier.round}>
                            {/* <img src="" alt="" /> */}
                            <p>{raceQualifier.QualifyingResults.raceName}</p>
                            <p>Country: {raceQualifier.Circuit.Location.country}</p>
                            <p>Location: {raceQualifier.Circuit.Location.locality}</p>
                            <p>Date: {raceQualifier.date}</p>
                            <a href={raceQualifier.QualifyingResults[0].Constructor.url}
                                target="_blank"
                                rel="noreferrer">
                                Full Report:
                            </a>
                        </div>
                    );
                })}
            </div>
            <div className="qualifying-results">
                <h3>Qualifying Results</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {raceQualifiers[0].QualifyingResults.map((qualifier) => {
                            return (
                                <tr key={qualifier.position}>
                                    <td>{qualifier.position}</td>
                                    <td>{qualifier.Driver.familyName}</td>
                                    <td>{qualifier.Constructor.name}</td>
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
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Result</th>
                            <th>Points</th>
                        </tr>
                    </thead>

                    <tbody>
                        {raceResults[0].Results.map((result) => {
                            return (
                                <tr key={result.position}>
                                    <td>{result.position}</td>
                                    <td>{result.Driver.familyName}</td>
                                    <td>{result.Constructor.name}</td>
                                    {/* <td>{result.Time?.time}</td> */}
                                    <td>{result.points}</td>
                                    <td>{getRaceTime(result)}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
}