import React from 'react';
import {View,Image,Text,ScrollView  } from 'react-native';
import styles from "./style.scss";


export default function Block(props){
    const {item} = props
    return (

        <View style={{...styles.block,width: item.size.x,height:item.size.y,top: item.position.y,left: item.position.x}}>
          {item.text && <Text style={styles.blockTxt}>{item.text}</Text>}
          {item.texture && <Image style={{width: '100%',height: '100%'}}  resizeMode="repeat" source={item.texture}/>}
        </View>
    
      );
}