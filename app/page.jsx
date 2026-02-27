"use client";

import { useState } from "react";
import { GameCard } from "@/components/GameCard";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("play");

  const games = [
    {
      title: "Snake",
      image: "/images/snake.png",
      href: "/games/snake",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
  ];

  return (
    <div className="platform-page">
      <nav className="top-nav">
        <button 
          className={`nav-tab ${activeTab === "play" ? "active" : ""}`}
          onClick={() => setActiveTab("play")}
        >
          Play
        </button>
        <button 
          className={`nav-tab ${activeTab === "store" ? "active" : ""}`}
          onClick={() => setActiveTab("store")}
        >
          Store
        </button>
      </nav>

      <main className="platform-content">
        {activeTab === "play" && (
          <>
            <section className="game-category">
              <h2 className="category-title">Gym</h2>
              <div className="gym-games-grid">
                {games.map((game) => (
                  <GameCard
                    key={game.title}
                    title={game.title}
                    image={game.image}
                    href={game.href}
                    gradient={game.gradient}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === "store" && (
          <div className="store-content">
            <p className="coming-soon">Store coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}

