import { useState, useEffect } from "react";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import { getCountryCodeByShortName } from "../helpers/getCountryCode";
import { useNavigate } from "react-router";
import Breadcrumb from "./Breadcrumb";
import Loader from "./Loader";
import Flag from "react-flagkit";
import axios from "axios";
import Error from "./Error";

export default function Races(props) {

    const [races, setRaces] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const [filteredRaces, setFilteredRaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect");
        getRaces();
    }, [props.year]);

    const getRaces = async () => {
        try {
            setError(false);
            const url = `https://api.jolpi.ca/ergast/f1/${props.year}/results/1.json`;
            const response = await axios.get(url);
            const races = response.data.MRData.RaceTable.Races || [];
            setRaces(races);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const searchedRaces = races.filter((race) =>
            race.raceName.toLowerCase().includes(search.toLowerCase().trim().replace(/\s+/g, " ")));
        setFilteredRaces(searchedRaces);
    }, [races, search]);

    const handleClick = (position) => {
        navigate(`/raceDetails/${position}`);
    };

    const handleClickDriver = (driverId) => {
        navigate(`/driverDetails/${driverId}`);
    };

    if (loading) {
        return <Loader />
    };

    if (error) {
        return <Error />
    }

    const breadcrumbsRaces = [
        { text: "Races", route: "" }
    ];

    console.log("races", races);

    return (
        <div className="container-races">
            <Breadcrumb
    items={breadcrumbsRaces}
    search={search}
    onSearch={setSearch}
    placeholder="Search races..."
    year={props.year}
    onYearChange={props.setYear}
/>
            <h1>Races calendar</h1>
           

            {filteredRaces.length === 0 && (<p>Race not found</p>)}

            <div className="table-races">
                <table >
                    <thead>
                        <tr>
                            <th colSpan={7}>Races calendar - {props.year}</th>
                        </tr>
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
                            const driver = race.Results[0].Driver;
                            return (
                                <tr key={race.round}>
                                    <td> {race.round}</td>
                                    <td>
                                        <Flag
                                            country={getCountryCodeByShortName(props.flags, race.Circuit.Location.country)} size={20} />
                                    </td>
                                    <td onClick={() => handleClick(race.round)}>{race.raceName}
                                    </td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td>
                                        <Flag country={getCountryCodeByNationality(props.flags, race.Results[0].Driver.nationality)} size={20} />
                                    </td>
                                    <td onClick={() => handleClickDriver(driver.driverId)}>
                                        {driver.familyName}
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