import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200"></div>
      
      {/* Clouds */}
      <div className="absolute top-10 left-10 w-20 h-12 bg-white/70 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute top-20 right-20 w-16 h-8 bg-white/60 rounded-full blur-sm animate-pulse delay-1000"></div>
      <div className="absolute top-32 left-1/3 w-24 h-10 bg-white/50 rounded-full blur-sm animate-pulse delay-2000"></div>
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 via-green-500 to-green-400"></div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-700 to-green-600"></div>
      
      {/* Grass details */}
      <div className="absolute bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-emerald-600 to-emerald-500 opacity-70"></div>
    </div>
  );
};