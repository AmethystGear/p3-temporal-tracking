let currentImageId = "";
let imageDict = {};


$(document).ready(function(){
    for(let i = 2020; i > 2000; i--){
        for(let i1 = 0; i1 < 2; i1++){            
            //check for the b as well.           
            let id = i + (i1 % 2 == 1 ? "b" : "");    
            currentImageId = id;
            let source = "..\\temporal-tracking-photos\\" + id + ".png";
            let html = "<img class = 'gsv' style = 'max-width: 100%; max-height: 200px; overflow: hidden;' id = '" + id + "' src= '" + source + "' onError='deleteSelf(this)' onmousemove='zoomHandler(event)'/>"        
            $("#body").append(html);
        }
    }
});

function zoomHandler(e){
    let ctx = document.getElementById("zoomArea").getContext("2d");
    ctx.drawImage(e.srcElement, e.clientX, e.clientY, 100, 100, 0, 0, e.srcElement.width, e.srcElement.height);
}


function deleteSelf(_this){
    _this.remove();
}