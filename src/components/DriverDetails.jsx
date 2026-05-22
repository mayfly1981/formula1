import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import { getCountryCodeByShortName } from "../helpers/getCountryCode";
import Breadcrumb from "./Breadcrumb";

export default function DriverDetails(props) {
    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const handleClick = () => {
        console.log("click");
    }

    useEffect(() => {
        getDriverDetails();
        console.log("useEffect");
    }, []);

    const getDriverDetails = async () => {

        console.log("params", params);
        const urlDriverDetails = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.id}/driverStandings.json`;
        const urlDriverRaces = `https://api.jolpi.ca/ergast/f1/2013/drivers/${params.id}/results.json`;

        const urlFlag = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";

        const response1 = await axios.get(urlDriverDetails);
        const response2 = await axios.get(urlDriverRaces);
        console.log("response1", response1);
        console.log("response2", response2);
        console.log(response1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        console.log(response2.data.MRData.RaceTable.Races);
        setDriverDetails(response1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDriverRaces(response2.data.MRData.RaceTable.Races);
        setIsLoading(false);
        console.log("getDriversDetails", driverDetails);
        console.log("getDriversRaces", driverRaces);
    };

    if (isLoading) {
        return <Loader />;
    };
    console.log("driver ", driverDetails);
    console.log("driverDetails ", driverDetails);
    console.log("driverRaces ", driverRaces);

    const driver = driverDetails[0];
    console.log("driver ", driver);

    const breadcrumbsDriverDetails = [
        { text: "Drivers", route: "/drivers" },
        { text: `${driver.Driver.givenName} ${driver.Driver.familyName}`, route: "" }
    ];

    return (
        <div className="container">
            <div className="driver-details">
                <Breadcrumb items={breadcrumbsDriverDetails} />
                {driverDetails.map((driverDetail) => {
                    return (
                        <div key={driverDetail.position}>
                            <div className="img-driver">
                                <img className="img-drivers" src={`../../public/img/${driverDetail.Driver.driverId}.jpg`} alt={"Driver picture"} width={180} />
                            </div>
                            <div className="information-drivers">

                                <h3>{driverDetail.Driver.givenName} {driverDetail.Driver.familyName}</h3>
                                <img src={driverDetail.nationality} alt="" />
                                <p>{driverDetail.Constructors[0].name} Racing</p>
                                <div className="country-name">

                                    <Flag country={getCountryCodeByNationality(props.flags, driverDetail.Driver.nationality)} size={20} />

                                    <p> {driverDetail.Driver.nationality}</p>
                                </div>
                                <p>Birth: {driverDetail.Driver.dateOfBirth}</p>
                                <a href={driverDetail.Driver.url}
                                    target="_blank"
                                    rel="noreferrer">
                                    Biography
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="right-details">
                <h3>Formula 1 2013 Results</h3>
                <div className="card-table">

                    <table>
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
                                    <tr onClick={() => handleClick(driverRace.Results[0].Driver.driverId)}
                                        key={driverRace.round} >
                                        <td>{driverRace.round}</td>
                                        <td>
                                            <div className="img-country">
                                                <Flag country={getCountryCodeByShortName(props.flags, driverRace.Circuit.Location.country)} size={20} />
                                            </div>
                                        </td>
                                        <td>

                                            {driverRace.raceName}
                                        </td>
                                        <td>{driverRace.Results[0].Constructor.name}</td>

                                        <td>{driverRace.Results[0].grid}</td>
                                        <td>{driverRace.Results[0].position}</td>

                                    </tr>
                                );
                            })}
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div >
    );
}