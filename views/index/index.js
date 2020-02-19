import React,{useContext} from 'react';
import {View,Image,Text,ScrollView  } from 'react-native';
import styles from "./style.scss";
import Player from '../../components/player/player';
import GUI from '../../components/GUI/GUI';
import { GameContext } from "../../Contexts/GameContext";
import { PlayerProvider } from "../../Contexts/PlayerContext";

import World from '../../data/world';
import Background from '../../components/background/background';
import Overlay from '../../components/overlay/overlay';
import Enemy from '../../components/enemy/enemy';
export default function Index(props) {

  const {screenHeight,screenWidth} = props;
  const [state,setState] = useContext(GameContext);

  return (

    <PlayerProvider>

    <View  style={styles.container}>
      <Background/>
      <ScrollView  style={styles.container} alwaysBounceHorizontal={false} contentOffset={{x:state.camera.x - (screenWidth/2),y: state.camera.y <= (screenHeight - 200) && state.camera.y + 200 - screenHeight}} horizontal={true}>
      <Player/>
      <Enemy/>
      { World.map((item,i) => <View key={i} style={{...styles.block,width: item.size.x,height:item.size.y,top: item.position.y,left: item.position.x}}>
      {item.text && <Text style={styles.blockTxt}>{item.text}</Text>}
      {item.texture && <Image style={{width: '100%',height: '100%'}}  resizeMode="repeat" source={item.texture}/>}
      </View>)}
    </ScrollView>
      <Overlay/>
      <GUI/>

    </View>
    </PlayerProvider>

  );
}
