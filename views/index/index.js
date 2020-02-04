import React,{useState,useEffect} from 'react';
import {View,Dimensions,TouchableWithoutFeedback,Text} from 'react-native';
import styles from "./style.scss";

export default function Index() {
  const [directionVector,setDirectionVector] = useState([0,0]);
  const [charPosition,setCharPosition] = useState(0);
  const speed = 5;
  var Loop = null;
  const fps = 60;

 useEffect(() => {
  const interval = setInterval(() => {
     // Your custom logic here
     setCharPosition(charPosition => charPosition + (directionVector[0] * speed));
   }, (1000/fps));
  return () => clearInterval(interval);
}, [charPosition,directionVector]);

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

</View>
        <View style={{...styles.character,left: charPosition}}>
        <Text>{charPosition}</Text>
        </View>
    </View>
  );
}
