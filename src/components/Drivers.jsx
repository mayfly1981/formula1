import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

export default function Drivers() {
    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

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

    }
    return (
        <>
            {drivers.map((driver) => {
                return (
                    <table key={driver.Driver.driverId}>
                        <thead>
                            <tr>
                                <th>Drivers Championship Standings - 2013</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{driver.position}</td>
                                <td
                                    onClick={() => handleClick(driver.Driver.driverId)}
                                    className="driver-details" key={driver.Driver.driverId}
                                >{driver.Driver.givenName}{driver.Driver.familyName}</td>
                                <td>{driver.Constructors[0].name}</td>
                                <td>{driver.points}</td>
                            </tr>
                        </tbody>

                    </table>
                )
            })}
        </>
    )
}