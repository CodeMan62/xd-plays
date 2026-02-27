"use client";

import Link from "next/link";
import SnakeGame from "../../../components/SnakeGame";

export default function SnakeGamePage() {
  return (
    <div className="game-play-page">
      <Link href="/" className="back-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </Link>
      <div className="game-container-fullscreen">
        <SnakeGame />
      </div>
    </div>
  );
}
