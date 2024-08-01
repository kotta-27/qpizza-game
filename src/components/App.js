import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Routesを追加

import QuantumPizzaGame_lv1 from "./QuantumPizzaGame_lv1";
import QuantumPizzaGame_lv2 from "./QuantumPizzaGame_lv2";
import QuantumPizzaGame_lv3 from "./QuantumPizzaGame_lv3";
import QuantumPizzaGame_lv4 from "./QuantumPizzaGame_lv4";
import WelcomePage from "./Welcome";
import GameRule from "./GameRule";
import Congrats from "./Congrats";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route path="/lv1" element={<QuantumPizzaGame_lv1 />} />
        <Route path="/lv2" element={<QuantumPizzaGame_lv2 />} />
        <Route path="/lv3" element={<QuantumPizzaGame_lv3 />} />
        <Route path="/lv4" element={<QuantumPizzaGame_lv4 />} />
        <Route path="/rule" element={<GameRule />} />
        <Route path="/congrats" element={<Congrats />} />
      </Routes>
    </Router>
  );
};

export default App;
