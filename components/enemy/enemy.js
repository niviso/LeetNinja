import React,{useState,useEffect} from 'react';
import settings from '../../settings';
import {View } from 'react-native';
import styles from "./style.scss";
import Engine from '../../engine/engine';

export default function Enemy(){
    const [state,setState] = useState({
        gravity: 4,
        player:{
          directionVector: {
            x: 0,
            y: 0,
            direction: "right"
          },
          size: {
            x: 60,
            y: 60
          },
          name: "",
          position: {
            x: 260,
            y: 100
          },
          isGrounded: false,
          isTouchingWall: false,
          activeDrag: false,
          isWalking: false,
          drag: 0.2,
          speed: 10
        }
      });

      useEffect(() => {
        const interval = setInterval(() => {
           var tmpState = JSON.parse(JSON.stringify(state));
          tmpState.player = Engine.Update(state.player);
          tmpState.player.activeDrag = true;

         if(JSON.stringify(tmpState) !== JSON.stringify(state)){
            setState(tmpState);
          }
         }, (1000/settings.FPS));
        return () => clearInterval(interval);
      }, [state]);


      const CharacterStyle = {overflow: 'hidden',height: state.player.size.y,width: state.player.size.x,transform : [{scaleX: state.player.directionVector.direction=='right' ? -1 : 1 }] };

      return (
        <View style={{...styles.character,left: state.player.position.x,top: state.player.position.y}} pointerEvents="none">


      </View>
      );
}
