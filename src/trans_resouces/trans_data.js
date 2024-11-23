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
      game_rule_page: {
        image_path: "./rule_ja_2.png",
        game_rule_title: "このゲームのルール",
        game_goal: "ゲームの目的",
        game_goal_description:
          "量子ゲートを使って、右上に表示されるお題のピザと同じ割合になるように調整しましょう。",
        game_play_method: "プレイ方法",
        game_play_steps: [
          "ボタンを押して、量子ゲートを追加して、ピザの割合を調整します。",
          "右上に表示されるお題のピザと一致するように調整してください。",
          "一致したら、次のレベルに進みます。",
        ],
        rewards: "報酬",
        rewards_description:
          "すべてのレベルをクリアして、量子ピザ職人を目指しましょう！👀",
        game_rule_tips: "ヒント",
        tips_description:
          "量子ゲートの種類や配置順序によって、ピザの割合が変化します。様々な組み合わせを試してみましょう！👀",
        game_start_button: "ゲームを始める",
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
            correct_message: "正解です! 次のレベルに進みましょう！",
            correct_message_last: "正解です！",
            confirm_button_next: "次へ",
            confirm_button_ok: "OK",
            confirm_button_next_level: "次の問題へ進む",
            cancel_button: "キャンセル",
            incorrect_title: "惜しい！",
            incorrect_message:
              "まだ正解ではありません。もう一度試してみましょう！",
          },
        },
      },
      lv1: {
        instruction: "🍕ピザにチーズをトッピングしてみよう！",
        swal: {
          X_gate: {
            title: "Xゲート",
            description_1: `Xゲートは量子コンピューティングにおける基本的な量子ゲートの一つです。<br>
          Xゲートは、量子ビットの状態を反転させる効果があります。<br>
          今回のゲームでは、<span class="emp">チーズを乗せたり抜いたりする操作</span>に対応します。`,
            description_2: "Xゲートは、2回かけると元の状態に戻ります。",
          },
        },
      },
      lv2: {
        instruction: "🍕ハーフ&ハーフピザを作ってみよう！",
        swal: {
          H_gate_1: {
            title: "Hゲート ①",
            description_1: `Hゲートは、量子ビットを重ね合わせ状態にするゲートです。<br>
            1種類のピザから、<span class="emp">ハーフ&ハーフ</span>のピザを作れます。`,
            description_2:
              "Hゲートは、Xと同じように、2回かけると元の状態に戻ります。",
          },
        },
      },
      lv3: {
        instruction: "🍕クォーターピザを作ってみよう！",
        swal: {
          H_gate_2: {
            title: "Hゲート ②",
            description_1:
              "Lv2で，Hゲートはピザをハーフ&ハーフにすると学びました。",
            description_2:
              " 上下のどちらにもHゲートをかけることで、ピザを4等分することができます。",
          },
        },
      },
      lv4: {
        instruction: "トマト🍅とバジル🌿のハーフ&ハーフピザを作ってみよう！",
        swal: {
          CX_gate: {
            title: "CNOT（CX）ゲート",
            description_1: `
                CXゲートは量子コンピューティングにおいてとても重要な量子ゲートです。<br>
                CX：「↑」かCX：「↓」かで動きが変わります。<br><br>
                CX：「↑」の場合、ホワイトソース🥛とバジル🌿を入れ替えます。 <br>
                CX：「↓」の場合、チーズ🧀とバジル🌿を入れ替えます。`,
            description_2: `先にHゲートを使ってハーフ&ハーフを作り、<br>
                    その後に適切なCXゲートを使って具材を入れ替えます。<br>`,
          },
          tips: {
            title: "ヒント💡",
            confirm_button_more_tips: "さらにヒントを見る",
            cancel_button_back: "戻る",
            description_1: `新しく登場した<span class="emp">CXゲート</span>を使ってみましょう！<br>
            <span class="emp">量子ゲートの順番</span>も大切です。`,
            description_2: `上のCX:↑ゲートは，<span class="emp">ホワイトソース🥛とバジル🌿</span>、<br>
            下のCX:↓ゲートは，<span class="emp">チーズ🧀とバジル🌿</span> <br>
            を入れ替えます。`,
            supplement: "（このヒントは画面に固定されます）",
          },
        },
        tips_display: {
          title: "ヒント💡",
          description_1: "CX↑： ホワイトソース🥛 ↔︎ バジル🌿",
          description_2: "CX↓： チーズ🧀 ↔︎ バジル🌿",
        },
      },
      congrats_page: {
        congrats_message: ` <ruby>
                全<rt>ぜん</rt>
              </ruby>
              <ruby>
                問題<rt>もんだい</rt>
              </ruby>
              クリアおめでとうございます！
              <br />
              あなたは
              <ruby>
                立派<rt>りっぱ</rt>
              </ruby>
              な
              <ruby>
                量子<rt>りょうし</rt>
              </ruby>
              ピザ
              <ruby>
                職人<rt>しょくにん</rt>
              </ruby>
              です！
              <br></br>
              プレイしてくださり、ありがとうございました！ 😆`,
        button_back_home: "ホームに戻る",
      },
    },
  },
  en: {
    translation: {
      welcome_page: {
        welcome_message: "Welcome to Quantum Pizza! 🍕",
        description: "Create the perfect pizza using quantum gates!",
        rules_button: "Rules & Instructions",
        problem_button: "Start Problem",
      },
      game_rule_page: {
        image_path: "./rule_en_2.png",
        game_rule_title: "Rules & Instructions",
        game_goal: "Goal",
        game_goal_description:
          "Clear all levels by using quantum gates to create pizza toppings that match the target shown on the right.",
        game_play_method: "How to Play",
        game_play_steps: [
          "Press a button to add a quantum gate to change the pizza toppings.",
          "Adjust to match the target pizza topping displayed in the right.",
          "When matched, proceed to the next level.",
        ],
        rewards: "Reward",
        rewards_description: "You are a Quatum Pizza Master!👀",
        game_rule_tips: "Tip",
        tips_description:
          "The pizza toppings will change if you adjust the types and order of quantum gates.  Try various combinations!",
        game_start_button: "Start Game",
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
            correct_message_last: "Correct!",
            confirm_button_next: "Next",
            confirm_button_ok: "OK",
            confirm_button_next_level: "Next Level",
            cancel_button: "Cancel",
            incorrect_title: "Close!",
            incorrect_message: "Not correct yet. Try again!",
          },
        },
      },
      lv1: {
        instruction: "🍕Give the pizza a cheesy topping!",
        swal: {
          X_gate: {
            title: "X Gate",
            description_1: `The X gate is one of the basic quantum gates in quantum computing.<br>
            The X gate flips the state of a qubit.<br>
            In this game, the X gate corresponds to <span class="emp">adding or removing cheese</span>.`,
            description_2:
              "The X gate returns the qubit to the original state when applied twice.",
          },
        },
      },
      lv2: {
        instruction: "🍕Let's make a half-and-half pizza!",
        swal: {
          H_gate_1: {
            title: "H Gate①",
            description_1: `The H gate is a gate that puts a qubit in a superposition state.<br>
            You can make a <span class="emp">half-and-half</span> pizza from a single-topping pizza.`,
            description_2:
              "The H gate returns a qubit to its original state when applied twice, just like the X gate.",
          },
        },
      },
      lv3: {
        instruction: "🍕Let's make a quarter pizza!",
        swal: {
          H_gate_2: {
            title: "H Gate②",
            description_1:
              "In Lv2, you learned that the H gate makes a half-and-half pizza.",
            description_2:
              "By applying the H gate to both the top and bottom, you can make a quarter pizza. ",
          },
        },
      },
      lv4: {
        instruction:
          "Let's make a half-and-half pizza with tomato🍅 and basil🌿!",
        swal: {
          CX_gate: {
            title: "CNOT (CX) Gate",
            description_1: `
                The CX gate is a very important quantum gate in quantum computing.<br>
                <br>
                In the case of CX: "↑", the white sauce🥛 and basil🌿 are swapped.<br>
                In the case of CX: "↓", the cheese🧀 and basil🌿 are swapped.`,
            description_2: `First, use the H gate to make a half-and-half, and then use the appropriate CX gate to swap the toppings.<br>`,
          },
          tips: {
            title: "Tip💡",
            confirm_button_more_tips: "More Tip",
            cancel_button_back: "Back",
            description_1: `Try using the new <span class="emp">CX gate</span>!<br>
            The <span class="emp">order of quantum gates</span> is also important.`,
            description_2: `The upper CX:↑ gate swaps <span class="emp">white sauce🥛 and basil🌿</span>,<br>
            and the lower CX:↓ gate swaps <span class="emp">cheese🧀 and basil🌿</span>.`,
            supplement: "(This tip will be fixed on the screen. )",
          },
        },
        tips_display: {
          title: "Tips💡",
          description_1: "CX↑: White Sauce🥛 ↔︎ Basil🌿",
          description_2: "CX↓: Cheese🧀 ↔︎ Basil🌿",
        },
      },
      congrats_page: {
        congrats_message: `You are a great quantum pizza master! <br><br>
              Thank you for playing! 😆`,
        button_back_home: "Back to Home",
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
      game_rule_page: {
        image_path: "./rule_zh_2.png",
        game_rule_title: "游戏规则",
        game_goal: "游戏目标",
        game_goal_description:
          "使用量子门调整披萨，使其与右上角显示的目标相匹配。",
        game_play_method: "游戏玩法",
        game_play_steps: [
          "按下按钮添加量子门，调整披萨比例。",
          "调整以匹配右上角显示的目标披萨。",
          "匹配后，进入下一级。",
        ],
        rewards: "奖励",
        rewards_description: "通关所有级别，成为量子披萨大师！👀",
        game_rule_tips: "提示",
        tips_description:
          "量子门的类型和顺序会影响披萨的比例。尝试不同的组合！👀",
        game_start_button: "开始游戏",
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
            correct_message_last: "正确！",
            confirm_button_next: "下一个",
            confirm_button_ok: "好的",
            confirm_button_next_level: "下一级",
            cancel_button: "取消",
            incorrect_title: "差一点！",
            incorrect_message: "还不正确。再试一次！",
          },
        },
      },
      lv1: {
        instruction: "🍕试着给披萨加点奶酪吧！",
        swal: {
          X_gate: {
            title: "X 门",
            description_1: `X 门是量子计算中的基本量子门之一。<br>
            X 门会反转量子比特的状态。<br>
            在这个游戏中，X 门对应着<span class="emp">加入或去除奶酪的操作</span>。`,
            description_2: "连续两次应用 X 门会使量子比特恢复到原始状态。",
          },
        },
      },
      lv2: {
        instruction: "🍕让我们制作一款半份半份的披萨！",
        swal: {
          H_gate_1: {
            title: "H 门",
            description_1: `H 门是将量子比特置于叠加态的门。<br>
            你可以从一种披萨中制作<span class="emp">半份半份</span>的披萨。`,
            description_2:
              "连续两次应用 H 门会使量子比特恢复到原始状态，就像 X 门一样。",
          },
        },
      },
      lv3: {
        instruction: "🍕让我们制作一款四分之一的披萨！",
        swal: {
          H_gate_2: {
            title: "H 门 ②",
            description_1: "在 Lv2 中，您学到了 H 门可以制作半份半份的披萨。",
            description_2:
              "通过在上下两个位置都应用 H 门，您可以将披萨分成四份。",
          },
        },
      },
      lv4: {
        instruction: "让我们制作一款番茄🍅和罗勒🌿的半份半份披萨！",
        swal: {
          CX_gate: {
            title: "CNOT（CX）门",
            description_1: `
                CX 门是量子计算中非常重要的量子门。<br>
                CX：“↑”或 CX：“↓”会改变移动方式。<br><br>
                在 CX：“↑” 的情况下，白酱🥛和罗勒🌿 会交换。<br>
                在 CX：“↓” 的情况下，奶酪🧀和罗勒🌿 会交换。`,
            description_2: `首先，使用 H 门制作半份半份，然后使用适当的 CX 门交换配料。<br>`,
          },
          tips: {
            title: "提示💡",
            confirm_button_more_tips: "更多提示",
            cancel_button_back: "返回",
            description_1: `尝试使用新的<span class="emp">CX 门</span>！<br>
            量子门的<span class="emp">顺序</span>也很重要。`,
            description_2: `上方的 CX:↑ 门交换 <span class="emp">白酱🥛和罗勒🌿</span>，<br>
            下方的 CX:↓ 门交换 <span class="emp">奶酪🧀和罗勒🌿</span>。`,
            supplement: "（此提示将固定在屏幕上）",
          },
        },
        tips_display: {
          title: "提示💡",
          description_1: "CX↑: 白酱🥛 ↔︎ 罗勒🌿",
          description_2: "CX↓: 奶酪🧀 ↔︎ 罗勒🌿",
        },
      },
      congrats_page: {
        congrats_message: `恭喜您通过所有问题！<br>
              您是一个伟大的量子披萨大师！<br><br>
              感谢您的参与！😆`,
        button_back_home: "返回主页",
      },
    },
  },
};

// i18n.use(initReactI18next).init({
//   resources,
//   lng: "ja", // default language
//   fallbackLng: "ja",
//   interpolation: {
//     escapeValue: false,
//   },
// });

const savedLanguage = localStorage.getItem("language") || "ja"; // 保存された言語またはデフォルト

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // 保存された言語を初期値として設定
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
