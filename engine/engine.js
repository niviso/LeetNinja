import World from '../data/world';
import React from 'react';
import { NewEnemyObj } from './boilerPlates';
const gravity = 5;


class Engine extends React.Component {
  constructor(props) {
    super(props);
    this.init = false, //if no init it has no pointers to worldstate and setworldstate that hosts all world objects so we can add and remove
    this.world = World, //Moves over to shards
    this.enemies = [],
    this.player = null,
    this.shards = null,
    this.updateFunc = null
    this.shards = null;
  }

  Init(props){
    const {world,updateFunc} = props;
    if(!world){
      return;
    }
    this.SetWorld(world);
    this.AddEnemy();
    this.Optimize();
    this.init = true;
    this.updateFunc = updateFunc;
    console.log("Engine initialized");
  }

  DeleteWorldObject = (id) => {
    //This will go into optimize later?
    var filtered = this.world.filter(function(value, index, arr){
      return value.id !== id;
    });
    this.world = filtered;
    this.Optimize();
  }

  hasStarted = () => {
    return this.init;
  }

  GetPlayer = () => {
    return this.player;
  }

  SetPlayer = (player) => {
    this.player = player;
  }
  
  GetWorld = () => {
    return this.world;
  }

  GetEnemies = () => {
    return this.enemies;
  }

  AddEnemy = () => {
    this.enemies.push(NewEnemyObj(0));
  }

  SetWorld = (world) => {
    this.world = world;
    this.Optimize();
  }

  AddObjToWorld = (obj) => {
    this.world.push(obj);
  }

  Optimize = () => {
    if(this.world == null){
      return;
    }
    //This function optimizes the collision detection by sharding the world blocks into positions from 0-100,100-200 etc this is based on x pos
    let tmpWorld = new Array();
    for (let i = 0; i != this.world.length; i++) {
      let shard = (Math.ceil(this.world[i].position.x / 100) * 100).toString(); // 0,100,200,300
      if(shard < 0){
        shard = 0;
      }
      if (!tmpWorld[shard]) {
        tmpWorld[shard] = new Array();
      }
      tmpWorld[shard].push(this.world[i]);

    }
    this.shards = tmpWorld;
  }

  FetchShard = (shard) => {

  }
  Gravity = (state) => {
    var tmpPositionObj = JSON.parse(JSON.stringify(state));

    tmpPositionObj.directionVector = {
      x: tmpPositionObj.directionVector.x,
      y: tmpPositionObj.directionVector.y + gravity,
      direction: tmpPositionObj.directionVector.direction
    }

    if (tmpPositionObj.activeDrag && tmpPositionObj.directionVector.direction == "left") {
      tmpPositionObj.directionVector.x = tmpPositionObj.directionVector.x - tmpPositionObj.drag;
    }

    if (tmpPositionObj.activeDrag && tmpPositionObj.directionVector.direction == "right") {
      tmpPositionObj.directionVector.x = tmpPositionObj.directionVector.x + tmpPositionObj.drag;
    }

    if (tmpPositionObj.directionVector.x <= 0 && tmpPositionObj.activeDrag && tmpPositionObj.directionVector.direction == "left") {
      tmpPositionObj.activeDrag = false;
      tmpPositionObj.directionVector.x = 0;
    }

    if (tmpPositionObj.directionVector.x >= 0 && tmpPositionObj.activeDrag && tmpPositionObj.directionVector.direction == "right") {
      tmpPositionObj.activeDrag = false;
      tmpPositionObj.directionVector.x = 0;
    }

    tmpPositionObj.position = {
      x: tmpPositionObj.position.x + (tmpPositionObj.directionVector.x * state.speed),
      y: tmpPositionObj.position.y + tmpPositionObj.directionVector.y
    }

    tmpPositionObj.isTouchingWall = false;

    return tmpPositionObj;
  }
  GetShardRange = (from,to) => {
    let WorldShards = [];

    if(this.shards[from]){
      WorldShards = this.shards[from];
    }

    WorldShards = WorldShards.concat(this.enemies);

    if(!to){
      return WorldShards;
    }
    if(this.shards[to] !== 'undefined'){
      WorldShards = WorldShards.concat(this.shards[to]);
    }

    return WorldShards;
  }
  Update = (state) => { //Updates the position of a object
    var tmpPositionObj = this.Gravity(state);



    const PlayerLeft = tmpPositionObj.position.x;
    const PlayerRight = PlayerLeft + tmpPositionObj.size.x;
    const PlayerTop = tmpPositionObj.position.y;
    const PlayerBottom = PlayerTop + tmpPositionObj.size.y;

    const PlayerHeight = tmpPositionObj.size.y;

    //COLLISION DETECTION World
    const shard = (Math.ceil(tmpPositionObj.position.x / 100) * 100).toString();
    
    if((Math.ceil(PlayerRight / 100) * 100).toString() >= shard){
      var WorldShards = this.GetShardRange(shard,shard-100);
    } else {
      var WorldShards = this.GetShardRange(shard);
    }




    if(WorldShards) {
    for (var i = 0; i != WorldShards.length; i++) {
      if(WorldShards[i]){
      const ObjLeft = WorldShards[i].position.x;
      const ObjRight = ObjLeft + WorldShards[i].size.x;
      const ObjTop = WorldShards[i].position.y;
      const ObjBottom = ObjTop + WorldShards[i].size.y;

      const rightOfX = PlayerLeft >= ObjRight;
      const leftOfX = PlayerRight <= ObjLeft;
      const detectX = !rightOfX && !leftOfX;

      const aboveY = PlayerBottom <= ObjTop;
      const underY = PlayerTop >= ObjBottom;
      const detectY = !aboveY && !underY;

      const collision = detectX && detectY;


      const player_bottom = PlayerTop + tmpPositionObj.size.y - 4;
      const tiles_bottom = ObjTop + WorldShards[i].size.y;
      const player_right = PlayerLeft + tmpPositionObj.size.x;
      const tiles_right = ObjLeft + WorldShards[i].size.x;

      const b_collision = tiles_bottom - PlayerTop;
      const t_collision = player_bottom - ObjTop;
      const l_collision = player_right - ObjLeft;
      const r_collision = tiles_right - PlayerLeft;

      if (collision) {

        tmpPositionObj.colliding.target = WorldShards[i].id;
        //console.log("Colliding with ",WorldShards[i].id)

        if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision) {
          //Top collision
          tmpPositionObj.directionVector.y = 0;
          tmpPositionObj.position.y = ObjTop - PlayerHeight;
          tmpPositionObj.isGrounded = true;
        }
        if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
          tmpPositionObj.position.y = state.position.y + 1;
          tmpPositionObj.directionVector.y += state.gravity;

          //bottom collsion
        }
        if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
          //Left collision
          tmpPositionObj.position.x = state.position.x - 1; //ObjLeft - PlayerWidth;
          tmpPositionObj.isTouchingWall = true;


        }
        if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision) {
          //Right collision
          tmpPositionObj.position.x = state.position.x + 1; //ObjRight;
          tmpPositionObj.isTouchingWall = true;
        }
      }
    }

    }
    }
    return tmpPositionObj;
  }


