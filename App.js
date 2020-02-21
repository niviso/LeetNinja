import React from 'react';
import Index from './views/index/index';
import {Dimensions} from 'react-native';
import AudioHelper from './helpers/AudioHelper'


AudioHelper.play(require('./assets/sound/bg.mp3'),true);


export default function App() {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
  return (
      <Index screenHeight={screenHeight} screenWidth={screenWidth}/>
  );
}
