"use client";

import { useEffect, useRef, useState } from "react";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BALL_RADIUS = 10;
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_SPEED = 5;

function createInitialState() {
  return {
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED },
    leftPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
    rightPaddle: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
    score: { left: 0, right: 0 },
    gameOver: false,
  };
}

export default function FootballGame() {
  const canvasRef = useRef(null);
  const [state, setState] = useState(createInitialState);
  const [running, setRunning] = useState(false);
  const keysPressed = useRef({});

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Space") {
        e.preventDefault();
        startGame();
        return;
      }
      keysPressed.current[e.key] = true;
    }

    function handleKeyUp(e) {
      keysPressed.current[e.key] = false;
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.gameOver) return prev;

        const newState = { ...prev };
        
        // Move paddles
        if (keysPressed.current['w'] && newState.leftPaddle.y > 0) {
          newState.leftPaddle = { y: newState.leftPaddle.y - 7 };
        }
        if (keysPressed.current['s'] && newState.leftPaddle.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
          newState.leftPaddle = { y: newState.leftPaddle.y + 7 };
        }
        if (keysPressed.current['ArrowUp'] && newState.rightPaddle.y > 0) {
          newState.rightPaddle = { y: newState.rightPaddle.y - 7 };
        }
        if (keysPressed.current['ArrowDown'] && newState.rightPaddle.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
          newState.rightPaddle = { y: newState.rightPaddle.y + 7 };
        }

        // Move ball
        let newBall = {
          x: newState.ball.x + newState.ball.dx,
          y: newState.ball.y + newState.ball.dy,
          dx: newState.ball.dx,
          dy: newState.ball.dy,
        };

        // Ball collision with top/bottom
        if (newBall.y - BALL_RADIUS <= 0 || newBall.y + BALL_RADIUS >= CANVAS_HEIGHT) {
          newBall.dy = -newBall.dy;
        }

        // Ball collision with left paddle
        if (
          newBall.x - BALL_RADIUS <= PADDLE_WIDTH &&
          newBall.y >= newState.leftPaddle.y &&
          newBall.y <= newState.leftPaddle.y + PADDLE_HEIGHT
        ) {
          newBall.dx = Math.abs(newBall.dx);
        }

        // Ball collision with right paddle
        if (
          newBall.x + BALL_RADIUS >= CANVAS_WIDTH - PADDLE_WIDTH &&
          newBall.y >= newState.rightPaddle.y &&
          newBall.y <= newState.rightPaddle.y + PADDLE_HEIGHT
        ) {
          newBall.dx = -Math.abs(newBall.dx);
        }

        // Score
        if (newBall.x - BALL_RADIUS <= 0) {
          newState.score = { ...newState.score, right: newState.score.right + 1 };
          newBall = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED };
        }
        if (newBall.x + BALL_RADIUS >= CANVAS_WIDTH) {
          newState.score = { ...newState.score, left: newState.score.left + 1 };
          newBall = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: -BALL_SPEED, dy: BALL_SPEED };
        }

        newState.ball = newBall;
        return newState;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.fillStyle = "#1a472a";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = "#ffffff";
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, state.leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, state.rightPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.beginPath();
    ctx.arc(state.ball.x, state.ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Draw scores
    ctx.font = "48px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillText(state.score.left.toString(), CANVAS_WIDTH / 4, 60);
    ctx.fillText(state.score.right.toString(), (3 * CANVAS_WIDTH) / 4, 60);
  }, [state]);

  function startGame() {
    setState(createInitialState());
    setRunning(true);
  }

  return (
    <div className="fullscreen-game">
      <div className="game-header">
        <h2>Football Pong</h2>
        <div className="game-controls">
          <button className="game-btn" onClick={startGame}>
            Start Game
          </button>
          <div className="game-scoreboard">
            <span>Player 1: <strong>{state.score.left}</strong></span>
            <span>Player 2: <strong>{state.score.right}</strong></span>
          </div>
        </div>
      </div>
      <div className="game-canvas-wrapper">
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      </div>
    </div>
  );
}