DeleteEnemy = (id) => {
  var filtered = this.enemies.filter(function(value, index, arr){
    return value.id !== id;
  });

  this.enemies = filtered;
}

UpdateEnemies = () => {
  //Update if in range of camera
  for(let i = 0; i != this.enemies.length; i++){
    if(this.enemies[i]){
      this.UpdateId(this.enemies[i].id);
    }
  }
}
  UpdateId = (id) => { //Updates the position of a object
    if(id == 'player'){
      var tmpPositionObj = this.Gravity(this.player);
      var state = this.player;
    } else {
      var tmpPositionObj = this.Gravity(this.enemies[id]);
      var state = this.enemies[id];
    }


    let kill = false;


    if(tmpPositionObj.position.y > 500){
      kill = true;
      
    }

    const PlayerLeft = tmpPositionObj.position.x;
    const PlayerRight = PlayerLeft + tmpPositionObj.size.x;
    const PlayerTop = tmpPositionObj.position.y;
    const PlayerBottom = PlayerTop + tmpPositionObj.size.y;

    const PlayerHeight = tmpPositionObj.size.y;

    //COLLISION DETECTION World
    const shard = (Math.ceil(tmpPositionObj.position.x / 100) * 100).toString();
    
    if((Math.ceil(PlayerRight / 100) * 100).toString() >= shard){
      var WorldShards = this.GetShardRange(shard,shard-100);
    } else {
      var WorldShards = this.GetShardRange(shard);
    }


    if(WorldShards) {
    for (var i = 0; i != WorldShards.length; i++) {
      if(WorldShards[i] && WorldShards[i].id !== state.id){
      const ObjLeft = WorldShards[i].position.x;
      const ObjRight = ObjLeft + WorldShards[i].size.x;
      const ObjTop = WorldShards[i].position.y;
      const ObjBottom = ObjTop + WorldShards[i].size.y;

      const rightOfX = PlayerLeft >= ObjRight;
      const leftOfX = PlayerRight <= ObjLeft;
      const detectX = !rightOfX && !leftOfX;

      const aboveY = PlayerBottom <= ObjTop;
      const underY = PlayerTop >= ObjBottom;
      const detectY = !aboveY && !underY;

      const collision = detectX && detectY;


      const player_bottom = PlayerTop + tmpPositionObj.size.y - 4;
      const tiles_bottom = ObjTop + WorldShards[i].size.y;
      const player_right = PlayerLeft + tmpPositionObj.size.x;
      const tiles_right = ObjLeft + WorldShards[i].size.x;

      const b_collision = tiles_bottom - PlayerTop;
      const t_collision = player_bottom - ObjTop;
      const l_collision = player_right - ObjLeft;
      const r_collision = tiles_right - PlayerLeft;

      if (collision) {

        tmpPositionObj.colliding.target = WorldShards[i].id;

        if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision) {
          //Top collision
          tmpPositionObj.directionVector.y = 0;
          tmpPositionObj.position.y = ObjTop - PlayerHeight;
          tmpPositionObj.isGrounded = true;
        }
        if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
          tmpPositionObj.position.y = state.position.y;
          tmpPositionObj.directionVector.y += state.gravity;
          //bottom collsion
        }
        if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
          //Left collision
          tmpPositionObj.position.x = state.position.x; //ObjLeft - PlayerWidth;
          tmpPositionObj.isTouchingWall = true;


        }
        if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision) {
          //Right collision
          tmpPositionObj.position.x = state.position.x; //ObjRight;
          tmpPositionObj.isTouchingWall = true;
        }
      }
    }

    }
    }
    if(kill){
      this.DeleteEnemy(tmpPositionObj.id);
      return;
    }
    this.enemies[id] = tmpPositionObj;
    //this.updateFunc();

  }
}
export default new Engine();
