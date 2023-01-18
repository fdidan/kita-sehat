function load(){
    $('.nav-home').addClass('active').siblings().removeClass("active");
}
$(document).ready(function () {
    $(".nav-active").click(function (){
        $(this).addClass("active").siblings().removeClass("active");
    });
});