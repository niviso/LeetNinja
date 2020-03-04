import React from 'react';
import {View,Text } from 'react-native';
import styles from "./style.scss";

export default function Enemy(props){
      const {state} = props;


      const CharacterStyle = {backgroundColor: 'red',overflow: 'hidden',height: state.size.y,width: state.size.x};

      return (
        <View style={{...CharacterStyle,left: state.position.x,top: state.position.y}} pointerEvents="none">
    <Text>Colliding with: {state.colliding.target}</Text>


      </View>
      );
}
