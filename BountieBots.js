import { Finder } from "./PathsBotFeacher.js";
import { dircationPath } from "./DirectionPath.js";
import { Hunting } from "./HuntingBotFeacher.js";

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

  huntFeacher;
  
  state_array = ["right", "left", "down", "up"];
  isHuntingDown = false;
 


  constructor(temp_x, temp_y, map, tempPlayer) 
  {

    this.PosX = temp_x;
    this.PosY = temp_y;
    
    this.area = map;
    this.#pathBot = new Finder(this, this.area.getRoadArray());
    this.botPath = this.#pathBot.PathAlgorithm();
    this.botPath = this.confirmRoads();
    this.botPath.reverse();

    this.huntFeacher = new Hunting(this, tempPlayer, this.area.getRoadArray());
    
    this.roadTogo = this.RoadDirection();
    
  

  }



  RoadDirection() 
  {
    
      let road = this.botPath.pop();
      let directionPath = new dircationPath();

      if(road == null)
        directionPath.Diraction_str = "killed";

      else if(this.botPath.length == 1 )
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
    let road =  this.roadTogo.Road;
    //check if the player in the raduis of the bot
    
    if(this.huntFeacher.checkRadiusCollision())
    {
      
      this.botPath = this.huntFeacher.pathTracker();
      this.botPath = this.confirmRoads();
      
      this.botPath.reverse();


        
        this.roadTogo = this.RoadDirection();
       
        
        road = this.roadTogo.Road;
       
        
      
       //add to the positions of the x and y of the bot
      this.OnMove(ctx);
    }

    //making random direction to go for bot
    else if (this.botPath.length > 2) 
    {
      
      
      if(this.PosX == road.PosX && this.PosY == road.PosY)
      {
  
        this.roadTogo = this.RoadDirection();
        road = this.roadTogo.Road;
    
      }
      //add to the positions of the x and y of the bot
      this.OnMove(ctx);
    } 

    else 
    {
      this.botPath = this.#pathBot.PathAlgorithm();
     
      this.botPath.reverse();
    }
      
  }


  OnMove(ctx)
  {
    let dx = 0;
    let dy = 0;
   console.log(this.roadTogo.Diraction_str);
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
      case "killed":
        this.isHuntingDown = true;
        break;
    }

    this.PosX += dx;
    this.PosY += dy;
    this.draw_bot(ctx);

  }


  correntRoad()
  {
      let Roads = this.area.getRoadArray();
      let road = Roads[0];
      let min_road = road;

      let distance = Math.sqrt(Math.pow((this.PosX - road.PosX), 2) + Math.pow((this.PosY - road.PosY), 2));
      for(var i = 1; i < Roads.length ; i++)
      {
          road = Roads[i];
          
          if(distance > Math.sqrt(Math.pow((this.PosX - road.PosX), 2) + Math.pow((this.PosY - road.PosY), 2)))
          {
              distance = Math.sqrt(Math.pow((this.PosX - road.PosX), 2) + Math.pow((this.PosY - road.PosY), 2));
              min_road = Roads[i];
          }
              
      }
      return min_road;
  }

  draw_bot(ctx)
  {

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(this.PosX, this.PosY, this.WIDTH, this.HEIGHT);

  }

  confirmRoads()
  {
    var road = 0;
    let newPath = [];
    for(var i = 0; i < this.botPath.length; i++)
    {
      road = this.botPath[i];
      if(this.PosX != road.PosX || this.PosY != road.PosY)
        newPath.push(road);

    }
    return newPath;
  }

}
