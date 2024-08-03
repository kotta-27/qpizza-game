// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ja: {
    translation: {
      welcome: "Welcome to Quantum Pizza! 🍕",
      description: "量子ゲートを使って理想のピザの配分を作ろう！",
      rules: "ルールを確認する",
      problem: "問題へ進む",
    },
  },
  en: {
    translation: {
      welcome: "Welcome to Quantum Pizza! 🍕",
      description:
        "Use quantum gates to create the perfect pizza distribution!",
      rules: "Check Rules",
      problem: "Go to Problem",
    },
  },
  zh: {
    translation: {
      welcome: "Welcome to Quantum Pizza! 🍕",
      description: "使用量子门来制作理想的披萨配比吧！",
      rules: "确认规则",
      problem: "前往问题",
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
