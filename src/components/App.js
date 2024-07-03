import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Routesを追加

import QuantumPizzaGame_lv1 from "./QuantumPizzaGame_lv1";
import QuantumPizzaGame_lv2 from "./QuantumPizzaGame_lv2";
import QuantumPizzaGame_lv3 from "./QuantumPizzaGame_lv3";
import NextPageComponent from "./NextPageComponent";
import WelcomePage from "./Welcome";
import GameRule from "./GameRule";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route path="/lv1" element={<QuantumPizzaGame_lv1 />} />
        <Route path="/lv2" element={<QuantumPizzaGame_lv2 />} />
        <Route path="/lv3" element={<QuantumPizzaGame_lv3 />} />
        <Route path="/rule" element={<GameRule />} />
      </Routes>
    </Router>
  );
};

export default App;
