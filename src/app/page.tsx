// import Image from "next/image";
import AVRPortDiagram from "../components/AVRportDiagram";
import PinConfigExplainer from "../components/PinConfigExplainer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center w-full">
        {/* AVR Port Diagram Component with heading */}
        <h2 className="text-3xl font-bold text-blue-800 mt-8 text-center w-full">
          AVR Port Architecture Explorer
        </h2>
        <p className="text-lg text-gray-600 mb-4 text-center max-w-3xl">
          Interactive visualization of AVR microcontroller I/O port structure
          and pin control features
        </p>
        <div className="w-full max-w-4xl mx-auto">
          <AVRPortDiagram />
        </div>

        {/* Pin Configuration Component with heading */}
        <h2 className="text-3xl font-bold text-blue-800 mt-12 text-center w-full">
          Pin Configuration Reference
        </h2>
        <p className="text-lg text-gray-600 mb-4 text-center max-w-3xl">
          Detailed explanation of AVR pin control registers and configuration
          options
        </p>
        <div className="w-full max-w-4xl mx-auto">
          <PinConfigExplainer />
        </div>
      </main>
    </div>
  );
}
