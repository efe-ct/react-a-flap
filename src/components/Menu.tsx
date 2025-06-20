import React from 'react';
import type { GameState } from '../types/game';

interface MenuProps {
  gameState: GameState;
  score: number;
  highScore: number;
  onStart: () => void;
  onResume: () => void;
  onRestart: () => void;
}

export const Menu: React.FC<MenuProps> = ({ 
  gameState, 
  score, 
  highScore, 
  onStart, 
  onResume, 
  onRestart 
}) => {
  if (gameState === 'playing') return null;

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4">
        {gameState === 'menu' && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">React-A-Flap</h1>
            <p className="text-gray-600 mb-6">Tap or press spacebar to flap!</p>
            <button
              onClick={onStart}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Game
            </button>
          </>
        )}
        
        {gameState === 'paused' && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Paused</h2>
            <button
              onClick={onResume}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Resume
            </button>
          </>
        )}
        
        {gameState === 'gameOver' && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <div className="mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">{score}</div>
              {score > highScore ? (
                <div className="text-green-600 font-medium">New High Score! 🎉</div>
              ) : (
                <div className="text-gray-600">Best: {highScore}</div>
              )}
            </div>
            <button
              onClick={onRestart}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};