export class Finder
{
    
    #bot;
    #road_array = [];
    
    #endPoints =[];

    constructor (temp_bot, Temproad_array)
    {

        this.#bot = temp_bot;
        this.#road_array = Temproad_array;


        for(var i = 0; i < this.#road_array.length; i++)
        {
            var road = this.#road_array[i];
            if((road.PosX == 20 && road.PosY == 20) ||
                (road.PosX == 20 && road.PosY == 440) || 
                (road.PosX == 760 && road.PosY == 440) || 
                (road.PosX == 760 && road.PosY == 20) ||
                (road.PosX == 340 && road.PosY == 440) ||
                (road.PosX == 380 && road.PosY == 20))
                {
                    this.#endPoints.push(road);
                }
        }
        console.log(this.#endPoints);
        
    }

    //20 20, 20 440, 760 440, 760 20 
    farPoint()
    {
        
        let farPoint = 0;
        let farDistancePoint = 0;

            let road = this.#endPoints[Math.floor(Math.random()* this.#endPoints.length)];
       
           
            let distanceX = Math.pow(this.#bot.PosX - road.PosX + road.width, 2);
            let distanceY = Math.pow(this.#bot.PosY - road.PosY + road.width, 2);

            let distancePlayer = Math.sqrt(distanceX + distanceY); 
            
            if(farDistancePoint < distancePlayer )
            {
                farDistancePoint = distancePlayer;
                farPoint = road;
                
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
          
          if (distance <= 20  )
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
    main idea: with this algoritm we will find the best way to find the x point that we want to go
    short exmplain: with recursion we use mathod to search good path for the bot.
    */
    PathAlgorithm() 
    {
        let openList = [];
        let closeList = [];
                            
        let end_point = this.farPoint();
        let start_point = { ...this.#bot }; 
        
                            
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
