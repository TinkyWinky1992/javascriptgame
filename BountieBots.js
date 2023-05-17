class Finder{
    
    #bot;
    #player
    #road_array;

    


    constructor (temp_bot, temp_player, Temproad_array)
    {
        this.#player = temp_player;
        
        this.#bot = temp_bot;
        this.#road_array = Temproad_array;
    }

    farPointPlayer()
    {
        let distancePlayer = 0;
        let distanceX = 0;
        let distanceY = 0;
        let farPoint = 0;
        let farDistancePoint = 0;

        for(var i = 0; i<this.#road_array.length; i++)
        {
            let road = this.#road_array[i];
           
            distanceX = Math.pow(this.#player.PosX - road.PosX, 2);
            distanceY = Math.pow(this.#player.PosY - road.PosY, 2);

            distancePlayer = Math.sqrt(distanceX + distanceY); 
            
            if(farDistancePoint < distancePlayer )
            {
                farDistancePoint = distancePlayer;
                farPoint = road;
                
            }
        }
                   
        return farPoint;
    }
    
    checkDistance(sourcePosX, sourcePosY, destinationPosX, destinationPosY)
    {
        let distanceX = Math.pow(sourcePosX - destinationPosX, 2);
        let distanceY = Math.pow(sourcePosY -  destinationPosY, 2);

        let distance = Math.sqrt(distanceX + distanceY);

        return distance;
    }


    closePointsBot(sourcePosX, sourcePosY) {
        let close_points = [];
        let distance = 0;
      
        for (let i = 0; i < this.#road_array.length; i++) {
          let road = this.#road_array[i];
          distance = this.checkDistance(sourcePosX, sourcePosY, road.PosX, road.PosY);
            
          if (distance <= 20) 
          {
            close_points.push(road);  
          }
        }
        
        return close_points;
      }
    

      checkminDistance(start_pointPosX, start_pointPosY, array) {

        array.sort();
        array.splice(0,1)
        let Current_road = array[0];
        return Current_road;
        }


    /*
    main idea: with this algoritm we will find the best way to find the x point that we want to go
    short exmplain: with recursion we use mathod to search good path for the bot.

        1. we need to check if the bot in the point allready then he exit.
        2. we need to check if the bot go far from the point then go back and check the other dircation 
            that he can go.
        2.1. if he didn't find good point that make the bot closer to the end point then
            choose one of the optinal dirction can  keep the recursion as usual.


    */
    PathAlgorithm() 
    {
        let openList = [];
        let closeList = [];
                            
        let end_point = this.farPointPlayer();
        let start_point = { ...this.#bot }; // Initial start point is the bot's current position
                            
        openList.push(start_point);
                            
        while (openList.length > 0) 
        {
            // Find the point with the lowest distance from the start point
            let currentIndex = 0;

            for (let i = 1; i < openList.length; i++) {
                if (openList[i].distance < openList[currentIndex].distance) 
                {
                    currentIndex = i;
                }
            }
                            
            let currentPoint = openList[currentIndex];
                            
            // Check if the current point is the end point
            if (currentPoint.PosX === end_point.PosX && currentPoint.PosY === end_point.PosY) 
            {

                // Reconstruct the path
                let path = [];
                let current = currentPoint;

                while (current !== start_point) 
                {
                    path.push(current);
                    current = current.parent;

                }
                path.push(start_point);
                path.reverse();
                return path;
            }
                            
            // Remove the current point from the open list
            openList.splice(currentIndex, 1);
            // Add the current point to the closed list
            closeList.push(currentPoint);
                            
            // Generate neighbors
            let neighbors = this.closePointsBot(currentPoint.PosX, currentPoint.PosY);
                            
            for (let i = 0; i < neighbors.length; i++) 
            {
                let neighbor = neighbors[i];
                            
                // Check if the neighbor is in the closed list
                if (closeList.find((p) => p.PosX === neighbor.PosX && p.PosY === neighbor.PosY)) 
                    continue;
                                
                            
                // Calculate the distance from start to neighbor
                let distance = currentPoint.distance + this.checkDistance(currentPoint.PosX, currentPoint.PosY, neighbor.PosX, neighbor.PosY);
                            
                // Check if the neighbor is already in the open list
                let index = openList.findIndex((p) => p.PosX === neighbor.PosX && p.PosY === neighbor.PosY);
                if (index !== -1) 
                {
                    // If the new distance is lower, update the neighbor's distance and parent
                    if (distance < openList[index].distance) 
                    {
                        openList[index].distance = distance;
                        openList[index].parent = currentPoint;
                    }
                }

                else 
                {
                    // Add the neighbor to the open list
                    neighbor.distance = distance;
                    neighbor.parent = currentPoint;
                    openList.push(neighbor);
                }
            }
        }
                            
        // No path found
        return [];
    }
              
        
    

}   

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
        if(path.length == 0)
        var dx = 0;
        var dy = 0;
        var direction = "";
        let RoadDirection = new Array();

        path = this.#pathBot.PathAlgorithm();
        RoadDirection = this.RoadDirection(path);
       
        if (path.length === 0) {
          // Handle the case when no path is found
          return;
        }

        
        
        
        console.log(RoadDirection);
        for(var i = 0; i < RoadDirection.length; i++)
        {
            
                
            direction = RoadDirection[i];
            
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

    // Check collision with bricks
   
        this.PosX += dx;
        this.PosY += dy;
      
        
        }
    }
    
    check_collistion(dx, dy)
     {
        var brickArray = this.area.getBrickArray()
           
         // Check collision with each brick in the array
         for (var i = 0; i < brickArray.length; i++) {
             var brick = brickArray[i];
             
           
             // Check if this collides with brick
             if (this.PosX + dx < brick.PosX + brick.width &&
                 this.PosX + this.width + dx > brick.PosX &&
                 this.PosY + dy < brick.PosY + brick.height &&
                 this.height + this.PosY + dy > brick.PosY) {
           
             // There is a collision
             return true;
             }
         }
     }
     
 
    RoadDirection(Road_path) 
    {

        var directionArray = [];
        for (var i = 0; i < Road_path.length; i++) {
          var road = Road_path[i];
          if(road != null)
          {
            if (road.PosX > this.PosX + this.width) 
                directionArray.push("right");

            else if (road.PosX + road.width < this.PosX) 
                directionArray.push("left");

            else if (road.PosY > this.PosY + this.height) 
                directionArray.push("down");

            else if (road.PosY + road.heigh < this.PosY) 
                directionArray.push("up");
          }


        }
            
        return directionArray;
    
    }

}

/*
    the main problem with this class: 

        1. we need to find a smurt and good path for the bot
            1.2 how we find the best path to the game, what do i what the main goal of the path?

            ANSWER:
                
*/