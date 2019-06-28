let currentImageId = "";
let zoomCtx;
$(document).ready(function(){
    for(let i = 2020; i > 2000; i--){
        for(let i1 = 0; i1 < 2; i1++){            
            //check for the b as well.           
            let id = i + (i1 % 2 == 1 ? "b" : "");    
            currentImageId = id;
            let source = "..\\temporal-tracking-photos\\" + id + ".png";
            let image = 
                    "<div style = 'max-width: 100%;overflow: auto;'>" + 
                        "<img class = 'coveredImage'  id = '" + id + "' src= '" + source + "' onerror='deleteSelf(this)' onmousemove='zoomHandler(event)'/>" +
                        "<canvas class = 'coveringCanvas' id = '" + id + "canvas'></canvas>" +
                    "</div>"
            
            $("#body").append(image);
        }
    }

    zoomCtx = document.getElementById("zoomArea").getContext("2d");
});

function zoomHandler(e){  
    //getting the x,y of the mouse  
    let factorX =  e.target.naturalWidth / e.target.width;
    let factorY = e.target.naturalHeight/ e.target.height;
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //drawing visual indicator of zoom
    let canvasCtx = document.getElementById(c.target.id + "canvas").getContext("2d");
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.globalAlpha = 0.2;
    canvasCtx.fillStyle = "blue";
    ctx.rect(x, y, 100, 100);
    canvasCtx.fill();

    //drawing zoomed image at the top
    zoomCtx.drawImage(e.target, x * factorX, y * factorY, 100, 100, 0, 0, 300, 300);
}

function deleteSelf(_this){
    _this.parentNode.remove();
}