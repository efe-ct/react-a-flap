import React from 'react';
import type { Obstacle } from '../types/game';

interface ObstaclesProps {
  obstacles: Obstacle[];
  gameHeight: number;
}

export const Obstacles: React.FC<ObstaclesProps> = ({ obstacles, gameHeight }) => {
  return (
    <>
      {obstacles.map((obstacle) => (
        <div key={obstacle.id} className="absolute z-10">
          {/* Top pipe */}
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-600 border-2 border-green-700 rounded-b-lg shadow-lg relative"
            style={{
              left: `${obstacle.x}px`,
              top: '0px',
              width: `${obstacle.width}px`,
              height: `${obstacle.gapY}px`,
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-green-400 to-emerald-500 border-b-2 border-green-700 rounded-b-lg"></div>
          </div>
          
          {/* Bottom pipe */}
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-600 border-2 border-green-700 rounded-t-lg shadow-lg relative"
            style={{
              left: `${obstacle.x}px`,
              top: `${obstacle.gapY + obstacle.gapSize}px`,
              width: `${obstacle.width}px`,
              height: `${gameHeight - obstacle.gapY - obstacle.gapSize}px`,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-green-400 to-emerald-500 border-t-2 border-green-700 rounded-t-lg"></div>
          </div>
        </div>
      ))}
    </>
  );
};