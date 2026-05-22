import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";
import { getCountryCodeByShortName } from "../helpers/getCountryCode";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import Breadcrumb from "./Breadcrumb";

export default function Races(props) {
    const [races, setRaces] = useState([])
    const [loading, setLoading] = useState(true);
    const [flag, setFlags] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        console.log("useEffect");
        getFlags();
    }, []);

    const getFlags = async () => {
        const urlFlag = `https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json`;
        const responce = await axios.get(urlFlag);
        setLoading(false);
        console.log("getFlags");
    };

    useEffect(() => {
        console.log("useEffect");
        getRaces();
    }, []);

    const getRaces = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/results/1.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.RaceTable.Races);
        setRaces(response.data.MRData.RaceTable.Races);
        setLoading(false);
        console.log("getRaces");
    };

    const handleClick = (position) => {
        //key moze biti i "round"
        console.log("handleClick", position);
        navigate(`/raceDetails/${position}`);
    };

    if (loading) {
        return <Loader />
    };

    const breadcrumbsRaces = [

        { text: "Races", route: "" }

    ];

    console.log("races", races);

    return (
        <div className="container-races">
            <Breadcrumb items={breadcrumbsRaces} />
            <h1>Races calendar</h1>

            <div className="table-races">
                <table >
                    <thead>
                        <tr><th colSpan={5}>Races calendar - 2013</th></tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Circuit</th>
                            <th>Date</th>
                            <th>Winner</th>
                        </tr>
                    </thead>

                    <tbody>
                        {races.map((race) => {
                            return (
                                <tr key={race.round}
                                    onClick={() => handleClick(race.round)}>
                                    <td>{race.round}</td>
                                    <td>
                                        <Flag country={getCountryCodeByShortName(props.flags, race.Circuit.Location.country)} size={20} />
                                        {race.raceName}
                                    </td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td>
                                        <Flag country={getCountryCodeByNationality(props.flags, race.Results[0].Driver.nationality)} size={20} />
                                        {race.Results[0].Driver.familyName}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>

    );
}