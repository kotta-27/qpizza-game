import React, { useState } from "react";
import { Goal, Target, Gift, Gamepad2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../trans_resouces/trans_data";
import "../stylesheets/GameRule.css";

const GameRule = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("ja");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center leading-relaxed">
          {t("game_rule_page.game_rule_title")}
        </h1>

        <div className="rule-container bg-white bg-opacity-10 backdrop-blur-lg rounded-xl px-8 py-4 shadow-2xl">
          <div className="rule-description">
            <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
              <Goal className="mr-2 flex-shrink-0" />
              {t("game_rule_page.game_goal")}
            </h2>
            <p className="mb-6 leading-relaxed w-356">
              {t("game_rule_page.game_goal_description")}
            </p>

            <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
              <Gamepad2 className="mr-2 flex-shrink-0" />
              {t("game_rule_page.game_play_method")}
            </h2>

            <ol className="list-decimal list-inside space-y-4 mb-6">
              {t("game_rule_page.game_play_steps", { returnObjects: true }).map(
                (step, index) => (
                  <li key={index}>{step}</li>
                )
              )}
            </ol>

            <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
              <Gift className="mr-2 flex-shrink-0" />
              {t("game_rule_page.rewards")}
            </h2>
            <p className="mb-6 leading-relaxed">
              {t("game_rule_page.rewards_description")}
            </p>

            <div className="bg-yellow-400 text-gray-800 p-4 rounded-lg">
              <p className="font-semibold mb-2">
                {t("game_rule_page.game_rule_tips")}：
              </p>
              <p className="leading-relaxed">
                {" "}
                {t("game_rule_page.tips_description")}
              </p>
            </div>
          </div>
          <div className="image-container">
            <img src={t("game_rule_page.image_path")} alt="Game Screenshot" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="./lv1"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {t("game_rule_page.game_start_button")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameRule;
