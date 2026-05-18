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
        navigate(`/details/${id}`);
    }


    if (isLoading) {
        return <Loader />;
    }

    console.log(teams)

    return (
        <div>
            <h2>Constructors Champhionship</h2>
            {teams.map((team) => {
                return (
                    <div
                        onClick={() => handleClick(team.constructorId)}
                        key={team.Constructor.constructorId}>
                        <h3>{team.name}</h3>
                    </div>
                );
            })}
        </div >
    )
}