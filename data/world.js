import {Dimensions} from 'react-native';
import {NewBlockObj} from '../engine/boilerPlates';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const baseBlock =  {
    id: 0,
    type: 'block',
    text: null,
    style: {backgroundColor: 'green'},
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
  for(let i = 1; i!=30;i++){
    let tmpBase = JSON.parse(JSON.stringify(baseBlock));
    tmpBase.position.x = 100 * i;
    tmpBase.id = "block " + i;
    Arr.push(tmpBase);
  }


const World = [
  {
      id: 1,
      type: 'block',
      text: null,
      style: {backgroundColor: 'purple'},
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
        style: {backgroundColor: 'purple'},
        size: {
          x: 100,
          y: 100
        },
        position:{
          x: 700,
          y: screenHeight - 200
        }
      },

      {
        id: 'block 6',
        text: null,
        texture: null,
        style: {backgroundColor: 'purple'},
        size: {
          x: 100,
          y: 100
        },
        position:{
          x: 600,
          y: screenHeight - 200
        }
      },


  ...Arr

];

export default World;
