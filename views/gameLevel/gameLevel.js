import React,{useContext} from 'react';
import {View,ScrollView,Text,TouchableOpacity  } from 'react-native';
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
import Settings from '../../settings';
import Engine from '../../engine/engine';
export default function GameLevel(props) {
  const {screenHeight,screenWidth} = props;
  const [state,setState] = useContext(GameContext);
  const Blocks =  Engine.GetWorld().map((item,i) => <Block key={i} item={item}/>); 
  const Enemies =  Engine.GetEnemies().map((item,i) => <Enemy key={i} state={item}/>); // Or something similar
  UpdateWorld = () => {
    Engine.DeleteWorldObject('block 5');
  }

  ForceUpdate = () => {
    
  }

  if(!Engine.hasStarted()){
    Engine.Init(World,ForceUpdate);
  }

  return (

    <PlayerProvider>
    <View  style={styles.container}>
      <Background/>
      <ScrollView  style={styles.container} alwaysBounceHorizontal={false} contentOffset={{x:state.camera.x - (screenWidth/2),y: state.camera.y <= (screenHeight - Settings.Cameraoffset) && state.camera.y + Settings.Cameraoffset - screenHeight}} horizontal={true}>
      <Player/>
      {Blocks}
      {Enemies}
    </ScrollView>
      <Overlay/>
      <GUI/>
      <TouchableOpacity style={{padding: 5,zIndex:9999999,position: 'absolute',backgroundColor: 'red'}} onPressIn={() => UpdateWorld()}>
          <Text>Update World</Text>
      </TouchableOpacity>
    </View>
    </PlayerProvider>

  );
}
