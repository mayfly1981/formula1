import { useState, useEffect } from "react"
import { getCountryCodeByNationality } from "../helpers/getCountryCode"
import { useNavigate } from "react-router";
import Breadcrumb from "./Breadcrumb";
import Loader from "./Loader"
import axios from "axios";
import Flag from "react-flagkit";
import Error from "./Error";

export default function Teams(props) {

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, [props.year]);

    const getTeams = async () => {
        try {
            setError(false);
            const url = `https://api.jolpi.ca/ergast/f1/${props.year}/constructorStandings.json`;
            const response = await axios.get(url);

            const standingsList = response.data?.MRData?.StandingsTable?.StandingsLists;
            const teams = (standingsList && standingsList.length > 0)
                ? standingsList[0].ConstructorStandings
                : [];

            setTeams(teams)
        } catch (e) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const searchedTeams = teams.filter((team) =>
            team.Constructor.name.toLowerCase().includes(search.toLowerCase().trim().replace(/\s+/g, " ")));
        setFilteredTeams(searchedTeams);
    }, [teams, search]);

    const handleClick = (constructorId) => {
        console.log("handleClick ", constructorId);
        navigate(`/teamDetails/${constructorId}`);
    }

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error />;
    }

    const breadcrumbsTeams = [
        { text: "Teams", route: "" }
    ];

    console.log("teams ", teams);

    return (
        <div className="container-teams">
            <Breadcrumb
    items={breadcrumbsTeams}
    search={search}
    onSearch={setSearch}
    placeholder="Search teams..."
    year={props.year}
    onYearChange={props.setYear}
/>
            <h1>Constructors Championship</h1>
      

            {filteredTeams.length === 0 && (<p>Team not found</p>)}

            <div className="table-teams">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={6}>Constructors Championship Standings - {props.year}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.map((team) => {
                            return (
                                <tr key={team.Constructor.constructorId}>
                                    <td >{team.position}</td>
                                    <td>
                                        <Flag
                                            country={getCountryCodeByNationality(props.flags, team.Constructor.nationality)}
                                            size={20} />
                                    </td>
                                    <td onClick={() => handleClick(team.Constructor.constructorId)}>
                                        {team.Constructor.name}
                                    </td>
                                    <td>
                                        <a href={team.Constructor.url} target="_blank">
                                            Details
                                        </a>
                                    </td>
                                    <td>{team.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >
        </div >
    )
}



