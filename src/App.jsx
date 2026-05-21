import { BrowserRouter, Routes, Route, Link } from "react-router";
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

export default function App() {
  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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


  return (
    <BrowserRouter>
      {/*Navigacija*/}
      <div className="navigations">
        <nav>
          <ul>
            <li><Link to="/"><img src="../public/img/F1-logo.png" alt="Home picture" /></Link></li>
            <li><Link to="/drivers">Drivers</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/races">Races</Link></li>
          </ul>
        </nav>
      </div>

      {/* Rute */}
      <div>
        <Routes>
          <Route path="/drivers" element={<Drivers flags={flags} />} />
          <Route path="/teams" element={<Teams flags={flags} />} />
          <Route path="/races" element={<Races flags={flags} />} />
          <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} />} />
          <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} />} />
          <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}