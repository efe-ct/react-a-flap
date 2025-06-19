import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { Bird } from './Bird';
import { Obstacles } from './Obstacles';
import { Scoreboard } from './Scoreboard';
import { Menu } from './Menu';
import { Background } from './Background';
import { GameState, BirdState, Obstacle, GameConfig } from '../types/game';

const gameConfig: GameConfig = {
  gravity: 0.0008,
  flapStrength: -0.6,
  obstacleSpeed: 0.3,
  obstacleGap: 180,
  obstacleWidth: 60,
  birdSize: 40,
  gameWidth: 800,
  gameHeight: 600,
};

export const GameContainer: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('react-a-flap-high-score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [bird, setBird] = useState<BirdState>({
    position: { x: 150, y: 300 },
    velocity: 0,
    rotation: 0,
  });

  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const obstacleIdCounter = useRef(0);
  const lastObstacleX = useRef(0);

  const resetGame = useCallback(() => {
    setBird({
      position: { x: 150, y: 300 },
      velocity: 0,
      rotation: 0,
    });
    setObstacles([]);
    setScore(0);
    obstacleIdCounter.current = 0;
    lastObstacleX.current = 0;
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState('playing');
  }, [resetGame]);

  const pauseGame = useCallback(() => {
    setGameState('paused');
  }, []);

  const resumeGame = useCallback(() => {
    setGameState('playing');
  }, []);

  const flap = useCallback(() => {
    if (gameState === 'playing') {
      setBird(prev => ({
        ...prev,
        velocity: gameConfig.flapStrength,
        rotation: -20,
      }));
    }
  }, [gameState]);

  const checkCollision = useCallback((birdPos: { x: number; y: number }, obstacles: Obstacle[]): boolean => {
    const birdRadius = gameConfig.birdSize / 2;
   
    // Check ground and ceiling collision
    if (birdPos.y - birdRadius <= 0 || birdPos.y + birdRadius >= gameConfig.gameHeight - 64) {
      return true;
    }

    // Check obstacle collision
    for (const obstacle of obstacles) {
      if (
        birdPos.x + birdRadius > obstacle.x &&
        birdPos.x - birdRadius < obstacle.x + obstacle.width
      ) {
        if (
          birdPos.y - birdRadius < obstacle.gapY ||
          birdPos.y + birdRadius > obstacle.gapY + obstacle.gapSize
        ) {
          return true;
        }
      }
    }

    return false;
  }, []);

  const updateGame = useCallback((deltaTime: number) => {
    setBird(prevBird => {
      const newVelocity = prevBird.velocity + gameConfig.gravity * deltaTime;
      const newY = prevBird.position.y + newVelocity * deltaTime;
      const newRotation = Math.max(-90, Math.min(90, newVelocity * 50));

      const newBirdState = {
        position: { x: prevBird.position.x, y: newY },
        velocity: newVelocity,
        rotation: newRotation,
      };

      return newBirdState;
    });

    setObstacles(prevObstacles => {
      let newObstacles = prevObstacles.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - gameConfig.obstacleSpeed * deltaTime,
      }));

      // Remove off-screen obstacles
      newObstacles = newObstacles.filter(obstacle => obstacle.x + obstacle.width > -100);

      // Add new obstacles
      const lastObstacle = newObstacles[newObstacles.length - 1];
      const shouldAddObstacle = !lastObstacle || lastObstacle.x < gameConfig.gameWidth - 300;

      if (shouldAddObstacle) {
        const gapY = Math.random() * (gameConfig.gameHeight - gameConfig.obstacleGap - 200) + 100;
        newObstacles.push({
          id: obstacleIdCounter.current++,
          x: gameConfig.gameWidth,
          gapY,
          gapSize: gameConfig.obstacleGap,
          width: gameConfig.obstacleWidth,
          passed: false,
        });
        lastObstacleX.current = gameConfig.gameWidth;
      }

      return newObstacles;
    });

    // Check for scoring and collisions
    setBird(currentBird => {
      setObstacles(currentObstacles => {
        // Check collisions
        if (checkCollision(currentBird.position, currentObstacles)) {
          setGameState('gameOver');
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('react-a-flap-high-score', score.toString());
          }
        }

        // Check scoring
        const newObstacles = currentObstacles.map(obstacle => {
          if (!obstacle.passed && obstacle.x + obstacle.width < currentBird.position.x) {
            setScore(prev => prev + 1);
            return { ...obstacle, passed: true };
          }
          return obstacle;
        });

        return newObstacles;
      });

      return currentBird;
    });
  }, [score, highScore, checkCollision]);

  useGameLoop(updateGame, gameState === 'playing');

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'playing') {
          flap();
        } else if (gameState === 'menu') {
          startGame();
        } else if (gameState === 'gameOver') {
          startGame();
        }
      } else if (e.code === 'Escape') {
        if (gameState === 'playing') {
          pauseGame();
        } else if (gameState === 'paused') {
          resumeGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, flap, startGame, pauseGame, resumeGame]);

  return (
    <div
      className="relative mx-auto bg-gradient-to-b from-blue-400 to-blue-200 overflow-hidden cursor-pointer select-none"
      style={{
        width: `${Math.min(gameConfig.gameWidth, window.innerWidth)}px`,
        height: `${Math.min(gameConfig.gameHeight, window.innerHeight - 100)}px`
      }}
      onClick={flap}
      onTouchStart={(e) => {
        e.preventDefault();
        flap();
      }}
    >
      <Background />
      <Bird bird={bird} size={gameConfig.birdSize} />
      <Obstacles obstacles={obstacles} gameHeight={gameConfig.gameHeight} />
      <Scoreboard score={score} highScore={highScore} gameState={gameState} />
      <Menu
        gameState={gameState}
        score={score}
        highScore={highScore}
        onStart={startGame}
        onResume={resumeGame}
        onRestart={startGame}
      />
    </div>
  );
};