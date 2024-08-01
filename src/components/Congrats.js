import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Repeat } from "lucide-react";
import confetti from "canvas-confetti";

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
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl w-full max-w-xl border-2 border-white border-opacity-20"
      >
        <motion.h1
          className="text-5xl font-bold text-white mb-6 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          おめでとう！🎉
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
            </p>
            <div className="flex justify-center space-x-4">
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <Repeat className="mr-2" />
                もう一度プレイ
              </motion.a>
              <motion.a
                href="/results"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <Award className="mr-2" />
                結果を見る
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
