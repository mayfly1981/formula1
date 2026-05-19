import { useState, useEffect } from "react"
import Loader from "./Loader"
import axios from "axios";
import { useNavigate } from "react-router";
import Flag from "react-flagkit";


export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [flags, setFlags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, []);

    useEffect(() => {
        setFlags();
    }, []);

    const getTeams = async () => {
        const url = "https://api.jolpi.ca/ergast/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        console.log(response);
        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setIsLoading(false);
        console.log("getTeams")
    };

    const getFlags = async () => {
        const urlFlags = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";
        const responseFlags = await axios.get(url);
        console.log(responseFlags);
        setTeams(responseFlags.data.alpha_2_code);
        setIsLoading(false);
        console.log("getFlags")
    };








    const handleClick = (constructorId) => {
        console.log("handleClick ", constructorId);
        navigate(`/TeamDetails/${constructorId}`);
    }


    if (isLoading) {
        return <Loader />;
    }

    console.log(teams)

    return (

        <div>
            <h1 style={{ textAlign: "left" }}>Constructors Champhionship Standings - 2013</h1>
            <div>
                <table style={{ width: "80%", tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => {
                            return (
                                <tr
                                    key={team.Constructor.constructorId}>
                                    <td style={{ textAlign: "left" }}>{team.position}</td>
                                    <td onClick={() => handleClick(team.Constructor.constructorId)} style={{ textAlign: "left" }}><Flag country="GB" size={20} />{team.Constructor.name}</td>
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



