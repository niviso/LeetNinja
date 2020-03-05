import React from 'react';
import {View,Text } from 'react-native';
import styles from "./style.scss";

export default function Enemy(props){
      const {state} = props;

      const CharacterStyle = {backgroundColor: 'red',overflow: 'hidden',height: state.size.y,width: state.size.x};

      return (
        <View style={{...styles.character,left: state.position.x,top: state.position.y}} pointerEvents="none">
          <View style={styles.box}></View>
        <Text style={{position: 'absolute', color: 'white',width: 150, top: -20,backgroundColor: 'black',textAlign: 'center'}}>Colliding with: {state.colliding.target}</Text>
        <Text style={{position: 'absolute', color: 'white',width: 150, top: -40,backgroundColor: 'black',textAlign: 'center'}}>X pos: {state.position.x}</Text>

      </View>
      );
}
