export class road
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

    road_drawing(ctx)
    {
        ctx.fillStyle = "white";
        ctx.fillRect(this.PosX ,  this.PosY, this.width, this.height);
    }
}