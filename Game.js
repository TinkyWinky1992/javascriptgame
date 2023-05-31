
import { player } from './player.js';
import { bot } from './BountieBots.js';
import { MapGame } from './MapGame.js';




let canvas = document.getElementById('gameCanvas'),
ctx = canvas.getContext("2d");

let map_game = new MapGame();

let arrayBrick =  map_game.getBrickArray();
let arrayRoad =   map_game.getRoadArray();

let player_one = new player( 40, 20, map_game);

let MyBot_array = [];
MyBot_array.push(new bot(20, 400, map_game, player_one));
MyBot_array.push(new bot(580, 100, map_game, player_one));
MyBot_array.push(new bot(600, 340,  map_game, player_one));
MyBot_array.push(new bot(580, 220, map_game, player_one));
MyBot_array.push(new bot(400, 20, map_game, player_one));






function engine()
    { 
        
        requestAnimationFrame(engine);

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 480);
    
        for(var i = 0; i < arrayBrick.length; i++)
        {
            arrayBrick[i].brick_drawing(ctx);  
        }

        for(var i = 0; i < arrayRoad.length; i++)
        {
            arrayRoad[i].road_drawing(ctx);
        }   

        for(var i = 0; i < MyBot_array.length; i++)
        {
            let bot = MyBot_array[i]
            if(bot.isHuntingDown)
            {
                engineGameOver();
                 
            }
                
                
            bot.update(ctx);   
            
        }
        player_one.draw_player(ctx);

    }

engine();

function engineGameOver()
{
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 480);
}