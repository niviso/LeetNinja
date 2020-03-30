import World from '../data/world';
import React from 'react';
import settings from '../settings';
import PlayableObject from './playableObject';
import { NewEnemyObj,NewPlayerObj,NewCollider,NewProjectile } from './boilerPlates';


class Engine extends React.Component {
  constructor(props) {
    super(props);
    this.init = false,
    this.world = World,
    this.enemies = [],
    this.projectiles = [],
    this.player = new PlayableObject(),
    this.shards = null;
  }

  Init(props){
    const {world} = props;
    if(!world){
      return;
    }
    this.SetWorld(world);
    this.AddEnemy(400);
    this.AddEnemy(500);
    this.Optimize();
  }
  getPlayer = () => {
    return this.player;
  }
  DeleteWorldObject = (id) => {
    var filtered = this.world.filter(function(value, index, arr){
      return value.id !== id;
    });
    this.world = filtered;
    this.Optimize();
  }

  hasStarted = () => {
    return this.init;
  }

  GetWorld = () => {
    return this.world;
  }

  GetEnemies = () => {
    return this.enemies;
  }

  GetProjectiles = () => {
    return this.projectiles;
  }

  AddEnemy = (x) => {
    const id = Math.floor(Math.random() * 100).toString();
    this.enemies[id] = NewEnemyObj(id,x);
  }

