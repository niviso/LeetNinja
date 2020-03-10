import {Dimensions} from 'react-native';
import {NewBlockObj} from '../engine/boilerPlates';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const baseBlock =  {
    id: 0,
    type: 'block',
    text: null,
    style: {backgroundColor: 'red'},
    texture: null,
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
    tmpBase.id = i;
    Arr.push(tmpBase);
  }


const World = [
  {
      id: 1,
      type: 'block',
      text: null,
      style: {backgroundColor: 'red'},
      texture: null,
      size: {
        x: 100,
        y: 100
      },
      position:{
        x: 100,
        y: screenHeight - 200
      }},
      {
        id: 'block 5',
        text: null,
        texture: null,
        style: {backgroundColor: 'red',borderBottom: '2px solid black'},
        size: {
          x: 100,
          y: 100
        },
        position:{
          x: 500,
          y: screenHeight - 200
        }
      },


  ...Arr

];

export default World;
