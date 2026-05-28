import { useEffect, useState } from "react";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import { useNavigate, } from "react-router";
import Breadcrumb from "./Breadcrumb";
import Loader from "./Loader";
import axios from "axios";
import Flag from "react-flagkit";
import Error from "./Error";
import HomeIcon from '@mui/icons-material/Home';

export default function Drivers(props) {

    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const [filteredDrivers, setFilteredDrivers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, [props.year]);

    const getDrivers = async () => {
        try {
            setError(false);
            const url = `https://api.jolpi.ca/ergast/f1/${props.year}/driverStandings.json`;
            const response = await axios.get(url);
            const drivers =
                response.data.MRData.StandingsTable.StandingsLists[0]
                    ?.DriverStandings || [];
            setDrivers(drivers);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const searchedDrivers = drivers.filter((driver) =>
            `${driver.Driver.givenName}`.toLowerCase().includes(search.toLowerCase().trim().replace(/\s+/g, " ")) ||
            `${driver.Driver.familyName}`.toLowerCase().includes(search.toLowerCase().trim().replace(/\s+/g, " ")))
        setFilteredDrivers(searchedDrivers);
    }, [drivers, search]);

    const handleClick = (driverId) => {
        navigate(`/driverDetails/${driverId}`);
    };

    const handleClickTeam = (driverId) => {
        navigate(`/teamDetails/${driverId}`);
    };

    if (loading) {
        return <Loader />
    };

    if (error) {
        return <Error />
    }

    const breadcrumbsDrivers = [
        { text: "Drivers", route: "" }
    ];

    console.log("drivers ", drivers);

    return (
        <div className="container-drivers">
            <div className="table-drivers">
                <Breadcrumb items={breadcrumbsDrivers} />
                <h1 className="title">Drivers Championship</h1>
                <input
                    type="text"
                    placeholder="Search drivers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />

                {filteredDrivers.length === 0 && (<p>Driver not found</p>)}

                <table>
                    <thead>
                        <tr>
                            <th colSpan={5}>Drivers Championship Standings - {props.year}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDrivers.map((driver) => {
                            return (
                                <tr className="driver-details"
                                    key={driver.Driver.driverId}>
                                    <td>{driver.position}</td>
                                    <td >
                                        <Flag
                                            country={getCountryCodeByNationality(props.flags, driver.Driver.nationality)}
                                            size={20} />
                                    </td>
                                    <td onClick={() => handleClick(driver.Driver.driverId)}>{driver.Driver.givenName} {driver.Driver.familyName}
                                    </td>
                                    <td onClick={() => handleClickTeam(driver.Constructors[0].constructorId)}>{driver.Constructors[0].name}
                                    </td>
                                    <td>{driver.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}