import React from 'react';
export default class Enemy extends React.Component{
    constructor(props){
        super(props);
        const {id} = props;
          this.id = id;
          this.type = "enemy";
          this.data = {
            directionVector: {
                x: -0.2,
                y: 0,
                direction: "right"
              },
              size: {
                x: 100,
                y: 100
              },
              position: {
                x: 400,
                y: 0
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
              speed: 15
          }
    }


    getData = () => {
        return this.data;
    }

    setData = (data) => {
        this.data = data;
    }

    getType = () => {
        return this.type;
    }

}