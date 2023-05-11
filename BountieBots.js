
class bot
{
    #PosX;
    #PosY;

    height;
    width;

    direction;
    state_array = ["right", "left", "down", "up"];

    constructor(temp_x, temp_y)
    {
        this.#PosX = temp_x;
        this.#PosY = temp_y;

        this.height = 15;
        this.width = 15;

        var rand = Math.floor(Math.random() * this.state_array.length);
        this.direction = this.state_array[rand];

    }

    draw_bot()
    {
      
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.#PosX, this.#PosY, this.width, this.height);

    }


     //updating positions of the bot and moving the bot deppend of the state that the bot is in it
     onMove()
     {
    
         var dx = 0;
         var dy = 0;
         
         switch(this.direction)
         {
             case "up":
 
                 dy = -0.5;
                 break;
 
             case "down":
                 
                 dy = +0.5;
                 break;
             
             case "left":
 
                 dx = -0.5;
                 break;
 
             case "right":
 
                 dx = 0.5;
                 break;
 
         }
 
         if(this.check_collistion(dx, dy))
             this.direction = this.randomState();
         
         else{
             this.#PosX += dx;
             this.#PosY += dy;
         }
         this.draw_bot();
         
     }


     check_collistion(dx, dy)
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
 
     randomState()
     {
         var rand = Math.floor(Math.random() * this.state_array.length);
         return this.state_array[rand];
     }

}

/*
    the main problem with this class: 

        1. we need to find a smurt and good path for the bot
            1.2 how we find the best path to the game, what do i what the main goal of the path?

            ANSWER:
                
*/