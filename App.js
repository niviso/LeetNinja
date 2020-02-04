import React from 'react';
import Index from './views/index/index';
import { GameProvider } from "./Contexts/GameContext";

export default function App() {
  return (
    <GameProvider>
      <Index/>
    </GameProvider>
  );
}
