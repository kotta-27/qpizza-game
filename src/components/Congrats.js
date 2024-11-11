import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Repeat, House } from "lucide-react";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";
import i18n from "../trans_resouces/trans_data";
import parse from "html-react-parser";
import "../stylesheets/Congrats.css";

const Congrats = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { t } = useTranslation();

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
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl border-2 border-white border-opacity-20 cong-container"
      >
        <motion.h1
          className="text-5xl font-bold text-white mb-6 text-center congrats-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Congratulations!🎉
        </motion.h1>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-xl text-white mb-8 text-center">
              {parse(t("congrats_page.congrats_message"))}
            </p>
            <div className="flex justify-center space-x-4">
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <House className="mr-2 w-10 h-7" />
                {t("congrats_page.button_back_home")}
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
