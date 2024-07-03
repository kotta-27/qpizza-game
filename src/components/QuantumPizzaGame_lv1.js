import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "../stylesheets/QuantumPizzaGame.css"; // こちらはTailwind用のCSSに置き換えます

const TOPPINGS = [
  "🍅 マルゲリータ",
  "🧀 クワトロフォルマッジ",
  "🍄 ポルチーニ",
  "🍍 ハワイアン",
];
const COLORS = ["#FF6384", "#FFCE56", "#36A2EB", "#4BC0C0"];
const ANSWERS_1 = [0, 100];

const PizzaChart = ({ distribution }) => {
  const [animatedDistribution, setAnimatedDistribution] =
    useState(distribution);

  useEffect(() => {
    setAnimatedDistribution(distribution);
  }, [distribution]);

  console.log(animatedDistribution);

  let startAngle = 0;

  return (
    <motion.svg width="220" height="220" viewBox="0 0 220 220">
      <circle cx="110" cy="110" r="100" fill="#FFF8DC" />
      <AnimatePresence initial={false}>
        {animatedDistribution.map((value, index) => {
          if (value === 0) return null;
          const angle = (value / 100.0) * 359.9999;
          const endAngle = startAngle + angle;
          const largeArcFlag = angle > 180 ? 1 : 0;
          const startX = 110 + 100 * Math.cos((Math.PI * startAngle) / 180);
          const startY = 110 + 100 * Math.sin((Math.PI * startAngle) / 180);
          const endX = 110 + 100 * Math.cos((Math.PI * endAngle) / 180);
          const endY = 110 + 100 * Math.sin((Math.PI * endAngle) / 180);

          const pathData = [
            `M 110 110`,
            `L ${startX} ${startY}`,
            `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            "Z",
          ].join(" ");

          startAngle = endAngle;

          return (
            <motion.path
              key={index}
              d={pathData}
              fill={COLORS[index]}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            />
          );
        })}
      </AnimatePresence>
      <circle cx="110" cy="110" r="30" fill="#FFF8DC" />
      <text
        x="110"
        y="110"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="40"
      >
        🍕
      </text>
    </motion.svg>
  );
};

const QuantumCircuit = ({ circuit, addGate }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addGate("H")}
        >
          H
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addGate("X")}
        >
          X
        </button>
      </div>
    </div>
  );
};

const DisplayCircuit = ({ circuits }) => {
  return (
    <div className="mt-4 w-3/6 flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2 ">量子回路</h3>
      <div className="flex flex-col space-y-2 w-full">
        {circuits.map((circuit, index) => (
          <div
            key={index}
            className="flex space-x-2 border p-2 rounded bg-white w-full"
          >
            {circuit.map((gate, index) => (
              <div
                key={index}
                className="bg-gray-200 text-center py-1 px-2 rounded"
              >
                {gate}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const QuantumPizzaGame_lv1 = () => {
  const [distribution, setDistribution] = useState([100, 0]);
  const [qstate, setQstate] = useState([1, 0]);
  const [submitAnimation, setSubmitAnimation] = useState(false);
  const [circuit1, setCircuit1] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // 正解条件の判定を行う
    if (distribution[0] === ANSWERS_1[0] && distribution[1] === ANSWERS_1[1]) {
      // 正解時の処理：2秒後に正解画面を表示
      setTimeout(() => {
        setIsCorrect(true);
      }, 2000);
    } else {
      setIsCorrect(false);
    }
  }, [distribution]);

  const addGate1 = (gate) => {
    setCircuit1([...circuit1, gate]);
  };

  const executeCircuit = (circuit1) => {
    let newQstate = [1, 0];
    for (let i = 0; i < circuit1.length; i++) {
      if (circuit1[i] === "H") {
        const new0 = (newQstate[0] + newQstate[1]) / Math.sqrt(2);
        const new1 = (newQstate[0] - newQstate[1]) / Math.sqrt(2);
        newQstate = [new0, new1];
      } else if (circuit1[i] === "X") {
        newQstate = [newQstate[1], newQstate[0]];
      } else if (circuit1[i] === "I") {
        continue;
      }
    }

    setQstate(newQstate);
  };

  const calculateDistribution = (qstate) => {
    return qstate.map((value) => Math.round(Math.pow(value, 2) * 100));
  };

  useEffect(() => {
    executeCircuit(circuit1);
  }, [circuit1]);

  useEffect(() => {
    const newDistribution = calculateDistribution(qstate);
    setDistribution(newDistribution);
  }, [qstate, circuit1]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      {isCorrect && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">おめでとうございます！🎉</h2>
            <p className="text-lg">正解です！次のレベルに進みましょう。</p>
            <Link to="/lv2">
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                次へ
              </button>
            </Link>
          </div>
        </div>
      )}
      <div
        className={`${
          isCorrect ? "blur-sm" : ""
        } flex flex-col items-center p-4 bg-yellow-100  min-h-screen-minus-16 `}
      >
        {!isCorrect && (
          <>
            <h1 className="text-4xl font-bold mb-4">🍕 Quantum Pizza Lv.1</h1>
            <p className="text-lg mb-4">🍕 理想のピザの配分にしよう！</p>
            <div className="flex items-center justify-center mb-4">
              <PizzaChart distribution={distribution} />
              <img
                className="w-56 h-56 ml-4 border border-blue-500"
                src="/ans1.png"
                alt="正解画像"
              />
            </div>
            <div className="flex flex-col items-center">
              <QuantumCircuit circuit={circuit1} addGate={addGate1} />
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              RESET
            </button>
            <DisplayCircuit circuits={[circuit1]} />
          </>
        )}
      </div>
      {/* <footer className=" w-full bg-black bg-opacity-50 text-white text-center py-2 px-4 mu-10-"> */}
      <footer className="fixed-footer">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kota Mizuno. All rights reserved.
        </p>
      </footer>
    </DndProvider>
  );
};

export default QuantumPizzaGame_lv1;
