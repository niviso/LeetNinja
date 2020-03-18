import React from 'react';
import Index from './views/index/index';
import {Dimensions} from 'react-native';




export default function App() {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
  return (
      <Index screenHeight={screenHeight} screenWidth={screenWidth}/>
  );
}
