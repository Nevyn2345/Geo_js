

Game = {};

Game.Launch = function() {
    Game.ready = 0;
    Game.Init = function() {
        Game.ready = 1;
        Game.canvas = document.getElementById("myCanvas");
        Game.ctx = Game.canvas.getContext("2d");
        Game.world = new Image();
        Game.world.src = '/static/geogame/medium_map.jpg';
        Game.citycross = new Image();
        Game.citycross.src = '/static/geogame/targetcrosshair.gif';
        Game.crosswidth = 50;
        Game.crossheight = 50;
        Game.canvas.addEventListener("mousedown", Game.getcoords, false);

        Game.world.onload = function() {
            Game.ctx.drawImage(Game.world, 0, 0);
        }

        Game.mainloop();
    }

    Game.getcoords = function(event) { //get's click location on the canvas
        Game.clickX = event.PageX;
        Game.clickY = event.PageY;
        Game.ctx.drawImage(Game.world, 0, 0);
        Game.distance_calc();
    }

    Game.distance_calc = function() {
        var cityX = Game.city.xcoord/10;
        var cityY = Game.city.ycoord/10;
        distance = Math.sqrt(Math.pow( Game.clickX - cityX, 2) + Math.pow(Game.clickY - cityY, 2));

        if (distance < 50) {
            alert("congratz");
        } else {
            alert("learn geography fool!");
        }

        Game.ctx.drawImage(Game.citycross, cityX - Game.crosswidth/2, cityY - Game.crossheight/2);
        Game.getCity();
    }

    Game.getCity = function() { // call's views.py to get a new city object
        $.ajax({
            url: 'next_city/',
            type: 'get',
            success: function(data) {
                Game.city = data;
                Game.nextCity();
            },
            failure: function(data) {
                console.log("error");
                alert('error!');
            }
        });
    }

    Game.nextCity = function() { // updates target location in HTML
        document.getElementById("target").innerHTML = "Your next city is " + Game.city.name + ", " + Game.city.country;
    }

    Game.mainloop = function() {
       Game.getCity();
    }

}

/*=============================================
Let's Go
=============================================*/

Game.Launch()

window.onload = function() {
    Game.Init();
}
