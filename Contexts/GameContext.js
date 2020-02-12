import React, { useState } from 'react';

const GameContext = React.createContext([{}, () => {}]);

const GameProvider = (props) => {
  const [state, setState] = useState({
    FPS: 50,
    gravity: 4,
    player:{
      directionVector: {
        x: 0,
        y: 0,
        direction: "left"
      },
      size: {
        x: 66,
        y: 100
      },
      name: "",
      position: {
        x: 0,
        y: 0
      },
      isGrounded: false,
      isTouchingWall: false,
      activeDrag: false,
      isWalking: false,
      drag: 0.2,
      speed: 20
    }
  });
  return (
    <GameContext.Provider value={[state, setState]}>
      {props.children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
