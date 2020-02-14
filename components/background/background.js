import React,{useContext} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image,Dimensions} from 'react-native';
import Background from '../../assets/plx-1.png';
import Background1 from '../../assets/plx-2.png';
import Background2 from '../../assets/plx-3.png';
import Background3 from '../../assets/plx-4.png';
export default function Player() {
 const [state,setState] = useContext(GameContext);
 const screenWidth = Math.round(Dimensions.get('window').width);
 const screenHeight = Math.round(Dimensions.get('window').height);
  return (
    <View>
      <Image style={{ width: screenWidth*1.25, height: screenHeight*1.25,position: 'absolute' }} source={Background} resizeMode="stretch" />
      <Image style={{ width: screenWidth*1.25, height: screenHeight*1.25,position: 'absolute',left:(state.player.position.x*0.1)-100,top:(state.player.position.y*0.01) - 50 }} source={Background1} resizeMode="stretch" />
      <Image style={{ width: screenWidth*1.25, height: screenHeight*1.25,position: 'absolute',left:state.player.position.x*0.05,top:(state.player.position.y*0.01) - 50 }} source={Background2} resizeMode="stretch" />
      <Image style={{ width: screenWidth*1.25, height: screenHeight*1.25,position: 'absolute',left:-state.player.position.x*0.02,top:(state.player.position.y*0.01) - 50 }} source={Background3} resizeMode="stretch" />
    </View>
  );
}
