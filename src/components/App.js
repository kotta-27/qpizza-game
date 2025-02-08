import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Routesを追加

import GamePageLv1 from "./GamePageLv1";
import GamePageLv2 from "./GamePageLv2";
import GamePageLv3 from "./GamePageLv3";
import GamePageLv4 from "./GamePageLv4";
import WelcomePage from "./Welcome";
import GameRule from "./GameRule";
import Congrats from "./Congrats";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route path="/lv1" element={<GamePageLv1 />} />
        <Route path="/lv2" element={<GamePageLv2 />} />
        <Route path="/lv3" element={<GamePageLv3 />} />
        <Route path="/lv4" element={<GamePageLv4 />} />
        <Route path="/rule" element={<GameRule />} />
        <Route path="/congrats" element={<Congrats />} />
      </Routes>
    </Router>
  );
};

export default App;
