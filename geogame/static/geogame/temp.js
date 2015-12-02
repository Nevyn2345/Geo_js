function initialise() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    window.ctx = ctx;
    var x = canvas.width;
    var y = canvas.height;
    var img = new Image();
    img.src = '/static/geogame/medium_map.jpg';
    var city_cross = new Image();
    city_cross.src = '/static/geogame/targetcrosshair.gif';
    
    window.city_cross = city_cross;
    window.crosswidth = 50;
    window.crossheight = 50;

    canvas.addEventListener("mousedown", getcoords, false);

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }

    mainLoop();
}

function nextCity() {
    document.getElementById("target").innerHTML = "Your Next City is " + city.name + ", " + city.country;
    ctx.drawImage(img, 0, 0);
}

function getcoords(event) {
    clickX = event.pageX;
    clickY = event.pageY;
    cityX = city.xcoord/10
    cityY = city.ycoord/10
    console.log("clickX " + clickX + " cityX " + cityX + " clickY " + clickY + " cityY " + cityY)
    distance = Math.sqrt(Math.pow( clickX - cityX, 2) + Math.pow(clickY - cityY, 2));
    if (distance < 50) {
        alert("congratz");
    } else {
        alert("you suck!");
    }

    a = cityX - crosswidth/2;
    b = cityY - crossheight/2;
    console.log(cityX, cityY, crosswidth, crossheight);
    ctx.drawImage(city_cross, a, b);

    $.ajax({
        url: 'next_city/',
        type: 'get',
        success: function(data) {
            city = data;
            nextCity();
        },
        failure: function(data) {
            console.log("error");
            alert('error!');
        }
    });
}

function mainLoop() {
    nextCity();

}

window.onload=function() {
    initialise()
}
