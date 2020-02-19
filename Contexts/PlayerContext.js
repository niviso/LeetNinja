import React, { useState } from 'react';
import {NewPlayerObj} from '../engine/boilerPlates';
const PlayerContext = React.createContext([{}, () => {}]);

const PlayerProvider = (props) => {
  const [playerState, setPlayerState] = useState(NewPlayerObj());
  return (
    <PlayerContext.Provider value={[playerState, setPlayerState]}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export { PlayerContext, PlayerProvider };
