export class Hunting
{
    RADIUS = 100;
    bot;
    player;
    road_array = [];



    constructor(temp_bot, temp_player, temp_road_arry)
    {
        this.bot = temp_bot;
        this.player = temp_player;
        this.road_array = temp_road_arry;
    }


//checking if the player in the radius of the bot
    checkRadiusCollision()
    {
        var distanceX = Math.pow((this.bot.PosX - this.player.PosX), 2);
        var distanceY = Math.pow((this.bot.PosY - this.player.PosY), 2);
        var distance = Math.sqrt(distanceX + distanceY);

        if(distance <= this.RADIUS)
            return true;

        return false;
    }



    //checking most clsoe points for the bot
    closePointsBot(sourcePosX, sourcePosY)
    {
       let close_points = [];
       let distance = 0;
     
       for (let i = 0; i < this.road_array.length; i++) {
         let road = this.road_array[i];
         
         distance = this.checkDistance(sourcePosX, sourcePosY, road.PosX, road.PosY);
         
         if (distance <= 20  )
         {
           close_points.push(road);  
         }
       }
       
       return close_points;
     }

     //checking the distance between x source and x destination postions
    checkDistance(sourcePosX, sourcePosY, destinationPosX, destinationPosY)
    {
      let distanceX = Math.pow(sourcePosX - destinationPosX, 2);
      let distanceY = Math.pow(sourcePosY -  destinationPosY, 2);
 
      let distance = Math.sqrt(distanceX + distanceY);
      return distance;
    }


    //make the most good path for hunting the player down
    /*in short this function thake first of the end point that is the correct road of the player
      and the start point is the correct road of the bot. 
      we using the clsoe list and open list, the close list have the point that we already explore
      the open list it to give the possible position that the bot can go though them.
    */
    pathTracker()
    {
      let end_point = this.player.correntRoad();
      let start_point = { ...this.bot };
      let openList = [];
      let closeList = [];
 
                            
      openList.push(start_point);
                            
      while (openList.length > 0) 
      {
            
        let currentIndex = 0;

        for (let i = 1; i < openList.length; i++) 
        {
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