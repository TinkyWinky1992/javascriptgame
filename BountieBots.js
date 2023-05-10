function bot(x, y)
{
    //id by index:         0       1         2       3     
    this.state_array = ["right", "left", "down", "up"];

    this.x = x;
    this.y = y;

    this.w = 15;
    this.h = 15;

    var rand = Math.floor(Math.random() * this.state_array.length);
    this.direction = this.state_array[rand];



    this.draw_bot = function()
    {
      
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w, this.h)

    }
  
    
    

    this.draw_remove = function()
    {
     
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }  

    //updating positions of the bot and moving the bot deppend of the state that the bot is in it
    this.onMove = function()
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
            this.x += dx;
            this.y += dy;
        }
        this.draw_bot();
        
    }


    this.check_collistion = function(dx, dy)
    {
        var brick = brick_array[i];
        
          
        // Check collision with each brick in the array
        for (var i = 0; i < brick_array.length; i++) {
            var brick = brick_array[i];
            
          
            // Check if this collides with brick
            if (this.x + dx < brick.x + brick.w &&
                this.x + this.w + dx > brick.x &&
                this.y + dy < brick.y + brick.h &&
                this.h + this.y + dy > brick.y) {
          
            // There is a collision
            return true;
            }
        }
    }


    this.randomState = function()
    {
        var rand = Math.floor(Math.random() * this.state_array.length);
        return this.state_array[rand];
    }


   
    
    return this;
}
/*
    the main problem with this class: 

        1. we need to find a smurt and good path for the bot
            1.2 how we find the best path to the game, what do i what the main goal of the path?

            ANSWER:
                
*/