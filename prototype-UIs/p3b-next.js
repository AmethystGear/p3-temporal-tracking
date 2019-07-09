
$(document).ready(function(){
    let canvas;
    let ctx;
    let boundingBoxes;
    let paths = ["2017b", "2017", "2016", "2015b", "2015", "2014", "2011", "2008", "2007"];
    let images = [];

    canvas = document.getElementById("c");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    boundingBoxes = JSON.parse(sessionStorage.getItem('boxes'));

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


    highest -= 20;
    lowest += 20;
    
    ctx.globalAlpha = 1.0;
    for(var i = 0; i < paths.length; i++){
        let source = "..\\temporal-tracking-photos\\" + paths[i] + ".png";
        var myImage = new Image(4096, 768);
        myImage.src = source;
        ctx.drawImage(myImage, 0, highest, 4096, lowest-highest, 0, 0, canvas.width, lowest-highest);
        var croppedImage = imagedataToImage(ctx.getImageData(0, 0, canvas.width, lowest - highest));
        images.push(croppedImage);
    }

    canvas.remove();

    for(var i = 0; i < images.length; i++){
        id = paths[i];
        let source = images[i].source;
        let image = 
                "<div class = 'canvas-image-container' style = 'max-width: 100%; padding-bottom:17%; position:relative;' onmousemove='mouseMove(event)'>" + 
                    "<img class = 'coveredImage'  id = '" + id + "' src= '" + source + "' onerror='deleteSelf(this)'/>" +
                    "<canvas class = 'coveringCanvas' id = '" + id + "canvas'></canvas>" +
                "</div>"
        
        $("#body").append(image);
    }
});

function imagedataToImage(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
}