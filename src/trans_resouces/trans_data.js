// i18n.js
// 各言語の翻訳データを定義

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
        swal: {
          reset: {
            title: "リセットしますか？",
            text: "現在の進行状況が失われます。",
            reset_button: "リセット",
            cancel_button: "キャンセル",
          },
          confirm: {
            correct_title: "素晴らしい！！🎉",
            correct_message: "正解です”次のレベルに進みましょう！",
            confirm_button_next: "次へ",
            confirm_button_ok: "OK",
            confirm_buttion_next_level: "次の問題へ進む",
            cancel_button: "キャンセル",
            incorrect_title: "惜しい！",
            incorrect_message:
              "まだ正解ではありません。もう一度試してみましょう！",
            X_gate: {
              title: "Xゲート",
              description_1: `Xゲートは量子コンピューティングにおける基本的な量子ゲートの一つです。<br>
            Xゲートは、量子ビットの状態を反転させる効果があります。<br>
            今回のゲームでは、<span class="emp">チーズを乗せたり抜いたりする操作</span>に対応します。`,
              description_2: "Xゲートは、2回かけると元の状態に戻ります。",
            },
          },
        },
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
        swal: {
          reset: {
            title: "Reset?",
            text: "The current progress will be lost.",
            reset_button: "Reset",
            cancel_button: "Cancel",
          },
          confirm: {
            correct_title: "Great!!🎉",
            correct_message: "Correct! Let's move on to the next level!",
            confirm_button_next: "Next",
            confirm_button_ok: "OK",
            confirm_buttion_next_level: "Next Level",
            cancel_button: "Cancel",
            incorrect_title: "Close!",
            incorrect_message: "Not correct yet. Try again!",
            X_gate: {
              title: "X Gate",
              description_1: `The X gate is one of the basic quantum gates in quantum computing.<br>
              The X gate flips the state of a qubit.<br>
              In this game, the X gate corresponds to <span class="emp">adding or removing cheese</span>.`,
              description_2:
                "The X gate returns to the original state when applied twice.",
            },
          },
        },
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
        swal: {
          reset: {
            title: "重置？",
            text: "当前进度将会丢失。",
            reset_button: "重置",
            cancel_button: "取消",
          },
          confirm: {
            correct_title: "太棒了！！🎉",
            correct_message: "正确！让我们继续到下一级！",
            confirm_button_next: "下一个",
            confirm_button_ok: "好的",
            confirm_buttion_next_level: "下一级",
            cancel_button: "取消",
            incorrect_title: "差一点！",
            incorrect_message: "还不正确。再试一次！",
            X_gate: {
              title: "X 门",
              description_1: `X 门是量子计算中的基本量子门之一。<br>
              X 门会反转量子比特的状态。<br>
              在这个游戏中，X 门对应着<span class="emp">加入或去除奶酪的操作</span>。`,
              description_2: "连续两次应用 X 门会使量子比特恢复到原始状态。",
            },
          },
        },
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
