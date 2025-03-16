import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./navbar";
import { useTranslation } from "react-i18next";
import i18n from "../trans_resouces/trans_data";
import "../stylesheets/QuantumPizzaGame.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const T = "#D31727";
const C = "#FFCE56";
const B = "#60986C";
const W = "#FAF0ED";
const COLORS = [T, C, W, B];

const ANSWERS_2 = [50, 50];

const PizzaChart = ({ distribution, size, isAnswer, isMeasuring, onMeasurementComplete }) => {
  const [animatedDistribution, setAnimatedDistribution] = useState(distribution);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [measurementResult, setMeasurementResult] = useState(null);
  const spinnerRef = useRef(null);

  useEffect(() => {
    setAnimatedDistribution(distribution);
  }, [distribution]);

  useEffect(() => {
    if (isMeasuring) {
      startSpinAnimation();
    }
  }, [isMeasuring]);

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
          d={`M ${size / 2} ${size / 2} L ${startX} ${startY} A ${size / 2.2} ${size / 2.2
            } 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
        />
        <motion.path
          d={`M ${size / 2} ${size / 2} L ${startX} ${startY} A ${size / 2.2} ${size / 2.2
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
              d={`M ${cx - size / 60} ${cy + size / 60} L ${cx} ${cy - size / 30
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
            d={`M ${cx} ${cy - size / 20} C ${cx + size / 30} ${cy - size / 30
              }, ${cx + size / 30} ${cy + size / 30}, ${cx} ${cy + size / 20} C ${cx - size / 30
              } ${cy + size / 30}, ${cx - size / 30} ${cy - size / 30}, ${cx} ${cy - size / 20
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
            d={`M ${cx - size / 30} ${cy - size / 30} L ${cx + size / 30} ${cy + size / 30
              } M ${cx - size / 30} ${cy + size / 30} L ${cx + size / 30} ${cy - size / 30
              }`}
            stroke="#FFD700"
            strokeWidth="3"
          />
        );
      default:
        return null;
    }
  };

  const startSpinAnimation = () => {
    let startTime;
    let currentRotation = 0;
    const totalDuration = 3000; // 3秒間
    const initialSpeed = 4000; // 初期速度（度/秒）

    const spin = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < totalDuration) {
        // イージング関数を使用して徐々に減速
        const easeOut = 1 - Math.pow(1 - progress / totalDuration, 3);
        const currentSpeed = initialSpeed * (1 - easeOut);
        currentRotation += currentSpeed / 60; // 60FPSを想定

        setRotationAngle(currentRotation % 360);
        requestAnimationFrame(spin);
      } else {
        // 測定完了時の処理
        const finalAngle = currentRotation % 360;
        const result = determineMeasurementResult(finalAngle, distribution);
        setMeasurementResult(result);
        if (onMeasurementComplete) {
          onMeasurementComplete(result);
        }
      }
    };

    requestAnimationFrame(spin);
  };

  const determineMeasurementResult = (angle, distribution) => {
    // 確率に基づいて結果を決定
    const random = Math.random() * 100;
    let accumulator = 0;

    for (let i = 0; i < distribution.length; i++) {
      accumulator += distribution[i];
      if (random <= accumulator) {
        return i;
      }
    }
    return 0;
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
      <g transform={`rotate(${rotationAngle}, ${size / 2}, ${size / 2})`}>
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
      </g>
      {/* 測定の針 */}
      {/* <line
        x1={size / 2}
        y1={0}
        x2={size / 2}
        y2={size / 10}
        stroke="red"
        strokeWidth="4"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="red" />
        </marker>
      </defs> */}
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

const DisplayCircuit = ({ circuits, isMobile }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`mt-4 ${isMobile ? "w-5/6" : "w-3/6"
        } flex flex-col items-center`}
    >
      <h3 className="text-lg font-bold mb-2 ">
        {t("problem_common.quantum_circuit")}
      </h3>
      <div className="flex flex-col space-y-2 w-full">
        {circuits.map((circuit, index) => (
          <div
            key={index}
            className="flex border p-2 rounded bg-white w-full h-14 gate-container"
          >
            {circuit.map((gate, index) => (
              <div className="flex">
                <div
                  key={index}
                  className={`${gate == "H" ? "circuit-h-gate" : "circuit-x-gate"
                    }`}
                >
                  {gate}
                </div>
                <div className="circuit-gate-block"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const DisplayMeasurements = ({ measurements, isMobile }) => {
  const { t } = useTranslation();
  return (
    <div className={`mt-4 ${isMobile ? "w-5/6" : "w-3/6"} flex flex-col items-center`}>
      <h3 className="text-lg font-bold mb-2">
        {t("problem_common.measurement_results")}
      </h3>
      <div className="flex flex-wrap gap-2 w-full max-h-40 overflow-y-auto p-2">
        {measurements.map((result, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white rounded px-3 py-2 shadow-sm"
            style={{ minWidth: "120px" }}
          >
            <span className="font-mono text-sm">測定 #{index + 1}:</span>
            <span className="font-bold ml-2">{`|${result}⟩`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProbabilityChart = ({ distribution, size }) => {
  const { t } = useTranslation();
  const data = {
    labels: ['|0⟩', '|1⟩'],
    datasets: [
      {
        label: '確率分布',
        data: distribution,
        backgroundColor: [
          'rgba(211, 23, 39, 0.7)',   // トマトソース色
          'rgba(255, 206, 86, 0.7)',  // チーズ色
        ],
        borderColor: [
          'rgba(211, 23, 39, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t("problem_common.probability_distribution"),
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div style={{ width: size, height: size }}>
      <Bar data={data} options={options} />
    </div>
  );
};

const QuantumPizzaGame_lv2 = () => {
  const [distribution, setDistribution] = useState([100, 0]);
  const [qstate, setQstate] = useState([1, 0]);
  const [submitAnimation, setSubmitAnimation] = useState(false);
  const [circuit1, setCircuit1] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(windowSize.width < 640);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurementResult, setMeasurementResult] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [showGraph, setShowGraph] = useState(
    localStorage.getItem("showGraph") === "true"
  );

  const { t } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ja"
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setLanguage(lng);
  };

  const handleShowGraphChange = (show) => {
    setShowGraph(show);
    localStorage.setItem("showGraph", show);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMobile(window.innerWidth <= 640);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateSize = () => {
    const baseSize = 220;
    const minSize = 150;
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
    if (distribution[0] === ANSWERS_2[0] && distribution[1] === ANSWERS_2[1]) {
      const imageWidth_1 = isMobile ? "100%" : "50%";
      const imageWidth_2 = isMobile ? "100%" : "70%";
      Swal.fire({
        title: t("problem_common.swal.confirm.correct_title"),
        text: t("problem_common.swal.confirm.correct_message"),
        icon: "success",
        confirmButtonText: t("problem_common.swal.confirm.confirm_button_next"),
        customClass: {
          container: `my-swal  ${language === "zh" ? "zh" : ""}`,
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: t("lv2.swal.H_gate_1.title"),
            html: `
            <div class="xgate-explanation">
              <hr />
              <p class="xgate-description">
                ${t("lv2.swal.H_gate_1.description_1")}
              </p>
              <div class="xgate-image-container" style="display: flex; justify-content: center;">
                <img src="/hgate_image_1.png" alt="Xゲート" class="xgate-image" style="width: ${imageWidth_1}; max-width: 100%; height: auto;" />
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
              padding: 0 5px;
              line-height: 1.8;
            }

            .emp{
              font-weight: bold;
            }
            </style>
          `,
            confirmButtonText: t(
              "problem_common.swal.confirm.confirm_button_next"
            ),
            customClass: {
              container: `my-swal  ${language === "zh" ? "zh" : ""}`,
              popup: "my-swal-popup",
              title: "my-swal-title",
              htmlContainer: "my-swal-html",
              confirmButton: "my-swal-confirm-button",
            },
            width: isMobile ? "100%" : "70%",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: t("lv2.swal.H_gate_1.title"),
                html: `
                <div class="xgate-explanation">
                  <p class="xgate-description">
                    ${t("lv2.swal.H_gate_1.description_2")}
                  </p>
                  <div class="xgate-image-container" style="display: flex; justify-content: center;">
                    <img src="/hgate_image_2.png" alt="Xゲート" class="xgate-image" style="width: ${imageWidth_2}; max-width: 100%; height: auto;" />
                  </div>
                </div>
                <style>
                .xgate-description {
                  text-align: center;
                  margin-bottom: 20px;
                }
                </style>
              `,
                showCancelButton: true,
                confirmButtonText: t(
                  "problem_common.swal.confirm.confirm_button_next_level"
                ),
                cancelButtonText: t(
                  "problem_common.swal.confirm.cancel_button"
                ),
                customClass: {
                  container: `my-swal  ${language === "zh" ? "zh" : ""}`,
                  popup: "my-swal-popup",
                  title: "my-swal-title",
                  htmlContainer: "my-swal-html",
                  confirmButton: "my-swal-confirm-button-next",
                  cancelButton: "my-swal-cancel-button",
                },
                width: isMobile ? "100%" : "70%",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/lv3");
                }
              });
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: t("problem_common.swal.confirm.incorrect_title"),
        text: t("problem_common.swal.confirm.incorrect_message"),
        icon: "error",
        confirmButtonText: t("problem_common.swal.confirm.confirm_button_ok"),
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const handleReset = () => {
    Swal.fire({
      title: t("problem_common.swal.reset.title"),
      text: t("problem_common.swal.reset.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("problem_common.swal.reset.reset_button"),
      cancelButtonText: t("problem_common.swal.reset.cancel_button"),
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
      customClass: {
        title: `reset-title ${language === "zh" ? "zh" : ""}`,
        container: `reset-text ${language === "zh" ? "zh" : ""}`,
        confirmButton: `reset-button ${language === "zh" ? "zh" : ""}`,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  const handleMeasure = () => {
    setIsMeasuring(true);
  };

  const handleMeasurementComplete = (result) => {
    setIsMeasuring(false);
    setMeasurementResult(result);
    // 測定結果をリストに追加
    setMeasurements(prev => [...prev, result]);
    // ピザの状態は変更しない
  };

  const dynamicSize = calculateSize();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`flex ${isMobile ? "flex-col" : ""}`}>
        <Navbar />
      </div>
      <div className={`${isCorrect ? "blur-sm" : ""} flex flex-col items-center p-4 bg-yellow-100 min-h-screen-minus-16`}>
        {!isCorrect && (
          <>
            <div className="absolute top-20 left-4 z-10">
              <div className="flex items-center mx-auto">
                <div className="text-sm w-full text-center">{t("problem_common.graph_display")}</div>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={showGraph}
                    onChange={(e) => handleShowGraphChange(e.target.checked)}
                  />
                  <div className="flex items-center bg-white w-48 h-10 rounded-full shadow-md p-1">
                    <div
                      className={`flex items-center justify-center w-24 h-8 rounded-full transition-all duration-300 ${showGraph ? 'ml-24 bg-blue-500 text-white' : 'ml-0 bg-gray-200 text-gray-700'
                        }`}
                    >
                      <span className="text-sm font-medium">
                        {showGraph ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    <div className="absolute w-full flex justify-between px-3 pointer-events-none text-sm font-medium">
                      <span className={`${showGraph ? 'text-gray-700' : 'text-transparent'}`}></span>
                      <span className={`${showGraph ? 'text-transparent' : 'text-gray-700'}`}></span>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <h1 className="text-4xl font-bold mb-4">🍕 Quantum Pizza Lv.2</h1>
            <p className="text-lg mb-4 font-bold">{t("lv2.instruction")}</p>
            <div className="flex items-center justify-center mb-4 Pizza-chart-container">
              <PizzaChart
                distribution={distribution}
                size={dynamicSize}
                isAnswer={false}
                isMeasuring={isMeasuring}
                onMeasurementComplete={handleMeasurementComplete}
              />
              {showGraph && (
                <ProbabilityChart
                  distribution={distribution}
                  size={dynamicSize}
                />
              )}
              <PizzaChart
                distribution={ANSWERS_2}
                size={dynamicSize}
                isAnswer={true}
              />
            </div>
            <div className="flex flex-col items-center">
              <QuantumCircuit circuit={circuit1} addGate={addGate1} />
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded reset-button
                  ${language === "zh" ? "zh" : ""}`}
                onClick={handleReset}
              >
                {t("problem_common.reset_button")}
              </button>
              {/* <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleMeasure}
                disabled={isMeasuring}
              >
                {t("problem_common.measure_button")}
              </button> */}
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                {t("problem_common.submit_button")}
              </button>
            </div>
            <div className="flex flex-col items-center w-full max-w-4xl mt-4">
              <div className="circuit-list-container">
                <DisplayCircuit circuits={[circuit1]} isMobile={isMobile} />
              </div>
              <div className="w-full mt-4">
                {measurements.length > 0 && (
                  <div className="w-full mt-4">
                    <DisplayMeasurements measurements={measurements} isMobile={isMobile} />
                  </div>
                )}
              </div>
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

export default QuantumPizzaGame_lv2;
