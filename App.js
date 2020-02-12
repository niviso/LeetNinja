import React from 'react';
import Index from './views/index/index';
import { GameProvider } from "./Contexts/GameContext";
import {View,Dimensions,TouchableWithoutFeedback,Text} from 'react-native';
import { Audio } from 'expo-av';

async function Test() {
const soundObject = new Audio.Sound();
try {
  await soundObject.loadAsync(require('./assets/sound/bg2.wav'));
  soundObject.setIsLoopingAsync(true);

  await soundObject.playAsync();
  // Your sound is playing!
} catch (error) {
  // An error occurred!
}
}


export default function App() {
  Test();
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
  return (
    <GameProvider>
      <Index screenHeight={screenHeight} screenWidth={screenWidth}/>
    </GameProvider>
  );
}
