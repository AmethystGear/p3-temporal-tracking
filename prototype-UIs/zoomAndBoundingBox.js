let currentImageId = "";
let boundingBoxes = [];
$(document).ready(function(){
    zoomCanvas = document.getElementById("zoomArea");
    zoomCtx = zoomCanvas.getContext("2d");
});

let zoomCtx;
let zoomCanvas;
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
  boundingBoxes.push(boundingBox);
  zoomHandler(mostRecentMouseEvent);
}

var zoomXWidth = 100;
var zoomYWidth = 100;
var zoomImage;
var canvasImage;
var mostRecentMouseEvent;
var boundingBox = null;
var xZoomCropClick;
var yZoomCropClick;

function mouseMove(e){
    mostRecentMouseEvent = e;
    zoomHandler(e);
}

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
    var zoomYWidthCalculated = zoomYWidth/image.height * canvas.height;
    var xCalculated = Math.clamp(x/image.width * canvas.width, zoomXWidthCalculated/2, canvas.width - zoomXWidthCalculated/2);
    var yCalculated = Math.clamp(y/image.height * canvas.height, zoomYWidthCalculated/2, image.height - zoomYWidthCalculated);

    
    var xZoomCrop = (xCalculated * image.width/canvas.width - zoomXWidth/2)* factorX;
    var yZoomCrop = (yCalculated * image.height/canvas.height - zoomYWidth/2) * factorY;
    if(mouseDown){
        if(xClick === -1){
            xClick = x;
            yClick = y;
            zoomImage = zoomCtx.getImageData(0,0,zoomCanvas.width, zoomCanvas.height);
            zoomImage.crossOrigin = "Anonymous";
            xZoomCropClick = xZoomCrop;
            yZoomCropClick = yZoomCrop;
        }
        canvasCtx.fillStyle = "yellow";
        var diffX = x - xClick;
        var diffY = y - yClick;


        canvasCtx.fillRect(xClick/image.width * canvas.width, yClick/image.height * canvas.height, diffX/image.width * canvas.width, diffY/image.height * canvas.height);
        zoomCtx.clearRect(0,0, zoomCanvas.width, zoomCanvas.height);
        zoomCtx.globalAlpha = 1.0;
        zoomCtx.putImageData(zoomImage, 0, 0);
        zoomCtx.globalAlpha = 0.2;
        zoomCtx.fillStyle = "yellow";
        let box = {x: xClick, y: yClick, width: diffX, height: diffY};
        zoomCtx.fillRect((box.x - (xZoomCropClick/factorX)) / zoomXWidth * zoomCanvas.width, (box.y - (yZoomCropClick/factorY)) /zoomYWidth* zoomCanvas.height, (diffX) / zoomXWidth * zoomCanvas.width, (diffY) /zoomYWidth* zoomCanvas.height);
        zoomCtx.globalAlpha = 1.0;
        zoomCtx.fillStyle = "black";
        zoomCtx.fillRect(-5 + (x - (xZoomCropClick/factorX)) / zoomXWidth * zoomCanvas.width, -5 + (y - (yZoomCropClick/factorY)) /zoomYWidth * zoomCanvas.height, 10, 10);

        zoomCtx.fillStyle = "white";        
        zoomCtx.fillRect(-3 + (x - (xZoomCropClick/factorX)) / zoomXWidth * zoomCanvas.width, -3 + (y - (yZoomCropClick/factorY)) /zoomYWidth * zoomCanvas.height, 6, 6);
        
        boundingBox = box;
        return;
    }



    zoomCtx.globalAlpha = 1.0;
    //drawing zoomed image at the top
    zoomCtx.drawImage(image, xZoomCrop, yZoomCrop, zoomXWidth * factorX, zoomYWidth * factorY, 0, 0, zoomCanvas.width, zoomCanvas.height);
    
    zoomCtx.fillStyle = "black";
    zoomCtx.fillRect(-5 + (x - (xZoomCrop/factorX)) / zoomXWidth * zoomCanvas.width, -5 + (y - (yZoomCrop/factorY)) /zoomYWidth * zoomCanvas.height, 10, 10);

    zoomCtx.fillStyle = "white";        
    zoomCtx.fillRect(-3 + (x - (xZoomCrop/factorX)) / zoomXWidth * zoomCanvas.width, -3 + (y - (yZoomCrop/factorY)) /zoomYWidth * zoomCanvas.height, 6, 6);
   
    zoomCtx.globalAlpha = 0.2;
    canvasCtx.fillStyle = "yellow";
    zoomCtx.fillStyle = "yellow";
    for(var i = 0; i < boundingBoxes.length; i++){
        var box = boundingBoxes[i];
        canvasCtx.fillRect(box.x/image.width * canvas.width, box.y/image.height * canvas.height, box.width/image.width * canvas.width, box.height/image.height * canvas.height);
        zoomCtx.fillRect((box.x - (xZoomCrop/factorX)) / zoomXWidth * zoomCanvas.width, (box.y - (yZoomCrop/factorY)) /zoomYWidth* zoomCanvas.height, (box.width) / zoomXWidth* zoomCanvas.width, (box.height) /zoomYWidth * zoomCanvas.height);
    }

    canvasCtx.fillStyle = "blue";
    canvasCtx.fillRect(xCalculated - zoomXWidthCalculated/2, yCalculated - zoomYWidthCalculated/2, zoomXWidthCalculated, zoomYWidthCalculated);   
}

(function(){Math.clamp=function(a,b,c){return Math.max(b,Math.min(c,a));}})();