import React,{useEffect, useContext,useState} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image} from 'react-native';
import styles from "./style.scss";
import Idle from '../../assets/idle.gif';
import Jumping from '../../assets/jump.png';
import Run from '../../assets/run.gif';
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
     var tmpplayerState = JSON.parse(JSON.stringify(playerState));

     tmpplayerState = Engine.Update(tmpplayerState);
      tmpState.camera = tmpplayerState.position;

     if(JSON.stringify(tmpState) !== JSON.stringify(playerState)){
      setState(tmpState);
      setPlayerState(tmpplayerState);
    }
   }, (1000/settings.FPS));
  return () => clearInterval(interval);
}, [playerState]);
  return (
    <View style={{...styles.character,left: playerState.position.x,top: playerState.position.y}} pointerEvents="none">
    {(playerState.isWalking && playerState.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Run} />)}
    {(!playerState.isWalking && playerState.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Idle} />)}
    {(!playerState.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Jumping} />)}
  </View>
  );
}
