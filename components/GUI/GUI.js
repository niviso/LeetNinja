import React,{useState,useEffect,useContext} from 'react';
import {View,Image,TouchableOpacity,Text,NativeModules  } from 'react-native';
import styles from "./style.scss";
import AudioHelper from '../../helpers/AudioHelper'
import { PlayerContext } from "../../Contexts/PlayerContext";
import {jump,jump_02,projectile_01} from '../../helpers/sounds';
import Engine from '../../engine/engine';

export default function GUI() {
  const [state,setState] = useContext(PlayerContext);

  const Jump = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    if(state.isGrounded){
      tmpState.directionVector.y = -state.forceOnJump;
      tmpState.isGrounded = false;
      setState(tmpState);
      AudioHelper.init(jump);


    } else if(state.isTouchingWall && !tmpState.isGrounded){
      if(tmpState.directionVector.direction == "right"){
      tmpState.directionVector.y = -state.forceOnJump;
      tmpState.directionVector.x = state.walkingSpeed;
      tmpState.directionVector.direction = "left";
      AudioHelper.init(jump_02,false,0.4);


    } else {
      tmpState.directionVector.y = -state.forceOnJump;
      tmpState.directionVector.x = -state.walkingSpeed;
      tmpState.directionVector.direction = "right";
      AudioHelper.init(jump_02,false,0.4);


    }
      tmpState.activeDrag = true;
      tmpState.isGrounded = false;
      setState(tmpState);
    }
  }

  const reset = () => {
      NativeModules.DevSettings.reload();
  }
  const ProjectTile = () => {
    AudioHelper.init(projectile_01);

    Engine.AddProjectile(state.position.x+(state.directionVector.direction == 'left' ?  state.size.x : -state.size.x/2),state.position.y + 30,state.directionVector.direction);

  }

  const goLeft = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.activeDrag = false;
    tmpState.directionVector.x = state.walkingSpeed/2;
    tmpState.directionVector.direction = "left";
    tmpState.isWalking = true;
    setState(tmpState);

  }
  const goRight = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.activeDrag = false;
    tmpState.directionVector.x = -state.walkingSpeed/2;
    tmpState.directionVector.direction = "right";
    tmpState.isWalking = true;
    setState(tmpState);

  }

  const stopWalking = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.activeDrag = true;
    tmpState.isWalking = false;
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
        <TouchableOpacity activeOpacity={0.5} onPressIn={()=> ProjectTile()}>
          <View style={styles.btnB}>
            <Text style={styles.playButtons}>B</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPressIn={()=> reset()}>
          <View style={styles.btnB}>
            <Text style={styles.playButtons}>R</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
