import { Finder } from "./PathsBotFeacher.js";
import { dircationPath } from "./DirectionPath.js";

export class bot 
{
  SPEED = 1;
  HEIGHT = 15;
  WIDTH = 15;
  PosX;
  PosY;
  area;

  #pathBot;
  botPath;
  roadTogo;
  state_array = ["right", "left", "down", "up"];


  constructor(temp_x, temp_y, map, tempPlayer) 
  {

    this.PosX = temp_x;
    this.PosY = temp_y;
    this.area = map;
    this.#pathBot = new Finder(this, this.area.getRoadArray(), this.area.getBrickArray());
    this.botPath = this.#pathBot.PathAlgorithm();
    this.botPath.reverse();

    this.roadTogo = this.RoadDirection();
    
  

  }



  RoadDirection() 
  {
    
      let road = this.botPath.pop();
      let directionPath = new dircationPath();
 

      if(this.botPath.length == 1)
        directionPath.Diraction_str = "stop";

      else if (road.PosX > this.PosX )
        directionPath.Diraction_str = "right";

      else if (road.PosX < this.PosX)
        directionPath.Diraction_str = "left";

      else if (road.PosY > this.PosY)
        directionPath.Diraction_str = "down";

      else if (road.PosY < this.PosY)
        directionPath.Diraction_str = "up";

      
      
      
      directionPath.Road = road;


    
      
    return directionPath;
  }
      
  update(ctx) 
  {
   
    let dx = 0;
    let dy = 0;
    let road =  this.roadTogo.Road;
    console.log(this.botPath);
    if (this.botPath.length > 2) 
    {
         
      if(this.PosX == road.PosX && this.PosY == road.PosY)
      {
  
        this.roadTogo = this.RoadDirection();
        road = this.roadTogo.Road;
    
      }

      
      
      switch (this.roadTogo.Diraction_str ) {
        case "up":
          dy = -this.SPEED;
          dx = 0;
          break;
  
        case "down":
          dy = this.SPEED;
          dx = 0;
          break;
  
        case "left":
          dx = -this.SPEED;
          dy = 0;
          break;
  
        case "right":
          dx = this.SPEED;
          dy = 0;
          break;
      }

      this.PosX += dx;
      this.PosY += dy;
    } 

    else 
    {
      this.botPath = this.#pathBot.PathAlgorithm();
      this.botPath.reverse();
      


    }
      
      
    this.draw_bot(ctx);
  }
  

  draw_bot(ctx)
  {

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(this.PosX, this.PosY, this.WIDTH, this.HEIGHT);

  }
}
