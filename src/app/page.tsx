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
      {(showActive === "logo" || showActive === "intro") && (
        <div
          className={`col-span-1 flex justify-center items-center h-full transition-all duration-500
        ${showActive === "intro" ? "row-span-1" : "row-span-2"}`}
        >
          <img
            src="/485518220_562748372853370_2598884496169271436_n.png"
            className="max-w-full max-h-full object-contain cursor-pointer"
            onClick={logoClick}
            alt="Logo"
          />
        </div>
      )}

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
        <div className="bg-sky-900 text-black row-start-1 row-span-2 w-full h-full justify-center items-center transition-all duration-500 grid grid-cols-[36px_36px_1fr_36px_36px] grid-rows-[20px_1fr_1fr_3fr_1fr_3fr_1fr_3fr_1fr_3fr_20px]">
          <button
            className="col-start-1 col-span-2 row-start-2 row-span-1 text-yellow-300 text-xl"
            onClick={() => setActive("intro")}
          >
            ←
          </button>
          <button className="col-start-2 col-span-3 row-start-2 row-span-1 p-1 text-sky-900 text-xl h-full">
            <img src="486478963_1026952515962155_6846013259516298573_n.png" />
          </button>
          <button
            className="col-start-2 col-span-3 row-start-4 row-span-1 p-1 text-sky-900 text-xl h-full"
            onClick={() => callBackend("old", "benefits")}
          >
            <img src="485290800_4583388388601604_6042372492323599183_n.png" />
          </button>
          <button
            className="col-start-2 col-span-3 row-start-6 row-span-1 rounded-lg p-1 text-xl h-full"
            onClick={() => callBackend("old", "healthcare")}
          >
            <img src="486152923_9340179489433381_1885937236673256181_n.png" />
          </button>
          <button
            className="col-start-2 col-span-3 row-start-8 row-span-1 rounded-lg p-1 text-xl h-full"
            onClick={() => callBackend("old", "healthcare")}
          >
            <img src="485380124_1994063701085771_3571409400247741332_n.png" />
          </button>
          <button
            className="col-start-2 col-span-3 row-start-10 row-span-1 rounded-lg p-1 text-xl h-full"
            onClick={() => callBackend("old", "healthcare")}
          >
            <img src="486066730_466910093077673_7820423069122309640_n.png" />
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
