import { BrowserRouter, Routes, Route, Link } from "react-router";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";

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
      <div style={{ backgroundColor: "#ccc" }}>
        <Routes>
          <Route path="/" element={<Drivers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/races" element={<Races />} />
        </Routes>
      </div>

    </BrowserRouter >


  );
}
