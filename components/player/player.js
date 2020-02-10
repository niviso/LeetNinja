import React,{useState, useContext} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View} from 'react-native';
import Ninja from '../../assets/ninja.png';
import styles from './styles.scss';
export default function Player() {
 const [state,setState] = useContext(GameContext);
  return (
    <View style={{...styles.character,left: state.player.position.x,top: state.player.position.y}} pointerEvents="none">
        <Image style={{ width: 100, height: 100,transform : [{scaleX: state.player.direction=='right' ? -1 : 1 }] }} source={Ninja} />
    </View>
  );
}
