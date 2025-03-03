"use client";

import React, { useState } from "react";

// Define a type for the valid port names
type PortName = "PORTA" | "PORTB" | "PORTC" | "PORTD";

const AVRPortDiagram = () => {
  // Use the type for activePort
  const [activePort, setActivePort] = useState<PortName>("PORTB");
  const [selectedPin, setSelectedPin] = useState("PB6");
  const [activeTab, setActiveTab] = useState("pinCtrl");

  const portInfo = {
    PORTA: { pins: ["PA0", "PA1", "PA2", "PA3", "PA4", "PA5", "PA6", "PA7"] },
    PORTB: { pins: ["PB0", "PB1", "PB2", "PB3", "PB4", "PB5", "PB6", "PB7"] },
    PORTC: { pins: ["PC0", "PC1", "PC2", "PC3", "PC4", "PC5", "PC6", "PC7"] },
    PORTD: { pins: ["PD0", "PD1", "PD2", "PD3", "PD4", "PD5", "PD6", "PD7"] },
  };

  // const registerInfo = {
  //   DIR: {
  //     description: "Data Direction Register",
  //     bits: [
  //       {
  //         bit: 0,
  //         name: "DIR0",
  //         description: "Pin 0 Direction Control (0=Input, 1=Output)",
  //       },
  //       {
  //         bit: 1,
  //         name: "DIR1",
  //         description: "Pin 1 Direction Control (0=Input, 1=Output)",
  //       },
  //       {
  //         bit: 2,
  //         name: "DIR2",
  //         description: "Pin 2 Direction Control (0=Input, 1=Output)",
  //       },
  //       {
  //         bit: 3,
  //         name: "DIR3",
  //         description: "Pin 3 Direction Control (0=Input, 1=Output)",
  //       },
  //       {
  //         bit: 4,
  //         name: "DIR4",
  //         description: "Pin 4 Direction Control (0=Input, 1=Output)",
  //       },
  //       {
  //         bit: 5,
  //         name: "DIR5",
  //         description: "Pin 5 Direction Control (0=Input, 1=Output)",
  //       },
  //       {
  //         bit: 6,
  //         name: "DIR6",
  //         description: "Pin 6 Direction Control (0=Input, 1=Output)",
  //       },
  //       {
  //         bit: 7,
  //         name: "DIR7",
  //         description: "Pin 7 Direction Control (0=Input, 1=Output)",
  //       },
  //     ],
  //   },
  //   OUT: {
  //     description: "Port Output Register",
  //     bits: [
  //       { bit: 0, name: "OUT0", description: "Pin 0 Output Value" },
  //       { bit: 1, name: "OUT1", description: "Pin 1 Output Value" },
  //       { bit: 2, name: "OUT2", description: "Pin 2 Output Value" },
  //       { bit: 3, name: "OUT3", description: "Pin 3 Output Value" },
  //       { bit: 4, name: "OUT4", description: "Pin 4 Output Value" },
  //       { bit: 5, name: "OUT5", description: "Pin 5 Output Value" },
  //       { bit: 6, name: "OUT6", description: "Pin 6 Output Value" },
  //       { bit: 7, name: "OUT7", description: "Pin 7 Output Value" },
  //     ],
  //   },
  //   IN: {
  //     description: "Port Input Register",
  //     bits: [
  //       { bit: 0, name: "IN0", description: "Pin 0 Input Value" },
  //       { bit: 1, name: "IN1", description: "Pin 1 Input Value" },
  //       { bit: 2, name: "IN2", description: "Pin 2 Input Value" },
  //       { bit: 3, name: "IN3", description: "Pin 3 Input Value" },
  //       { bit: 4, name: "IN4", description: "Pin 4 Input Value" },
  //       { bit: 5, name: "IN5", description: "Pin 5 Input Value" },
  //       { bit: 6, name: "IN6", description: "Pin 6 Input Value" },
  //       { bit: 7, name: "IN7", description: "Pin 7 Input Value" },
  //     ],
  //   },
  //   PINCTRL: {
  //     description: "Pin Control Register",
  //     bits: [
  //       {
  //         bit: 0,
  //         name: "ISC0",
  //         description: "Input Sense Configuration bit 0",
  //       },
  //       {
  //         bit: 1,
  //         name: "ISC1",
  //         description: "Input Sense Configuration bit 1",
  //       },
  //       {
  //         bit: 2,
  //         name: "ISC2",
  //         description: "Input Sense Configuration bit 2",
  //       },
  //       { bit: 3, name: "PULLUP", description: "Pull-up Enable (1=Enable)" },
  //       {
  //         bit: 4,
  //         name: "OPC",
  //         description: "Output Pin Configuration (Wired OR)",
  //       },
  //       { bit: 5, name: "INVEN", description: "Invert I/O" },
  //       {
  //         bit: 6,
  //         name: "SRLEN",
  //         description: "Slew Rate Limit Enable (0=Disabled)",
  //       },
  //       { bit: 7, name: "DRVSTR", description: "Output Driver Strength" },
  //     ],
  //   },
  // };

  const senseConfigValues = [
    { value: "000", name: "INTDISABLE", description: "Interrupt disabled" },
    { value: "001", name: "BOTHEDGES", description: "Sense both edges" },
    { value: "010", name: "RISING", description: "Sense rising edge" },
    { value: "011", name: "FALLING", description: "Sense falling edge" },
    {
      value: "100",
      name: "INPUT_DISABLE",
      description: "Digital input buffer disabled",
    },
    { value: "101", name: "LEVEL", description: "Sense low level" },
    { value: "110", name: "RESERVED", description: "Reserved" },
    { value: "111", name: "RESERVED", description: "Reserved" },
  ];

  return (
    <div className="flex flex-col space-y-6 p-4 bg-gray-50 rounded-lg max-w-4xl">
      <h1 className="text-2xl font-bold text-blue-800">
        AVR Port Configuration and Functionality
      </h1>

      {/* Architecture Diagram */}
      <div className="relative border rounded-lg p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">
          AVR Microcontroller Architecture
        </h2>

        <div className="flex">
          {/* MCU Block */}
          <div className="w-3/4">
            <div className="border-2 border-gray-800 p-4 rounded-lg">
              <div className="text-center font-bold mb-4">AVR MCU</div>

              <div className="flex">
                {/* CPU and Memories */}
                <div className="w-1/3 border border-gray-500 p-2 rounded-lg bg-gray-100 text-center">
                  <div className="font-bold">CPU Core</div>
                  <div className="mt-2 border border-gray-400 p-1 rounded bg-white">
                    Registers
                  </div>
                  <div className="mt-2 border border-gray-400 p-1 rounded bg-white">
                    ALU
                  </div>
                  <div className="mt-4 border border-gray-400 p-1 rounded bg-white">
                    Flash
                  </div>
                  <div className="mt-2 border border-gray-400 p-1 rounded bg-white">
                    SRAM
                  </div>
                  <div className="mt-2 border border-gray-400 p-1 rounded bg-white">
                    EEPROM
                  </div>
                </div>

                {/* GPIO Ports */}
                <div className="w-2/3 ml-4">
                  <div className="font-bold mb-2 text-center">I/O Ports</div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(portInfo).map((port) => (
                      <div
                        key={port}
                        className={`border p-2 rounded-lg text-center cursor-pointer ${
                          activePort === port
                            ? "bg-blue-100 border-blue-500"
                            : "bg-white"
                        }`}
                        onClick={() => setActivePort(port as PortName)}
                      >
                        {port}
                      </div>
                    ))}
                  </div>

                  {/* Port registers */}
                  <div className="mt-4 border border-gray-400 p-2 rounded bg-gray-100">
                    <div className="font-semibold text-center mb-2">
                      {activePort} Registers
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_DIR
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_DIRSET
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_DIRCLR
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_DIRTGL
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_OUT
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_OUTSET
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_OUTCLR
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_OUTTGL
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_IN
                      </div>
                      <div className="border border-gray-300 p-1 rounded bg-white text-center text-sm">
                        {activePort}_INTFLAGS
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pin Specific Controls */}
              <div className="mt-4 border border-gray-500 p-2 rounded-lg bg-gray-100">
                <div className="font-semibold text-center mb-2">
                  Pin Control Registers
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {portInfo[activePort].pins.map((pin) => (
                    <div
                      key={pin}
                      className={`border p-1 rounded text-center cursor-pointer text-sm ${
                        selectedPin === pin
                          ? "bg-blue-100 border-blue-500"
                          : "bg-white"
                      }`}
                      onClick={() => setSelectedPin(pin)}
                    >
                      {pin}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm font-medium">
                    {activePort}_PIN{selectedPin.slice(-1)}CTRL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* External Pins */}
          <div className="w-1/4 pl-4 flex items-center">
            <div className="border-2 border-gray-800 p-2 rounded-lg bg-gray-100 w-full">
              <div className="text-center font-bold mb-2">I/O Pins</div>
              <div className="space-y-1">
                {portInfo[activePort].pins.map((pin) => (
                  <div
                    key={pin}
                    className={`border p-1 rounded-lg text-center ${
                      selectedPin === pin
                        ? "bg-blue-100 border-blue-500"
                        : "bg-white"
                    }`}
                    onClick={() => setSelectedPin(pin)}
                  >
                    {pin}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Register Detail Tabs */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "pinCtrl"
                ? "bg-blue-100 border-b-2 border-blue-500"
                : "bg-gray-50"
            }`}
            onClick={() => setActiveTab("pinCtrl")}
          >
            Pin Control
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "direction"
                ? "bg-blue-100 border-b-2 border-blue-500"
                : "bg-gray-50"
            }`}
            onClick={() => setActiveTab("direction")}
          >
            Direction
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "dataFlow"
                ? "bg-blue-100 border-b-2 border-blue-500"
                : "bg-gray-50"
            }`}
            onClick={() => setActiveTab("dataFlow")}
          >
            Data Flow
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "senseEdge"
                ? "bg-blue-100 border-b-2 border-blue-500"
                : "bg-gray-50"
            }`}
            onClick={() => setActiveTab("senseEdge")}
          >
            Sense Edge
          </button>
        </div>

        <div className="p-4">
          {activeTab === "pinCtrl" && (
            <div>
              <h3 className="font-bold text-lg mb-2">
                {activePort}_PIN{selectedPin.slice(-1)}CTRL Register
              </h3>
              <p className="mb-4">
                Controls various pin-specific settings for {selectedPin}
              </p>

              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-center">Bit 7</th>
                    <th className="border p-2 text-center">Bit 6</th>
                    <th className="border p-2 text-center">Bit 5</th>
                    <th className="border p-2 text-center">Bit 4</th>
                    <th className="border p-2 text-center">Bit 3</th>
                    <th className="border p-2 text-center">Bit 2</th>
                    <th className="border p-2 text-center">Bit 1</th>
                    <th className="border p-2 text-center">Bit 0</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 text-center text-sm">DRVSTR</td>
                    <td className="border p-2 text-center text-sm">SRLEN</td>
                    <td className="border p-2 text-center text-sm">INVEN</td>
                    <td className="border p-2 text-center text-sm bg-yellow-100">
                      OPC
                    </td>
                    <td className="border p-2 text-center text-sm">PULLUP</td>
                    <td className="border p-2 text-center text-sm bg-blue-100">
                      ISC2
                    </td>
                    <td className="border p-2 text-center text-sm bg-blue-100">
                      ISC1
                    </td>
                    <td className="border p-2 text-center text-sm bg-blue-100">
                      ISC0
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border p-3 rounded-lg bg-yellow-50">
                  <h4 className="font-semibold">
                    OPC: Output Pin Configuration (Bit 4)
                  </h4>
                  <p className="mt-1 text-sm">
                    When set to 1, enables Wired OR mode for this pin.
                  </p>
                  <p className="mt-1 text-sm">
                    Important for sharing data lines with open drain
                    configuration.
                  </p>
                </div>
                <div className="border p-3 rounded-lg bg-blue-50">
                  <h4 className="font-semibold">
                    ISC[2:0]: Input Sense Configuration (Bits 2-0)
                  </h4>
                  <p className="mt-1 text-sm">
                    Controls how the pin senses input changes:
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Value 0b100: Falling Edge
                  </p>
                </div>
                <div className="border p-3 rounded-lg bg-gray-50">
                  <h4 className="font-semibold">
                    SRLEN: Slew Rate Limit (Bit 6)
                  </h4>
                  <p className="mt-1 text-sm">
                    When set to 0, disables slew rate limiting.
                  </p>
                  <p className="mt-1 text-sm">
                    Allows faster signal transitions but can increase noise/EMI.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "direction" && (
            <div>
              <h3 className="font-bold text-lg mb-2">
                Direction Configuration
              </h3>
              <p className="mb-4">
                Controls whether pins act as inputs or outputs
              </p>

              <div className="flex items-center space-x-4">
                <div className="border p-3 rounded-lg bg-gray-50 w-1/2">
                  <h4 className="font-semibold">{activePort}_DIR Register</h4>
                  <p className="mt-1 text-sm">
                    Each bit corresponds to a pin&apos;s direction:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    <li>0: Pin configured as input</li>
                    <li>1: Pin configured as output</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    Example: Setting bit 6 configures PB6 as output
                  </p>
                </div>

                <div className="space-y-2 w-1/2">
                  <div className="border p-2 rounded-lg bg-green-50">
                    <h4 className="font-semibold">{activePort}_DIRSET</h4>
                    <p className="text-sm">
                      Writing 1 to a bit sets the corresponding bit in DIR
                      register (configures as output)
                    </p>
                  </div>
                  <div className="border p-2 rounded-lg bg-red-50">
                    <h4 className="font-semibold">{activePort}_DIRCLR</h4>
                    <p className="text-sm">
                      Writing 1 to a bit clears the corresponding bit in DIR
                      register (configures as input)
                    </p>
                  </div>
                  <div className="border p-2 rounded-lg bg-blue-50">
                    <h4 className="font-semibold">{activePort}_DIRTGL</h4>
                    <p className="text-sm">
                      Writing 1 to a bit toggles the corresponding bit in DIR
                      register
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "dataFlow" && (
            <div>
              <h3 className="font-bold text-lg mb-2">Data Flow</h3>
              <p className="mb-4">How data moves in and out through the pins</p>

              <div className="flex space-x-4">
                <div className="border p-3 rounded-lg bg-green-50 w-1/2">
                  <h4 className="font-semibold">Output Data Flow</h4>
                  <p className="mt-1 text-sm">
                    When pin is configured as output:
                  </p>
                  <div className="mt-2 bg-white p-2 rounded border">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        {activePort}_OUT Register
                      </div>
                      <div>→</div>
                      <div className="font-medium">Output Driver</div>
                      <div>→</div>
                      <div className="font-medium">Pin</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">Helper registers:</div>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    <li>{activePort}_OUTSET: Set bits in OUT register</li>
                    <li>{activePort}_OUTCLR: Clear bits in OUT register</li>
                    <li>{activePort}_OUTTGL: Toggle bits in OUT register</li>
                  </ul>
                </div>

                <div className="border p-3 rounded-lg bg-blue-50 w-1/2">
                  <h4 className="font-semibold">Input Data Flow</h4>
                  <p className="mt-1 text-sm">
                    When pin is configured as input:
                  </p>
                  <div className="mt-2 bg-white p-2 rounded border">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Pin</div>
                      <div>→</div>
                      <div className="font-medium">Input Buffer</div>
                      <div>→</div>
                      <div className="font-medium">
                        {activePort}_IN Register
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">
                    The CPU reads the pin state from the IN register.
                  </p>
                  <p className="mt-1 text-sm">
                    Input sensing can trigger interrupts based on the ISC
                    configuration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "senseEdge" && (
            <div>
              <h3 className="font-bold text-lg mb-2">
                Input Sense Configuration
              </h3>
              <p className="mb-4">
                How pins detect and respond to input signal changes
              </p>

              <div className="border p-3 rounded-lg bg-blue-50">
                <h4 className="font-semibold">ISC[2:0] in PINxCTRL register</h4>
                <p className="mt-1 text-sm">
                  These 3 bits control how the pin senses changes on the input:
                </p>

                <table className="w-full border-collapse mt-3">
                  <thead className="bg-white">
                    <tr>
                      <th className="border p-2 text-center">ISC[2:0]</th>
                      <th className="border p-2 text-center">Configuration</th>
                      <th className="border p-2 text-center">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {senseConfigValues.map((config) => (
                      <tr
                        key={config.value}
                        className={
                          config.value === "011" ? "bg-yellow-100" : ""
                        }
                      >
                        <td className="border p-2 text-center">
                          {config.value}
                        </td>
                        <td className="border p-2">{config.name}</td>
                        <td className="border p-2">{config.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border p-3 rounded-lg bg-yellow-50">
                  <h4 className="font-semibold">Falling Edge (ISC=011)</h4>
                  <p className="mt-1 text-sm">
                    Pin generates an interrupt on the falling edge (high to low
                    transition).
                  </p>
                  <div className="mt-2 h-16 bg-white p-1 rounded border">
                    <svg width="100%" height="100%" viewBox="0 0 200 50">
                      <path
                        d="M 10,40 L 70,40 L 70,10 L 130,10 L 130,40 L 190,40"
                        stroke="blue"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="70" cy="40" r="3" fill="red" />
                      <circle cx="130" cy="40" r="3" fill="red" />
                      <text x="60" y="48" fontSize="8" textAnchor="middle">
                        Falling Edge
                      </text>
                      <text x="120" y="48" fontSize="8" textAnchor="middle">
                        Falling Edge
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="border p-3 rounded-lg bg-gray-50">
                  <h4 className="font-semibold">Interrupt Handling</h4>
                  <p className="mt-1 text-sm">
                    When configured for edge sensing:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    <li>
                      The pin can trigger an interrupt based on the configured
                      edge
                    </li>
                    <li>
                      Interrupt flags are set in the {activePort}_INTFLAGS
                      register
                    </li>
                    <li>
                      Interrupts can be enabled/disabled globally or per-pin
                    </li>
                    <li>The CPU can be woken from sleep modes by interrupts</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Example */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-bold text-lg mb-2">
          Example: PB6, PB2 Configuration
        </h3>
        <p className="mb-4">
          Code to configure PB6 and PB2 with wired OR, sense falling edge,
          disable slew rate limit, and set as outputs
        </p>

        <div className="bg-gray-50 p-3 rounded border font-mono text-sm">
          <div>; Set PB6 and PB2 as outputs</div>
          <div>ldi r16, (1&lt;&lt;6) | (1&lt;&lt;2)</div>
          <div>sts PORTB_DIRSET, r16</div>
          <div></div>
          <div>
            ; Configure wired OR, sense falling edge, disable slew rate limit
          </div>
          <div>ldi r16, (1&lt;&lt;4) | (0b100 &lt;&lt; 0)</div>
          <div>sts PORTB_PIN6CTRL, r16</div>
          <div>sts PORTB_PIN2CTRL, r16</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-3 rounded border">
            <h4 className="font-semibold">First Instruction Block</h4>
            <p className="text-sm mt-1">
              Sets PB6 and PB2 as outputs by writing to PORTB_DIRSET
            </p>
            <p className="text-sm mt-1">
              Binary value: 01000100 (Bits 6 and 2 set)
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded border">
            <h4 className="font-semibold">Second Instruction Block</h4>
            <p className="text-sm mt-1">
              Configures PINxCTRL registers for both pins
            </p>
            <p className="text-sm mt-1">Value: 00010100</p>
            <ul className="list-disc pl-5 mt-1 text-sm">
              <li>Bit 4 (OPC): 1 - Wired OR enabled</li>
              <li>Bits 2-0 (ISC): 100 - Falling edge sensing</li>
              <li>Bit 6 (SRLEN): 0 - Slew rate limiting disabled</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AVRPortDiagram;
