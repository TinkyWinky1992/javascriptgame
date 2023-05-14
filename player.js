export class player
{
    SPEED = 1.5;
    #PosX;
    #PosY;
    
    #wdith;
    #Height;

    direction;
    area;


    constructor(x, y, map)
    {
        this.#PosX = x;
        this.#PosY = y;

        this.#Height = 15;
        this.#wdith = 15;

        this.area = map;
        this.direction = "stop";
    }

    draw_player(ctx)
    {
        this.#OnListen();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(this.#PosX, this.#PosY, this.#Height, this.#wdith);

    }

    
    //checking collisions between the bricks and the player
    check_collistion(dx, dy) 
    {
        var hasCollision = false;
        var brickArray = this.area.getBrickArray();
        // Check collision with each brick in the array
        for (var i = 0; i < brickArray.length; i++) {
            var brick = brickArray[i];
        
            // Check if player collides with brick
            if (this.#PosX + dx < brick.PosX + brick.width &&
                this.#PosX + this.#wdith + dx > brick.PosX &&
                this.#PosY + dy < brick.PosY + brick.height &&
                this.#Height + this.#PosY + dy > brick.PosY) {
  
                // There is a collision
                hasCollision = true;
                break;
            }
    }
  
    if (hasCollision) 
        this.direction = "stop";



    else {
      // No collision, check if the next position would cause a collision
      var nextX = this.#PosX + dx;
      var nextY = this.#PosY + dy;
  
      var canMove = true;
      for (var i = 0; i < brickArray.length; i++) {
            var brick = brickArray[i];
  

            if (nextX < brick.PosX + brick.width &&
                nextX + this.#wdith > brick.PosX &&
                nextY < brick.PosY + brick.height &&
                this.#Height + nextY > brick.PosY) {
  
                // There is a collision, don't move
                canMove = false;
                break;
            }
        }
  
      if (canMove) 
        {
            this.#PosX = nextX;
            this.#PosY = nextY;
        }
    }
  }

    //updating positions of the player and moving the player deppend of the state that the player is in it
    
    #update()   
    {
        var dx = 0;
        var dy = 0;

        switch(this.direction)
        {
            case "up":

                dy = - this.SPEED;
                break;

            case "down":
                
                dy= + this.SPEED;
                break;
            
            case "left":

                dx = -this.SPEED;
                break;

            case "right":

                dx = + this.SPEED;
                break;

        }
        this.check_collistion(dx, dy); 
    }


    //this function listen to every keybind that needed to check if the player press on it
    //then change the direcation state of the player

    #OnListen()
    {

        document.addEventListener('keydown', (event) => {

            if( event.key === "w" || event.key === "ArrowUp")
            {
                this.direction = "up";

            }


            else if (event.key === "a" || event.key === "ArrowLeft")
            {
                this.direction = "left";

            }
            

            else if  (event.key === "d" || event.key === "ArrowRight")
            {
                this.direction = "right";

            }

            
            else if (event.key === "s" || event.key === "ArrowDown")
            {
                this.direction = "down";

            }
            else
            {
                this.direction = "stop";
            }

            
        });

        this.#update();
    }
    
    
  
}
