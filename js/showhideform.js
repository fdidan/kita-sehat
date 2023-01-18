function load(){
    $('#register').hide();
    $('.signUptext').hide();
    $('.nav-home').addClass('active').siblings().removeClass("active");
    $('.login-nav').addClass('active-acc');
    $('.login-txt').addClass('txt-active');
}

$('.signIn').click(function(){
    $('.signIn').toogle();
})

$('.login').click(function(){
    $('#register').hide();
    $('#signin').show();
    $('.logintext').show();
    $('.signUptext').hide();
    $('.login-nav').addClass("active-acc");
    $('.acc-active').removeClass("active-acc");
    $('.regist-txt').removeClass('txt-active');
    $('.login-txt').addClass('txt-active');
})

$('.regist').click(function(){
    $('#register').show();
    $('#signin').hide();
    $('.logintext').hide();
    $('.signUptext').show();
    $('.acc-active').addClass("active-acc");
    $('.login-nav').removeClass("active-acc");
    $('.regist-txt').addClass('txt-active');
    $('.login-txt').removeClass('txt-active');
})

$('.loginlink').click(function(){
    $('#register').hide();
    $('#signin').show();
    $('.logintext').show();
    $('.signUptext').hide();
    $('.login-nav').addClass("active-acc");
    $('.acc-active').removeClass("active-acc");
    $('.regist-txt').removeClass('txt-active');
    $('.login-txt').addClass('txt-active');
})

$('.registlink').click(function(){
    $('#register').show();
    $('#signin').hide();
    $('.logintext').hide();
    $('.signUptext').show();
    $('.acc-active').addClass("active-acc");
    $('.login-nav').removeClass("active-acc");
    $('.regist-txt').addClass('txt-active');
    $('.login-txt').removeClass('txt-active');
})

$(document).ready(function () {
    $(".nav-active").click(function (){
        $(this).addClass("active").siblings().removeClass("active");
    });
});