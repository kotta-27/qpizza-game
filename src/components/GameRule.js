import React, { useState } from "react";
import { Goal, Target, Gift, Gamepad2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../trans_resouces/trans_data";
import "../stylesheets/GameRule.css";

const GameRule = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <nav className="sticky top-0 w-full bg-black/30 backdrop-blur-md text-white py-4 px-6 flex justify-end space-x-6 z-50">
        {["ja", "en", "zh"].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`
              px-4 py-2 rounded-full transition-all duration-300
              ${language === lang
                ? "bg-white text-purple-600 font-bold shadow-lg transform scale-105"
                : "hover:bg-white/20"
              }
            `}
          >
            {lang === "ja" ? "日本語" : lang === "en" ? "English" : "中文"}
          </button>
        ))}
      </nav>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center leading-relaxed animate-fade-in">
          {t("game_rule_page.game_rule_title")}
        </h1>

        <div className="rule-container bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-300">
          <div className="w-full">
            {[
              {
                icon: <Goal className="w-8 h-8" />,
                title: t("game_rule_page.game_goal"),
                content: t("game_rule_page.game_goal_description")
              },
              {
                icon: <Gamepad2 className="w-8 h-8" />,
                title: t("game_rule_page.game_play_method"),
                content: (
                  <ol className="list-decimal list-inside space-y-4">
                    {t("game_rule_page.game_play_steps", { returnObjects: true }).map(
                      (step, index) => (
                        <li key={index} className="hover:translate-x-2 transition-transform duration-200">{step}</li>
                      )
                    )}
                  </ol>
                )
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: t("game_rule_page.rewards"),
                content: t("game_rule_page.rewards_description")
              }
            ].map((section, index) => (
              <div key={index} className="w-full mb-4 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  <span className="p-2 bg-purple-500 rounded-lg">{section.icon}</span>
                  {section.title}
                </h2>
                <div className="ml-14">{section.content}</div>
                {index === 0 && (
                  <div className="mt-4 flex justify-center">
                    <img src={t("game_rule_page.image_path")} alt="Game Screenshot" className="w-1/3 rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300" />
                  </div>
                )}
              </div>
            ))}

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300">
              <p className="font-bold text-xl mb-3">
                {t("game_rule_page.game_rule_tips")}
              </p>
              <p className="leading-relaxed">
                {t("game_rule_page.tips_description")}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="./lv1"
              className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
            >
              {t("game_rule_page.game_start_button")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRule;
