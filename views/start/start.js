import React,{useContext,useEffect,useState} from 'react';
import { GameContext } from "../../Contexts/GameContext";
import {View,Image,Text,TouchableOpacity} from 'react-native';
import Background from '../../components/background/background';
import AudioHelper from '../../helpers/AudioHelper';
import Ripple from '../../assets/test.gif';

import styles from "./style.scss";
import {start_bgm,confirm} from '../../helpers/sounds';
export default function Start(props) {
  const {screenHeight,screenWidth,setScreen} = props;
  const [activateStart,setActivateStart] = useState(false);
  const [state,setState] = useContext(GameContext);
  AudioHelper.play(start_bgm,true,0.4);
  useEffect(() => {
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
    <Background/>
    <View style={{
      width: screenWidth,
      height: screenHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={styles.name}>Start Game</Text>
    </View>
    {activateStart && <Image source={Ripple} style={styles.ripple}/> }

    </View>
    </TouchableOpacity>

  );
}
