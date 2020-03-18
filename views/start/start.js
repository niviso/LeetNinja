import React,{useContext,useEffect} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image,Text} from 'react-native';

export default function Start(props) {
  const {screenHeight,screenWidth,setScreen} = props;
  const [state,setState] = useContext(GameContext);
  return (
    <View style={{
      width: screenWidth,
      height: screenHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}><Text>Start Game</Text></View>

  );
}
