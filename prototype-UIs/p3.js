$(document).ready(function(){
    for(let i = 2020; i > 2000; i--){
        let source = "..\\temporal-tracking-photos\\" + i + ".png";
        let html = "<img src=" + source + "onError='deleteSelf(this);'/>"

        $("#body").append(html);
        console.log(source);
    }
});

function deleteSelf(_this){
    console.log("removed myself");
    ($_this).remove();
}