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
        body: JSON.stringify({
          prompt:
            "Jakie są dostępne możliwości dla mnie jako osoba ucząca się?",
        }),
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
          <button
            className="row-start-8 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => setActive("young")}
          >
            osobą uczącą się
          </button>
          <button className="row-start-10 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1">
            inne
          </button>
        </div>
      )}

      {showActive === "young" && (
        <div className="bg-white text-black row-start-2 row-span-1 w-full h-full justify-center items-center transition-all duration-500 grid grid-cols-[72px_1fr_72px] grid-rows-[20px_repeat(9, 1fr)_20px]">
          <button
            className="col-start-1 col-span-1 row-start-2 row-span-1"
            onClick={() => setActive("intro")}
          >
            ←
          </button>
          <h2 className="col-start-2 col-span-1 row-start-2 row-span-1 font-semibold">
            Chcę dowiedzieć się o…
          </h2>
          <button
            className="col-start-2 col-span-1 row-start-4 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("young")}
          >
            możliwościach
          </button>
          <button className="col-start-2 col-span-1 row-start-6 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1">
            stypendiach
          </button>
          <button className="col-start-2 col-span-1 row-start-8 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1">
            pracy
          </button>
          <button className="col-start-2 col-span-1 row-start-10 row-span-1 bg-orange-400 outline-2 outline-solid outline-black rounded-lg p-1">
            wydarzeniach
          </button>
        </div>
      )}

      {response && (
        <div>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
