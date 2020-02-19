import World from '../data/world';
import React from 'react';

const gravity = 5;


class Engine extends React.Component{
    constructor(props){
      super(props);
    }

    Update = (state) =>{
    var tmpPositionObj = JSON.parse(JSON.stringify(state));

    tmpPositionObj.directionVector = {
      x: tmpPositionObj.directionVector.x,
      y: tmpPositionObj.directionVector.y + gravity,
      direction: tmpPositionObj.directionVector.direction
    }

    if(tmpPositionObj.activeDrag && tmpPositionObj.directionVector.direction == "left"){
     tmpPositionObj.directionVector.x = tmpPositionObj.directionVector.x - tmpPositionObj.drag;
    }

    if(tmpPositionObj.activeDrag && tmpPositionObj.directionVector.direction == "right"){
     tmpPositionObj.directionVector.x = tmpPositionObj.directionVector.x + tmpPositionObj.drag;
    }

    if(tmpPositionObj.directionVector.x <= 0 && tmpPositionObj.activeDrag && tmpPositionObj.directionVector.direction == "left"){
      tmpPositionObj.activeDrag = false;
      tmpPositionObj.directionVector.x = 0;
    }

    if(tmpPositionObj.directionVector.x >= 0 && tmpPositionObj.activeDrag && tmpPositionObj.directionVector.direction == "right"){
      tmpPositionObj.activeDrag = false;
      tmpPositionObj.directionVector.x = 0;
    }

    tmpPositionObj.position = {
      x: tmpPositionObj.position.x + (tmpPositionObj.directionVector.x * state.speed),
      y: tmpPositionObj.position.y + tmpPositionObj.directionVector.y
    }

    tmpPositionObj.isTouchingWall = false;





    //COLLISION DETECTION World

    const PlayerLeft = tmpPositionObj.position.x;
    const PlayerRight = PlayerLeft + tmpPositionObj.size.x;
    const PlayerTop = tmpPositionObj.position.y;
    const PlayerBottom = PlayerTop + tmpPositionObj.size.y;

    const PlayerWidth = tmpPositionObj.size.x;
    const PlayerHeight = tmpPositionObj.size.y;

   for(var i = 0;i!=World.length;i++){

     const ObjLeft = World[i].position.x;
     const ObjRight = ObjLeft + World[i].size.x;
     const ObjTop = World[i].position.y;
     const ObjBottom = ObjTop + World[i].size.y;

     const rightOfX = PlayerLeft >= ObjRight;
     const leftOfX = PlayerRight <= ObjLeft;
     const detectX = !rightOfX && !leftOfX;

     const aboveY = PlayerBottom <= ObjTop;
     const underY = PlayerTop >= ObjBottom;
     const detectY = !aboveY && !underY;

     const collision = detectX && detectY;


     const player_bottom = PlayerTop + tmpPositionObj.size.y - 4;
     const tiles_bottom = ObjTop + World[i].size.y;
     const player_right = PlayerLeft + tmpPositionObj.size.x;
     const tiles_right = ObjLeft + World[i].size.x;

     const b_collision = tiles_bottom - PlayerTop;
     const t_collision = player_bottom - ObjTop;
     const l_collision = player_right - ObjLeft;
     const r_collision = tiles_right - PlayerLeft;

     if(collision){

     if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision )
     {
       //Top collision
       tmpPositionObj.directionVector.y = 0;
       tmpPositionObj.position.y = ObjTop - PlayerHeight;
       tmpPositionObj.isGrounded = true;
     }
     if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)
     {
       tmpPositionObj.position.y = state.position.y;
       tmpPositionObj.directionVector.y += state.gravity;

       //bottom collsion
     }
     if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision)
     {
       //Left collision
       tmpPositionObj.position.x = state.position.x;//ObjLeft - PlayerWidth;
       tmpPositionObj.isTouchingWall = true;


     }
     if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
     {
       //Right collision
       tmpPositionObj.position.x = state.position.x;//ObjRight;
       tmpPositionObj.isTouchingWall = true;
     }
   }


   }
    return tmpPositionObj;
    }
    }
export default new Engine();
