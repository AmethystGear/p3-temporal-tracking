let currentImageId = "";
$(document).ready(function(){
    for(let i = 2020; i > 2000; i--){
        for(let i1 = 0; i1 < 2; i1++){
            //check for the b as well.           
            let id = i + (i1 % 2 == 1 ? "b" : "");       
            let source = "..\\temporal-tracking-photos\\" + id + ".png";
            let html = "<img id = '" + id + "' src= '" + source + "' onError='deleteSelf()'/>"        
            $("#body").append(html);
        }
    }
});

function deleteSelf(){
    $("#" + currentImageId).remove();
}