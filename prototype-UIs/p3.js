$(document).ready(function(){
    var dateRange = $('#date-range').attr('search').split("-");
    var firstBound = parseInt(dateRange[0]);
    var secondBound =  parseInt(dateRange[1]);
    var diff = (secondBound - firstBound) / Math.abs(secondBound - firstBound);

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
});

function deleteSelf(_this){
    _this.parentNode.remove();
}