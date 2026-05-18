import { BrowserRouter, Routes, Route, Link } from "react-router";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import RaceDetails from "./components/RaceDetails";

export default function formula1() {
  return (

    <BrowserRouter>
      {/*Navigacija*/}
      <nav className="top-navigation">
        <ul>
          <li><Link to="/">Drivers</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/races">Races</Link></li>
        </ul>
      </nav>

      {/* Rute */}
      <div>
        <Routes>
          <Route path="/" element={<Drivers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/races" element={<Races />} />
          <Route path="/driverDetails/:id" element={<DriversDetails />} />
          <Route path="/teamDetails/:id" element={<TeamDetails />} />
          <Route path="/raceDetails/:id" element={<RaceDetails />} />
        </Routes>
      </div>

    </BrowserRouter >


  );
}
