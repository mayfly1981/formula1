import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router";
import { useState, useEffect } from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import RaceDetails from "./components/RaceDetails";
import Loader from "./components/Loader";
import axios from "axios";
import Home from "./components/Home";
import Flag from 'react-flagkit';
import SelectYear from "./components/SelectYear";
// importuj error i loader
import Error from "./components/Error";

export default function App() {
  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState("2025");

  const getFlags = async () => {
    const urlFlags = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";
    const responseFlags = await axios.get(urlFlags);
    setFlags(responseFlags.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getFlags();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const activeStyle = ({ isActive }) => ({
  });

  return (
    <BrowserRouter>
      <div className="main-container">

        {/*Navigacija*/}
        <div className="navigations">
          <nav>

            <SelectYear value={year} change={(e) => setYear(e.target.value)} />

            <div className="home-page">
              <Link to="/"><img src="/img/F1-logo.png" alt="Home picture" /></Link>
            </div>

            <div className="just-li">
              <NavLink to="/drivers" style={activeStyle} ><img src="/img/Kaciga.png" alt="" width={180} /> <span>Drivers</span></NavLink>
              <NavLink to="/teams" style={activeStyle} ><img src="/img/Teams.png" alt="" width={180} /> <span>Teams</span></NavLink>
              <NavLink to="/races" style={activeStyle} ><img src="/img/Races1.png" alt="" width={180} /><span>Races</span></NavLink>
            </div>

          </nav>
        </div>

        {/* Rute */}
        <div>
          <Routes>
            <Route path="/" element={<Home year={year} />} />
            <Route path="/drivers" element={<Drivers flags={flags} year={year} />} />
            <Route path="/teams" element={<Teams flags={flags} year={year} />} />
            <Route path="/races" element={<Races flags={flags} year={year} />} />
            <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} year={year} />} />
            <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} year={year} />} />
            <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} year={year} />} />

            {/* dodaj error */}
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div >
    </BrowserRouter >
  );
}