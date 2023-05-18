import { Finder } from "./Paths.js";
import { dircationPath } from "./DirectionPath.js";

export class bot
{
   
    SPEED = 1.5;

    PosX;
    PosY;

    height;
    width;

    area;
    #pathBot;
    array;

    state_array = ["right", "left", "down", "up"];

    constructor(temp_x, temp_y, map, tempPlayer)
    {
        this.PosX = temp_x;
        this.PosY = temp_y;

        this.height = 15;
        this.width = 15;
        this.area = map;
        this.array = new Array();
    
        this.#pathBot = new Finder(this, tempPlayer, this.area.getRoadArray());

       

    }

    draw_bot(ctx)
    {
        this.#onMove();
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.PosX, this.PosY, this.width, this.height);

    }


     //updating positions of the bot and moving the bot deppend of the state that the bot is in it
     #onMove()
     {
        let path = new Array();
        let RoadDirection = [];
        path = this.#pathBot.PathAlgorithm();
        console.log(path);
        
        if(path.length != 0)
        {
            var dx = 0;
            var dy = 0;
            //RoadDirection = this.RoadDirection(path);
            
            /*
            for(var i = 0; i < RoadDirection.length; i++)
           
            {


                var diractionPoint = RoadDirection[i];
                var direction = diractionPoint.Diraction_str;
                var road = diractionPoint.Road;
                
                if(direction != null)
                {
                    
                    
                     switch(direction)
                    {
                        
                        case "up":
        
                            dy = - this.SPEED;
                            break;
        
                        case "down":
                        
                            dy = +this.SPEED;
                            break;
                    
                        case "left":
        
                            dx = - this.SPEED;
                            break;
        
                        case "right":
                            
                            dx = + this.SPEED;
                            break;
        
                    }
                }
                    */
                    path.forEach(element => {
                        dx = element.PosX;
                        dy = element.PosY;
                    });

        }
    }
    

     
 
    RoadDirection(Road_path) 
    {

        let directionArray = [];
        for (var i = 0; i < Road_path.length; i++) {
          var road = Road_path[i];
          let diractionPoint = new dircationPath();   
          
          if(road != null)
          {
        
            if (road.PosX > this.PosX + this.width)
                diractionPoint = new dircationPath("right",road);

            else if (road.PosX + road.width < this.PosX) 
                diractionPoint = new dircationPath("left", road);

            else if (road.PosY > this.PosY + this.height) 
                diractionPoint = new dircationPath("left", road);

            else if (road.PosY + road.heigh < this.PosY) 
                diractionPoint = new dircationPath("up", road);
          }
          directionArray.push(diractionPoint);
         
        }
            
        return directionArray;
    
    }

    check_collistion(road, dx, dy)
    {
            // Check if this collides with brick
            if (this.PosX + dx < road.PosX + road.width/2 &&
                this.PosX + this.width + dx > road.PosX &&
                this.PosY + dy < road.PosY + road.height/2 &&
                this.height + this.PosY + dy > road.PosY) {
          
            // There is a collision
            return true;
        }
    }
}

