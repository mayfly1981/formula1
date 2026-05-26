import { useState, useEffect } from "react"
import Loader from "./Loader"
import axios from "axios";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";
import { getCountryCodeByNationality } from "../helpers/getCountryCode"
import Breadcrumb from "./Breadcrumb";



export default function Teams(props) {

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        console.log(response);
        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setIsLoading(false);
        console.log("getTeams")
    };

    const filteredTeams = teams.filter((team) => team.Constructor.name.toLowerCase().includes(search.toLowerCase().trim().replace(/\s+/g, " ")));



    const handleClick = (constructorId) => {
        console.log("handleClick ", constructorId);
        navigate(`/TeamDetails/${constructorId}`);
    }


    if (isLoading) {
        return <Loader />;
    }

    const breadcrumbsTeams = [

        { text: "Teams", route: "" }

    ];

    console.log(teams)

    return (

        <div className="container-teams">
            <Breadcrumb items={breadcrumbsTeams} />
            <h1>Constructors Champhionship</h1>

            <input type="text"
                placeholder="Search teams..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {filteredTeams.length === 0 && (
                <p>Team not found</p>
            )
            }

            <div className="table-teams">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={6}>Constructors Champhionship Standings - 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.map((team) => {
                            return (
                                <tr
                                    key={team.Constructor.constructorId}>
                                    <td style={{ textAlign: "left" }}>{team.position}</td>
                                    <td>
                                        <Flag country={getCountryCodeByNationality(props.flags, team.Constructor.nationality)} size={20} />
                                    </td>
                                    <td onClick={() => handleClick(team.Constructor.constructorId)} style={{ textAlign: "left" }}>
                                        {team.Constructor.name}
                                    </td>
                                    <td style={{ textAlign: "left" }}><a href={team.Constructor.url} target="_blank">Details</a></td>
                                    <td style={{ textAlign: "left" }}>{team.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >


        </div >
    )
}



