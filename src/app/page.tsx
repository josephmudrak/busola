"use client";

import { useState } from "react";

export default function Home() {
  const [showActive, setActive] = useState("logo");
  const [response, setResponse] = useState("");

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
    <div className="bg-sky-600 grid grid-rows-[20px_1fr_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-fira-sans)]">
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-xl font-semibold text-stone-50">Busola</h1>
        {showActive === "intro" && (
          <>
            <p className="text-stone-50">
              Cześć! Jestem Busola – Twój wirtualny asystent po Łodzi. Pomogę Ci
              zdobyć informacje i skorzystać z lokalnych usług. Pytaj śmiało!
            </p>
            <button
              className="rounded-xl uppercase p-3 border-orange-400 font-semibold bg-orange-400 text-orange-800"
              onClick={() => setActive("menu")}
            >
              Rozpocznij rozmowę
            </button>
          </>
        )}

        {showActive === "menu" && (
          <>
            <button
              className="rounded uppercase p1 border-orange-400 font-semibold bg-orange-400 text-orange-800"
              onClick={() => setActive("intro")}
            >
              ← Powrót
            </button>
            <h2>Jestem…</h2>
            <button className="rounded-xl uppercase p-3 border-orange-400 font-semibold bg-orange-400 text-orange-800">
              Seniorem
            </button>
            <button className="rounded-xl uppercase p-3 border-orange-400 font-semibold bg-orange-400 text-orange-800">
              Osobą pracującą
            </button>
            <button
              className="rounded-xl uppercase p-3 border-orange-400 font-semibold bg-orange-400 text-orange-800"
              onClick={() => setActive("student")}
            >
              Osobą uczącą się
            </button>
            <button className="rounded-xl uppercase p-3 border-orange-400 font-semibold bg-orange-400 text-orange-800">
              Inne
            </button>
          </>
        )}

        {showActive === "student" && (
          <>
            <button
              className="rounded uppercase p1 border-orange-400 font-semibold bg-orange-400 text-orange-800"
              onClick={() => setActive("menu")}
            >
              ← Powrót
            </button>
            <h2>Dla osób uczących się…</h2>
            <div className="grid grid-cols-2">
              <button
                className="rounded-xl p-2 bg-pink-600"
                onClick={() => callBackend("young")}
              >
                Możliwości
              </button>
              <button className="rounded-xl p-2">Stypendia</button>
              <button className="rounded-xl p-2">Praca</button>
              <button className="rounded-xl p-2">Wydarzenia</button>
            </div>
            <label htmlFor="ask">W czym mogę pomóc?</label>
            <input type="text" name="ask" className="bg-orange-900" />
          </>
        )}

        {response && (
          <div>
            <p>{response}</p>
          </div>
        )}
      </main> */}
      <div className="row-start-2 row-span-2 col-span-1 flex justify-center items-center">
        <img
          src="/485518220_562748372853370_2598884496169271436_n.png"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
