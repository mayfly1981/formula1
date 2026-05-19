import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function RaceDetails() {
    const [raceDetais, setRaceDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const handleClick = () => {
        console.log("click");
    }

    useEffect(() => {
        getRaceDetails();
    }, [])

    const getRaceDetails = async () => {
        console.log("params", params);

        // ====== > 3 url zavrsiti
        // const urlResult = "";
        // const urlQualifiers = "";
        // const urlAllRaces = "";

        const urlFlag = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";

        const response = await axios.get(urlDriverDetails);

        console.log("response", response);

        console.log(response1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);

        setDriverDetails();
        setIsLoading(false);
        console.log("getDriversRaces");
    };

    if (isLoading) {
        return <Loader />;
    };

    console.log("raceDetails ", RaceDetails);

    return (
        <div className="container">

            <div className="">

            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    );
}