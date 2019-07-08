var canvas;
var ctx;
var boundingBoxes;
var paths = ["2017b", "2017", "2016", "2015b", "2015", "2014", "2011", "2008", "2007"];
var images = [];
$(document).ready(function(){
    canvas = document.getElementById("c");
    ctx = canvas.getContext("2d");
    boundingBoxes = JSON.parse(sessionStorage.getItem('boxes'));
    for(var i = 0; i < paths.length; i++){
        let source = "..\\temporal-tracking-photos\\" + paths[i] + ".png";
        var myImage = new Image(4096, 768);
        myImage.src = source;
        images.push(myImage);
    }
    var highest = -1;
    var lowest = -1;
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "yellow";
    for(var i = 0; i < boundingBoxes.length; i++){
        console.log(boundingBoxes[i]);
        ctx.fillRect(boundingBoxes[i].x, boundingBoxes[i].y, boundingBoxes[i].width, boundingBoxes[i].height);
        if(boundingBoxes[i].y < highest || highest == -1){
            highest = boundingBoxes[i].y;
        }
        if(boundingBoxes[i].y + boundingBoxes[i].width > lowest || lowest == -1){
            lowest = boundingBoxes[i].y + boundingBoxes[i].width;
        }
    }


    ctx.globalAlpha = 1.0;
    for(var i = 0; i < images.length; i++){        
        ctx.drawImage(images[i], 0, 0, 4096, lowest-highest, 0, (lowest - highest) * i, window.innerWidth, lowest - highest);
    }
});