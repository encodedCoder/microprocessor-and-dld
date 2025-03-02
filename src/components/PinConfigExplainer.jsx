"use client";

import React, { useState } from "react";

const PinConfigurationExplainer = () => {
  const [slewRate, setSlewRate] = useState(true);
  const [edgeDetection, setEdgeDetection] = useState(1); // 1 = rising edge (001)

  // Calculate the PIN7CTRL register value
  const calculateRegisterValue = () => {
    let value = 0;
    if (slewRate) value |= 1 << 7;
    value |= edgeDetection & 0x7;
    return value;
  };

  // Format a number as binary with padded zeros
  const toBinary = (num, length = 8) => {
    return num.toString(2).padStart(length, "0");
  };

  // Format a number as hexadecimal
  const toHex = (num) => {
    return "0x" + num.toString(16).toUpperCase().padStart(2, "0");
  };

  const registerValue = calculateRegisterValue();

  return (
    <div className="flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">ATxmega PA7 Pin Configuration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Configuration Settings</h2>

          <div className="mb-4">
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={slewRate}
                onChange={() => setSlewRate(!slewRate)}
                className="w-4 h-4"
              />
              <span>Enable Slew Rate Limit (Bit 7)</span>
            </label>

            <div className="mt-4">
              <label className="block mb-2">Edge Detection (Bits 2~0):</label>
              <select
                value={edgeDetection}
                onChange={(e) => setEdgeDetection(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value={0}>No Edge Detection (000)</option>
                <option value={1}>Rising Edge (001)</option>
                <option value={2}>Falling Edge (010)</option>
                <option value={3}>Both Edges (011)</option>
                <option value={4}>Low Level (100)</option>
                <option value={5}>High Level (101)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Register Value</h2>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-mono">PIN7CTRL:</span>
              <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                {toHex(registerValue)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-mono">Binary:</span>
              <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                {toBinary(registerValue)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="border rounded overflow-hidden">
              <div className="flex">
                {toBinary(registerValue)
                  .split("")
                  .map((bit, index) => (
                    <div
                      key={index}
                      className="flex-1 text-center border-r last:border-r-0"
                    >
                      <div className="bg-gray-200 px-1 py-1 text-xs">
                        Bit {7 - index}
                      </div>
                      <div
                        className={`py-2 ${
                          bit === "1" ? "bg-green-100" : "bg-gray-50"
                        }`}
                      >
                        {bit}
                      </div>
                      <div className="bg-gray-100 px-1 py-1 text-xs">
                        {index === 0
                          ? "SLEW"
                          : [5, 6, 7].includes(index)
                          ? "-"
                          : "EDGE"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Assembly Code</h2>
        <pre className="bg-gray-100 p-3 rounded font-mono text-sm">
          {`; Set PA7 as input
ldi r16, 0x80
sts PORTA_DIRCLR, r16

; Configure PIN7CTRL register
ldi r16, ${toHex(registerValue)}   ; ${slewRate ? "1<<7" : "0"} ${
            edgeDetection > 0 ? "| " + edgeDetection : ""
          }
sts PORTA_PIN7CTRL, r16`}
        </pre>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Explanation</h2>
        <p className="mb-2">
          This configuration sets up PA7 with the following characteristics:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>Sets PA7 as an input using DIRCLR register</li>
          <li>
            Configures slew rate limiting:{" "}
            {slewRate ? "Enabled (bit 7 = 1)" : "Disabled (bit 7 = 0)"}
          </li>
          <li>
            Sets edge detection to:{" "}
            {edgeDetection === 0
              ? "No edge detection (000)"
              : edgeDetection === 1
              ? "Rising edge (001)"
              : edgeDetection === 2
              ? "Falling edge (010)"
              : edgeDetection === 3
              ? "Both edges (011)"
              : edgeDetection === 4
              ? "Low level (100)"
              : "High level (101)"}
          </li>
        </ul>
        <p>
          The PIN7CTRL register combines both settings into a single 8-bit
          value.
        </p>
      </div>
    </div>
  );
};

export default PinConfigurationExplainer;
