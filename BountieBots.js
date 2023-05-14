class Finder{
    #bot;
    #road_array;

    botDistancePoints = {
        road:'',
        distancebot:'',
        botDistancePoints_array: []
    };


    constructor (temp_bot, Temproad_array)
    {
        this.#bot = temp_bot;
        this.#road_array = Temproad_array;
        this.#findFarPoints();

    
        var insertbotBrick_distance = function(road, distance)
        {
            this.road = road;
            this.distance = distance;
        }
    
        this.path =[];
    }

    
    #findFarPoints()
    {
        this.findFarPoints = function()
        {
            var distancebot = 0;
    
            for(var i = 0; i < this.#road_array.length; i++)
            {
                var road= this.#road_array[i];
    
                distancebot = Math.sqrt(Math.pow(this.#bot.PosX + road.PosX, 2) -  Math.pow(this.#bot.PosY + road.PosY, 2));
                this.botDistancePoints.botDistancePoints_array.push(new insertbotBrick_distance(road, distancebot));
                    
            }
    
        }
    }

    pathFinder()
    {

        this.botDistancePoints.botDistancePoints_array.sort();
        let max_point = this.botDistancePoints.botDistancePoints_array[ this.botDistancePoints.botDistancePoints_array.length];



 

        // f- will be the far away distance between the bot and the player
    }

}




export class bot
{
    SPEED = 2;

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