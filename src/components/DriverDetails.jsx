import axios from "axios";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useParams, useNavigate } from "react-router";
import Loader from "./Loader";
import Flag from "react-flagkit";
import { getCountryCodeByNationality } from "../helpers/getCountryCode";
import { getCountryCodeByShortName } from "../helpers/getCountryCode";
import Breadcrumb from "./Breadcrumb";
import HomeIcon from '@mui/icons-material/Home';
import Home from "./Home";
import Error from "./Error";

export default function DriverDetails(props) {
    const [driverDetails, setDriverDetails] = useState(null);
    const [driverRaces, setDriverRaces] = useState([]);
    const [filteredRaces, setFilteredRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDriverDetails();
    }, [props.year]);

    useEffect(() => {

        const searchedRaces = driverRaces.filter((driverRace) =>
            driverRace.raceName
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                        .trim()
                        .replace(/\s+/g, " ")
                )
        );

        setFilteredRaces(searchedRaces);

    }, [driverRaces, search]);

    const getDriverDetails = async () => {
        try {
            const urlDriverDetails = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.id}/driverStandings.json`;
            const urlDriverRaces = `https://api.jolpi.ca/ergast/f1/${props.year}/drivers/${params.id}/results.json`;

            const driverDetailsResponse = await axios.get(urlDriverDetails);
            const driverDetailsRaces = await axios.get(urlDriverRaces);

            setDriverDetails(driverDetailsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            setDriverRaces(driverDetailsRaces.data.MRData.RaceTable.Races);
        } catch {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    };

    if (error) {
        return <Error />
    }

    const driver = driverDetails;

    const clearSearch = () => {
        setSearch("");
    };

    const breadcrumbsDriverDetails = [
        { text: "Drivers", route: "/drivers" },
        { text: `${driver.Driver.givenName} ${driver.Driver.familyName}`, route: "" }
    ];

    const handleClickRaceDetails = (position) => {
        navigate(`/raceDetails/${position}`);
    };

    const handleClickTeam = (constructorId) => {
        navigate(`/teamDetails/${constructorId}`);
    }

    return (
        <div>

            <div className="team-details-page">
                <Breadcrumb
                    items={breadcrumbsDriverDetails}
                    search={search}
                    onSearch={setSearch}
                    placeholder="Search races..."
                    year={props.year}
                    onYearChange={props.setYear}
                />



                {filteredRaces.length === 0 && (
                    <p>Race not found</p>
                )}

                {search && (
                    <button onClick={() => setSearch("")}>Clear
                    </button>)}

                <div className="team-card">

                    <div className="team-card-header">

                        <div className="img-driver">
                            <img className="team-logo"
                                src={`/img/${driver.Driver.driverId}.png`}
                                alt="Driver picture" />

                            <div className="team-title-box">
                                <h3 className="team-title">
                                    {driver.Driver.givenName}{" "}
                                    {driver.Driver.familyName}
                                </h3>
                            </div>
                            <div className="team-info">
                                <p className="team-country-pill">
                                    <Flag
                                        className="flag"
                                        country={getCountryCodeByNationality(
                                            props.flags,
                                            driver.Driver.nationality
                                        )}
                                        size={30} />
                                    {driver.Driver.nationality}
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

                                {filteredRaces.map((driverRace) => {
                                    return (
                                        <tr
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

                                            <td onClick={() =>
                                                handleClickRaceDetails(
                                                    driverRace.round
                                                )
                                            }>
                                                {driverRace.raceName}
                                            </td>

                                            <td onClick={() => handleClickTeam(driverRace.Results[0].Constructor.constructorId)}>
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
        </div>
    );
}




