import React,{useState,useEffect,useContext} from 'react';
import {View,Image,TouchableOpacity,Text} from 'react-native';
import styles from "./style.scss";
import Idle from '../../assets/idle.gif';
import Jumping from '../../assets/jump.png';
import Run from '../../assets/run.gif';
import Background from '../../assets/bg2.png';
import { GameContext,GameProvider } from "../../Contexts/GameContext";

export default function Index(props) {

  const {screenHeight,screenWidth} = props;
  const [state,setState] = useContext(GameContext);
  const [holdingInput,setHoldingInput] = useState(false);
  const speed = 20;
  const World = [

    {
    name: 'block',
    size: {
      x: 200,
      y: 100
    },
    position:{
      x: 500,
      y: 150
    }
  },
  {
  name: 'block',
  size: {
    x: 20,
    y: 20
  },
  position:{
    x: 200,
    y: 100
  }
  }
];


  const Jump = () => {
    var tmpState = JSON.parse(JSON.stringify(state));

    if(state.player.isGrounded){
      tmpState.player.directionVector.y = -40;
      tmpState.player.isGrounded = false;
      setState(tmpState);

    } else if(state.player.isTouchingWall && !tmpState.player.isGrounded){
      if(tmpState.player.directionVector.direction == "right"){
      tmpState.player.directionVector.y = -40;
      tmpState.player.directionVector.x = 3;
      tmpState.player.directionVector.direction = "left";
    } else {
      tmpState.player.directionVector.y = -40;
      tmpState.player.directionVector.x = -3;
      tmpState.player.directionVector.direction = "right";
    }
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

     if(tmpState.player.activeDrag && tmpState.player.directionVector.direction == "left"){
      tmpState.player.directionVector.x = tmpState.player.directionVector.x - tmpState.player.drag;
     }

     if(tmpState.player.activeDrag && tmpState.player.directionVector.direction == "right"){
      tmpState.player.directionVector.x = tmpState.player.directionVector.x + tmpState.player.drag;
     }

     if(tmpState.player.directionVector.x <= 0 && tmpState.player.activeDrag && tmpState.player.directionVector.direction == "left"){
       tmpState.player.activeDrag = false;
       tmpState.player.directionVector.x = 0;
     }

     if(tmpState.player.directionVector.x >= 0 && tmpState.player.activeDrag && tmpState.player.directionVector.direction == "right"){
       tmpState.player.activeDrag = false;
       tmpState.player.directionVector.x = 0;
     }

     tmpState.player.position = {
       x: tmpState.player.position.x + (tmpState.player.directionVector.x * speed),
       y: tmpState.player.position.y + tmpState.player.directionVector.y
     }

     tmpState.player.isTouchingWall = false;



     //COLLISION DETECTION DEFAULT
     if(tmpState.player.position.y > (screenHeight-tmpState.player.size.y)){
      tmpState.player.directionVector.y = 0;
      tmpState.player.position.y = screenHeight - tmpState.player.size.y;
      tmpState.player.isGrounded = true;
     }
     if(tmpState.player.position.x <= 0 ){
      tmpState.player.directionVector.x = 0;
      tmpState.player.position.x = 0;
      tmpState.player.isTouchingWall = true;
     }

     //COLLISION DETECTION World

     const PlayerLeft = tmpState.player.position.x;
     const PlayerRight = PlayerLeft + tmpState.player.size.x;
     const PlayerTop = tmpState.player.position.y;
     const PlayerBottom = PlayerTop + tmpState.player.size.y;

     const PlayerWidth = tmpState.player.size.x;
     const PlayerHeight = tmpState.player.size.y;

    for(var i = 0;i!=World.length;i++){

      const ObjLeft = World[i].position.x;
      const ObjRight = ObjLeft + World[i].size.x;
      const ObjTop = World[i].position.y;
      const ObjBottom = ObjTop + World[i].size.y;

      const ObjWidth = World[i].size.x;
      const ObjHeight = World[i].size.y;

      if(PlayerRight > ObjLeft && PlayerLeft < ObjRight && PlayerTop >= ObjTop && !tmpState.player.isGrounded){
        console.log("CHAR COLLISION TOP");
        tmpState.player.directionVector.y = tmpState.gravity;
      } else if(PlayerLeft < ObjRight && PlayerBottom <= ObjBottom){
        console.log("CHAR COLLISION LEFT");
        tmpState.player.position.x = ObjRight;
        tmpState.player.directionVector.x = 0;
        tmpState.player.isTouchingWall = true;
      }

    }

     if(JSON.stringify(tmpState) !== JSON.stringify(state)){
      setState(tmpState);
      console.log(JSON.stringify(tmpState.player));
    }
   }, (1000/state.FPS));
  return () => clearInterval(interval);
}, [state]);


  const CharacterStyle = {backgroundColor: 'rgba(0,0,0,0.1)',overflow: 'hidden',height: state.player.size.y,width: state.player.size.x,transform : [{scaleX: state.player.directionVector.direction=='right' ? -1 : 1 }] };


  return (
    <View style={styles.container}>
      <Image style={{ width: screenWidth, height: screenHeight,position: 'absolute',opacity: 0.1 }} source={Background} resizeMode="repeat" />
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

      <View style={{...styles.character,left: state.player.position.x,top: state.player.position.y}} pointerEvents="none">
        {(state.player.isWalking && state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Run} />)}
        {(!state.player.isWalking && state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Idle} />)}
        {(!state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Jumping} />)}
      </View>
      {
        World.map((item,i) => <View key={i} style={{...styles.block,width: item.size.x,height:item.size.y,top: item.position.y,left: item.position.x}}><Text>1337</Text></View>)
      }
    </View>
  );
}
