import React,{useState,useEffect} from 'react';
import {View,Dimensions,TouchableWithoutFeedback,Text} from 'react-native';
import styles from './style.scss';
import AudioHelper from '../../helpers/AudioHelper';
import {loading_loop} from '../../helpers/sounds';

export default function Loading() {
  const [count,setCount] = useState(100);
  AudioHelper.play(loading_loop,true,1);
  useEffect(() => {
    return () => {
        AudioHelper.stop(loading_loop);
    }
  }, []);


  return (
    <View style={{opacity: count*0.01,...styles.loading}} pointerEvents={count > 20 ? '' : 'none'}>
      <Text style={styles.txt}>{count}%</Text>
    </View>
  );
}
