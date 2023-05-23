import { Finder } from "./Paths.js";
import { dircationPath } from "./DirectionPath.js";

export class bot {
    SPEED = 1.5;
    PosX;
    PosY;
    height;
    width;
    area;
    #pathBot;
    state_array = ["right", "left", "down", "up"];

    constructor(temp_x, temp_y, map, tempPlayer) {
        this.PosX = temp_x;
        this.PosY = temp_y;
        this.height = 15;
        this.width = 15;
        this.area = map;
        this.#pathBot = new Finder(this, tempPlayer, this.area.getRoadArray(), this.area.getBrickArray());
    }

    draw_bot(ctx) {
        this.#onMove();
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.PosX, this.PosY, this.width, this.height);
    }

    #onMove() {

        let path = this.#pathBot.PathAlgorithm();
        let directionPaths = this.RoadDirection(path);
        let dirRoad = directionPaths[2];

        let dir = dirRoad.Diraction_str;

        

        if(dir != null)
        {
            let dx = 0;
            let dy = 0;
            
            switch(dir)
            {
                case "up":
                    dy = -this.SPEED;
                    break;
                case "down":
                    dy = this.SPEED;
                    break;
                case "left":
                    dx = -this.SPEED;
                    break;
                case "right":
                    dx = this.SPEED;
                    break;
            }
            this.PosX += dx;
            this.PosY += dy;
        }
        
    }

    RoadDirection(Road_path) {
        let directionArray = [];

        for (let i = 0; i < Road_path.length; i++) {
            let road = Road_path[i];
            let diractionPoint = new dircationPath();

            if (road != null) {
                if (road.PosX > this.PosX + this.width)
                    diractionPoint.Diraction_str = "right";
                else if (road.PosX + road.width < this.PosX)
                    diractionPoint.Diraction_str = "left";
                else if (road.PosY > this.PosY + this.height)
                    diractionPoint.Diraction_str = "down";
                else if (road.PosY + road.height < this.PosY)
                    diractionPoint.Diraction_str = "up";
            }

            diractionPoint.Road = road;
            directionArray.push(diractionPoint);
        }

        return directionArray;
    }

}
/*
        let path = this.#pathBot.PathAlgorithm();

        if (path.length != 0) {
            let dx = 0;
            let dy = 0;
            let  RoadDirection = this.RoadDirection(path);
            console.log(RoadDirection);
            for (let i = 0; i < RoadDirection.length; i++) {
                let  diractionPoint = RoadDirection[i];
                let  direction = diractionPoint.Diraction_str;
                let road = diractionPoint.Road;

                if (direction != null) {
                    switch (direction) {
                        case "up":
                            dy = -this.SPEED;
                            break;
                        case "down":
                            dy = this.SPEED;
                            break;
                        case "left":
                            dx = -this.SPEED;
                            break;
                        case "right":
                            dx = this.SPEED;
                            break;
                    }

                    if (!this.check_collision(road, dx, dy)) {
                        this.PosX += dx;
                        this.PosY += dy;
                        
                    }
                }
            }
        }
        */