import React,{useContext,useEffect,useState} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image,Text,TouchableOpacity} from 'react-native';
import Background from '../../components/background/background';
import AudioHelper from '../../helpers/AudioHelper';
import Ripple from '../../assets/player/run.gif';
import Ninja from '../../assets/start.png';

import styles from "./style.scss";
import {start_bgm,confirm} from '../../helpers/sounds';
export default function Start(props) {
  const {screenHeight,screenWidth,setScreen} = props;
  const [activateStart,setActivateStart] = useState(false);
  const [state,setState] = useContext(GameContext);
  useEffect(() => {
    AudioHelper.play(start_bgm,true,0.4);
    return () => {
        AudioHelper.stop(start_bgm);
    }
  }, []);
  Start = () => {
    AudioHelper.play(confirm,false,1);
    setActivateStart(true);
    setTimeout(x=>{
      setScreen('game')
      AudioHelper.stop(start_bgm);
    },2000);
  }
  return (
    <TouchableOpacity onPress={() => Start()}>
    <View style={{
      width: screenWidth,
      height: screenHeight,
    }}>
    <View style={{
      width: screenWidth,
      height: screenHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Image source={Ninja} style={styles.ripple}/>
    </View>
    {activateStart && <Image source={Ripple} resizeMode="contain" style={styles.ripple2}/> }

    </View>
    </TouchableOpacity>

  );
}
