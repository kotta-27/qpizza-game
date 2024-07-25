import React from "react";
import { Goal, Target, Gift, Gamepad2 } from "lucide-react";

const GameRule = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center leading-relaxed">
          このゲームのルール
        </h1>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl px-8 py-4 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
            <Goal className="mr-2 flex-shrink-0" />
            <span>
              ゲームの
              <ruby>
                目的<rt>もくてき</rt>
              </ruby>
            </span>
          </h2>
          <p className="mb-6 leading-relaxed">
            <ruby>
              量子<rt>りょうし</rt>
            </ruby>
            ゲートを
            <ruby>
              使<rt>つか</rt>
            </ruby>
            って、
            <ruby>
              右上<rt>みぎうえ</rt>
            </ruby>
            に
            <ruby>
              表示<rt>ひょうじ</rt>
            </ruby>
            されるお
            <ruby>
              題<rt>だい</rt>
            </ruby>
            のピザと
            <ruby>
              同<rt>おな</rt>
            </ruby>
            じ
            <ruby>
              割合<rt>わりあい</rt>
            </ruby>
            になるように
            <ruby>
              調整<rt>ちょうせい</rt>
            </ruby>
            しましょう。
          </p>

          <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
            <Gamepad2 className="mr-2 flex-shrink-0" />
            <span>
              プレイ
              <ruby>
                方法<rt>ほうほう</rt>
              </ruby>
            </span>
          </h2>

          <img
            src="./game_image_2.png"
            style={{
              width: "35%",
              position: "absolute",
              right: "30px",
              top: "60px",
            }}
            alt="Game Screenshot"
          />
          <ol className="list-decimal list-inside space-y-4 mb-6">
            <li className="leading-relaxed">
              ボタンを
              <ruby>
                押<rt>お</rt>
              </ruby>
              して、
              <ruby>
                量子<rt>りょうし</rt>
              </ruby>
              ゲートを
              <ruby>
                追加<rt>ついか</rt>
              </ruby>
              して、ピザの
              <ruby>
                割合<rt>わりあい</rt>
              </ruby>
              を
              <ruby>
                調整<rt>ちょうせい</rt>
              </ruby>
              します。
            </li>
            <li className="leading-relaxed">
              <ruby>
                右上<rt>みぎうえ</rt>
              </ruby>
              に
              <ruby>
                表示<rt>ひょうじ</rt>
              </ruby>
              されるお
              <ruby>
                題<rt>だい</rt>
              </ruby>
              のピザと
              <ruby>
                一致<rt>いっち</rt>
              </ruby>
              するように
              <ruby>
                調整<rt>ちょうせい</rt>
              </ruby>
              してください。
            </li>
            <li className="leading-relaxed">
              <ruby>
                一致<rt>いっち</rt>
              </ruby>
              したら、
              <ruby>
                次<rt>つぎ</rt>
              </ruby>
              のレベルに
              <ruby>
                進<rt>すす</rt>
              </ruby>
              みます。
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mb-4 flex items-center leading-relaxed">
            <Gift className="mr-2 flex-shrink-0" />
            <span>
              <ruby>
                報酬<rt>ほうしゅう</rt>
              </ruby>
            </span>
          </h2>
          <p className="mb-6 leading-relaxed">
            すべてのレベルをクリアすると、
            <ruby>
              素敵<rt>すてき</rt>
            </ruby>
            な
            <ruby>
              景品<rt>けいひん</rt>
            </ruby>
            が
            <ruby>
              待<rt>ま</rt>
            </ruby>
            っているかもしれません...！
          </p>

          <div className="bg-yellow-400 text-gray-800 p-4 rounded-lg">
            <p className="font-semibold mb-2">ヒント：</p>
            <p className="leading-relaxed">
              <ruby>
                量子<rt>りょうし</rt>
              </ruby>
              ゲートの
              <ruby>
                種類<rt>しゅるい</rt>
              </ruby>
              や
              <ruby>
                配置順序<rt>はいちじゅんじょ</rt>
              </ruby>
              によって、ピザの
              <ruby>
                割合<rt>わりあい</rt>
              </ruby>
              が
              <ruby>
                変化<rt>へんか</rt>
              </ruby>
              します。
              <ruby>
                様々<rt>さまざま</rt>
              </ruby>
              な
              <ruby>
                組<rt>く</rt>
              </ruby>
              み
              <ruby>
                合<rt>あ</rt>
              </ruby>
              わせを
              <ruby>
                試<rt>ため</rt>
              </ruby>
              してみましょう！👀
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="./lv1"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            ゲームを
            <ruby>
              始<rt>はじ</rt>
            </ruby>
            める
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameRule;
