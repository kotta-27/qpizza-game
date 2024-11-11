import React, { useState } from "react";
import { ArrowRight, Book } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../trans_resouces/trans_data"; // import the i18n setup
import "../stylesheets/Welcome.css";

const WelcomePage = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("ja");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      <nav className="w-full bg-black bg-opacity-50 text-white py-2 px-4 flex justify-end space-x-4">
        <button
          onClick={() => changeLanguage("ja")}
          className={`${language === "ja" ? "font-bold" : ""}`}
        >
          日本語
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className={`${language === "en" ? "font-bold" : ""}`}
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("zh")}
          className={`${language === "zh" ? "font-bold" : ""}`}
        >
          中文
        </button>
      </nav>
      <div className="flex-grow flex items-center justify-center p-4 w-full max-w-3xl">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl w-full max-w-full border-2 border-white border-opacity-20">
          <h1 className="text-5xl font-bold text-white mb-6 flex items-center justify-center welcome-title">
            {t("welcome_page.welcome_message")}
          </h1>
          <p className="text-lg text-white mb-8 italic myRuby text-center ">
            {t("welcome_page.description")}
          </p>
          <div className="space-y-4 flex flex-col items-center justify-center">
            <a
              href="./rule"
              className="block w-3/6 min-w-60 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-3 px-4 rounded-lg font-medium flex items-end justify-center "
            >
              {t("welcome_page.rules_button")}
              <Book className="ml-2" />
            </a>
            <a
              href="./lv1"
              className="block w-3/6  min-w-60 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-3 px-4 rounded-lg font-medium flex items-end justify-center"
            >
              {t("welcome_page.problem_button")}
              <ArrowRight className="ml-2" />
            </a>
          </div>

          <div className="mt-8 text-center"></div>
        </div>
      </div>
      <footer className="w-full bg-black bg-opacity-50 text-white text-center py-2 px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kota Mizuno. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage;
