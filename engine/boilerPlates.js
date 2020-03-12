export function NewPlayerObj(){
    return {
      id: 1,
      type: 'player',
      health: 2,
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
      speed: 20
    }
  }

  export function NewEnemyObj(id){
    return {
      id: id,
      type: 'enemy',
      health: 1,
      invincibilityFrames : 0,
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
      speed: 15
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
