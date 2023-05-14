
import { player } from './player.js';
import { bot } from './BountieBots.js';
import { MapGame } from './MapGame.js';




let canvas = document.getElementById('gameCanvas'),
ctx = canvas.getContext("2d");

let map_game = new MapGame();

let arrayBrick =  map_game.getBrickArray();
let arrayRoad =   map_game.getRoadArray();

let player_one = new player( 20, 40, map_game);

let myBot_1 = new bot(20, 400, map_game);
let myBot_2 = new bot(580, 100, map_game);
let myBot_3 = new bot(600, 340,  map_game);
let myBot_4 = new bot(580, 220, map_game);
let myBot_5 = new bot(400, 20, map_game);



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

            myBot_1.draw_bot(ctx)
            myBot_2.draw_bot(ctx)
            myBot_3.draw_bot(ctx)
            myBot_4.draw_bot(ctx)
            myBot_5.draw_bot(ctx)


            player_one.draw_player(ctx);

    }

engine();
// requestAnimationFrame(engine);