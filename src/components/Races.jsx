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
    const [search, setSearch] = useState("");
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

    const filteredRaces = races.filter((race) => race.raceName.toLowerCase().includes(search.toLowerCase().trim().replace(/\s+/g, " ")));

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

            <input type="text"
                placeholder="Search races..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {filteredRaces.length === 0 && (
                <p>Race not found</p>
            )
            }

            <div className="table-races">
                <table >
                    <thead>
                        <tr><th colSpan={7}>Races calendar - 2013</th></tr>
                        <tr>
                            <th>Round</th>
                            <th colSpan={2}>Grand Prix</th>
                            <th>Circuit</th>
                            <th >Date</th>
                            <th colSpan={2}>Winner</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredRaces.map((race) => {
                            return (
                                <tr key={race.round}>
                                    <td> {race.round}</td>
                                    <td>
                                        <Flag country={getCountryCodeByShortName(props.flags, race.Circuit.Location.country)} size={20} />

                                    </td>
                                    <td onClick={() => handleClick(race.round)}>{race.raceName}</td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td>
                                        <Flag country={getCountryCodeByNationality(props.flags, race.Results[0].Driver.nationality)} size={20} />

                                    </td>
                                    <td>{race.Results[0].Driver.familyName}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>

    );
}