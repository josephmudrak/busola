"use client";

import { useState } from "react";

export default function Home() {
  const [showActive, setActive] = useState("intro");

  return (
    <div className="bg-orange-800 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-fira-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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
              <button className="rounded-xl p-2">Możliwości</button>
              <button className="rounded-xl p-2">Stypendia</button>
              <button className="rounded-xl p-2">Praca</button>
              <button className="rounded-xl p-2">Wydarzenia</button>
            </div>
            <label htmlFor="ask">W czym mogę pomóc?</label>
            <input type="text" name="ask" className="bg-orange-900" />
          </>
        )}
      </main>
    </div>
  );
}
