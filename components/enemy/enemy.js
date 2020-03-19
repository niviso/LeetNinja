import React from 'react';
import {View,Text,Image,ScrollView } from 'react-native';
import styles from "./style.scss";
import Knight from '../../assets/enemies/knight.png';
import Sprite from '../sprite/sprite';

export default function Enemy(props){
      const {state} = props;

      const CharacterStyle = {transform : [{scaleX: state.directionVector.direction=='right' ? -1 : 1 }] };

      return (
        <View style={{...styles.character,left: state.position.x,top: state.position.y,height: state.size.y,width: state.size.x}} pointerEvents="none">
        <Sprite source={Knight} frames={5} styling={CharacterStyle} fps={5}/>
      </View>
      );
}
