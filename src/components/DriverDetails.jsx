import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import { getCountryCodeByShortName } from "../helpers/getCountryCode";
import Breadcrumb from "./Breadcrumb";
import HomeIcon from '@mui/icons-material/Home';
import Home from "./Home";

export default function DriverDetails(props) {
    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const handleClick = () => {
        console.log("click");
    }

    useEffect(() => {
        getDriverDetails();
        console.log("useEffect");
    }, [props.year]);

    const getDriverDetails = async () => {

        console.log("params", params);
        const urlDriverDetails = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.id}/driverStandings.json`;
        const urlDriverRaces = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.id}/results.json`;


        const driverDetailsResponse = await axios.get(urlDriverDetails);
        const driverDetailsRaces = await axios.get(urlDriverRaces);

        console.log("driverDetailsRaces", driverDetailsRaces);

        setDriverDetails(driverDetailsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverRaces(driverDetailsRaces.data.MRData.RaceTable.Races);
        setIsLoading(false);

    };

    if (isLoading) {
        return <Loader />;
    };
    console.log("driver ", driverDetails);
    console.log("driverDetails ", driverDetails);
    console.log("driverRaces ", driverRaces);

    const driver = driverDetails;

    const breadcrumbsDriverDetails = [
        { text: "Drivers", route: "/drivers" },
        { text: `${driver.Driver.givenName} ${driver.Driver.familyName}`, route: "" }
    ];

    return (
        <>

            {/* <div className="driver-details-page"> */}
            <div className="team-details-page">
                <Breadcrumb items={breadcrumbsDriverDetails} />

                {/* <div className="driver-card"> */}
                <div className="team-card">

                    {/* <div className="driver-card-header"> */}
                    <div className="team-card-header">

                        <div className="img-driver">
                            <img className="team-logo"
                                src={`../../public/img/${driver.Driver.driverId}.png`}
                                alt="Driver picture" />
                            {/*img-drivers */}


                            {/* <div className="driver-title-box"> */}\
                            <div className="team-title-box">
                                <h3 className="team-title">
                                    {/* driver-title"*/}
                                    {driver.Driver.givenName}{" "}
                                    {driver.Driver.familyName}
                                </h3>
                            </div>
                            {/* <div className="driver-info"> */}
                            <div className="team-info">

                                {/* <div className="team-stats"> */}
                                <p className="team-country-pill">
                                    <Flag
                                        className="flag"
                                        country={getCountryCodeByNationality(
                                            props.flags,
                                            driver.Driver.nationality
                                        )}
                                        size={30} />
                                    {/* <span> */}
                                    {driver.Driver.nationality}
                                    {/* </span> */}
                                </p>
                                <p className="team-country-pill">
                                    <span>{driver.Constructors[0].name}</span>
                                </p>

                                <p className="team-country-pill">Birth: {driver.Driver.dateOfBirth}</p>

                                <a href={driver.Driver.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="team-history-link">Biography
                                </a>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="driver-results-section">

                    <h3 className="driver-results-title">Formula 1 - {props.year} Results</h3>

                    <div className="results-table-wrapper">
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>Round</th>
                                    <th></th>
                                    <th>Grand Prix</th>
                                    <th>Team</th>
                                    <th>Grid</th>
                                    <th>Race</th>
                                </tr>
                            </thead>

                            <tbody>

                                {driverRaces.map((driverRace) => {
                                    return (
                                        <tr
                                            onClick={() =>
                                                handleClick(
                                                    driverRace.Results[0].Driver.driverId
                                                )
                                            }
                                            key={driverRace.round}
                                        >

                                            <td>{driverRace.round}</td>

                                            <td>
                                                <div className="img-country">
                                                    <Flag
                                                        country={getCountryCodeByShortName(
                                                            props.flags,
                                                            driverRace.Circuit.Location.country
                                                        )}
                                                        size={20}
                                                    />
                                                </div>
                                            </td>

                                            <td>
                                                {driverRace.raceName}
                                            </td>

                                            <td>
                                                {driverRace.Results[0].Constructor.name}
                                            </td>

                                            <td>
                                                {driverRace.Results[0].grid}
                                            </td>

                                            <td>
                                                {driverRace.Results[0].position}
                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                    </div>
                </div>

            </div>
        </>
    );
}




