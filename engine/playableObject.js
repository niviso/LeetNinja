import { NewPlayerObj } from './boilerPlates';
import React from 'react';
class PlayableObject extends React.Component {
  constructor(props){
    super(props);
    this.data = NewPlayerObj();
  }


  getStateData = () => {
    return this.data;
  }

  setStateData = (data) => {
    this.data = JSON.parse(JSON.stringify(data));
  }

  setVelocity = (vector) => {
    this.data.directionVector = vector;
  }

}

export default PlayableObject;
