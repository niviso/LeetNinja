import React,{useState,useEffect,useContext} from 'react';
import {View,Image,TouchableOpacity,Text} from 'react-native';
import styles from "./style.scss";
import Ninja from '../../assets/ninja.png';
import Background from '../../assets/bg2.png';
import { GameContext,GameProvider } from "../../Contexts/GameContext";
import Player from '../../components/player/player';
export default function Index(props) {

  const {screenHeight,screenWidth} = props;
  const [state,setState] = useContext(GameContext);
  const [update,doUpdate] = useState(false);

  const speed = 20;



  const Jump = () => {
    if(state.player.isGrounded){
      var tmpState = state;
      tmpState.player.directionVector.y = -40;
      tmpState.player.isGrounded = false;
      setState(tmpState);
    }
  }

  const goLeft = () => {
    var tmpState = state;
    tmpState.player.directionVector.x = 1;
    tmpState.player.directionVector.direction = "left";
    setState(tmpState);
    doUpdate(true);

  }

  const goRight = () => {
    var tmpState = state;
    tmpState.player.directionVector.x = -1;
    tmpState.player.directionVector.direction = "right";
    setState(tmpState);
    doUpdate(true);

  }

  const stopWalking = () => {
    var tmpState = state;
    tmpState.player.directionVector.x = 0;
    setState(tmpState);
  }
 useEffect(() => {
  const interval = setInterval(() => {
     var charPos = [0,0]; // We need to calculate position before setting it
     var tmpState = state;
     tmpState.player.directionVector = {
       x: tmpState.player.directionVector.x,
       y: tmpState.player.directionVector.y + state.gravity
     }
     tmpState.player.position = {
       x: tmpState.player.position.x + (tmpState.player.directionVector.x * speed),
       y: tmpState.player.position.y + tmpState.player.directionVector.y
     }
     if(tmpState.player.position.y > (screenHeight-100)){
      charPos[screenHeight - 100];
      tmpState.player.directionVector.y = 0;
      tmpState.player.position.y = screenHeight - 100;
      tmpState.player.isGrounded = true;
     }
     setState(tmpState);
      console.log(JSON.stringify(state.player))     
   }, (1000/state.FPS));
  return () => clearInterval(interval);
}, [setState]);



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
        <Image style={{ width: 100, height: 100,transform : [{scaleX: state.player.directionVector.direction=='right' ? -1 : 1 }] }} source={Ninja} />
      </View>
    </View>
  );
}
