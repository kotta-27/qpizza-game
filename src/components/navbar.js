import React from "react";
import "../stylesheets/Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="./">ホーム</a>
        </li>
        <li>
          <a href="./rule">ゲームのルール</a>
        </li>
        <li>
          <a href="./lv1">Lv.1</a>
        </li>
        <li>
          <a href="./lv2">Lv.2</a>
        </li>
        <li>
          <a href="./lv3">Lv.3</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
