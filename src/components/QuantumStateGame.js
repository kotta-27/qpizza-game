import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const quantumGates = ['H', 'X', 'Y', 'Z'];

const simulateQuantumState = (circuit, qubits) => {
  const stateCount = Math.pow(2, qubits);
  let state = Array(stateCount).fill(1 / Math.sqrt(stateCount));

  circuit.forEach(gate => {
    switch (gate) {
      case 'H':
        state = state.map(() => Math.random() < 0.5 ? 1 / Math.sqrt(2) : -1 / Math.sqrt(2));
        break;
      case 'X':
        state.reverse();
        break;
      case 'Y':
      case 'Z':
        state = state.map(s => -s);
        break;
    }
  });

  return state.map(amplitude => Math.pow(Math.abs(amplitude), 2));
};

const QuantumStateGame = () => {
  const [circuit, setCircuit] = useState([]);
  const [qubits, setQubits] = useState(2);
  const [probabilities, setProbabilities] = useState([]);
  const [characterPosition, setCharacterPosition] = useState(0);

  useEffect(() => {
    const probs = simulateQuantumState(circuit, qubits);
    setProbabilities(probs.map((prob, index) => ({ state: index.toString(2).padStart(qubits, '0'), probability: prob })));
  }, [circuit, qubits]);

  const addGate = (gate) => {
    setCircuit([...circuit, gate]);
  };

  const moveCharacter = (direction) => {
    setCharacterPosition((prev) => {
      const newPosition = prev + direction;
      return Math.max(0, Math.min(newPosition, probabilities.length - 1));
    });
  };

  const CustomBar = (props) => {
    const { x, y, width, height, index } = props;
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill="#8884d8" />
        {index === characterPosition && (
          <text x={x + width / 2} y={y - 10} textAnchor="middle" fill="#ff0000" fontSize="20">
            🚶
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">量子状態キャラクターゲーム</h1>
      <div className="mb-4">
        <label className="mr-2">量子ビット数:</label>
        <select value={qubits} onChange={(e) => setQubits(Number(e.target.value))} className="border p-1">
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        {quantumGates.map((gate) => (
          <button key={gate} onClick={() => addGate(gate)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded">
            {gate}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <button onClick={() => moveCharacter(-1)} className="mr-2 px-3 py-1 bg-green-500 text-white rounded">
          <ArrowLeft size={16} />
        </button>
        <button onClick={() => moveCharacter(1)} className="px-3 py-1 bg-green-500 text-white rounded">
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={probabilities}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="probability" shape={<CustomBar />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <p>現在の状態: {probabilities[characterPosition]?.state}</p>
        <p>確率: {(probabilities[characterPosition]?.probability * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default QuantumStateGame;
