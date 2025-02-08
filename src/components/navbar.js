import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../trans_resouces/trans_data";
import "../stylesheets/Navbar.css";

const Navbar = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ja" // ローカルストレージから言語を取得．なければデフォルトはja
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // 言語を保存
    setLanguage(lng);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage); // ロード時に保存された言語を適用
    }
  }, []);

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
      <div className="language-selector">
        <div className="language-buttons">
          <button
            onClick={() => changeLanguage("ja")}
            className={`${language === "ja" ? "selected" : ""}`}
          >
            日本語
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`${language === "en" ? "selected" : ""}`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("zh")}
            className={`${language === "zh" ? "selected" : ""}`}
          >
            中文
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
