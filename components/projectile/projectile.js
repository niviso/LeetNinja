import React from 'react';
import {View,Text,Image,ScrollView } from 'react-native';
import styles from "./style.scss";
import Sprite from '../sprite/sprite';

export default function Projectile(props){
      const state = {
        id: 10,
        type: 'enemy',
        health: 1,
        invincibilityFrames : 0,
        directionVector: {
          x: -0.2,
          y: 0,
          direction: "right"
        },
        size: {
          x: 85,
          y: 80
        },
        position: {
          x: 300,
          y: 150
        },
        colliding:{
          left: false,
          right: false,
          top: false,
          bottom: false,
          target: null
        },
        isGrounded: false,
        isTouchingWall: false,
        activeDrag: false,
        isWalking: false,
        drag: 0.2,
        speed: 10,
        kill : false
      }

      const CharacterStyle = {transform : [{scaleX: state.directionVector.direction=='right' ? -1 : 1 }] };

      return (
        <View style={{...styles.character,left: state.position.x,top: state.position.y,height: state.size.y,width: state.size.x}} pointerEvents="none">
        <View style={styles.container}></View>
      </View>
      );
}
