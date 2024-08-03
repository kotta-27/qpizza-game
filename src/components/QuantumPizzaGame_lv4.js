import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./navbar";
import "../stylesheets/QuantumPizzaGame.css"; // Tailwind用のCSSに置き換えます
import { Pi, Pizza } from "lucide-react";

const TOPPINGS = [
  "🍅 マルゲリータ",
  "🧀 クワトロフォルマッジ",
  "🍄 ポルチーニ",
  "🍍 ハワイアン",
];

const T = "#D31727";
const C = "#FFCE56";
const B = "#60986C";
const W = "#FAF0ED";
const COLORS = [T, C, W, B];

const ANSWERS_4 = [50, 0, 0, 50];

const PizzaChart = ({ distribution, size, isAnswer }) => {
  const [animatedDistribution, setAnimatedDistribution] =
    useState(distribution);

  useEffect(() => {
    setAnimatedDistribution(distribution);
  }, [distribution]);

  let startAngle = 0;

  const createPizzaSlice = (startAngle, endAngle, color, index) => {
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const startX =
      size / 2 + (size / 2.2) * Math.cos((Math.PI * startAngle) / 180);
    const startY =
      size / 2 + (size / 2.2) * Math.sin((Math.PI * startAngle) / 180);
    const endX = size / 2 + (size / 2.2) * Math.cos((Math.PI * endAngle) / 180);
    const endY = size / 2 + (size / 2.2) * Math.sin((Math.PI * endAngle) / 180);

    return (
      <g key={index}>
        <motion.path
          d={`M ${size / 2} ${size / 2} L ${startX} ${startY} A ${size / 2.2} ${
            size / 2.2
          } 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
        />
        <motion.path
          d={`M ${size / 2} ${size / 2} L ${startX} ${startY} A ${size / 2.2} ${
            size / 2.2
          } 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
          fill="none"
          stroke="#8B4513"
          strokeWidth="0"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </g>
    );
  };

  const createTopping = (cx, cy, type, angle = 0) => {
    switch (type) {
      case "tomato":
        return <circle cx={cx} cy={cy} r={size / 18} fill="#FF6347" />;
      case "mushroom":
        return (
          <g>
            <circle cx={cx} cy={cy} r={size / 30} fill="#F5DEB3" />
            <path
              d={`M ${cx - size / 60} ${cy + size / 60} L ${cx} ${
                cy - size / 30
              } L ${cx + size / 60} ${cy + size / 60}`}
              stroke="#8B4513"
              strokeWidth="2"
              fill="none"
            />
          </g>
        );
      case "basil":
        return (
          <path
            d={`M ${cx} ${cy - size / 20} C ${cx + size / 30} ${
              cy - size / 30
            }, ${cx + size / 30} ${cy + size / 30}, ${cx} ${cy + size / 20} C ${
              cx - size / 30
            } ${cy + size / 30}, ${cx - size / 30} ${cy - size / 30}, ${cx} ${
              cy - size / 20
            }`}
            fill="#228B22"
            transform={`rotate(${angle}, ${cx}, ${cy})`}
          />
        );
      case "olive":
        return <circle cx={cx} cy={cy} r={size / 40} fill="#000000" />;
      case "cheese":
        return (
          <path
            d={`M ${cx - size / 30} ${cy - size / 30} L ${cx + size / 30} ${
              cy + size / 30
            } M ${cx - size / 30} ${cy + size / 30} L ${cx + size / 30} ${
              cy - size / 30
            }`}
            stroke="#FFD700"
            strokeWidth="3"
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ marginLeft: "25px", marginRight: "25px" }}
    >
      {isAnswer && (
        <rect
          x="0"
          y="0"
          width={size}
          height={size}
          fill="none"
          stroke="blue"
          strokeWidth="5"
        />
      )}
      {/* ピザの生地 */}
      <circle cx={size / 2} cy={size / 2} r={size / 2.2} fill="#F0E68C" />
      {/* トッピング */}
      <AnimatePresence initial={false}>
        {animatedDistribution.map((value, index) => {
          if (value === 0) return null;
          const angle = (value / 100.0) * 359.9999;
          const endAngle = startAngle + angle;
          const slice = createPizzaSlice(
            startAngle,
            endAngle,
            COLORS[index],
            index
          );
          startAngle = endAngle;
          return slice;
        })}
      </AnimatePresence>
      {/* ピザのエッジ（クラスト） */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2.2}
        fill="none"
        stroke="#E8B661"
        strokeWidth="10"
      />
      {/* 固定されたトッピング */}
      {createTopping(size * 0.3, size * 0.3, "tomato")}
      {createTopping(size * 0.5, size * 0.8, "tomato")}
      {createTopping(size * 0.8, size * 0.4, "tomato")}
      {createTopping(size * 0.3, size * 0.7, "tomato")}
      {createTopping(size * 0.6, size * 0.18, "tomato")}

      {createTopping(size * 0.7, size * 0.7, "basil", 30)}
      {createTopping(size * 0.2, size * 0.45, "basil", 0)}
      {createTopping(size * 0.6, size * 0.3, "basil", 45)}
      {createTopping(size * 0.4, size * 0.68, "basil", 79)}

      {createTopping(size * 0.6, size * 0.7, "olive")}
      {createTopping(size * 0.2, size * 0.6, "olive")}
      {createTopping(size * 0.5, size * 0.3, "olive")}

      {/* ピザの中央 */}
      <circle cx={size / 2} cy={size / 2} r={size / 7.33} fill="#FFF8DC" />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size / 5.5}
      >
        🍕
      </text>
    </motion.svg>
  );
};

