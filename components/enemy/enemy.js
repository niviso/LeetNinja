import React from 'react';
import {View,Text } from 'react-native';
import styles from "./style.scss";

export default function Enemy(props){
      const {state} = props;


      const CharacterStyle = {backgroundColor: 'red',overflow: 'hidden',height: state.size.y,width: state.size.x,transform : [{scaleX: state.directionVector.direction=='right' ? -1 : 1 }] };

      return (
        <View style={{...CharacterStyle,left: state.position.x,top: state.position.y}} pointerEvents="none">


      </View>
      );
}
