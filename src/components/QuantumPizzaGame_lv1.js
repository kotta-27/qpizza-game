import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./navbar";
import "../stylesheets/QuantumPizzaGame.css";

const TOPPINGS = [
  "🍅 マルゲリータ",
  "🧀 クワトロフォルマッジ",
  "🍄 ポルチーニ",
  "🍍 ハワイアン",
];
const COLORS = ["#D31727", "#FFCE56", "#36A2EB", "#4BC0C0"];
const ANSWERS_1 = [0, 100];

const PizzaChart = ({ distribution, size }) => {
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

  const createTopping = (cx, cy, type) => {
    switch (type) {
      case "tomato":
        return <circle cx={cx} cy={cy} r={size / 25} fill="#FF6347" />;
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
    <motion.svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* ピザの生地 */}
      <circle cx={size / 2} cy={size / 2} r={size / 2.2} fill="#F0E68C" />
      {/* トッピング */}
      <AnimatePresence initial={false}>
        {animatedDistribution.map((value, index) => {
          if (value === 0) return null;
          const angle = (value / 100.0) * 359.99999;
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

      {/* 固定されたトッピング
      {createTopping(size * 0.3, size * 0.3, "tomato")}
      {createTopping(size * 0.7, size * 0.3, "mushroom")}
      {createTopping(size * 0.5, size * 0.5, "olive")}
      {createTopping(size * 0.4, size * 0.7, "cheese")}
      {createTopping(size * 0.6, size * 0.7, "tomato")}
      {createTopping(size * 0.8, size * 0.8, "mushroom")}
      {createTopping(size * 0.2, size * 0.6, "olive")}
      {createTopping(size * 0.8, size * 0.5, "cheese")} */}

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

const QuantumCircuit = ({ circuit, addGate }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 mb-4">
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addGate("H")}
        >
          H
        </button> */}
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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateSize = () => {
    const baseSize = 220;
    const minSize = 100;
    const maxSize = 300;
    const scaleFactor = Math.min(windowSize.width, windowSize.height) / 1000;
    return Math.max(minSize, Math.min(maxSize, baseSize * scaleFactor));
  };

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

  const handleSubmit = () => {
    if (distribution[0] === ANSWERS_1[0] && distribution[1] === ANSWERS_1[1]) {
      Swal.fire({
        title: "すばらしい！！🎉",
        text: "正解です！次のレベルに進みましょう！",
        icon: "success",
        confirmButtonText: "進む",
        customClass: {
          container: "my-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Xゲート",
            html: `
            <div class="xgate-explanation">
              <p class="xgate-description">Xゲートは量子コンピューティングにおける基本的な量子ゲートの一つで、古典コンピューティングのNOTゲートに相当します。</p>
              <p class="xgate-description">Xゲートは、量子ビットの状態を反転させる効果があります。</p>
              <p class="xgate-description">今回のゲームでは、<span class="emp">チーズを乗せたり抜いたりする操作</span>に対応します。</p>
              <div class="xgate-image-container" style="display: flex; justify-content: center;">
                <img src="/xgate_image_1.png" alt="Xゲート" class="xgate-image" style="width: 50%; max-width: 100%; height: auto;" />
              </div>
            </div>

            <style>
            .xgate-description {
              color: black;
              text-align: center;
              margin-bottom: 20px;
              padding: 0 50px;
            }

            .emp {
              font-weight: bold;
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
                title: "Xゲート",
                html: `
                <div class="xgate-explanation">
                  <p class="xgate-description">Xゲートは、2回かけると元の状態に戻ります。</p>
                  <div class="xgate-image-container" style="display: flex; justify-content: center;">
                    <img src="/xgate_image_2.png" alt="Xゲート" class="xgate-image" style="width: 70%; max-width: 100%; height: auto;" />
                  </div>
                </div>
                <style>
                .xgate-description {
                  color: black;
                  text-align: center;
                  margin-bottom: 20px;
                }
                </style>
              `,
                showCancelButton: true,
                confirmButtonText: "次の問題へ進む",
                cancelButtonText: "キャンセル",
                customClass: {
                  container: "my-swal",
                  popup: "my-swal-popup",
                  title: "my-swal-title",
                  htmlContainer: "my-swal-html",
                  confirmButton: "my-swal-confirm-button-next",
                  cancelButton: "my-swal-cancel-button",
                },
                // buttonsStyling: false,
                width: "70%",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/lv2");
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
        },
      });
    }
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
            <h1 className="text-4xl font-bold mb-4">🍕 Quantum Pizza Lv.1</h1>
            <p className="tect-lg mb-4 font-bold">
              🍕ピザにチーズをトッピングしてみよう！
            </p>
            <div className="flex items-center justify-center mb-4">
              <PizzaChart distribution={distribution} size={dynamicSize} />
              <img
                className="ml-4 border border-blue-500"
                src="/ans1.png"
                alt="正解画像"
                style={{ width: dynamicSize, height: dynamicSize }}
              />
            </div>
            <div className="flex flex-col items-center">
              <QuantumCircuit circuit={circuit1} addGate={addGate1} />
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleReset}
              >
                RESET
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                提出
              </button>
            </div>
            <DisplayCircuit circuits={[circuit1]} />
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

export default QuantumPizzaGame_lv1;
