export class Brick
{
    PosY;
    PosX;

    width;
    height;

    constructor(x, y)
    {
        this.PosX = x;
        this.PosY = y;

        this.width = 20;
        this.height = 20;
    }

    brick_drawing(ctx)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(this.PosX ,  this.PosY, this.width, this.height);
    }
} 
