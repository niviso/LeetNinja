import React from 'react';
import {View,Text,Image,ScrollView } from 'react-native';
import styles from "./style.scss";
import Idle from '../../assets/enemies/bee/idle.gif';
import Knight from '../../assets/enemies/knight.png';
import Sprite from '../sprite/sprite';

export default function Enemy(props){
      const {state} = props;
  
      const CharacterStyle = {transform : [{scaleX: state.directionVector.direction=='right' ? -1 : 1 }] };

      return (
        <View style={{...styles.character,left: state.position.x,top: state.position.y}} pointerEvents="none">
        <Text style={{position: 'absolute', color: 'white',width: 150, top: -20,backgroundColor: 'black',textAlign: 'center'}}>Colliding with: {state.colliding.target}</Text>
        <Text style={{position: 'absolute', color: 'white',width: 150, top: -40,backgroundColor: 'black',textAlign: 'center'}}>X pos: {state.position.x}</Text>
        <Sprite source={Knight} frames={5} styling={CharacterStyle} fps={5}/>
      </View>
      );
}
