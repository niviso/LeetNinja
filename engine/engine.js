import World from '../data/world';



export default function Engine(state){
    var tmpState = JSON.parse(JSON.stringify(state));

    tmpState.player.directionVector = {
      x: tmpState.player.directionVector.x,
      y: tmpState.player.directionVector.y + state.gravity,
      direction: tmpState.player.directionVector.direction
    }

    if(tmpState.player.activeDrag && tmpState.player.directionVector.direction == "left"){
     tmpState.player.directionVector.x = tmpState.player.directionVector.x - tmpState.player.drag;
    }

    if(tmpState.player.activeDrag && tmpState.player.directionVector.direction == "right"){
     tmpState.player.directionVector.x = tmpState.player.directionVector.x + tmpState.player.drag;
    }

    if(tmpState.player.directionVector.x <= 0 && tmpState.player.activeDrag && tmpState.player.directionVector.direction == "left"){
      tmpState.player.activeDrag = false;
      tmpState.player.directionVector.x = 0;
    }

    if(tmpState.player.directionVector.x >= 0 && tmpState.player.activeDrag && tmpState.player.directionVector.direction == "right"){
      tmpState.player.activeDrag = false;
      tmpState.player.directionVector.x = 0;
    }

    tmpState.player.position = {
      x: tmpState.player.position.x + (tmpState.player.directionVector.x * state.player.speed),
      y: tmpState.player.position.y + tmpState.player.directionVector.y
    }

    tmpState.player.isTouchingWall = false;





    //COLLISION DETECTION World

    const PlayerLeft = tmpState.player.position.x;
    const PlayerRight = PlayerLeft + tmpState.player.size.x;
    const PlayerTop = tmpState.player.position.y;
    const PlayerBottom = PlayerTop + tmpState.player.size.y;

    const PlayerWidth = tmpState.player.size.x;
    const PlayerHeight = tmpState.player.size.y;

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


     const player_bottom = PlayerTop + tmpState.player.size.y - 4;
     const tiles_bottom = ObjTop + World[i].size.y;
     const player_right = PlayerLeft + tmpState.player.size.x;
     const tiles_right = ObjLeft + World[i].size.x;

     const b_collision = tiles_bottom - PlayerTop;
     const t_collision = player_bottom - ObjTop;
     const l_collision = player_right - ObjLeft;
     const r_collision = tiles_right - PlayerLeft;

     if(collision){

     if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision )
     {
       //Top collision
       tmpState.player.directionVector.y = 0;
       tmpState.player.position.y = ObjTop - PlayerHeight;
       tmpState.player.isGrounded = true;
     }
     if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)
     {
       tmpState.player.position.y = state.player.position.y;
       tmpState.player.directionVector.y += state.gravity;

       //bottom collsion
     }
     if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision)
     {
       //Left collision
       tmpState.player.position.x = state.player.position.x;//ObjLeft - PlayerWidth;
       tmpState.player.isTouchingWall = true;


     }
     if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
     {
       //Right collision
       tmpState.player.position.x = state.player.position.x;//ObjRight;
       tmpState.player.isTouchingWall = true;
     }
   }


   }
    return tmpState;
    }