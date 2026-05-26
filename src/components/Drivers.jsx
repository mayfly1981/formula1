import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate, } from "react-router";
import Flag from "react-flagkit";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import Breadcrumb from "./Breadcrumb";
import HomeIcon from '@mui/icons-material/Home';


export default function Drivers(props) {

    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
        console.log("useEffect");
    }, [props.year]);

    const getDrivers = async () => {
        const url = `https://api.jolpi.ca/ergast/f1/${props.year}/driverStandings.json`;
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setLoading(false);
        console.log("getDrivers");
    };

    const filteredDrivers = drivers.filter((driver) => `${driver.Driver.givenName} ${driver.Driver.familyName}`.toLowerCase().includes(search.toLowerCase().trim().replace(/\s+/g, " ")))

    const handleClick = (driverId) => {
        navigate(`/driverDetails/${driverId}`);
        console.log("handleClick", driverId);
    };

    if (loading) {
        return <Loader />
    };

    const breadcrumbsDrivers = [
        { text: "Drivers", route: "" }
    ];

    console.log("drivers ", drivers);

    return (
        <div className="container-drivers">

            <div className="table-drivers">

                <Breadcrumb items={breadcrumbsDrivers} />
                <h1 className="title">Drivers Championship</h1>
                <input type="text"
                    placeholder="Search drivers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {filteredDrivers.length === 0 && (
                    <p>Driver not found</p>
                )
                }

                <table>
                    <thead>
                        <tr>
                            <th colSpan={5}>Drivers Championship Standings - {props.year}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDrivers.map((driver) => {
                            return (
                                <tr onClick={() => handleClick(driver.Driver.driverId)}
                                    className="driver-details"
                                    key={driver.Driver.driverId}>
                                    <td>{driver.position}</td>
                                    <td onClick={() => handleClick(driver.Driver.driverId)}>
                                        <Flag country={getCountryCodeByNationality(props.flags, driver.Driver.nationality)} size={20} />
                                    </td>
                                    <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
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