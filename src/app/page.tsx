"use client";

import { useState } from "react";

export default function Home() {
  const [showActive, setActive] = useState("logo");
  const [response, setResponse] = useState("");

  const logoClick = () => {
    setActive("intro");
  };

  const callBackend = async (endpoint: string) => {
    try {
      const res = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Jaka jest pogoda w Paryżu?" }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Błąd przy wołaniu API:", error);
      setResponse("Błąd połączenia z backendem.");
    }
  };

  return (
    <div
      className={`bg-sky-600 grid h-screen w-screen grid-rows-[1fr_1fr] font-[family-name:var(--font-fira-sans)]`}
    >
      {/* Top Logo Section */}
      <div
        className={`col-span-1 flex justify-center items-center h-full transition-all duration-500
        ${showActive === "logo" ? "row-span-2" : "row-span-1"}`}
      >
        <img
          src="/485518220_562748372853370_2598884496169271436_n.png"
          className="max-w-full max-h-full object-contain cursor-pointer"
          onClick={logoClick}
          alt="Logo"
        />
      </div>

      {/* Bottom Content Section (Only visible when 'intro' state is active) */}
      {showActive === "intro" && (
        <div className="bg-white text-black row-start-2 row-span-1 w-full h-full justify-center items-center transition-all duration-500 grid grid-rows-[20px_repeat(9, 1fr)_20px]">
          <h2 className="row-start-2 row-span-1 text-center font-semibold">
            Jestem…
          </h2>
          <button className="row-start-4 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1">
            seniorem
          </button>
          <button className="row-start-6 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1">
            osobą pracującą
          </button>
          <button className="row-start-8 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1">
            osobą uczącą się
          </button>
          <button className="row-start-10 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1">
            inne
          </button>
        </div>
      )}
    </div>
  );
}
