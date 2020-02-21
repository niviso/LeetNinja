import React,{useContext} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import GameLevel from '../gameLevel/gameLevel';
import { GameProvider } from "../../Contexts/GameContext";
import Engine from '../../engine/engine';
export default function Index(props) {
  const {screenHeight,screenWidth} = props;
  const [state,setState] = useContext(GameContext);
  Engine.Init({setGameState: setState,gameState:state});
  return (
    <GameProvider>
      <GameLevel screenHeight={screenHeight} screenWidth={screenWidth}/>
    </GameProvider>

  );
}
