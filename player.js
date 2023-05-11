class player
{
    #PosX;
    #PosY;
    
    #wdith;
    #Height;

    direction;

    constructor(x, y)
    {
        this.#PosX = x;
        this.#PosY = y;

        this.#wdith = 15;
        this.#Height = 15;

        this.direction = "stop";
    }

    #draw_player()
    {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(this.#PosX, this.#PosY, this.#Height, this.#wdith);

    }

    //checking collisions between the bricks and the player
    #check_collistion(dx, dy)
    {
        var brick = brick_array[i];
         
           
        // Check collision with each brick in the array
        for (var i = 0; i < brick_array.length; i++) {
            var brick = brick_array[i];
            
          
            // Check if this collides with brick
            if (this.#PosX + dx < brick.x + brick.w &&
                this.#PosX + this.width + dx > brick.x &&
                this.#PosY + dy < brick.y + brick.h &&
                this.height + this.#PosY + dy > brick.y) {
          
            // There is a collision
            return true;
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
        if(!this.#check_collistion)
        {
            this.#PosX +=dx;
            this.#PosY += dy;
        }
        else
            this.direction = "stop";

        console.log(this.direction);
        this.#draw_player();
    }


    //this function listen to every keybind that needed to check if the player press on it
    //then change the direcation state of the player

    onStart()
    {
        document.addEventListener("keydown", (event)=> {

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
