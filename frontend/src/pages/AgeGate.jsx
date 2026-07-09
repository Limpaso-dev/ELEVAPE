import { useState } from "react";

export default function AgeGate({ onVerify }) {
  const [remember, setRemember] = useState(true);

  const handleYes = () => {
    if (remember) {
      localStorage.setItem("ageVerified", "true");
    }
    onVerify();
  };

  const handleNo = () => {
    alert("You must be 18 years of age or older to continue.");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-dark">
      <div className="glass p-10 text-center max-w-lg w-full">
        
        {/* TITLE */}
        <h1 className="text-2xl font-bold gradient-text mb-4">
          ELVARA
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          Welcome to <span className="text-white font-semibold">Elvara</span>.
          Our website is intended for adults. Please confirm that you are at
          least <strong>18 years old</strong> before continuing to browse and
          shop our premium footwear collection.
        </p>

        {/* QUESTION */}
        <h2 className="text-lg font-semibold mb-6">
          Are you 18 years of age or older?
        </h2>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleYes}
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded font-semibold text-white"
          >
            Yes
          </button>

          <button
            onClick={handleNo}
            className="px-6 py-2 bg-red-500 rounded font-semibold text-white"
          >
            No
          </button>
        </div>

        {/* REMEMBER ME */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <span>Remember me</span>
        </div>
      </div>
    </div>
  );
}