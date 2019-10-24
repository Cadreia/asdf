$( document ).ready(function() {

    breadCrumb();
    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginForm');
    // button.removeAttr('href');
    button.mouseup(function(login) {
        console.log("mouse up");
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() {
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });

    $('html, body').animate({
        scrollTop: $('#bus_display,#search_result,#bus_display,#account_login,#account_create').offset().top
    }, 1000);

//$('#cssmenu > ul > li > a').click(function() {
//  $('#cssmenu li').removeClass('active');
//  $(this).closest('li').addClass('active');
//  var checkElement = $(this).next();
//  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
//    $(this).closest('li').removeClass('active');
//    checkElement.slideUp('normal');
//  }
//  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
//    $('#cssmenu ul ul:visible').slideUp('normal');
//    checkElement.slideDown('normal');
//  }
//  if($(this).closest('li').find('ul').children().length == 0) {
//    return true;
//  } else {
//    return false;
//  }
//});
});


//// Login Form
//$(function() {
//    var button = $('#loginButton');
//    var box = $('#loginBox');
//    var form = $('#loginForm');
//    button.removeAttr('href');
//    button.mouseup(function(login) {
//        box.toggle();
//        button.toggleClass('active');
//    });
//    form.mouseup(function() {
//        return false;
//    });
//    $(this).mouseup(function(login) {
//        if(!($(login.target).parent('#loginButton').length > 0)) {
//            button.removeClass('active');
//            box.hide();
//        }
//    });
//});



function breadCrumb(){
    if(window.location.pathname=='/public/faqs'){

        $('#home').removeClass('active');
        $('#faqs').addClass('active');
        $('#about').removeClass('active');
        $('#contact').removeClass('active');
    }else
    if(window.location.pathname=='/public/about'){
        //

        //$('#faqs').removeClass('active');
        $('#about').addClass('active');
        $('#home').removeClass('active');
        // $('#contact').removeClass('active');
    }else
    if(window.location.pathname=='/public/agency/user/feedback/create'){
        $('#home').removeClass('active');
        // $('#faqs').removeClass('active');
        //  $('#about').removeClass('active');
        $('#contact').addClass('active');
    }
    else{


    }

}