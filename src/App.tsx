import { GameContainer } from './components/GameContainer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
          React-A-Flap
        </h1>
        <p className="text-white/80 text-lg">
          A modern homage to classic one-tap platforms
        </p>
        <button className="test-button mt-4">Test Button</button>
      </div>

      <GameContainer />

      <div className="mt-6 text-center text-white/60 text-sm max-w-md">
        <p className="mb-2">
          <span className="font-medium">Desktop;</span> Spacebar to flap, ESC to  pause
        </p>
        <p>
          <span className="font-medium">Mobile;</span> Tap anywhere to flap
        </p>
      </div>

      <footer className="mt-8 text-center text-white/40 text-xs">
        <p>React-A-flap is a fan-made, non-commercial homage inspired by the classic one-tap platform</p>
        <p className="mt-1">All code and assets are original. Built with React & TypeScript</p>
      </footer>
    </div>
  )
}

export default App;




