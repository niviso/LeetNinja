import React, { useState } from 'react';

const GameContext = React.createContext([{}, () => {}]);

const GameProvider = (props) => {
  const [state, setState] = useState({
    FPS: 60,
    gravity: 5,
    player:{ 
      directionVector: {
        x: 0,
        y: 0, 
        direction: "left"
      },
      size: {
        x: 50,
        y: 50
      },
      name: "",
      position: {
        x: 0,
        y: 0
      },
      isGrounded: false,
      isTouchingWall: false, 
      activeDrag: false,
      drag: 1,
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
