import React,{useContext,useState} from 'react';
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
import Projectile from '../../components/projectile/projectile';
import AudioHelper from '../../helpers/AudioHelper';
import {game_bgm} from '../../helpers/sounds';

import Loading from '../loading/loading';
import Settings from '../../settings';
import Engine from '../../engine/engine';

export default function GameLevel(props) {
  const {screenHeight,screenWidth} = props;
  const [levelLoaded,setLevelLoaded] = useState(false);
  const [state,setState] = useContext(GameContext);
  const Blocks =  Engine.GetWorld().map((item,i) => <Block key={i} item={item}/>);
  const Enemies =  Engine.GetEnemies().map((item,i) => <Enemy key={i} state={item}/>);
  const Projectiles =  Engine.GetProjectiles().map((item,i) => <Projectile key={i} state={item}/>); // Or something similar




  var LoadingInterval = false;
  UpdateWorld = () => {
    Engine.DeleteWorldObject('block 5');
  }

  ForceUpdate = () => {

  }

  if(!Engine.hasStarted()){
    Engine.Init({
      world: World,
      forceUpdate: ForceUpdate
    });
  }

 LoadingInterval = setInterval(x=>{
    if(Engine.hasStarted()){
      setLevelLoaded(true);
      clearInterval(LoadingInterval);
    }
  },2500);

  GameView = () => {
    AudioHelper.play(game_bgm,true);

    return (
      <PlayerProvider>
        <View  style={styles.container}>
          <Background/>
          <ScrollView  style={styles.container} alwaysBounceHorizontal={false} contentOffset={{x:state.camera.x - (screenWidth/2),y: state.camera.y <= (screenHeight - Settings.Cameraoffset) && state.camera.y + Settings.Cameraoffset - screenHeight}} horizontal={true}>
          <Player/>
          {Blocks}
          {Enemies}
          {Projectiles}
          </ScrollView>
          <Overlay/>
          <GUI/>
          <TouchableOpacity style={{padding: 5,zIndex:9999999,position: 'absolute',backgroundColor: 'red'}} onPressIn={() => UpdateWorld()}>
              <Text>Update World</Text>
          </TouchableOpacity>
        </View>
      </PlayerProvider>
    )
  }
  return (
    <View>

    {levelLoaded ? GameView() : <Loading duration={2500}/>}

    </View>

  );
}
