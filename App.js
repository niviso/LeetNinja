import React from 'react';
import Index from './views/index/index';
import { GameProvider } from "./Contexts/GameContext";
import {View,Dimensions,TouchableWithoutFeedback,Text} from 'react-native';

export default function App() {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
  return (
    <GameProvider>
      <Index screenHeight={screenHeight}/>
    </GameProvider>
  );
}
