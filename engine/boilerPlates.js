export function NewPlayerObj(){
    return {
      id: 1,
      type: 'player',
      health: 2,
      gravity: true,
      invincibilityFrames : 0,
      directionVector: {
        x: 0,
        y: 0,
        direction: "right"
      },
      size: {
        x: 66,
        y: 100
      },
      hitbox: {
        x: 66,
        y: 100
      },
      position: {
        x: 200,
        y: 100
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
      speed: 20,
      walkingSpeed: 1.7,
      forceOnJump: 45
    }
  }

  export function NewEnemyObj(id,x){
    return {
      id: id,
      type: 'enemy',
      health: 1,
      invincibilityFrames : 0,
      gravity: true,
      directionVector: {
        x: -0.2,
        y: 0,
        direction: "right"
      },
      size: {
        x: 85,
        y: 80
      },
      hitbox: {
        x: 85,
        y: 80
      },
      position: {
        x: x,
        y: 150
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
      speed: 10,
      kill : false
    }

  }

  export function NewProjectile(id,x,y){
    return {
      id: id,
      type: 'projectile',
      health: 1,
      invincibilityFrames : 0,
      gravity: false,
      directionVector: {
        x: 2,
        y: 0,
        direction: "right"
      },
      size: {
        x: 15,
        y: 15
      },
      hitbox: {
        x: 15,
        y: 15
      },
      position: {
        x: x,
        y: y
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
      speed: 10,
      kill : false
    }

  }

  export function NewBlockObj(id=0,position={x:0,y:0}){
    return {
     id: id,
     type: 'block',
      size: {
        x: 100,
        y: 100
      },
      hitbox: {
        x: 85,
        y: 80
      },
      position: position,
      colliding:{
        left: false,
        right: false,
        top: false,
        bottom: false,
        target: null
      }
    }
  }


  export function NewCollider(){
    return {
      left: false,
      right: false,
      top: false,
      bottom: false,
      target: null
    }
  }