const QuantumCircuit = ({ circuit, addGate, q_index }) => {
  var CNOT_str = "";
  if (q_index === 0) {
    CNOT_str = "↑";
  } else {
    CNOT_str = "↓";
  }
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addGate("CX")}
        >
          CX:{CNOT_str}
        </button>
      </div>
    </div>
  );
};

const DisplayCircuit = ({ circuits }) => {
  return (
    <div className="mt-4 w-3/6 flex flex-col items-center">
      <div className="flex flex-col space-y-2 w-full">
        {circuits.map((circuit, circuitIndex) => (
          <div
            key={circuitIndex}
            className="flex space-x-2 border p-2 rounded bg-white w-full h-14"
          >
            {circuit.map((gate, gateIndex) => {
              if (gate === "I") {
                return (
                  <div
                    key={gateIndex}
                    className="bg-white text-center py-1 px-2 rounded w-10"
                  >
                    {" "}
                  </div>
                );
              } else if (gate === "CX") {
                return (
                  <div
                    key={gateIndex}
                    className="bg-blue-200 text-center py-1 px-2 rounded border border-blue-400 w-10"
                  >
                    {gate}
                  </div>
                );
              } else if (gate === "CD") {
                return (
                  <div
                    key={gateIndex}
                    className="bg-blue-200 text-center py-1 px-2 rounded border border-blue-400 w-10"
                  >
                    {"・"}
                  </div>
                );
              } else {
                return (
                  <div
                    key={gateIndex}
                    className="bg-gray-200 text-center py-1 px-2 rounded border border-gray-300 w-10"
                  >
                    {gate}
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const QuantumPizzaGame_lv4 = () => {
  const [distribution, setDistribution] = useState([100, 0, 0, 0]);
  const [qstate, setQstate] = useState([1, 0, 0, 0]);
  const [inputs, setInputs] = useState([100, 0, 0, 0]);
  const [submitAnimation, setSubmitAnimation] = useState(false);
  const [circuit1, setCircuit1] = useState([]);
  const [circuit2, setCircuit2] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isHintShowed, setIsHintShowed] = useState(false);
  const [isHintConfirmed, setIsHintConfirmed] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = Number(value);
    setInputs(newInputs);
  };

  const calculateSize = () => {
    const baseSize = 220;
    const minSize = 100;
    const maxSize = 300;
    const scaleFactor = Math.min(windowSize.width, windowSize.height) / 1000;
    return Math.max(minSize, Math.min(maxSize, baseSize * scaleFactor));
  };

  const addGate1 = (gate) => {
    setCircuit1([...circuit1, gate]);
    if (gate === "CX") {
      setCircuit2([...circuit2, "CD"]);
    } else {
      setCircuit2([...circuit2, "I"]);
    }
  };

  const addGate2 = (gate) => {
    setCircuit2([...circuit2, gate]);
    if (gate === "CX") {
      setCircuit1([...circuit1, "CD"]);
    } else {
      setCircuit1([...circuit1, "I"]);
    }
  };

  const executeCircuit = (circuit1, circuit2) => {
    console.log("Circuit1: ", circuit1);
    console.log("Circuit2: ", circuit2);
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
      } else if (circuit1[i] === "CX") {
        newQstate = [newQstate[0], newQstate[1], newQstate[3], newQstate[2]];
      }

      if (circuit2[i] === "H") {
        const new0 = (newQstate[0] + newQstate[2]) / Math.sqrt(2);
        const new1 = (newQstate[1] + newQstate[3]) / Math.sqrt(2);
        const new2 = (newQstate[0] - newQstate[2]) / Math.sqrt(2);
        const new3 = (newQstate[1] - newQstate[3]) / Math.sqrt(2);
        newQstate = [new0, new1, new2, new3];
      } else if (circuit2[i] === "X") {
        newQstate = [newQstate[2], newQstate[3], newQstate[0], newQstate[1]];
      } else if (circuit2[i] === "CX") {
        newQstate = [newQstate[0], newQstate[3], newQstate[2], newQstate[1]];
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
    console.log("Qstate: ", qstate);
  }, [qstate, circuit1, circuit2]);

  const handleSubmit = () => {
    if (
      distribution[0] === ANSWERS_4[0] &&
      distribution[1] === ANSWERS_4[1] &&
      distribution[2] === ANSWERS_4[2] &&
      distribution[3] === ANSWERS_4[3]
    ) {
      Swal.fire({
        title: "すばらしい！！🎉",
        text: "正解です！",
        icon: "success",
        confirmButtonText: "進む",
        customClass: {
          container: "my-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "CNOT（CX）ゲート",
            html: `
            <div class="xgate-explanation">
              <hr >
              <p class="xgate-description">
                CNOTゲートは量子コンピューティングにおいてとても重要な量子ゲートです。<br>
                CNOT：「↑」かCNOT：「↓」かで動きが変わります。<br><br>
                CNOT：「↑」の場合、ホワイトソース🥛とバジル🌿を入れ替えます。
              </p>
              <div class="xgate-image-container" style="display: flex; justify-content: center;">
                <img src="/bell_image_1.png" alt="Xゲート" class="xgate-image" style="width: 60%; max-width: 100%; height: auto;" />
              </div>
            </div>

            <style>
              hr{
                border: 0;  
                border-top: 1px solid black;
                margin-bottom: 5px;
              }

            .xgate-description {
              text-align: center;
              margin-bottom: 20px;
              padding: 0 50px;
            }

            </style>
          `,
            confirmButtonText: "次へ",
            customClass: {
              container: "my-swal",
              popup: "my-swal-popup",
              title: "my-swal-title",
              htmlContainer: "my-swal-html",
              confirmButton: "my-swal-confirm-button",
            },
            // buttonsStyling: false,
            width: "70%",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "CNOT（CX）ゲート",
                html: `
                <div class="xgate-explanation">
                  <hr >
                  <p class="xgate-description">
                    CNOT：「↓」の場合、チーズ🧀とバジル🌿を入れ替えます。
                  </p>
                  <div class="xgate-image-container" style="display: flex; justify-content: center;">
                    <img src="/bell_image_2.png" alt="Xゲート" class="xgate-image" style="width: 70%; max-width: 100%; height: auto;" />
                  </div>
                </div>

                <style>
                hr{
                  border: 0;  
                  border-top: 1px solid black;
                  margin-bottom: 5px;
                }

                .xgate-description {
                  text-align: center;
                  margin-bottom: 20px;
                }
                </style>
              `,
                confirmButtonText: "進む",
                customClass: {
                  container: "my-swal",
                  popup: "my-swal-popup",
                  title: "my-swal-title",
                  htmlContainer: "my-swal-html",
                  confirmButton: "my-swal-confirm-button-next",
                },
                // buttonsStyling: false,
                width: "70%",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/congrats");
                }
              });
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: "惜しい！",
        text: "まだ正解ではありません。もう一度試してみましょう！",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          container: "my-swal",
          confirmButton: "fwb",
        },
      });
    }
  };

  const handleHint = () => {
    Swal.fire({
      title: "ヒント💡",
      html: `
      <p> 
        新しく登場した<span class="emp">CNOTゲート</span>を使ってみましょう！<br>
        <span class="emp">量子ゲートの順番</span>も大切です。
      </p>

      <style>
        .emp {
            font-weight: bold;
        }
      </style>  
      `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "戻る",
      confirmButtonText: "さらにヒントを見る",
      confirmButtonColor: "#33dd33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
      customClass: {
        cancelButton: "fwb",
        confirmButton: "fwb",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsHintShowed(true);
        Swal.fire({
          title: "ヒント💡",
          html: `
          <p> 
            上のCNOT:↑ゲートは，<span class="emp">ホワイトソース🥛とバジル🌿</span>、<br>
            下のCNOT:↓ゲートは，<span class="emp">チーズ🧀とバジル🌿</span> <br>
            を入れ替えます。
          </p>
    
          <style>
            .emp {
                font-weight: bold;
            }
          </style>  
          `,
          icon: "warning",

          confirmButtonText: "OK",
          confirmButtonColor: "#33dd33",
          customClass: {
            confirmButton: "fwb",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setIsHintConfirmed(true);
          }
        });
      }
    });
  };

  const handleReset = () => {
    Swal.fire({
      title: "リセットしますか？",
      text: "現在の進行状況が失われます。",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "リセット",
      cancelButtonText: "キャンセル",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
      customClass: {
        cancelButton: "fwb",
        confirmButton: "fwb",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  const dynamicSize = calculateSize();

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      {isCorrect && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">
              おめでとうございます！🎉
            </h2>
            <p className="text-lg">正解！次のレベルに進もう！</p>
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
        } flex flex-col items-center p-4 bg-yellow-100 min-h-screen-minus-16`}
      >
        {!isCorrect && (
          <>
            <h1 className="text-4xl font-bold mb-4">🍕 Quantum Pizza Lv.4</h1>
            <p className="text-lg mb-4 font-bold">
              トマト🍅とバジル🌿のハーフ&ハーフピザを作ってみよう！
            </p>
            <div className="flex items-center justify-center mb-4 w-full">
              {isHintShowed && isHintConfirmed && (
                <p className="text-sm text-red-500 font-bold py-2 flex-end w-1/3"></p>
              )}
              <PizzaChart
                distribution={distribution}
                size={dynamicSize}
                isAnswer={false}
              />
              <PizzaChart
                distribution={ANSWERS_4}
                size={dynamicSize}
                isAnswer={true}
              />
              {isHintShowed && isHintConfirmed && (
                <p className="text-xl text-gray-700 font-bold  flex-end w-1/3 bg-white p-5 flex justify-center">
                  CX↑： ホワイトソース🥛 ↔︎ バジル🌿<br></br>
                  CX↓： チーズ🧀 ↔︎ バジル🌿
                </p>
              )}
            </div>
            <div className="flex flex-col items-center">
              <QuantumCircuit
                circuit={circuit1}
                addGate={addGate1}
                q_index={0}
              />
              <QuantumCircuit
                circuit={circuit2}
                addGate={addGate2}
                q_index={1}
              />
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleReset}
              >
                RESET
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
                onClick={handleHint}
              >
                ヒント
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                提出
              </button>
            </div>
            <h3 className="text-lg font-bold mt-5">量子回路</h3>
            <div className="circuit-list-container">
              <DisplayCircuit circuits={[circuit1]} />
              <DisplayCircuit circuits={[circuit2]} />
            </div>
          </>
        )}
      </div>
      <footer className="fixed-footer">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kota Mizuno. All rights reserved.
        </p>
      </footer>
    </DndProvider>
  );
};

export default QuantumPizzaGame_lv4;
