import React,{useState,useEffect,useContext} from 'react';
import {View,Image,TouchableOpacity,Text} from 'react-native';
import styles from "./style.scss";
import Idle from '../../assets/idle.png';
import Jumping from '../../assets/jumping.png';
import Walking from '../../assets/walking.gif';
import Background from '../../assets/bg2.png';
import { GameContext,GameProvider } from "../../Contexts/GameContext";

export default function Index(props) {

  const {screenHeight,screenWidth} = props;
  const [state,setState] = useContext(GameContext);
  const [holdingInput,setHoldingInput] = useState(false);
  const speed = 20;



  const Jump = () => {
    var tmpState = JSON.parse(JSON.stringify(state));

    if(state.player.isGrounded){
      tmpState.player.directionVector.y = -40;
      tmpState.player.isGrounded = false;
      setState(tmpState);
      
    } else if(state.player.isTouchingWall && !tmpState.player.isGrounded){
      tmpState.player.directionVector.y = -10;
      tmpState.player.directionVector.x = 2.4;
      tmpState.player.directionVector.direction = "left"
      tmpState.player.activeDrag = true;
      tmpState.player.isGrounded = false;
      setState(tmpState);
    }
  }

  const goLeft = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.player.activeDrag = false;
    tmpState.player.directionVector.x = 1;
    tmpState.player.directionVector.direction = "left";
    tmpState.player.isWalking = true;
    setState(tmpState);

  }

  const goRight = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.player.activeDrag = false;
    tmpState.player.directionVector.x = -1;
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
 useEffect(() => {
  const interval = setInterval(() => {
     var tmpState = JSON.parse(JSON.stringify(state));

     tmpState.player.directionVector = {
       x: tmpState.player.directionVector.x,
       y: tmpState.player.directionVector.y + state.gravity,
       direction: tmpState.player.directionVector.direction
     }

     if(tmpState.player.activeDrag){
      tmpState.player.directionVector.x = tmpState.player.directionVector.x - tmpState.player.drag;
     }

     if(tmpState.player.directionVector.x <= 0 && tmpState.player.activeDrag){
       tmpState.player.activeDrag = false;
       tmpState.player.directionVector.x = 0;
     }

     tmpState.player.position = {
       x: tmpState.player.position.x + (tmpState.player.directionVector.x * speed),
       y: tmpState.player.position.y + tmpState.player.directionVector.y
     }

     tmpState.player.isTouchingWall = false;



     //COLLISION DETECTION
     if(tmpState.player.position.y > (screenHeight-100)){
      tmpState.player.directionVector.y = 0;
      tmpState.player.position.y = screenHeight - 100;
      tmpState.player.isGrounded = true;
     }
     if(tmpState.player.position.x <= 0 ){
      tmpState.player.directionVector.x = 0;
      tmpState.player.position.x = 0;
      tmpState.player.isTouchingWall = true;
     }
     if(JSON.stringify(tmpState) !== JSON.stringify(state)){
      setState(tmpState);
      console.log(JSON.stringify(tmpState));
    }
   }, (1000/state.FPS));
  return () => clearInterval(interval);
}, [state]);


  const CharacterStyle = { width: 100, height: 100,transform : [{scaleX: state.player.directionVector.direction=='right' ? -1 : 1 }] };
  return (
    <View style={styles.container}>
      <Image style={{ width: screenWidth, height: screenHeight,position: 'absolute',opacity: 0.2 }} source={Background} resizeMode="repeat" />
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
      <View style={styles.stats}>
        <Text style={styles.headline}>State: {JSON.stringify(state)}</Text>



      </View>
      <View style={{...styles.character,left: state.player.position.x,top: state.player.position.y}} pointerEvents="none">
        {(state.player.isWalking && state.player.isGrounded && <Image style={CharacterStyle} source={Walking} />)}
        {(!state.player.isWalking && !state.player.isTouchingWall && state.player.isGrounded && <Image style={CharacterStyle} source={Idle} />)}
        {(!state.player.isGrounded && <Image style={CharacterStyle} source={Jumping} />)}


      </View>
    </View>
  );
}
