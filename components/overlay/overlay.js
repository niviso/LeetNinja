import React,{useContext} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image,Dimensions,Text} from 'react-native';
import OverlayImg from '../../assets/overlay.png';

export default function Overlay() {
 const [state,setState] = useContext(GameContext);
 const screenWidth = Math.round(Dimensions.get('window').width);
 const screenHeight = Math.round(Dimensions.get('window').height);
  return (
    <View style={{ width: screenWidth, height: screenHeight,position: 'absolute',opacity: 0.2}}>
          <Image style={{ width: screenWidth, height: screenHeight}} source={OverlayImg} resizeMode="stretch" />
    </View>
  );
}
