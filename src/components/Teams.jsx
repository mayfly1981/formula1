import { useState, useEffect } from "react"
import Loader from "./Loader"
import axios from "axios";
import { useNavigate } from "react-router";


export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    const handleClick = (id) => {
        console.log("handleClick ", id);
        navigate(`/TeamDetails/${id}`);
    }


    if (isLoading) {
        return <Loader />;
    }

    console.log(teams)

    return (
        <div>
            <h2 style={{ textAlign: "left" }}>Constructors Champhionship Standings - 2013</h2>
            {teams.map((team) => {
                return (
                    <div
                        onClick={() => handleClick(team.constructorId)}
                    >
                        <table style={{ width: "80%", tableLayout: "fixed" }}>
                            <tr key={team.constructorId}>
                                <td style={{ textAlign: "left" }}>{team.position}</td>
                                <td style={{ textAlign: "left" }}>{team.Constructor.name}</td>
                                <td style={{ textAlign: "left" }}><a href="">Details</a></td>
                                <td style={{ textAlign: "left" }}>{team.points}</td>
                            </tr>
                        </table>
                    </div>
                );
            })}
        </div >
    )
}