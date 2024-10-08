import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Repeat, House } from "lucide-react";
import confetti from "canvas-confetti";
import "../stylesheets/Congrats.css";

const Congrats = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 500);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl w-full max-w-3xl border-2 border-white border-opacity-20"
      >
        <motion.h1
          className="text-5xl font-bold text-white mb-6 text-center congrats-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Congratslations！🎉
        </motion.h1>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-xl text-white mb-8 text-center">
              <ruby>
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
              <br></br> <br></br>
              <ruby>
                他<rt>ほか</rt>
              </ruby>
              にもさまざまなゲームやクイズがあるので、
              <ruby>
                色々<rt>いろいろ</rt>
              </ruby>
              <ruby>
                体験<rt>たいけん</rt>
              </ruby>
              してみてね！
              <br></br>
              プレイしてくださり、ありがとうございました！😆
            </p>
            <div className="flex justify-center space-x-4">
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <House className="mr-2 w-10 h-7" />
                ホームに戻る
              </motion.a>
            </div>
          </motion.div>
        )}
      </motion.div>
      <footer className="fixed-footer">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kota Mizuno. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Congrats;
