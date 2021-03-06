import Matter from "matter-js";
import React from "react";
import { JOINT } from "../../../constants/index"

export default class Joint {
  constructor(x, y, index, engine, handleJointClick) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.index = index;
    this.engine = engine;
    this.handleJointClick = handleJointClick(index);
    this.matterObject = Matter.Bodies.circle(
      this.initialX, this.initialY, JOINT.bodyRadius,
      {
        density: 0.04,
        friction: JOINT.friction,
        frictionAir: 0.00001,
        restitution: 0.8,
        collisionFilter:{
          group:JOINT.collisionBitset,
          mask:JOINT.collisionBitmask
        }
      });
    Matter.World.add(this.engine.world, [this.matterObject]);
  }
  
  reset() {
  
  }

  render(isSelected) {
    this.x = this.matterObject.position.x;
    this.y = this.matterObject.position.y;
    console.log(this.index, isSelected);
    return (
      <div id = {`joint_${this.index}`}
           key={`joint${this.index}`}
           className = "joint"
           style={{
             width:JOINT.visualRadius*2,
             height:JOINT.visualRadius*2,
             borderRadius:JOINT.visualRadius,
             transform:`translate(${this.x-JOINT.visualRadius}px, ${this.y-JOINT.visualRadius}px)`}}
           onClick={this.handleJointClick}/>
    )
  }
}