import React from 'react';

interface ScoreboardProps {
  score: number;
  highScore: number;
  gameState: string;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ score, highScore, gameState }) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
        <div className="text-sm font-medium text-gray-600">Score</div>
        <div className="text-2xl font-bold text-gray-800">{score}</div>
      </div>
      
      {gameState !== 'menu' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
          <div className="text-sm font-medium text-gray-600">Best</div>
          <div className="text-xl font-bold text-orange-600">{highScore}</div>
        </div>
      )}
    </div>
  );
};