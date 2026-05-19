import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";

export default function DriverDetails() {
    const [driverDetails, setDriverDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getDriverDetails();
    }, []);

    const getDriverDetails = async () => {
        console.log("params", params);
        const url = `https://api.jolpi.ca/ergast/f1/2013/drivers/alonso/driverStandings.json${driverId}`;
        // const url2 = ;

        const response = await axios.get(url);
        console.log("response", response);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setIsLoading(false);
        console.log("getDriversDetails");
    };

    if (isLoading) {
        return <Loader />;
    };

    return (
        <>
            <div>
                <h2>Comment details</h2>
                <p>Id: {driverDetails.driverId}</p>
                <p>Id: {driverDetails.permanentNumber}</p>
                <p>Id: {driverDetails.code}</p>
                <p>Id: {driverDetails.givenName}</p>
                <p>Id: {driverDetails.familyName}</p>
                <p>Id: {driverDetails.dateOfBirth}</p>
                <p>Id: {driverDetails.nationality}</p>
                {/* <p>Name: {DriverDetails.name}</p>
                        <p>Email: {DriverDetails.email}</p>
                        <p>Body: {DriverDetails.body}</p> */}
            </div>
            <div>

            </div>
            {/* <p>Id: {driverDetails.id}</p>
            <p>Name: {driverDetails.name}</p>
            <p>Email: {driverDetails.email}</p>
            <p>Body: {driverDetails.body}</p> */}
        </>
    );
}