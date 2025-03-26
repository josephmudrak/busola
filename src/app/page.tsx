"use client";

import { useState } from "react";
import ResponseComponent from "./md";

export default function Home() {
  const [showActive, setActive] = useState("logo");
  const [response, setResponse] = useState("");

  const logoClick = () => {
    setActive("intro");
  };

  const callBackend = async (endpoint: string, topic: string) => {
    const questions: Record<string, string> = {
      opportunities:
        "Jakie są dostępne możliwości dla mnie jako osoba ucząca się?",
      scholarships: "Jakie są dostępne stypendia dla osób uczących się?",
      work: "Jakie firmy oferują staże i praktyki dla studentów?",
      events: "Jakie wydarzenia odbywają się w Łodzi?",
      housing: "Jakie są programy wsparcia dla kupujących pierwsze mieszkanie?",
      permission: "Jak uzyskać pozwolenie na budowę domu?",
      fees: "Jak złożyć wniosek o dofinansowanie ogrzewania?",
      benefits: "Jakie świadczenia przysługują emerytom?",
      healthcare: "Jakie są bezpłatne usługi medyczne dla seniorów?",
    };

    const prompt = questions[topic];

    try {
      const res = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Błąd przy wołaniu API:", error);
      setResponse("Błąd połączenia z backendem.");
    }
  };

  return (
    <div
      className={`bg-sky-900 grid h-screen w-screen grid-rows-[1fr_1fr] font-[family-name:var(--font-fira-sans)]`}
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
        <>
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-semibold rounded-lg bg-blue-600 text-white p-1 px-5">
            Jestem…
          </h2>
          <div className="bg-white text-black row-start-2 row-span-1 w-full h-full justify-center items-center transition-all duration-500 grid grid-rows-[30px_2fr_1fr_2fr_1fr_2fr_1fr_2fr_30px]">
            <button
              className="row-start-2 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
              onClick={() => setActive("old")}
            >
              seniorem
            </button>
            <button
              className="row-start-4 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
              onClick={() => setActive("basicWhiteBitch")}
            >
              osobą pracującą
            </button>
            <button
              className="row-start-6 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
              onClick={() => setActive("young")}
            >
              osobą uczącą się
            </button>
            <button className="row-start-8 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1">
              inne
            </button>
          </div>
        </>
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
            className="col-start-2 col-span-1 row-start-4 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("young", "opportunities")}
          >
            możliwościach
          </button>
          <button
            className="col-start-2 col-span-1 row-start-6 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("young", "scholarships")}
          >
            stypendiach
          </button>
          <button
            className="col-start-2 col-span-1 row-start-8 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("young", "work")}
          >
            pracy
          </button>
          <button
            className="col-start-2 col-span-1 row-start-10 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("young", "events")}
          >
            wydarzeniach
          </button>
        </div>
      )}

      {showActive === "old" && (
        <div className="bg-white text-black row-start-2 row-span-1 w-full h-full justify-center items-center transition-all duration-500 grid grid-cols-[72px_1fr_72px] grid-rows-[20px_repeat(5, 1fr)_20px]">
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
            className="col-start-2 col-span-1 row-start-4 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("old", "benefits")}
          >
            świadczeniach
          </button>
          <button
            className="col-start-2 col-span-1 row-start-6 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("old", "healthcare")}
          >
            opiece zdrowotnej
          </button>
        </div>
      )}

      {showActive === "basicWhiteBitch" && (
        <div className="bg-white text-black row-start-2 row-span-1 w-full h-full justify-center items-center transition-all duration-500 grid grid-cols-[72px_1fr_72px] grid-rows-[20px_repeat(7, 1fr)_20px]">
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
            className="col-start-2 col-span-1 row-start-4 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("basic", "housing")}
          >
            mieszkalnictwie
          </button>
          <button
            className="col-start-2 col-span-1 row-start-6 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("basic", "permission")}
          >
            pozwoleniach na budowę
          </button>
          <button
            className="col-start-2 col-span-1 row-start-8 row-span-1 bg-amber-300 outline-2 outline-solid outline-black rounded-lg p-1"
            onClick={() => callBackend("basic", "fees")}
          >
            opłatach
          </button>
        </div>
      )}

      {response && <ResponseComponent response={response}></ResponseComponent>}
    </div>
  );
}
