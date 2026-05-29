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
  };
  useEffect(() => {
    getFlags();
  }, []);
  if (isLoading) {
    return <Loader />;
  };
  const activeClass = ({ isActive }) =>
    isActive ? "app-nav-link active" : "app-nav-link";

  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="app-sidebar-nav">
          <nav className="app-sidebar-nav-inner">

            <div className="app-sidebar-logo">
              <Link to="/" className="app-sidebar-logo">
                <img src="/img/F1-logo.png" alt="Formula 1" />
              </Link>
            </div>
            <div className="app-sidebar-links">
              <NavLink to="/drivers" className={activeClass}>
                <img src="/img/drivers-helmet.gif" alt="" />
                <span>Drivers</span>
              </NavLink>
              <NavLink to="/teams" className={activeClass} >
                <img src="/img/teams-1.gif"
                  alt="" />
                <span>Teams</span>
              </NavLink>
              <NavLink to="/races" className={activeClass} >
                <img src="/img/race-flag-18.gif"
                  alt="" />
                <span>Races</span>
              </NavLink>
            </div>
          </nav>
        </div>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home year={year} />} />
            <Route path="/drivers" element={<Drivers flags={flags} year={year} setYear={setYear} />} />
            <Route path="/teams" element={<Teams flags={flags} year={year} setYear={setYear} />} />
            <Route path="/races" element={<Races flags={flags} year={year} setYear={setYear} />} />
            <Route path="/driverDetails/:id" element={<DriverDetails flags={flags} year={year} setYear={setYear} />} />
            <Route path="/teamDetails/:id" element={<TeamDetails flags={flags} year={year} setYear={setYear} />} />
            <Route path="/raceDetails/:id" element={<RaceDetails flags={flags} year={year} setYear={setYear} />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <div>
            <footer>Formula 1 © {year} </footer>
          </div>
        </div>
      </div >
    </BrowserRouter >
  );
};