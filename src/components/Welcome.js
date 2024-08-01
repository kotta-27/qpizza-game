import React from "react";
import { ArrowRight, Book } from "lucide-react";
import { motion } from "framer-motion";
import "../stylesheets/Welcome.css";

const WelcomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      <div className="flex-grow flex items-center justify-center p-4 w-full max-w-3xl">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl w-full max-w-full border-2 border-white border-opacity-20">
          <h1 className="text-5xl font-bold text-white mb-6 flex items-center justify-center welcome-title">
            Welcome to Quantum Pizza! 🍕
          </h1>
          <p className="text-lg text-white mb-8 italic myRuby text-center ">
            <ruby>
              量<rt>りょう</rt>子<rt>し</rt>
            </ruby>
            ゲートを
            <ruby>
              使<rt>つか</rt>
            </ruby>
            って
            <ruby>
              理想<rt>りそう</rt>
            </ruby>
            のピザの
            <ruby>
              配分<rt>はいぶん</rt>
            </ruby>
            を
            <ruby>
              作<rt>つく</rt>
            </ruby>
            ろう！
          </p>
          <div className="space-y-4 flex flex-col items-center justify-center">
            <a
              href="./rule"
              className="block w-3/6 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-3 px-4 rounded-lg font-medium flex items-end justify-center "
            >
              ルールを
              <ruby>
                確認<rt>かくにん</rt>
              </ruby>
              する
              <Book className="ml-2" />
            </a>
            <a
              href="./lv1"
              className="block w-3/6 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-3 px-4 rounded-lg font-medium flex items-end justify-center"
            >
              <ruby>
                問題<rt>もんだい</rt>
              </ruby>
              へ
              <ruby>
                進<rt>すす</rt>
              </ruby>
              む
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
