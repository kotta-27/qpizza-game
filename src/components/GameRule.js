import React, { useState } from "react";
import { Goal, Target, Gift, Gamepad2 } from "lucide-react";

// 各言語でのテキストを定義
const texts = {
  ja: {
    imagePath: "./game_rule_ja.png",
    gameTitle: "このゲームのルール",
    gameGoal: "ゲームの目的",
    goalDescription:
      "量子ゲートを使って、右上に表示されるお題のピザと同じ割合になるように調整しましょう。",
    playMethod: "プレイ方法",
    playSteps: [
      "ボタンを押して、量子ゲートを追加して、ピザの割合を調整します。",
      "右上に表示されるお題のピザと一致するように調整してください。",
      "一致したら、次のレベルに進みます。",
    ],
    rewards: "報酬",
    rewardsDescription:
      "すべてのレベルをクリアして、量子ピザ職人を目指しましょう！👀",
    hint: "ヒント",
    hintDescription:
      "量子ゲートの種類や配置順序によって、ピザの割合が変化します。様々な組み合わせを試してみましょう！👀",
    startGame: "ゲームを始める",
  },
  en: {
    imagePath: "./game_rule_en.png",
    gameTitle: "Game Rules",
    gameGoal: "Game Goal",
    goalDescription:
      "Use quantum gates to adjust the pizza to match the target shown in the upper right.",
    playMethod: "How to Play",
    playSteps: [
      "Press buttons to add quantum gates and adjust the pizza proportions.",
      "Adjust to match the target pizza shown in the upper right.",
      "When matched, proceed to the next level.",
    ],
    rewards: "Rewards",
    rewardsDescription: "Clear all levels to become a quantum pizza master! 👀",
    hint: "Hint",
    hintDescription:
      "The type and order of quantum gates affect the pizza proportions. Try different combinations! 👀",
    startGame: "Start Game",
  },
  zh: {
    imagePath: "./game_rule_zh.png",
    gameTitle: "游戏规则",
    gameGoal: "游戏目标",
    goalDescription: "使用量子门来调整比萨饼，使其与右上角显示的目标相匹配。",
    playMethod: "玩法",
    playSteps: [
      "按下按钮添加量子门并调整比萨饼的比例。",
      "调整以匹配右上角显示的目标比萨饼。",
      "匹配后，进入下一关。",
    ],
    rewards: "奖励",
    rewardsDescription: "通过所有关卡，成为量子比萨大师！👀",
    hint: "提示",
    hintDescription: "量子门的类型和顺序会影响比萨饼的比例。尝试不同的组合！👀",
    startGame: "开始游戏",
  },
};

const lanSet = { ja: "日本語", en: "English", zh: "中文" };

const Navbar = ({ currentLang, setLang }) => (
  <nav className="w-full bg-black bg-opacity-50 text-white py-2 px-4 flex justify-end space-x-4">
    {["ja", "en", "zh"].map((lang) => (
      <button
        key={lang}
        onClick={() => setLang(lang)}
        className={`${currentLang === lang ? "underline" : ""} hover:underline`}
      >
        {lanSet[lang]}
      </button>
    ))}
  </nav>
);

const GameRule = () => {
  const [lang, setLang] = useState("ja");

  const text = texts[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <Navbar currentLang={lang} setLang={setLang} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center leading-relaxed">
          {text.gameTitle}
        </h1>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl px-8 py-4 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
            <Goal className="mr-2 flex-shrink-0" />
            {text.gameGoal}
          </h2>
          <p className="mb-6 leading-relaxed w-356">{text.goalDescription}</p>

          <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
            <Gamepad2 className="mr-2 flex-shrink-0" />
            {text.playMethod}
          </h2>

          <img
            src={text.imagePath}
            style={{
              width: "35%",
              position: "absolute",
              right: "30px",
              top: "60px",
            }}
            alt="Game Screenshot"
          />
          <ol className="list-decimal list-inside space-y-4 mb-6">
            {text.playSteps.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>

          <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
            <Gift className="mr-2 flex-shrink-0" />
            {text.rewards}
          </h2>
          <p className="mb-6 leading-relaxed">{text.rewardsDescription}</p>

          <div className="bg-yellow-400 text-gray-800 p-4 rounded-lg">
            <p className="font-semibold mb-2">{text.hint}：</p>
            <p className="leading-relaxed">{text.hintDescription}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="./lv1"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {text.startGame}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameRule;
