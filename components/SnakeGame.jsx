"use client";

import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 20;
const CANVAS_SIZE = 480;
const TILE_COUNT = CANVAS_SIZE / GRID_SIZE;
const TICK_MS = 100;

function createInitialState() {
  return {
    snake: [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 }
    ],
    direction: { x: 1, y: 0 },
    pendingDirection: null,
    food: { x: 12, y: 10 },
    score: 0,
    gameOver: false
  };
}

function randomFood(snake) {
  while (true) {
    const x = Math.floor(Math.random() * TILE_COUNT);
    const y = Math.floor(Math.random() * TILE_COUNT);
    const onSnake = snake.some((s) => s.x === x && s.y === y);
    if (!onSnake) return { x, y };
  }
}

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [state, setState] = useState(createInitialState);
  const [running, setRunning] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const tickRef = useRef(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("snakeBestScore");
      if (stored != null) {
        setBestScore(parseInt(stored, 10) || 0);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.code === "Space") {
        e.preventDefault();
        startGame();
        return;
      }

      const key = e.key;
      let newDir = null;
      if (key === "ArrowUp" || key === "w") newDir = { x: 0, y: -1 };
      else if (key === "ArrowDown" || key === "s") newDir = { x: 0, y: 1 };
      else if (key === "ArrowLeft" || key === "a") newDir = { x: -1, y: 0 };
      else if (key === "ArrowRight" || key === "d") newDir = { x: 1, y: 0 };
      if (!newDir) return;

      setState((prev) => {
        const lastDir = prev.pendingDirection || prev.direction;
        const opposite = lastDir.x + newDir.x === 0 && lastDir.y + newDir.y === 0;
        if (opposite) return prev;
        return { ...prev, pendingDirection: newDir };
      });
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    if (!running) return;

    tickRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.gameOver) return prev;

        const dir = prev.pendingDirection || prev.direction;
        const head = prev.snake[0];
        const newHead = { x: head.x + dir.x, y: head.y + dir.y };

        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= TILE_COUNT ||
          newHead.y >= TILE_COUNT
        ) {
          return { ...prev, direction: dir, pendingDirection: null, gameOver: true };
        }

        if (prev.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          return { ...prev, direction: dir, pendingDirection: null, gameOver: true };
        }

        const newSnake = [newHead, ...prev.snake];
        let newFood = prev.food;
        let newScore = prev.score;

        if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
          newScore += 1;
          newFood = randomFood(newSnake);
        } else {
          newSnake.pop();
        }

        if (newScore > bestScore) {
          setBestScore(newScore);
          try {
            window.localStorage.setItem("snakeBestScore", String(newScore));
          } catch {
            // ignore
          }
        }

        return {
          snake: newSnake,
          direction: dir,
          pendingDirection: null,
          food: newFood,
          score: newScore,
          gameOver: false
        };
      });
    }, TICK_MS);

    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [running, bestScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.strokeStyle = "rgba(30,64,175,0.25)";
    ctx.lineWidth = 1;
    for (let i = 0; i < TILE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE + 0.5, 0);
      ctx.lineTo(i * GRID_SIZE + 0.5, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * GRID_SIZE + 0.5);
      ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE + 0.5);
      ctx.stroke();
    }

    ctx.fillStyle = "#f97316";
    const fx = state.food.x * GRID_SIZE;
    const fy = state.food.y * GRID_SIZE;
    ctx.fillRect(fx + 3, fy + 3, GRID_SIZE - 6, GRID_SIZE - 6);

    state.snake.forEach((segment, index) => {
      const x = segment.x * GRID_SIZE;
      const y = segment.y * GRID_SIZE;
      const isHead = index === 0;
      ctx.fillStyle = isHead ? "#22c55e" : "#16a34a";
      ctx.fillRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4);
    });

    if (state.gameOver) {
      ctx.fillStyle = "rgba(15,23,42,0.8)";
      ctx.fillRect(0, CANVAS_SIZE / 2 - 30, CANVAS_SIZE, 60);
      ctx.fillStyle = "#f9fafb";
      ctx.font = "16px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Game Over – Press Space or Start to retry", CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 5);
    }
  }, [state]);

  function startGame() {
    setState(createInitialState());
    setRunning(true);
  }

  return (
    <div className="fullscreen-game">
      <div className="game-header">
        <h2>Snake</h2>
        <div className="game-controls">
          <button className="game-btn" onClick={startGame}>
            Start Game
          </button>
          <div className="game-scoreboard">
            <span>Score: <strong>{state.score}</strong></span>
            <span>Best: <strong>{bestScore}</strong></span>
          </div>
        </div>
      </div>
      <div className="game-canvas-wrapper">
        <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      </div>
    </div>
  );
}

