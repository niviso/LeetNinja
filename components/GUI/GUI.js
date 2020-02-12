import React,{useState,useEffect,useContext} from 'react';
import {View,Image,TouchableOpacity,Text,ScrollView  } from 'react-native';
import styles from "./style.scss";
import { GameContext,GameProvider } from "../../Contexts/GameContext";
import { Audio } from 'expo-av';

export default function GUI() {
  const [state,setState] = useContext(GameContext);
  async function JumpSound() {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/sound/jump.wav'));

    await soundObject.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  }
  }

  async function JumpSound_02() {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require('../../assets/sound/jump_02.wav'));

    await soundObject.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  }
  }
  const Jump = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    if(state.player.isGrounded){
      tmpState.player.directionVector.y = -30;
      tmpState.player.isGrounded = false;
      setState(tmpState);
      JumpSound();


    } else if(state.player.isTouchingWall && !tmpState.player.isGrounded){
      if(tmpState.player.directionVector.direction == "right"){
      tmpState.player.directionVector.y = -30;
      tmpState.player.directionVector.x = 1.6;
      tmpState.player.directionVector.direction = "left";
      JumpSound_02();

    } else {
      tmpState.player.directionVector.y = -30;
      tmpState.player.directionVector.x = -1.6;
      tmpState.player.directionVector.direction = "right";
      JumpSound_02();

    }
      tmpState.player.activeDrag = true;
      tmpState.player.isGrounded = false;
      setState(tmpState);
    }
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
        <TouchableOpacity activeOpacity={0.5} onPressIn={()=> Jump()}>
          <View style={styles.btnB}>
            <Text style={styles.playButtons}>B</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>

  );
}
