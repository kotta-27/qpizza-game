import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../trans_resouces/trans_data";
import "../stylesheets/Navbar.css";

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <nav className="nav">
      <ul className="nav-home-and-rules">
        <li>
          <a href="./">{t("navbar.home")}</a>
        </li>
        <li>
          <a href="./rule">{t("navbar.rules")}</a>
        </li>
      </ul>
      <ul className="nav-problems">
        <li>
          <a href="./lv1">{t("navbar.level1")}</a>
        </li>
        <li>
          <a href="./lv2">{t("navbar.level2")}</a>
        </li>
        <li>
          <a href="./lv3">{t("navbar.level3")}</a>
        </li>
        <li>
          <a href="./lv4">{t("navbar.level4")}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
