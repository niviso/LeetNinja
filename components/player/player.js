import React,{useState, useContext} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image} from 'react-native';
import styles from "./style.scss";
import Idle from '../../assets/idle.gif';
import Jumping from '../../assets/jump.png';
import Run from '../../assets/run.gif';
export default function Player() {
 const [state,setState] = useContext(GameContext);
 const CharacterStyle = {overflow: 'hidden',height: state.player.size.y,width: state.player.size.x,transform : [{scaleX: state.player.directionVector.direction=='right' ? -1 : 1 }] };

  return (
    <View style={{...styles.character,left: state.player.position.x,top: state.player.position.y}} pointerEvents="none">
    {(state.player.isWalking && state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Run} />)}
    {(!state.player.isWalking && state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Idle} />)}
    {(!state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Jumping} />)}
  </View>
  );
}
