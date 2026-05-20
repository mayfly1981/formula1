import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate, } from "react-router";
import Flag from "react-flagkit";

export default function Drivers() {

    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(true);
    const [flag, setFlags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setLoading(false);
        console.log("getDrivers");
    };

    const handleClick = (driverId) => {
        console.log("handleClick", driverId);
        navigate(`/driverDetails/${driverId}`);
    };

    if (loading) {
        return <Loader />
    };

    console.log("drivers ", drivers);

    return (
        <div>
            <h1 className="title">Drivers Championship</h1>
            <div>
                <table style={{ width: "80%", tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th colSpan={4}>Drivers Championship Standings - 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => {
                            return (
                                <tr onClick={() => handleClick(driver.Driver.driverId)}
                                    className="driver-details"
                                    key={driver.Driver.driverId}>
                                    <td>{driver.position}</td>
                                    <td
                                    >{ }{driver.Driver.givenName}{driver.Driver.familyName}</td>
                                    <td>{driver.Constructors[0].name}</td>
                                    <td>{driver.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}