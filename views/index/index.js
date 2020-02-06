import React,{useState,useEffect} from 'react';
import {View,Image,TouchableOpacity,Text} from 'react-native';
import styles from "./style.scss";
import Ninja from '../../assets/ninja.png';
import Background from '../../assets/bg2.png';
import { MultiTouchView } from 'expo-multi-touch';

export default function Index(props) {
  const [directionVector,setDirectionVector] = useState([0,0]);
  const [characterPosition,setCharacterPosition] = useState([0,1]);
  const [onGround,setOnGround] = useState(true);
  const [characterDirection,setCharacterDirection] = useState("left");
  const {screenHeight,screenWidth} = props;

  const speed = 20;
  var Loop = null;
  const fps = 100;
  var gravity = 5;



  const Jump = () => {
    if(onGround){
      setDirectionVector([directionVector[0],-40]);
      setOnGround(false);
    }
  }
 useEffect(() => {
  const interval = setInterval(() => {
     var charPos = [0,0]; // We need to calculate position before setting it
     setDirectionVector(directionVector => [directionVector[0],directionVector[1]+gravity]);
     charPos = [characterPosition[0] + (directionVector[0] * speed),characterPosition[1] + directionVector[1]];
     if(charPos[1] > (screenHeight-100)){
      charPos[screenHeight - 100];
      setDirectionVector(directionVector => [directionVector[0],0]);
      setOnGround(true);
     }
     setCharacterPosition(charPos);
   }, (1000/fps));
  return () => clearInterval(interval);
}, [characterPosition,directionVector]);

const _touchBegan = (event) => {
  const { identifier } = event;
  console.log(event);
}
  return (
    <View style={styles.container}>
      <Image style={{ width: screenWidth, height: screenHeight,position: 'absolute',opacity: 0.2 }} source={Background} resizeMode="repeat" />
      <View style={styles.moveBtnWrapper}>

        <View onTouchStart={()=> setCharacterDirection("right") + setDirectionVector([directionVector[0]-1,directionVector[1]])} onTouchEnd={() => setDirectionVector([directionVector[0]+1,directionVector[1]])}>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.btn}>
              <Text style={styles.playButtons}>⬅</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View onTouchStart={()=> setCharacterDirection("left") + setDirectionVector([directionVector[0]+1,directionVector[1]])} onTouchEnd={() => setDirectionVector([directionVector[0]-1,directionVector[1]])}>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.btn}>
              <Text style={styles.playButtons}>➡</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionBtnWrapper}>
      <View  onTouchStart={()=> Jump()}>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.btn}>
            <Text style={styles.playButtons}>⬆️</Text>
          </View>
        </TouchableOpacity>
      </View>
        <TouchableOpacity activeOpacity={0.5} onPressIn={()=> Jump()}>
          <View style={styles.btn}>
            <Text style={styles.playButtons}>🅱️</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.stats}>
        <Text style={styles.headline}>DirectionVector [{directionVector.toString()}]</Text>
        <Text style={styles.headline}>FPS: {fps}</Text>
        <Text style={styles.headline}>Position: {characterPosition.toString()}</Text>



      </View>
      <View style={{...styles.character,left: characterPosition[0],top: characterPosition[1]}} pointerEvents="none">
        <Image style={{ width: 100, height: 100,transform : [{scaleX: characterDirection=='right' ? -1 : 1 }] }} source={Ninja} />
      </View>
    </View>
  );
}
