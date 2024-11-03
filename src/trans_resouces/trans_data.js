// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ja: {
    translation: {
      welcome_page: {
        welcome_message: "Welcome to Quantum Pizza! 🍕",
        description: "量子ゲートを使って理想のピザの配分を作ろう！",
        rules_button: "ルールを確認する",
        problem_button: "問題へ進む",
      },
      navbar: {
        home: "ホーム",
        rules: "ゲームのルール",
        level1: "Lv.1",
        level2: "Lv.2",
        level3: "Lv.3",
        level4: "Lv.4",
      },
      problem_common: {
        reset_button: "リセット",
        submit_button: "提出",
        tips_button: "ヒント",
        quantum_circuit: "量子回路",
      },
      lv1: {
        instruction: "🍕ピザにチーズをトッピングしてみよう！",
      },
      lv2: {
        instruction: "🍕ハーフ&ハーフピザを作ってみよう！",
      },
      lv3: {
        instruction: "🍕クォーターピザを作ってみよう！",
      },
      lv4: {
        instruction: "トマト🍅とバジル🌿のハーフ&ハーフピザを作ってみよう！",
      },
    },
  },
  en: {
    translation: {
      welcome_page: {
        welcome_message: "Welcome to Quantum Pizza! 🍕",
        description:
          "Use quantum gates to create the perfect pizza distribution!",
        rules_button: "Check Rules",
        problem_button: "Go to Problem",
      },
      navbar: {
        home: "Home",
        rules: "Game Rules",
        level1: "Lv.1",
        level2: "Lv.2",
        level3: "Lv.3",
        level4: "Lv.4",
      },
      problem_common: {
        reset_button: "Reset",
        submit_button: "Submit",
        tips_button: "Tips",
        quantum_circuit: "Quantum Circuit",
      },
      lv1: {
        instruction: "🍕Try topping the pizza with cheese!",
      },
      lv2: {
        instruction: "🍕Let's make a half-and-half pizza!",
      },
      lv3: {
        instruction: "🍕Let's make a quarter pizza!",
      },
      lv4: {
        instruction:
          "Let's make a half-and-half pizza with tomato🍅 and basil🌿!",
      },
    },
  },
  zh: {
    translation: {
      welcome_page: {
        welcome_message: "Welcome to Quantum Pizza! 🍕",
        description: "使用量子门来制作理想的披萨配比吧！",
        rules_button: "确认规则",
        problem_button: "前往问题",
      },
      navbar: {
        home: "主页",
        rules: "游戏规则",
        level1: "Lv.1",
        level2: "Lv.2",
        level3: "Lv.3",
        level4: "Lv.4",
      },
      problem_common: {
        reset_button: "重置",
        submit_button: "提交",
        tips_button: "提示",
        quantum_circuit: "量子电路",
      },
      lv1: {
        instruction: "🍕试着给披萨加点奶酪吧！",
      },
      lv2: {
        instruction: "🍕让我们制作一款半份半份的披萨！",
      },
      lv3: {
        instruction: "🍕让我们制作一款四分之一的披萨！",
      },
      lv4: {
        instruction: "让我们制作一款番茄🍅和罗勒🌿的半份半份披萨！",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja", // default language
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
