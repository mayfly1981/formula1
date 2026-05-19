import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Teams() {
    const [races, setRaces] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        console.log("handleClick", position);
        navigate(`/race/${position}`);
    };
    if (loading) {
        return <Loader />

    }
    console.log("races", races);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Races calendar</h2>
            {races.map((race) => {
                return (
                    <div
                        onClick={() => handleClick(race.round)}>
                        <table key={race.round}
                            style={{ width: "80%", tableLayout: "fixed" }}>
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td>{race.Results[0].raceName}</td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{race.date}</td>
                                <td>{race.Results[0].Driver.familyName}</td>
                            </tr>

                        </table>
                    </div>
                )
            })}
        </div>
    );
}