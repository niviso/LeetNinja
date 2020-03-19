import React,{useContext,useEffect} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image,Text,TouchableOpacity} from 'react-native';
import Background from '../../components/background/background';
import AudioHelper from '../../helpers/AudioHelper'

export default function Start(props) {
  const {screenHeight,screenWidth,setScreen} = props;
  const [state,setState] = useContext(GameContext);
  AudioHelper.play(require('../../assets/sound/downloaded/tropical_loop.wav'),true);

  return (
    <TouchableOpacity onPress={() => setScreen('game')}>
    <View style={{
      width: screenWidth,
      height: screenHeight,
    }}>
    <Background/>
    <View style={{
      width: screenWidth,
      height: screenHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Start Game</Text>
    </View>
    </View>
    </TouchableOpacity>

  );
}
