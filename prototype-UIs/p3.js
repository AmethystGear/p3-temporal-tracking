$(document).ready(function(){
    var dateRange = $('#date-range').attr('search').split("-");
    var firstBound = parseInt(dateRange[0]);
    var secondBound =  parseInt(dateRange[1]);
    var diff = (secondBound - firstBound) / Math.abs(secondBound - firstBound);

    var typeAndNum = $('#date-range').attr('get').split(':');
    var type = typeAndNum[0];
    var num = parseInt(typeAndNum[1]);

    for(let i = firstBound; i != secondBound; i += diff){
        for(let i1 = 0; i1 < 2; i1++){            
            //check for the b as well.           
            let id = i + (i1 % 2 == 1 ? "b" : "");    
            currentImageId = id;
            let source = "..\\temporal-tracking-photos\\" + id + ".png";
            let image = 
                    "<div class = 'canvas-image-container' style = 'max-width: 100%; padding-bottom:17%; position:relative;' onmousemove='mouseMove(event)'>" + 
                        "<img class = 'coveredImage'  id = '" + id + "' src= '" + source + "' onerror='deleteSelf(this)'/>" +
                        "<canvas class = 'coveringCanvas' id = '" + id + "canvas'></canvas>" +
                    "</div>"
            
            $("#body").append(image);
        }
    }

    // Handle the deltion of the photos after the invalid photos get deleted.
    setTimeout(100, handlePhotos(type, num));
});

// Enables us to only display the first or last 'num' photos, or display all photos. 
function handlePhotos(type, num){
    if(type === "all"){
        return;
    }
    var numCanvasImageContainers = $('.canvas-image-container').length;
    if(type === "first"){
        $('.canvas-image-container').each(function(i, obj){
            if(i >= num){
                obj.remove();
            }
        });
    }
    if(type === "last"){
        $('.canvas-image-container').each(function(i, obj){
            if(i < numCanvasImageContainers - num){
                obj.remove();
            }
        });
    }
}

function deleteSelf(_this){
    _this.parentNode.remove();
}