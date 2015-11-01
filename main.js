function initialise() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width;
    var y = canvas.height;
    var img = new Image();
    img.src = 'medium_map.jpg';
    canvas.addEventListener("mousedown", getcoords, false);

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }

    mainLoop();
}

function nextCity() {
    alert("Your Next City is Berlin");
}

function getcoords(event) {
    clickX = event.pageX;
    clickY = event.pageY;
    alert("X="+clickX +"y=" + clickY);
}

function mainLoop() {
    nextCity();
    changeTarget();
}

function changeTarget() {
    document.getElementById("target").innerHTML = "Your next target is Berlin:";
}

window.onload=function() {
    initialise()
}
