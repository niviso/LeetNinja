import React, { useState } from 'react';

const PlayerContext = React.createContext([{}, () => {}]);

const PlayerProvider = (props) => {
  const [playerState, setPlayerState] = useState({
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
  });
  return (
    <PlayerContext.Provider value={[playerState, setPlayerState]}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export { PlayerContext, PlayerProvider };
