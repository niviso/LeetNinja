import React, { useState } from 'react';

const GameContext = React.createContext([{}, () => {}]);

const GameProvider = (props) => {
  const [state, setState] = useState({
    currentColor: null,
    timeToNextColor: 0,
    player:{
      name: 0,
      class: null,
      points: 0
    }
  });
  return (
    <GameContext.Provider value={[state, setState]}>
      {props.children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
