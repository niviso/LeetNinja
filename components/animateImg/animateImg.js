import React,{useState,useEffect} from 'react';
import styles from "./style.scss";

import {Image,View } from 'react-native';

export default function Sprite(props){
    const {source,frames,styling,fps=2,size} = props;
    const [frame,setFrame] = useState(1);
    const {width, height} = Image.resolveAssetSource(source);
    const frameLength = width/frames;
    useEffect(() => {
        const interval = setInterval(() => {

            if(frame+1 >= frames){
                setFrame(0);
            } else {
                setFrame(frame+1);

            }

         }, (1000/fps));
        return () => clearInterval(interval);
      }, [frame]);
    return (
        <View  style={styles.container}>
        <Image source={source} resizeMode="contain" style={styles.container}/>
        </View>
    )
}
