import React from 'react';
import {View,Text,Image,ScrollView } from 'react-native';
import styles from "./style.scss";
import Star from '../../assets/projectiles/star_normal.png';
import AnimateImg from '../animateImg/animateImg';

export default function Projectile(props){
      const {state} = props;

      const Wrapper = {...styles.projectile,transform : [{scaleX: state.directionVector.direction=='right' ? 1 : -1 }],left: state.position.x,top: state.position.y,height: state.size.y,width: state.size.x, };
      return (
        <View style={Wrapper} pointerEvents="none">
        <AnimateImg source={Star} fps={30}/>
      </View>
      );
}
