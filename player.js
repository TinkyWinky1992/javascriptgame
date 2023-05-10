function player(x, y)
{   
    var player = {};


    player.x = x;
    player.y = y;

    player.w = 15;
    player.h = 15;

    player.playerDistancePoints = [];



    player.direction = "stop";


//we using the road array to calculates the distances between every roads, 
//and put them to the player distancePoint array
    player.findFarPoints = function()
    {
        var distancePlayer = 0;

        for(var i = 0; i < road_array.length; i++)
        {
            var road= road_array[i];
            
                //check distance player
                distancePlayer = Math.sqrt(Math.pow(player.x + road.x, 2) - Math.pow(player.y + road.y, 2));

                player.playerDistancePoints.push([brick_array[i], distancePlayer]);
                
        }
       // var [brick_point, best_distancePath] =Math.max(player.playerDistancePoints);
       // console.log(best_distancePath);
    }


    player.draw_player = function()
    {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(player.x, player.y, player.w, player.h)

    }

    player.draw_remove = function()
    {
        
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(player.x, player.y, player.w, player.h)
    }

//this function listen to every keybind that needed to check if the player press on it
//then change the direcation state of the player
    player.onlisten = function()
    {
        player.findFarPoints();
        document.addEventListener("keydown", function(event) {

                if( event.key === "w" || event.key === "ArrowUp")
                {
                    player.direction = "up";

                }


                else if (event.key === "a" || event.key === "ArrowLeft")
                {
                    player.direction = "left";

                }
                

                else if  (event.key === "d" || event.key === "ArrowRight")
                {
                    player.direction = "right";

                }

                
                else if (event.key === "s" || event.key === "ArrowDown")
                {
                    player.direction = "down";

                }
                else
                {
                    player.direction = "stop";
                }

                
            });
               
        this.update();
    }

//updating positions of the player and moving the player deppend of the state that the player is in it
    player.update = function()
    {
        var dx = 0;
        var dy = 0;

        this.draw_remove();

        switch(player.direction)
        {
            case "up":

                dy = -0.5;
                break;

            case "down":
                
                dy= +0.5
                break;
            
            case "left":

                dx = -0.5;
                break;

            case "right":

                dx = 0.5;
                break;

        }
        this.collision(dx, dy);
        this.draw_player();
    }
    

    //checking collisions between the bricks and the player//
    player.collision = function(dx, dy) {
        var hasCollision = false;
      
        // Check collision with each brick in the array
        for (var i = 0; i < brick_array.length; i++) {
          var brick = brick_array[i];
      
          // Check if player collides with brick
          if (player.x + dx < brick.x + brick.w &&
              player.x + player.w + dx > brick.x &&
              player.y + dy < brick.y + brick.h &&
              player.h + player.y + dy > brick.y) {
      
            // There is a collision
            hasCollision = true;
            break;
          }
        }
      
        if (hasCollision) {
          player.direction = "stop";
        } else {
          // No collision, check if the next position would cause a collision
          var nextX = player.x + dx;
          var nextY = player.y + dy;
      
          var canMove = true;
          for (var i = 0; i < brick_array.length; i++) {
            var brick = brick_array[i];
      
             if (nextX < brick.x + brick.w &&
                nextX + player.w > brick.x &&
                nextY < brick.y + brick.h &&
                player.h + nextY > brick.y) {
      
              // There is a collision, don't move
              canMove = false;
              break;
            }
          }
      
          if (canMove) {
            player.x = nextX;
            player.y = nextY;
          }
        }
      }
      
    


    player.start = function()
    {
        player.onlisten();
    }
    return player;

}