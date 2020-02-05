import React,{useState,useEffect} from 'react';
import {View,Dimensions,TouchableWithoutFeedback,Text} from 'react-native';
import styles from "./style.scss";

export default function Index(props) {
  const [directionVector,setDirectionVector] = useState([0,0]);
  const [charPositionX,setCharPositionX] = useState(0);
  const [charPositionY,setCharPositionY] = useState(1);
  const {screenHeight} = props;

  const speed = 5;
  var Loop = null;
  const fps = 60;
  var onGround = false;
  var gravity = 2.3;


 useEffect(() => {
  const interval = setInterval(() => {
     // Your custom logic here
     setCharPositionX(charPositionX => charPositionX + (directionVector[0] * speed));
     setCharPositionY(charPositionY => charPositionY + directionVector[1]);
     setDirectionVector(directionVector => [directionVector[0],directionVector[1]-gravity])
     if(charPositionY >= (screenHeight-100)){
      setCharPositionY(screenHeight - 100);
     }
    

   }, (1000/fps));
  return () => clearInterval(interval);
}, [charPositionX,charPositionY,directionVector]);

  return (
    <View style={styles.container}>
    <TouchableWithoutFeedback onPressIn={() => setDirectionVector([directionVector[0]-1,directionVector[1]])} onPressOut={() => setDirectionVector([directionVector[0]+1,directionVector[1]])}>
    <View style={styles.btnLeft}>
      <Text style={styles.playButtons}> ⬅ </Text>
      </View>
      </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPressIn={() => setDirectionVector([directionVector[0]+1,directionVector[1]])} onPressOut={() => setDirectionVector([directionVector[0]-1,directionVector[1]])}>
    <View style={styles.btnRight}>
      <Text style={styles.playButtons}> ➡  </Text>
    </View>
    </TouchableWithoutFeedback>
    <View style={styles.stats}>
        <Text style={styles.headline}>[{directionVector.toString()}]</Text>
        <Text style={styles.headline}>FPS: {fps}</Text>
        <Text style={styles.headline}>FPS: {screenHeight}</Text>


</View>
        <View style={{...styles.character,left: charPositionX,top: charPositionY}}>
        <Text>{Math.round(charPositionX) + "," + Math.round(charPositionY)}</Text>
        </View>
    </View>
  );
}
