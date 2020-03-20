import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import styles from './style.scss';
import AudioHelper from '../../helpers/AudioHelper';
import {loading_loop} from '../../helpers/sounds';

export default function Loading(props) {
  AudioHelper.play(loading_loop,true,1);
  const {duration} = props;
  useEffect(() => {
    return () => {
        AudioHelper.stop(loading_loop);
    }
  }, []);


  return (
    <View style={{...styles.loading}}>
      <Text style={styles.txt}>Loading</Text>
    </View>
  );
}
