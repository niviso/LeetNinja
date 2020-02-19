export function NewPlayerObj(){
    return {
      id: "",
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
        x: 260,
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

  export function NewBlockObj(id=0,position={x:0,y:0}){
    return {
     id: id,
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