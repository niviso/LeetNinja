import React,{useState,useEffect} from 'react';
import {View,Dimensions,TouchableWithoutFeedback,Text} from 'react-native';
import styles from './style.scss';

export default function Loading() {
  const [count,setCount] = useState(100);
  useEffect(() => {
    setTimeout(x=> {
      if(count > 0){
        setCount(count-1);
      }
    },20);
  },[count]);


  return (
    <View style={{opacity: count*0.01,...styles.loading}} pointerEvents={count > 20 ? '' : 'none'}>
      <Text style={styles.txt}>{count}%</Text>
    </View>
  );
}
