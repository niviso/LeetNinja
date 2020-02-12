import React,{useState,useEffect,useContext} from 'react';
import {View,Image,TouchableOpacity,Text,ScrollView,NativeModules  } from 'react-native';
import styles from "./style.scss";
import Idle from '../../assets/idle.gif';
import Jumping from '../../assets/jump.png';
import Run from '../../assets/run.gif';
import Background from '../../assets/bg2.png';
import Floor from '../../assets/floor_01.png';

import { GameContext,GameProvider } from "../../Contexts/GameContext";

export default function Index(props) {

  const {screenHeight,screenWidth} = props;
  const [state,setState] = useContext(GameContext);
  const [holdingInput,setHoldingInput] = useState(false);
  const speed = 20;
  const World = [

    {
      name: 'block',
      text: 'Act 1',
      size: {
        x: screenWidth/2,
        y: screenHeight
      },
      position:{
        x: -(screenWidth/2),
        y: 0
      }
    },
    {
      name: 'block',
      size: {
        x: screenWidth/2,
        y: screenHeight
      },
      position:{
        x: -(screenWidth/2),
        y: -screenHeight
      }
    },
    {
      name: 'block',
      text: null,
      texture: Floor,
      size: {
        x: 100,
        y: 100
      },
      position:{
        x: 0,
        y: screenHeight - 100
      }
    },
    {
      name: 'block',
      text: null,
      texture: Floor,
      size: {
        x: 100,
        y: 100
      },
      position:{
        x: 100,
        y: screenHeight - 100
      }
    },
    {
      name: 'block',
      text: null,
      texture: Floor,
      size: {
        x: 100,
        y: 100
      },
      position:{
        x: 100,
        y: screenHeight - 100
      }
    }

];


  const Jump = () => {
    var tmpState = JSON.parse(JSON.stringify(state));

    if(state.player.isGrounded){
      tmpState.player.directionVector.y = -30;
      tmpState.player.isGrounded = false;
      setState(tmpState);

    } else if(state.player.isTouchingWall && !tmpState.player.isGrounded){
      if(tmpState.player.directionVector.direction == "right"){
      tmpState.player.directionVector.y = -30;
      tmpState.player.directionVector.x = 1.6;
      tmpState.player.directionVector.direction = "left";
    } else {
      tmpState.player.directionVector.y = -30;
      tmpState.player.directionVector.x = -1.6;
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

      const rightOfX = PlayerLeft >= ObjRight;
      const leftOfX = PlayerRight <= ObjLeft;
      const detectX = !rightOfX && !leftOfX;

      const aboveY = PlayerBottom <= ObjTop;
      const underY = PlayerTop >= ObjBottom;
      const detectY = !aboveY && !underY;

      const collision = detectX && detectY;


      const player_bottom = PlayerTop + tmpState.player.size.y;
      const tiles_bottom = ObjTop + World[i].size.y;
      const player_right = PlayerLeft + tmpState.player.size.x;
      const tiles_right = ObjLeft + World[i].size.x;

      const b_collision = tiles_bottom - PlayerTop;
      const t_collision = player_bottom - ObjTop;
      const l_collision = player_right - ObjLeft;
      const r_collision = tiles_right - PlayerLeft;

      if(PlayerTop > screenHeight) {
        NativeModules.DevSettings.reload();
      }
      if(collision){

      if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision )
      {
        //Top collision
        tmpState.player.directionVector.y = 0;
        tmpState.player.position.y = ObjTop - PlayerHeight;
        tmpState.player.isGrounded = true;
      }
      if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)
      {
        tmpState.player.position.y = ObjBottom;
        tmpState.player.directionVector.y += state.gravity;
        //bottom collsion
      }
      if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision)
      {
        //Left collision
        tmpState.player.position.x = ObjLeft - PlayerWidth;
        tmpState.player.isTouchingWall = true;


      }
      if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
      {
        //Right collision
        tmpState.player.position.x = ObjRight;
        tmpState.player.isTouchingWall = true;
      }
    }


    }

     if(JSON.stringify(tmpState) !== JSON.stringify(state)){
      setState(tmpState);
    }
    //console.log(JSON.stringify(tmpState.player));

   }, (1000/state.FPS));
  return () => clearInterval(interval);
}, [state]);


  const CharacterStyle = {overflow: 'hidden',height: state.player.size.y,width: state.player.size.x,transform : [{scaleX: state.player.directionVector.direction=='right' ? -1 : 1 }] };


  return (


    <View  style={styles.container}>
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

      <ScrollView  style={styles.container} alwaysBounceHorizontal={false} contentOffset={{x:state.player.position.x - (screenWidth/2),y: state.player.position.y <= (screenHeight - state.player.size.y*2) && state.player.position.y + (state.player.size.y*2) - screenHeight}} horizontal={true}>

      <View style={{...styles.character,left: state.player.position.x,top: state.player.position.y}} pointerEvents="none">
        {(state.player.isWalking && state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Run} />)}
        {(!state.player.isWalking && state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Idle} />)}
        {(!state.player.isGrounded && <Image resizeMode="contain" style={CharacterStyle} source={Jumping} />)}
      </View>
      { World.map((item,i) => <View key={i} style={{...styles.block,width: item.size.x,height:item.size.y,top: item.position.y,left: item.position.x}}>
      {item.text && <Text style={styles.blockTxt}>{item.text}</Text>}
      {item.texture && <Image style={{width: '100%',height: '100%'}}  resizeMode="repeat" source={item.texture}/>}
      </View>)}
    </ScrollView>
    </View>
  );
}
