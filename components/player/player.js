import React,{useEffect, useContext} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image,Text} from 'react-native';
import styles from "./style.scss";
import Idle from '../../assets/player/idle.gif';
import Jumping from '../../assets/player/jump.png';
import Run from '../../assets/player/run.gif';
import settings from '../../settings';
import Engine from '../../engine/engine';
import { PlayerContext } from "../../Contexts/PlayerContext";

export default function Player() {
 const [state,setState] = useContext(GameContext);
 const [playerState,setPlayerState] = useContext(PlayerContext);
 const CharacterStyle = {overflow: 'hidden',height: playerState.size.y,width: playerState.size.x,transform : [{scaleX: playerState.directionVector.direction=='right' ? -1 : 1 }] };
 useEffect(() => {
  const interval = setInterval(() => {
     var tmpState = JSON.parse(JSON.stringify(state));
     var tmpPlayerState = JSON.parse(JSON.stringify(playerState));

     tmpPlayerState = Engine.UpdatePlayer(tmpPlayerState);
     tmpState.camera = tmpPlayerState.position;
    //if(JSON.stringify(tmpPlayerState) !== JSON.stringify(playerState)){
      setPlayerState(tmpPlayerState);
      setState(tmpState);
      Engine.UpdateEnemies();
      Engine.UpdateProjectiles();

    //}


   }, (1000/settings.FPS));
  return () => clearInterval(interval);
}, [playerState]);
  return (
    <View style={{...styles.character,left: playerState.position.x,top: playerState.position.y,opacity: playerState.invincibilityFrames > 0 ? (playerState.invincibilityFrames % 2 ? 0.4 : 0.8) : 1}} pointerEvents="none">
    {(playerState.isWalking && playerState.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Run} />)}
    {(!playerState.isWalking && playerState.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Idle} />)}
    {(!playerState.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Jumping} />)}

  </View>
  );
}
