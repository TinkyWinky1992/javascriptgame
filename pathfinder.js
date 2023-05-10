function finder(bot)
{
    this.botDistancePoints =
    {
        road:'',
        distancebot:'',
        botDistancePoints_array: []
    };

    var insertbotBrick_distance = function(road, distance)
    {
        this.road = road;
        this.distance = distance;
    }

    this.path =[];

    this.findFarPoints = function()
    {
        var distancebot = 0;

        for(var i = 0; i < road_array.length; i++)
        {
            var road= road_array[i];

            distancebot = Math.sqrt(Math.pow(bot.x + road.x, 2) -  Math.pow(bot.y + road.y, 2));
            this.botDistancePoints.botDistancePoints_array.push(new insertbotBrick_distance(road, distancebot));
                
        }

        this.botDistancePoints.botDistancePoints_array.sort();
        var max = this.botDistancePoints.botDistancePoints_array[ this.botDistancePoints.botDistancePoints_array.length];
        console.log(max);
    }

    this.pathFinder = function()
    {
        var start_path_x = bot.x;
        var start_path_y = bot.y;

        var end_path_x = brick_point.x;
        var end_path_y = brick_point.y;

        // f- will be the far away distance between the bot and the player
    }

    return this;
}