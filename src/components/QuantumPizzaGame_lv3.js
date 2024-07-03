import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "../stylesheets/QuantumPizzaGame.css"; // Tailwind用のCSSに置き換えます

const TOPPINGS = [
  "🍅 マルゲリータ",
  "🧀 クワトロフォルマッジ",
  "🍄 ポルチーニ",
  "🍍 ハワイアン",
];
const COLORS = ["#FF6384", "#FFCE56", "#36A2EB", "#4BC0C0"];

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
      <h3 className="text-lg font-bold mb-2">量子回路</h3>
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

const QuantumPizzaGame_lv3 = () => {
  const [distribution, setDistribution] = useState([100, 0, 0, 0]);
  const [qstate, setQstate] = useState([1, 0, 0, 0]);
  const [inputs, setInputs] = useState([100, 0, 0, 0]);
  const [submitAnimation, setSubmitAnimation] = useState(false);
  const [circuit1, setCircuit1] = useState([]);
  const [circuit2, setCircuit2] = useState([]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = Number(value);
    setInputs(newInputs);
  };

  const addGate1 = (gate) => {
    setCircuit1([...circuit1, gate]);
  };

  const addGate2 = (gate) => {
    setCircuit2([...circuit2, gate]);
  };

  const executeCircuit = (circuit1, circuit2) => {
    let newQstate = [1, 0, 0, 0];
    for (let i = 0; i < circuit1.length; i++) {
      if (circuit1[i] === "H") {
        const new0 = (newQstate[0] + newQstate[1]) / Math.sqrt(2);
        const new1 = (newQstate[0] - newQstate[1]) / Math.sqrt(2);
        const new2 = (newQstate[2] + newQstate[3]) / Math.sqrt(2);
        const new3 = (newQstate[2] - newQstate[3]) / Math.sqrt(2);

        newQstate = [new0, new1, new2, new3];
      } else if (circuit1[i] === "X") {
        newQstate = [newQstate[1], newQstate[0], newQstate[3], newQstate[2]];
      } else if (circuit1[i] === "I") {
        continue;
      }
    }
    for (let i = 0; i < circuit2.length; i++) {
      if (circuit2[i] === "H") {
        const new0 = (newQstate[0] + newQstate[2]) / Math.sqrt(2);
        const new1 = (newQstate[1] + newQstate[3]) / Math.sqrt(2);
        const new2 = (newQstate[0] - newQstate[2]) / Math.sqrt(2);
        const new3 = (newQstate[1] - newQstate[3]) / Math.sqrt(2);
        newQstate = [new0, new1, new2, new3];
      } else if (circuit2[i] === "X") {
        newQstate = [newQstate[2], newQstate[3], newQstate[0], newQstate[1]];
      } else if (circuit2[i] === "I") {
        continue;
      }
    }
    setQstate(newQstate);
  };

  const calculateDistribution = (qstate) => {
    return qstate.map((value) => Math.round(Math.pow(value, 2) * 100));
  };

  useEffect(() => {
    executeCircuit(circuit1, circuit2);
  }, [circuit1, circuit2]);

  useEffect(() => {
    const newDistribution = calculateDistribution(qstate);
    setDistribution(newDistribution);
  }, [qstate, circuit1, circuit2]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      <div
        className="flex flex-col items-center p-4 bg-yellow-100 min-h-screen m-2"
        style={{ textAlign: "center" }}
      >
        <h1 className="text-4xl font-bold mb-4">🍕 Quantum Pizza</h1>
        <p className="text-lg mb-4">🍕 理想のピザの配分にしよう！</p>
        <div className="flex items-center justify-center mb-4">
          <PizzaChart distribution={distribution} />
          <img className="w-56 h-56 ml-4" src="/ans2.png" alt="正解画像" />
        </div>
        <div className="flex flex-col items-center">
          <QuantumCircuit circuit={circuit1} addGate={addGate1} />
          <QuantumCircuit circuit={circuit2} addGate={addGate2} />
        </div>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          RESET
        </button>
        <DisplayCircuit circuits={[circuit1, circuit2]} />
      </div>
    </DndProvider>
  );
};

export default QuantumPizzaGame_lv3;
