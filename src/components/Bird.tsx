import React from 'react';
import { BirdState } from '../types/game';

interface BirdProps {
  bird: BirdState;
  size: number;
}

export const Bird: React.FC<BirdProps> = ({ bird, size }) => {
  return (
    <div
      className="absolute transition-all duration-75 ease-out z-20"
      style={{
        left: `${bird.position.x - size / 2}px`,
        top: `${bird.position.y - size / 2}px`,
        transform: `rotate(${bird.rotation}deg)`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-full shadow-lg border-2 border-white relative overflow-hidden">
        {/* Bird body gradient */}
        <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
        
        {/* Eye */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full">
          <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-black rounded-full"></div>
        </div>
        
        {/* Beak */}
        <div className="absolute top-1/2 -right-1 w-2 h-1 bg-orange-600 transform -translate-y-1/2 rounded-r-sm"></div>
        
        {/* Wing */}
        <div className="absolute top-3 left-1 w-4 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-80"></div>
      </div>
    </div>
  );
};


// export const Bird: React.FC<BirdProps> = ({ bird, size }) => {
//     const { x, y } = bird;
    
//     return (
//         <div
//         className="absolute"
//         style={{
//             left: `${x}px`,
//             top: `${y}px`,
//             width: `${size}px`,
//             height: `${size}px`,
//             backgroundColor: 'yellow',
//             borderRadius: '50%',
//             boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)',
//         }}
//         >
//         {/* Optional: Add a small beak or eye */}
//         <div
//             className="absolute"
//             style={{
//             left: '50%',
//             top: '20%',
//             width: '10%',
//             height: '10%',
//             backgroundColor: 'orange',
//             borderRadius: '50%',
//             transform: 'translateX(-50%)',
//             }}
//         ></div>
//         </div>
//     );
//}

//Bird v1
// export const Bird: React.FC<BirdState> = ({ x, y, size }) => {
//   return (
//     <div
//       className="absolute"
//       style={{
//         left: `${x}px`,
//         top: `${y}px`,
//         width: `${size}px`,
//         height: `${size}px`,
//         backgroundColor: 'yellow',
//         borderRadius: '50%',
//         boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)',
//       }}
//     >
//       {/* Optional: Add a small beak or eye */}
//       <div
//         className="absolute"
//         style={{
//           left: '50%',
//           top: '20%',
//           width: '10%',
//           height: '10%',
//           backgroundColor: 'orange',
//           borderRadius: '50%',
//           transform: 'translateX(-50%)',
//         }}
//       ></div>
//     </div>
//   );
// };