import React,{useState,useEffect} from 'react';

import {Image,ScrollView } from 'react-native';

export default function Sprite(props){
    const {source,frames,styling,fps=2} = props;
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
        <ScrollView  style={{width: frameLength,height: height,overflow: 'hidden',...styling}}  alwaysBounceHorizontal={false} contentOffset={{x:frameLength*frame,y:0}} horizontal={true}>
        <Image source={source} />
        </ScrollView>
    )
}