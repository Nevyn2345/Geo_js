function initialise() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width;
    var y = canvas.height;
    var img = new Image();
    img.src = '/static/geogame/medium_map.jpg';
    canvas.addEventListener("mousedown", getcoords, false);

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }

    mainLoop();
}

function nextCity() {
    document.getElementById("target").innerHTML = "Your Next City is " + city.name + ", " + city.country;
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
}

function mainLoop() {
    nextCity();
}

window.onload=function() {
    initialise()
}
