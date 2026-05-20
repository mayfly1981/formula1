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

    if (isLoading) {
        return <Loader />
    };

    console.log("races " + raceQualifiers);
    console.log("raceQualifiers ", raceQualifiers);
    console.log("raceResults ", raceResults);

    // const handleClick = (round) => {
    //     //key moze biti i "round"
    //     console.log("handleClick", round);
    //     navigate(`/race/${round}`);
    // };

    return (
        <div className="container">
            <div className="grand-prix">
                {raceQualifiers.map((raceQualifier) => {
                    return (
                        <div key={raceQualifier.round}>
                            <img src="" alt="" />
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

            </div>
            <div className="race-results">

            </div>
        </div>
    );
}