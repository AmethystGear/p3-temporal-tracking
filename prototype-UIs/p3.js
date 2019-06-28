$(document).ready(function(){
    for(let i = 2020; i > 2000; i--){
        let source = "temporal-tracking-photos\\" + i + ".png";
        let html = "<img src=" + source + "onError='deleteSelf(this);'/>"
        console.log(source);
    }
});

function deleteSelf(_this){
    ($_this).remove();
}