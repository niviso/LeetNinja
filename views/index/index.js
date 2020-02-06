import React,{useState,useEffect} from 'react';
import {View,Image,TouchableWithoutFeedback,Text} from 'react-native';
import styles from "./style.scss";
import Ninja from '../../assets/ninja.png';
export default function Index(props) {
  const [directionVector,setDirectionVector] = useState([0,0]);
  const [characterPosition,setCharacterPosition] = useState([0,0]);
  const {screenHeight} = props;

  const speed = 10;
  var Loop = null;
  const fps = 60;
  var onGround = true;
  var gravity = 5;



  const Jump = () => {
    if(onGround){
      setDirectionVector([directionVector[0],-40]);
      onGround = false;
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
      onGround = true;
     }
     setCharacterPosition(charPos);
   }, (1000/fps));
  return () => clearInterval(interval);
}, [characterPosition,directionVector]);

  return (
    <View style={styles.container}>
    <TouchableWithoutFeedback onPressIn={() => setDirectionVector([directionVector[0]-1,directionVector[1]])} onPressOut={() => setDirectionVector([directionVector[0]+1,directionVector[1]])}>
    <View style={styles.btnLeft}>
      <Text style={styles.playButtons}> ⬅ </Text>
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPressIn={() => Jump()}>
    <View style={styles.btnRight}>
      <Text style={styles.playButtons}> jump  </Text>
    </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPressIn={() => setDirectionVector([directionVector[0]+1,directionVector[1]])} onPressOut={() => setDirectionVector([directionVector[0]-1,directionVector[1]])}>
    <View style={styles.btnRight}>
      <Text style={styles.playButtons}> ➡  </Text>
    </View>
    </TouchableWithoutFeedback>
    <View style={styles.stats}>
        <Text style={styles.headline}>DirectionVector [{directionVector.toString()}]</Text>
        <Text style={styles.headline}>FPS: {fps}</Text>


</View>
        <View style={{...styles.character,left: characterPosition[0],top: characterPosition[1]}}>
        <Image
          style={{ width: 50, height: 50,transform :  [{scaleX: directionVector[0] < 0 ? -1 : 1 }] }}
          source={Ninja}
        />
        </View>
    </View>
  );
}
