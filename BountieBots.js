class Finder{
    
    #bot;
    #player
    #road_array;
    #farPoint;

    


    constructor (temp_bot, temp_player, Temproad_array)
    {
        this.#player = temp_player;
        this.#bot = temp_bot;
        this.#road_array = Temproad_array;
        this.#farPoint = 0;
        this.#farPointPlayer();
    }

    
    #closePointsBot()
    {
        close_points = []
        for(var i = 0; i < this.#road_array.length; i++)
        {
            
            let distanceX = Math.pow(this.#bot.PosX + road.PosX, 2);
            let distanceY = Math.pow(this.#bot.PosY + road.PosY, 2);

            let distance = Math.sqrt(distanceX - distanceY);
            if(distance <= 40)
                close_points.push(distance);
            
        }
        return close_points;
    }
    

    #farPointPlayer()
    {
        let distancePlayer = 0;
        for(var i = 0; i<this.#road_array.length; i++)
        {
            let distanceX = Math.pow(this.#player.PosX + road.PosX, 2);
            let distanceY = Math.pow(this.#player.PosY + road.PosY, 2);

            distancePlayer = Math.sqrt(distanceX - distanceY); 
            if(this.#farPoint < distancePlayer)
                this.#farPoint = distancePlayer;
        }
    
    }

    #checkminDistance(array)
    {
        min = array[0];
        for(var i = 0; i < array.length; i++)
            if(min > array[i])
                min = array[i];
        return min
    }

    pathFinder()
    {   
        end_point = this.#farPoint;
        open_list =this.#closePointsBot();
        close_list = [];

        start_point = this.#checkminDistance(open_list);
        close_list.push(start_point);

        while(start_point != end_point)
        {
            open_list = this.#closePointsBot();
            start_point = this.#checkminDistance(open_list);


        }
    }

    PathAlgoritm(start_point, end_point, open_list, before_list)
    {
        if(start_point == end_point)
            return 0;

        start_point = this.#checkminDistance(open_list)
        open_list = this.#closePointsBot();

        this.PathAlgoritm(start_point, end_point, open_list,before_list)

    }

}




export class bot
{
    DataTime = new Date(); 
    PLAYER_METERS_DISTANCE_FOR_SECAND = 5;
    SPEED = 1.5;

    #PosX;
    #PosY;

    height;
    width;

    area;
    direction;

    state_array = ["right", "left", "down", "up"];

    constructor(temp_x, temp_y, map)
    {
        this.#PosX = temp_x;
        this.#PosY = temp_y;

        this.height = 15;
        this.width = 15;
        this.area = map;
        var rand = Math.floor(Math.random() * this.state_array.length);
        this.direction = this.state_array[rand];

    }

    draw_bot(ctx)
    {
        this.#onMove();
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.#PosX, this.#PosY, this.width, this.height);

    }


     //updating positions of the bot and moving the bot deppend of the state that the bot is in it
     #onMove()
     {
    
         var dx = 0;
         var dy = 0;
         
         switch(this.direction)
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
 
         if(this.check_collistion(dx, dy))
             this.direction = this.randomState();
         
         else{
             this.#PosX += dx;
             this.#PosY += dy;
         }
         
     }
    
    getCollistionRoad(dx, dy)
     {
        var RoadArray = this.area.getRoadArray();
           
         // Check collision with each brick in the array
         for (var i = 0; i < RoadArray.length; i++) {
             var road = RoadArray[i];
             
           
             // Check if this collides with brick
             if (this.#PosX + dx < road.PosX + road.width &&
                 this.#PosX + this.width + dx > road.PosX &&
                 this.#PosY + dy < road.PosY + road.height &&
                 this.height + this.#PosY + dy > road.PosY) {
           
                    return road;
             }
         }
     }

     check_collistion(dx, dy)
     {
        var brickArray = this.area.getBrickArray()
           
         // Check collision with each brick in the array
         for (var i = 0; i < brickArray.length; i++) {
             var brick = brickArray[i];
             
           
             // Check if this collides with brick
             if (this.#PosX + dx < brick.PosX + brick.width &&
                 this.#PosX + this.width + dx > brick.PosX &&
                 this.#PosY + dy < brick.PosY + brick.height &&
                 this.height + this.#PosY + dy > brick.PosY) {
           
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