import React, { useState } from 'react';

const GameContext = React.createContext([{}, () => {}]);

const GameProvider = (props) => {
  const [state, setState] = useState({
    gravity: 4,
    camera:{
      x: 0,
      y: 0
    },
    World: [] //Shard it[0-100] [100-200] then check the shard of the player or enemy and move obj to the shard you are in and enemy does not engage if in shard 600-700 and player is in shard 0-100 or even rendered
  });
  return (
    <GameContext.Provider value={[state, setState]}>
      {props.children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
