export class Finder{
    
    #bot;
    #player
    #road_array;
    #birck_array;

    constructor (temp_bot, temp_player, Temproad_array, temp_bricks)
    {
        this.#player = temp_player;
        
        this.#bot = temp_bot;
        this.#road_array = Temproad_array;
        this.#birck_array = temp_bricks;
        
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
           
            distanceX = Math.pow(this.#player.PosX - road.PosX + road.width, 2);
            distanceY = Math.pow(this.#player.PosY - road.PosY + road.width, 2);

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


    closePointsBot(sourcePosX, sourcePosY)
     {
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
    

      checkminDistance( array) {

        array.sort();
        array.splice(0,1)
        let Current_road = array[0];
        return Current_road;
        }

        /*
        check_collistion(point ,dx, dy) 
        {
            var brickArray = this.#birck_array();
            // Check collision with each brick in the array
            for (var i = 0; i < brickArray.length; i++) {
                var brick = brickArray[i];
            
                // Check if player collides with brick
                if (this.PosX + dx < brick.PosX + brick.width &&
                    this.PosX + this.#wdith + dx > brick.PosX &&
                    this.PosY + dy < brick.PosY + brick.height &&
                    this.Height + this.PosY + dy > brick.PosY) {
      
                    // There is a collision
                    return true;
                    
                }
                return false;
            }
        }
        */

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
        let start_point = { ...this.#bot }; 
        console.log(start_point);
                            
        openList.push(start_point);
                            
        while (openList.length > 0) 
        {
            
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
                    //console.log(current);
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
