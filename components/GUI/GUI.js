import React,{useState,useEffect,useContext} from 'react';
import {View,Image,TouchableOpacity,Text,NativeModules  } from 'react-native';
import styles from "./style.scss";
import { GameContext,GameProvider } from "../../Contexts/GameContext";
import AudioHelper from '../../helpers/AudioHelper'



export default function GUI() {
  const [state,setState] = useContext(GameContext);

  const Jump = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    if(state.player.isGrounded){
      tmpState.player.directionVector.y = -30;
      tmpState.player.isGrounded = false;
      setState(tmpState);
      AudioHelper.init(require('../..//assets/sound/jump.wav'));


    } else if(state.player.isTouchingWall && !tmpState.player.isGrounded){
      if(tmpState.player.directionVector.direction == "right"){
      tmpState.player.directionVector.y = -30;
      tmpState.player.directionVector.x = 1.6;
      tmpState.player.directionVector.direction = "left";
      AudioHelper.init(require('../..//assets/sound/jump_02.wav'),0.4);


    } else {
      tmpState.player.directionVector.y = -30;
      tmpState.player.directionVector.x = -1.6;
      tmpState.player.directionVector.direction = "right";
      AudioHelper.init(require('../..//assets/sound/jump_02.wav'),0.4);


    }
      tmpState.player.activeDrag = true;
      tmpState.player.isGrounded = false;
      setState(tmpState);
    }
  }

  const reset = () => {
      NativeModules.DevSettings.reload();

  }

  const goLeft = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.player.activeDrag = false;
    tmpState.player.directionVector.x = 0.6;
    tmpState.player.directionVector.direction = "left";
    tmpState.player.isWalking = true;
    setState(tmpState);

  }
  const goRight = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.player.activeDrag = false;
    tmpState.player.directionVector.x = -0.6;
    tmpState.player.directionVector.direction = "right";
    tmpState.player.isWalking = true;
    setState(tmpState);

  }

  const stopWalking = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.player.activeDrag = true;
    tmpState.player.isWalking = false;
    setState(tmpState);
  }
  return (
    <View style={styles.BtnWrapper}>

      <View style={styles.moveBtnWrapper}>

        <View onTouchStart={()=> goRight() } onTouchEnd={() => stopWalking()}>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.btn}>
              <Text style={styles.playButtons}>L</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View onTouchStart={()=> goLeft()} onTouchEnd={() => stopWalking()}>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.btn}>
              <Text style={styles.playButtons}>R</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionBtnWrapper}>
      <View  onTouchStart={()=> Jump()}>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.btnA}>
            <Text style={styles.playButtons}>A</Text>
          </View>
        </TouchableOpacity>
      </View>
        <TouchableOpacity activeOpacity={0.5} onPressIn={()=> reset()}>
          <View style={styles.btnB}>
            <Text style={styles.playButtons}>B</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>

  );
}