  AddProjectile = (x,y=200,direction='left') => {
    const id = Math.floor(Math.random() * 100).toString();
    this.projectiles[id] = NewProjectile(id,x,y,direction);
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
      if(shard <= 0){
        shard = 0;
      }
      if (!tmpWorld[shard]) {
        tmpWorld[shard] = new Array();
      }
      tmpWorld[shard].push(this.world[i]);
    }
    this.shards = tmpWorld;
    this.init = true;
  }


  Gravity = (state) => {
    var tmpPositionObj = JSON.parse(JSON.stringify(state));

    tmpPositionObj.directionVector = {
      x: tmpPositionObj.directionVector.x,
      y: tmpPositionObj.directionVector.y + (state.gravity ? settings.worldGravity : 0),
      direction: tmpPositionObj.directionVector.direction
    }
    if(tmpPositionObj.invincibilityFrames > 0){
      tmpPositionObj.invincibilityFrames -= 1;
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

  GetShardRange = (from,player=true) => {
    let WorldShards = [];

    if(from <= 0){
      from = 0;
    }

    if(typeof this.shards[from] !== 'undefined'){
      WorldShards = this.shards[from];
    }

    if(typeof this.shards[from+100] !== 'undefined'){
      WorldShards = WorldShards.concat(this.shards[from+100]);
    }

    if(typeof this.shards[from-100] !== 'undefined'){
      WorldShards = WorldShards.concat(this.shards[from-100]);
    }

    if(this.enemies.length > 0){
      var arr = [];
      this.enemies.filter((obj,index) => {
        arr.push(obj);
      });
      WorldShards = WorldShards.concat(arr);
    }

    if(typeof this.player!== 'undefined' && player){
      //WorldShards = WorldShards.push(this.player);
    }

    if(this.projectiles.length > 0){
      var arr = [];
      this.projectiles.filter((obj,index) => {
        arr.push(obj);
      });
      WorldShards = WorldShards.concat(arr);
    }

    return WorldShards;
  }



KillEnemeis = () => {
  let arr = [];
  var filtered = this.enemies.filter((enemy) => {
     enemy.kill ? null : arr[enemy.id] = enemy;
  });

  this.enemies = arr;
}

KillProjectiles = () => {
let arr = [];
var filtered = this.projectiles.filter((projectile) => {
   projectile.kill ? null : arr[projectile.id] = projectile;
});

this.projectiles = arr;
}

//In the future i want to bake all of this into one big loop maybe

UpdateEnemies = () => {
  //Update if in range of camera
  if(this.enemies){
    this.enemies.filter((enemy, index, arr) => {
      this.enemies[enemy.id]  = this.Update(enemy);
    });

    this.KillEnemeis();
  }

  //Need to do this at the end of the for and render cycle to not freeze the game
}

UpdateProjectiles = () => {
  //Update if in range of camera

  this.projectiles.filter((projectile, index, arr) => {
    this.projectiles[projectile.id]  = this.Update(projectile);
  });

  this.KillProjectiles();

  //Need to do this at the end of the for and render cycle to not freeze the game
}

Update = (state) => { //Updates the position of a object
    var tmpPositionObj = this.Gravity(state);

    if(tmpPositionObj.position.y > 500){
      tmpPositionObj.kill = true;
    }

    const PlayerLeft = tmpPositionObj.position.x;
    const PlayerRight = PlayerLeft + tmpPositionObj.size.x;
    const PlayerTop = tmpPositionObj.position.y;
    const PlayerBottom = PlayerTop + tmpPositionObj.size.y;

    const PlayerHeight = tmpPositionObj.size.y;

    //COLLISION DETECTION World
    const shard = (Math.ceil(tmpPositionObj.position.x / 100) * 100).toString();

    var WorldShards = this.GetShardRange(shard,tmpPositionObj.type =='enemy' ? true : false);



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

      const player_bottom = PlayerTop + tmpPositionObj.size.y - 10;
      const tiles_bottom = ObjTop + WorldShards[i].size.y;
      const player_right = PlayerLeft + tmpPositionObj.size.x;
      const tiles_right = ObjLeft + WorldShards[i].size.x;

      const b_collision = tiles_bottom - PlayerTop;
      const t_collision = player_bottom - ObjTop;
      const l_collision = player_right - ObjLeft;
      const r_collision = tiles_right - PlayerLeft;

      tmpPositionObj.colliding = NewCollider();

      if (collision) {

        tmpPositionObj.colliding.target = WorldShards[i].id;

        if(tmpPositionObj.type === 'projectile'){
          tmpPositionObj.kill = true;
          if(WorldShards[i].type === 'enemy'){
            WorldShards[i].kill = true;
          }
          return tmpPositionObj;
        }

        if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision) {
          //Top collision
          if(WorldShards[i].type == "enemy" && this.enemies[tmpPositionObj.colliding.target]){
            this.enemies[tmpPositionObj.colliding.target].kill = true;
            tmpPositionObj.directionVector.y = -30;
            tmpPositionObj.isGrounded = false;
            return tmpPositionObj;
          } else {
            tmpPositionObj.directionVector.y = 0;
            tmpPositionObj.position.y = ObjTop - PlayerHeight;
            tmpPositionObj.isGrounded = true;
            tmpPositionObj.colliding.top = true;
          }
        }
        if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
          tmpPositionObj.position.y = state.position.y;
          tmpPositionObj.directionVector.y += state.gravity;
          tmpPositionObj.colliding.bottom = true;
          //bottom collsion
        }
        if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
          //Left collision
          tmpPositionObj.position.x = state.position.x;
          tmpPositionObj.isTouchingWall = true;
          tmpPositionObj.colliding.left = true;
        }
        if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision) {
          //Right collision
          tmpPositionObj.position.x = state.position.x;
          tmpPositionObj.isTouchingWall = true;
          tmpPositionObj.colliding.right = true;
        }

        if(tmpPositionObj.colliding.left && tmpPositionObj.type == 'enemy'){
          tmpPositionObj.directionVector.x = -tmpPositionObj.directionVector.x;
          tmpPositionObj.directionVector.direction = "right";
        }
        if(tmpPositionObj.colliding.right && tmpPositionObj.type == 'enemy'){
          tmpPositionObj.directionVector.direction = "left";
          tmpPositionObj.directionVector.x = -tmpPositionObj.directionVector.x;
        }
        if(WorldShards[i].type == "enemy" && tmpPositionObj.invincibilityFrames <= 0) {
          tmpPositionObj.health -= 1;
          tmpPositionObj.invincibilityFrames = settings.invincibilityFramesOnHit;
        }

      }
    }

    }
    }
    if(tmpPositionObj.type == 'player'){
      this.player = tmpPositionObj;
    }
    return tmpPositionObj;

  }
}
export default new Engine();
