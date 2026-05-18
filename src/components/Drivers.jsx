import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
export default function Drivers() {
    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(true);


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

    if (loading) {
        return <Loader />

    }
    return (
        <>
            {drivers.map((driver) => {
                return (
                    <div key={driver.Driver.driverId}>

                        <p>{driver.position}</p>
                        <p>{driver.Driver.givenName}{driver.Driver.familyName}</p>
                        <p>{driver.Constructors[0].name}</p>
                        <p>{driver.points}</p>

                    </div>
                )
            })}
        </>
    )
}