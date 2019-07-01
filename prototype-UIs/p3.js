let currentImageId = "";
let zoomCtx;
let zoomCanvas;
let boundingBoxes = [];
$(document).ready(function(){
    for(let i = 2020; i > 2000; i--){
        for(let i1 = 0; i1 < 2; i1++){            
            //check for the b as well.           
            let id = i + (i1 % 2 == 1 ? "b" : "");    
            currentImageId = id;
            let source = "..\\temporal-tracking-photos\\" + id + ".png";
            let image = 
                    "<div style = 'max-width: 100%; height: 220px; position:relative;' onmousemove='zoomHandler(event)'>" + 
                        "<img class = 'coveredImage'  id = '" + id + "' src= '" + source + "' onerror='deleteSelf(this)'/>" +
                        "<canvas class = 'coveringCanvas' id = '" + id + "canvas'></canvas>" +
                    "</div>"
            
            $("#body").append(image);
        }
    }
    zoomCanvas = document.getElementById("zoomArea");
    zoomCtx = zoomCanvas.getContext("2d");
    zoomCtx.fillStyle = "yellow";    
});


var xClick = -1;
var yClick = -1;
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
  xClick = -1;
  yClick = -1;
  console.log(boundingBox);
  console.log(boundingBoxes);
  boundingBoxes.push(boundingBox);
}

var zoomXWidth = 100;
var zoomYWidth = 100;
var zoomImage;
var canvasImage;
var boundingBox = null;

function zoomHandler(e){  

    var canvas = e.target;
    var image = document.getElementById(canvas.id.replace("canvas", ""));
    //getting the x,y of the mouse  
    let factorX =  image.naturalWidth / image.width;
    let factorY = image.naturalHeight/ image.height;
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //drawing visual indicator of zoom
    let canvasCtx = canvas.getContext("2d");
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.globalAlpha = 0.2;

    var zoomXWidthCalculated = zoomXWidth/image.width * canvas.width;
    var zoomYWidthCalculated = zoomYWidth/200 * canvas.height;
    var xCalculated = Math.clamp(x/image.width * canvas.width, zoomXWidthCalculated/2, canvas.width - zoomXWidthCalculated/2);
    var yCalculated = Math.clamp(y/200 * canvas.height, zoomYWidthCalculated/2, image.height - zoomYWidthCalculated);

    if(mouseDown){
        if(xClick === -1){
            xClick = x;
            yClick = y;
            zoomImage = zoomCtx.getImageData(0,0,zoomCanvas.width, zoomCanvas.height);
        }
        canvasCtx.fillStyle = "yellow";
        var diffX = x - xClick;
        var diffY = y - yClick;


        canvasCtx.fillRect(xClick/image.width * canvas.width, yClick/200 * canvas.height, diffX/image.width * canvas.width, diffY/200 * canvas.height);
        zoomCtx.clearRect(0,0, zoomCanvas.width, zoomCanvas.height);
        zoomCtx.globalAlpha = 1.0;
        zoomCtx.putImageData(zoomImage, 0, 0);
        zoomCtx.globalAlpha = 0.2;
        zoomCtx.fillRect(zoomCanvas.width/2, zoomCanvas.height/2, (diffX) / zoomXWidth * zoomCanvas.width, (diffY) /zoomYWidth* zoomCanvas.height);
        boundingBox = {x: xClick, y: yClick, width: diffX, height: diffY};
        return;
    }

    var xZoomCrop = (xCalculated * image.width/canvas.width - zoomXWidth/2)* factorX;
    var yZoomCrop = (yCalculated * 200/canvas.height - zoomYWidth/2) * factorY;
    zoomCtx.globalAlpha = 1.0;
    //drawing zoomed image at the top
    zoomCtx.drawImage(image, xZoomCrop, yZoomCrop, zoomXWidth * factorX, zoomYWidth * factorY, 0, 0, zoomCanvas.width, zoomCanvas.height);
    

    zoomCtx.globalAlpha = 0.2;
    canvasCtx.fillStyle = "yellow";
    for(var i = 0; i < boundingBoxes.length; i++){
        var box = boundingBoxes[i];
        canvasCtx.fillRect(box.x/image.width * canvas.width, box.y/image.height * canvas.height, box.width/image.width * canvas.width, box.height/image.height * canvas.height);
        zoomCtx.fillRect((box.x - (xZoomCrop/factorX)) / zoomXWidth * zoomCanvas.width, (box.y - (yZoomCrop/factorY)) /zoomYWidth* zoomCanvas.height, (box.width) / zoomXWidth* zoomCanvas.width, (box.height) /zoomYWidth * zoomCanvas.height);
    }

    canvasCtx.fillStyle = "blue";
    canvasCtx.fillRect(xCalculated - zoomXWidthCalculated/2, yCalculated - zoomYWidthCalculated/2, zoomXWidthCalculated, zoomYWidthCalculated);   
}

function deleteSelf(_this){
    _this.parentNode.remove();
}

(function(){Math.clamp=function(a,b,c){return Math.max(b,Math.min(c,a));}})();