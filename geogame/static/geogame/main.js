

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
        Game.zoomedImg = new Image();
        Game.canvas.addEventListener("mousedown", Game.getcoords, false);
        Game.tot_score = 0;
        Game.level_score = 0;
        Game.num_gos = 0;
        Game.difficulty = 50;
        Game.level = 1;
        Game.updateLevel();
        Game.updateLevelScore();
        Game.isZoomed = false;
        Game.world.onload = function() {
            Game.ctx.drawImage(Game.world, 0, 0);
        }

        Game.mainloop();
    }

    /*==============================================
        MAIN GAME FUNCTIONS
    ==============================================*/

    Game.getcoords = function(event) { //get's click location on the canvas
        var rect = Game.canvas.getBoundingClientRect();
        Game.clickX = event.clientX - rect.left;
        Game.clickY = event.clientY - rect.top;
        if(Game.isZoomed == false) {
            Game.zoom();
            Game.isZoomed = true;
        } else if (Game.isZoomed == true) {
            Game.ctx.drawImage(Game.world, 0, 0);
            Game.distance_calc();
            Game.isZoomed = false;
        }
    }

    Game.distance_calc = function() {
        var cityX = Game.city.xcoord;
        var cityY = Game.city.ycoord;
        distance = Math.sqrt(Math.pow( Game.clickX - cityX, 2) + Math.pow(Game.clickY - cityY, 2));
        //convert to lat and long
        var click_long = (Game.clickX * 10 - 6000) * 0.03;//remove * 10 when zoom implemented
        var click_lat = (3000 - Game.clickY * 10) * 0.03;//remove * 10 when zoom implemented
        var city_long = (Game.city.xcoord - 6000) * 0.03;
        var city_lat = (3000 - Game.city.ycoord) * 0.03;
        Game.distance = Game.global_dist(click_long, click_lat, city_long, city_lat);
        console.log("Distance: " + Game.distance); 
        
        if( Game.distance == 0){
            var go = 1000;
        } else { 
            var go =  Math.round(1000 / Math.sqrt(Game.distance));
        }
        Game.tot_score += go;
        Game.level_score += go;
        Game.updateLevelScore();
        // remove divide by 10 when zoom implemented
        Game.ctx.drawImage(Game.citycross, cityX/10 - Game.crosswidth/2, cityY/10 - Game.crossheight/2);
        if(Game.num_gos < 10) {
            Game.getCity();
        } else if (Game.num_gos == 10 && Game.level_score < 1000) {
            Game.levelUp();
        } else {
            Game.levelFail();
        }
    }

    Game.global_dist = function(lon1, lat1, lon2, lat2) {
        //Calculates the great circle distance between two points on the earth
        lon1 = lon1 * (Math.PI/180);
        lat1 = lat1 * (Math.PI/180);
        lon2 = lon2 * (Math.PI/180);
        lat2 = lat2 * (Math.PI/180);
        var dlon = lon2 - lon1;
        var dlat = lat2 - lat1;
        var a = Math.sin(dlat/2)*Math.sin(dlat/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2)*Math.sin(dlon/2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var r = 6371; // Radius of earth in Km, use 3956 for miles
        return c * r;
    }

    Game.getCity = function() { // call's views.py to get a new city object
        Game.num_gos++;
        $.ajax({
            url: 'next_city/',
            data: { difficulty: Game.difficulty },
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

    Game.zoom = function() {
        zoomx = Game.clickX
        zoomy = Game.clickY
        $.ajax({
            url: 'zoom/',
            data: {xpos: zoomx, ypos: zoomy},
            type: 'get',
            success: function(data) {
                Game.zoomedImg.src = "data:image/jpeg;base64,"+data
                Game.zoomedImg.onload = function() {
                    Game.ctx.drawImage(Game.zoomedImg,0,0);
                }
            },
            failure: function(data) {
                console.log('failed to load zoomed image')
            }
        });
    }


    Game.levelUp = function() {
        console.log("SUCCESS");
        Game.difficulty += 50;
        Game.level++;
        Game.num_gos = 0;
        Game.level_score = 0;
        Game.updateLevel();
    }

    Game.levelFail = function() {
        console.log("FAIL");
        Game.difficulty = 50;
        Game.level = 1;
        Game.num_gos = 0;
        Game.level_score = 0;
        Game.tot_score = 0;
        Game.updateLevel();
    }

    Game.nextCity = function() { // updates target location in HTML
        document.getElementById("target").innerHTML = "Your next city is " + Game.city.name + ", " + Game.city.country;
        console.log(Game.city.name);
        document.getElementById("tot_score").innerHTML = "Total Score: " + Game.tot_score;
    }

    Game.updateLevelScore = function() {
        document.getElementById("score").innerHTML = "Level Score: " + Game.level_score;
    }

    Game.updateLevel = function() {
        document.getElementById("level").innerHTML = "Level: " + Game.level;
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
