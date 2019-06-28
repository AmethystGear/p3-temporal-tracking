let currentImageId = "";
let currentImage;

$(document).ready(function(){
    for(let i = 2020; i > 2000; i--){
        for(let i1 = 0; i1 < 2; i1++){            
            //check for the b as well.           
            let id = i + (i1 % 2 == 1 ? "b" : "");    
            currentImageId = id;
            let source = "..\\temporal-tracking-photos\\" + id + ".png";
            let html = "<img style = 'max-width: 100%; max-height: 200px; overflow: hidden;' id = '" + id + "' src= '" + source + "' onerror='deleteSelf(this)' onmousemove='zoomHandler(event)' onmouseover = 'setImg(this)'/>"        
            $("#body").append(html);
        }
    }
    ctx = document.getElementById("zoomArea").getContext("2d");
});

function setImg(this){
    currentImage = this;
}

function zoomHandler(e){    
    let factorX =  currentImage.naturalWidth / currentImage.width;
    let factorY = currentImage.naturalHeight/ currentImage.height;
    ctx.drawImage(currentImage, e.clientX * factorX, e.clientY * factorY, 100, 100, 0, 0, 300, 300);
}

function deleteSelf(_this){
    _this.remove();
}