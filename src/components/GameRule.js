import React from "react";
import { Goal, Target, Gift, Gamepad2 } from "lucide-react";

const GameRule = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          このゲームのルール
        </h1>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Goal className="mr-2" />
            ゲームの目的
          </h2>
          <p className="mb-6">
            量子ゲートを使って、右上に表示されるお題のピザと同じ割合になるように調整しましょう。
          </p>

          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Gamepad2 className="mr-2" />
            プレイ方法
          </h2>

          <img
            src="./game_image.png"
            style={{
              width: "35  @%",
              // height: "230px",
              position: "absolute",
              right: "30px",
              top: "60px",
            }}
          />
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li>
              ボタンを押して、量子ゲートを追加して、ピザの割合を調整します。
            </li>
            <li>
              右上に表示されるお題のピザと一致するように調整してください。
            </li>
            <li>一致したら、次のレベルに進みます。</li>
          </ol>

          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Gift className="mr-2" />
            報酬
          </h2>
          <p className="mb-6">
            すべてのレベルをクリアすると、素敵な景品が待っているかもしれません...！
          </p>

          <div className="bg-yellow-400 text-gray-800 p-4 rounded-lg">
            <p className="font-semibold">ヒント：</p>
            <p>
              量子ゲートの種類や配置順序によって、確率分布が変化します。様々な組み合わせを試してみましょう！👀
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="./lv1"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            ゲームを始める
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameRule;
