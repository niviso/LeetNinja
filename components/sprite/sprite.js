import React,{useState,useEffect} from 'react';

import {Image,ScrollView } from 'react-native';

export default function Sprite(props){
    const {source,styling} = props;
    const [frame,setFrame] = useState(1);
    useEffect(() => {
        //setFrame(frame+1);
    });
    return (
        <ScrollView  style={{width: 100,height: 100}}  alwaysBounceHorizontal={false} contentOffset={{x:51.5*frame,y:0}} horizontal={true}>
        <Image style={{height: 100}} source={source} />
        </ScrollView>
    )
}