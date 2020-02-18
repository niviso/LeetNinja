import React,{useEffect,useContext} from 'react';
import {View,Image,Text,ScrollView  } from 'react-native';
import styles from "./style.scss";
import Player from '../../components/player/player';
import GUI from '../../components/GUI/GUI';
import { GameContext } from "../../Contexts/GameContext";
import World from '../../data/world';
import Background from '../../components/background/background';
import Overlay from '../../components/overlay/overlay';
import Engine from '../../engine/engine';
import settings from '../../settings';
import Enemy from '../../components/enemy/enemy';
export default function Index(props) {

  const {screenHeight,screenWidth} = props;
  const [state,setState] = useContext(GameContext);



 useEffect(() => {
  const interval = setInterval(() => {
     var tmpState = JSON.parse(JSON.stringify(state));
    tmpState = Engine(state);

     if(JSON.stringify(tmpState) !== JSON.stringify(state)){
      setState(tmpState);
    }    
   }, (1000/settings.FPS));
  return () => clearInterval(interval);
}, [state]);




  return (


    <View  style={styles.container}>
      <Background/>
      <GUI/>
      <ScrollView  style={styles.container} alwaysBounceHorizontal={false} contentOffset={{x:state.player.position.x - (screenWidth/2),y: state.player.position.y <= (screenHeight - state.player.size.y*2) && state.player.position.y + (state.player.size.y*2) - screenHeight}} horizontal={true}>
      <Player/>
      <Enemy/>
      { World.map((item,i) => <View key={i} style={{...styles.block,width: item.size.x,height:item.size.y,top: item.position.y,left: item.position.x}}>
      {item.text && <Text style={styles.blockTxt}>{item.text}</Text>}
      {item.texture && <Image style={{width: '100%',height: '100%'}}  resizeMode="repeat" source={item.texture}/>}
      </View>)}
    </ScrollView>
      <Overlay/>
    </View>
  );
}
