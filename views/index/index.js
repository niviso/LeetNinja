import React,{useContext,useEffect,useState} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import GameLevel from '../gameLevel/gameLevel';
import { GameProvider } from "../../Contexts/GameContext";
import Engine from '../../engine/engine';
import Start from '../start/start';
export default function Index(props) {
  const {screenHeight,screenWidth} = props;
  const [screen,setScreen] = useState('game'); //start/game then level/dead/settings et c
  const [state,setState] = useContext(GameContext);
  return (
    <GameProvider>
    {screen == 'start' && <Start setScreen={setScreen} screenHeight={screenHeight} screenWidth={screenWidth}/> }
    {screen == 'game' && <GameLevel setScreen={setScreen} screenHeight={screenHeight} screenWidth={screenWidth}/> }

    </GameProvider>

  );
}
