import {Dimensions} from 'react-native';
import Floor from '../assets/floor_01.png';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const baseBlock =  {
    name: 'block',
    text: null,
    texture: Floor,
    size: {
      x: 100,
      y: 100
    },
    position:{
      x: 0,
      y: screenHeight - 100
    }
  }

  var Arr = [];
  for(let i = 0; i!=10;i++){
    let tmpBase = JSON.parse(JSON.stringify(baseBlock));
    tmpBase.position.x = 100 * i;
    tmpBase.name = i;
    Arr.push(tmpBase);
  }


const World = [
  {
    name: 'block',
    text: 'Act 1',
    size: {
      x: screenWidth/2,
      y: screenHeight
    },
    position:{
      x: -(screenWidth/2),
      y: 0
    }
  },
  {
    name: 'block 1',
    size: {
      x: screenWidth/2,
      y: screenHeight
    },
    position:{
      x: -(screenWidth/2),
      y: -screenHeight
    }
  },
  {
      name: 'block',
      text: null,
      texture: Floor,
      size: {
        x: 100,
        y: 100
      },
      position:{
        x: 100,
        y: 0
      }
    },
  ...Arr

];

export default World;
