import React,{useContext} from 'react';
import {View,ScrollView  } from 'react-native';
import styles from "./style.scss";
import Player from '../../components/player/player';
import GUI from '../../components/GUI/GUI';
import { GameContext } from "../../Contexts/GameContext";
import { PlayerProvider } from "../../Contexts/PlayerContext";
import Block from '../../components/block/block';
import World from '../../data/world';
import Background from '../../components/background/background';
import Overlay from '../../components/overlay/overlay';
import Enemy from '../../components/enemy/enemy';
export default function Index(props) {
  const {screenHeight,screenWidth} = props;
  const [state] = useContext(GameContext);
  const Blocks =  World.map((item,i) => <Block key={i} item={item}/>);
  return (

    <PlayerProvider>
    <View  style={styles.container}>
      <Background/>
      <ScrollView  style={styles.container} alwaysBounceHorizontal={false} contentOffset={{x:state.camera.x - (screenWidth/2),y: state.camera.y <= (screenHeight - 200) && state.camera.y + 200 - screenHeight}} horizontal={true}>
      <Player/>
      <Enemy/>
      {Blocks}
    </ScrollView>
      <Overlay/>
      <GUI/>
    </View>
    </PlayerProvider>

  );
}
