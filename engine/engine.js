import World from '../data/world';
import React from 'react';
import { NewEnemyObj } from './boilerPlates';
const gravity = 5;


class Engine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false, //if no init it has no pointers to worldstate and setworldstate that hosts all world objects so we can add and remove
      world: World,//props.gameState.world, //Shard later 100,200,300,400,500,600 etc
      enemies: [],
      player: null,
      shards: null,
      updateFunc: null
    }
  }

  Init(world,updateFunc){
    if(!world){
      return;
    }
    this.SetWorld(world);
    this.AddEnemy();
    this.Optimize();
    this.state.init = true;
    this.state.updateFunc = updateFunc;
    console.log("Engine initialized");
  }

  DeleteWorldObject = (id) => {
    var filtered = this.state.world.filter(function(value, index, arr){

      return value.id !== id;
  
    });
    this.state.world = filtered;
    this.Optimize();
  }

  hasStarted = () => {
    return this.state.init;
  }

  GetPlayer = () => {
    return this.state.player;
  }

  SetPlayer = (player) => {
    this.state.player = player;
  }
  
  GetWorld = () => {
    return this.state.world;
  }

  GetEnemies = () => {
    return this.state.enemies;
  }

  AddEnemy = () => {
    this.state.enemies.push(NewEnemyObj(0));
  }

  SetWorld = (world) => {
    console.log("Set world");
    this.state.world = world;
    //this.Optimize();
  }

  AddObjToWorld = (obj) => {
    this.state.world.push(obj);
  }

  Optimize = () => {
    if(this.state.world == null){
      return;
    }
    //This function optimizes the collision detection by sharding the world blocks into positions from 0-100,100-200 etc this is based on x pos
    let tmpWorld = new Array();
    for (let i = 0; i != this.state.world.length; i++) {
      let shard = (Math.ceil(this.state.world[i].position.x / 100) * 100).toString(); // 0,100,200,300
      if(shard < 0){
        shard = 0;
      }
      if (!tmpWorld[shard]) {
        console.log("new shard crated",shard)
        tmpWorld[shard] = new Array();
      }
      tmpWorld[shard].push(this.state.world[i]);

    }
    console.log(tmpWorld[200]);
    this.state.shards = tmpWorld;
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
    let Shards = this.state.shards[from];
    for(var i = from; i != to;i++){
      Shards.concat(this.state.shards[i]);
    }
    return Shards;
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
    
    var WorldShards = this.state.shards[shard];
    if((Math.ceil(PlayerRight / 100) * 100).toString() >= shard){
      WorldShards = WorldShards.concat(this.state.shards[shard-100]);
    }

    WorldShards = WorldShards.concat(this.state.enemies);




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
    return tmpPositionObj;
  }


  UpdateId = (id) => { //Updates the position of a object
    var tmpPositionObj = this.Gravity(this.state.enemies[0]);

    //COLLISION DETECTION World
    const shard = (Math.ceil(tmpPositionObj.position.x / 100) * 100).toString();
    //const WorldShard = this.state.shards[shard]; //IF x right pos > shard fetch shard + 1

    const PlayerLeft = tmpPositionObj.position.x;
    const PlayerRight = PlayerLeft + tmpPositionObj.size.x;
    const PlayerTop = tmpPositionObj.position.y;
    const PlayerBottom = PlayerTop + tmpPositionObj.size.y;

    const PlayerWidth = tmpPositionObj.size.x;
    const PlayerHeight = tmpPositionObj.size.y;
    if(this.state.world) {
    for (var i = 0; i != World.length; i++) {
      if(this.state.world[i]){
      const ObjLeft = this.state.world[i].position.x;
      const ObjRight = ObjLeft + this.state.world[i].size.x;
      const ObjTop = this.state.world[i].position.y;
      const ObjBottom = ObjTop + this.state.world[i].size.y;

      const rightOfX = PlayerLeft >= ObjRight;
      const leftOfX = PlayerRight <= ObjLeft;
      const detectX = !rightOfX && !leftOfX;

      const aboveY = PlayerBottom <= ObjTop;
      const underY = PlayerTop >= ObjBottom;
      const detectY = !aboveY && !underY;

      const collision = detectX && detectY;


      const player_bottom = PlayerTop + tmpPositionObj.size.y - 4;
      const tiles_bottom = ObjTop + this.state.world[i].size.y;
      const player_right = PlayerLeft + tmpPositionObj.size.x;
      const tiles_right = ObjLeft + this.state.world[i].size.x;

      const b_collision = tiles_bottom - PlayerTop;
      const t_collision = player_bottom - ObjTop;
      const l_collision = player_right - ObjLeft;
      const r_collision = tiles_right - PlayerLeft;

      if (collision) {

        tmpPositionObj.colliding.target = this.state.world[i].id;

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
    this.state.enemies[0] = tmpPositionObj;
    this.state.updateFunc();

  }
}
export default new Engine();
