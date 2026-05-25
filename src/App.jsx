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
import 'bootstrap/dist/css/bootstrap.min.css';


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
      <div className="main-container">

        {/*Navigacija*/}
        <div className="navigations">
          <nav>
            <ul>
              <div className="home-page">
                <li><Link to="/"><img src="../public/img/F1-logo.png" alt="Home picture" /></Link></li>
              </div>
              <div className="just-li">
                <li><Link to="/drivers"><img src="../public/img/Kaciga.png" alt="" width={180} /> Drivers</Link></li>
                <li><Link to="/teams"><img src="../public/img/Teams.png" alt="" width={180} /> Teams</Link></li>
                <li><Link to="/races"><img src="../public/img/Races1.png" alt="" width={180} /> Races</Link></li>
              </div>
            </ul>
          </nav>
        </div>

        {/* Rute */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drivers" element={<Drivers flags={flags} />} />
            <Route path="/teams" element={<Teams flags={flags} />} />
            <Route path="/races" element={<Races flags={flags} />} />
            <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} />} />
            <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} />} />
            <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter >
  );
}