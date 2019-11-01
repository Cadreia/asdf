"use strict";

$('ul.slimmenu').slimmenu({
    resizeWidth: '992',
    collapserTitle: 'Main Menu',
    animSpeed: 250,
    indentChildren: true,
    childrenIndenter: ''
});


// Countdown
// $('.countdown').each(function () {
//     var count = $(this);
//     $(this).countdown({
//         zeroCallback: function (options) {
//             var newDate = new Date(),
//                 newDate = newDate.setHours(newDate.getHours() + 130);
//
//             $(count).attr("data-countdown", newDate);
//             $(count).countdown({
//                 unixFormat: true
//             });
//         }
//     });
// });


$('.btn').button();

$("[data-toggle='popover']").popover();

$('.form-group').each(function () {
    var self = $(this),
        input = self.find('input');

    input.focus(function () {
        self.addClass('form-group-focus');
    })

    input.blur(function () {
        if (input.val()) {
            self.addClass('form-group-filled');
        } else {
            self.removeClass('form-group-filled');
        }
        self.removeClass('form-group-focus');
    });
});

$('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1,
    limit: 5
}, {
    source: function (q, cb) {
        return $.ajax({
            dataType: 'json',
            type: 'get',
            url: $("#baseUrl").val() + '/search/destinations?q=' + q,
            cache: true,
            success: function (data) {
                var result = [];
                $.each(data, function (index, val) {
                    result.push({
                        value: val.from_destination
                    });
                });
                cb(result);
            }
        });
    }
});


$('.typeahead_to').typeahead({
    hint: true,
    highlight: true,
    minLength: 1,
    limit: 5
}, {
    source: function (q, cb) {
        return $.ajax({
            dataType: 'json',
            type: 'get',
            url: $("#baseUrl").val() + '/search/destinations/to?q=' + q,
            cache: true,
            success: function (data) {
                var result = [];
                $.each(data, function (index, val) {
                    result.push({
                        value: val.to_destination
                    });
                });
                cb(result);
            }
        });
    }
});


$('.head_event').typeahead({
    hint: true,
    highlight: true,
    minLength: 4,
    limit: 4
}, {
    source: function (q, cb) {
        return $.ajax({
            dataType: 'json',
            type: 'get',
            data: {_token: $('meta[name="csrf-token"]').attr('content')},
            url: 'http://events.gowaka.net/search/events/api?q=' + q,
            cache: true,
            success: function (data) {


                console.log(data);
                var result = [];

                $.each(data, function (index, val) {
                    result.push({
                        value: val.event_title
                    });
                });
                cb(result);
            }
        });
    }
});


$('input.date-pick, .input-daterange, .date-pick-inline').datepicker({
    // startDate:new Date(),
    todayHighlight: true,
    dateFormat: "yy-mm-dd",

});


$('input.date-pick, .input-daterange input[name="start"]').datepicker('setDate', 'today');
$('.input-daterange input[name="end"]').datepicker('setDate', '+7d');

// $('input.time-pick').timepicker({
//     minuteStep: 15,
//     showInpunts: false
// })

$('input.date-pick-years').datepicker({
    startView: 2
});


// $('.booking-item-price-calc .checkbox label').click(function () {
//     var checkbox = $(this).find('input'),
//     // checked = $(checkboxDiv).hasClass('checked'),
//         checked = $(checkbox).prop('checked'),
//         price = parseInt($(this).find('span.pull-right').html().replace('$', '')),
//         eqPrice = $('#car-equipment-total'),
//         tPrice = $('#car-total'),
//         eqPriceInt = parseInt(eqPrice.attr('data-value')),
//         tPriceInt = parseInt(tPrice.attr('data-value')),
//         value,
//         animateInt = function (val, el, plus) {
//             value = function () {
//                 if (plus) {
//                     return el.attr('data-value', val + price);
//                 } else {
//                     return el.attr('data-value', val - price);
//                 }
//             };
//             return $({
//                 val: val
//             }).animate({
//                 val: parseInt(value().attr('data-value'))
//             }, {
//                 duration: 500,
//                 easing: 'swing',
//                 step: function () {
//                     if (plus) {
//                         el.text(Math.ceil(this.val));
//                     } else {
//                         el.text(Math.floor(this.val));
//                     }
//                 }
//             });
//         };
//     if (!checked) {
//         animateInt(eqPriceInt, eqPrice, true);
//         animateInt(tPriceInt, tPrice, true);
//     } else {
//         animateInt(eqPriceInt, eqPrice, false);
//         animateInt(tPriceInt, tPrice, false);
//     }
// });


$('div.bg-parallax').each(function () {
    var $obj = $(this);
    if ($(window).width() > 992) {
        $(window).scroll(function () {
            var animSpeed;
            if ($obj.hasClass('bg-blur')) {
                animSpeed = 10;
            } else {
                animSpeed = 15;
            }
            var yPos = -($(window).scrollTop() / animSpeed);
            var bgpos = '50% ' + yPos + 'px';
            $obj.css('background-position', bgpos);

        });
    }
});


function redirectEventPage() {

    window.location.replace("http://events.gowaka.net");
}

$(document).ready(
    function () {

        $("[data-toggle='popover']").popover()
        breadCrumb();

        // $('html').niceScroll({
        //     cursorcolor: "#000",
        //     cursorborder: "0px solid #fff",
        //     railpadding: {
        //         top: 0,
        //         right: 0,
        //         left: 0,
        //         bottom: 0
        //     },
        //     cursorwidth: "10px",
        //     cursorborderradius: "0px",
        //     cursoropacitymin: 0.2,
        //     cursoropacitymax: 0.8,
        //     boxzoom: true,
        //     horizrailenabled: false,
        //     zindex: 9999
        // });


        // Owl Carousel
        // var owlCarousel = $('#owl-carousel'),
        //     owlItems = owlCarousel.attr('data-items'),
        //     owlCarouselSlider = $('#owl-carousel-slider'),
        //     owlNav = owlCarouselSlider.attr('data-nav');
        // // owlSliderPagination = owlCarouselSlider.attr('data-pagination');
        //
        // owlCarousel.owlCarousel({
        //     items: owlItems,
        //     navigation: true,
        //     navigationText: ['', '']
        // });
        //
        // owlCarouselSlider.owlCarousel({
        //     slideSpeed: 300,
        //     paginationSpeed: 400,
        //     // pagination: owlSliderPagination,
        //     singleItem: true,
        //     navigation: true,
        //     navigationText: ['', ''],
        //     transitionStyle: 'fade',
        //     autoPlay: 4500
        // });
        //
        //
        // // footer always on bottom
        // var docHeight = $(window).height();
        // var footerHeight = $('#main-footer').height();
        // var footerTop = $('#main-footer').position().top + footerHeight;
        //
        // if (footerTop < docHeight) {
        //     $('#main-footer').css('margin-top', (docHeight - footerTop) + 'px');
        // }
    }
);

//This function is used to provide appropriate indication of the select page link highlight
function breadCrumb() {
    if (window.location.pathname == '/public/faqs') {

        $('#home').removeClass('active');
        $('#faqs').addClass('active');
        $('#about').removeClass('active');
        $('#contact').removeClass('active');
    } else if (window.location.pathname == '/public/about') {
        //

        //$('#faqs').removeClass('active');
        $('#about').addClass('active');
        $('#home').removeClass('active');
        // $('#contact').removeClass('active');
    } else if (window.location.pathname == '/public/agency/user/feedback/create') {
        $('#home').removeClass('active');
        // $('#faqs').removeClass('active');
        //  $('#about').removeClass('active');
        $('#contact').addClass('active');
    }
    else if (window.location.pathname == '/public/') {


    }
    else {

        $('#home').removeClass('active');
        $('#contact').removeClass('active');
        $('#faqs').removeClass('active');
        $('#about').removeClass('active');

    }

}

//This function is used to perform ajax newletter submission and action
function submitNewsLetter() {

    var email = $('#user_email').val();
    var message_empty = $('#message').val();
    var message_invalid = $('#message_1').val();
    var regxEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;


    //check if the user email was entered

    if (email == '') {

        $('#message_div').html(message_empty);
        $('#message_div').show();
        $('#message_div').delay(6000).slideUp(300);

    } else if (regxEmail.test(email)) {

        performAjaxNewsLetter(email);

    } else {

        $('#message_div').html(message_invalid);
        $('#message_div').show();
        $('#message_div').delay(6000).slideUp(300);
    }

}


function performAjaxNewsLetter(email) {

    $.ajax({
        url: $('#baseUrl').val() + "/newsletter/subsribe",
        data: {

            _token: $('meta[name="csrf-token"]').attr('content'),
            email: email,

        },

        datatype: "json",
        type: 'post',
        success: function (result) {


            var rs = JSON.parse(result);

            if (rs.state == "success") {
                //$(location).attr('href', URL + "users");
                $('#user_email').val('');
                $('#message_div').removeClass('alert-danger');
                $('#message_div').addClass('alert-success');
                $('#message_div').html(rs.message);
                $('#message_div').show();
                $('#message_div').delay(6000).slideUp(300);

            } else if (rs.state == "error") {
                $('#user_email').val('');
                $('#message_div').show();
                $('#message_div').html(rs.message);
                $('#message_div').delay(6000).slideUp(300);

            }
        },
        error: function () {


            $('#message_div').show();
            $('#message_div').removeClass('alert-warning');
            $('#message_div').addClass('alert-danger');
            $('#message_div').html("Unable to subscribe to our newsletter   ");

            $('##message_div').delay(6000).slideUp(300);


        }
    });
}


$('.nav-drop').dropit();


// $("#price-slider").ionRangeSlider({
//     min: 130,
//     max: 575,
//     type: 'double',
//     prefix: "$",
//     // maxPostfix: "+",
//     prettify: false,
//     hasGrid: true
// });

// $('.i-check, .i-radio').iCheck({
//     checkboxClass: 'i-check',
//     radioClass: 'i-radio'
// });


$('.booking-item-review-expand').click(function (event) {
    console.log('baz');
    var parent = $(this).parent('.booking-item-review-content');
    if (parent.hasClass('expanded')) {
        parent.removeClass('expanded');
    } else {
        parent.addClass('expanded');
    }
});


$('.stats-list-select > li > .booking-item-rating-stars > li').each(function () {
    var list = $(this).parent(),
        listItems = list.children(),
        itemIndex = $(this).index();

    $(this).hover(function () {
        for (var i = 0; i < listItems.length; i++) {
            if (i <= itemIndex) {
                $(listItems[i]).addClass('hovered');
            } else {
                break;
            }
        }
        ;
        $(this).click(function () {
            for (var i = 0; i < listItems.length; i++) {
                if (i <= itemIndex) {
                    $(listItems[i]).addClass('selected');
                } else {
                    $(listItems[i]).removeClass('selected');
                }
            }
            ;
        });
    }, function () {
        listItems.removeClass('hovered');
    });
});


$('.booking-item-container').children('.booking-item').click(function (event) {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().removeClass('active');
    } else {
        $(this).addClass('active');
        $(this).parent().addClass('active');
        $(this).delay(1500).queue(function () {
            $(this).addClass('viewed')
        });
    }
});

//
// $('.form-group-cc-number input').payment('formatCardNumber');
// $('.form-group-cc-date input').payment('formatCardExpiry');
// $('.form-group-cc-cvc input').payment('formatCardCVC');


if ($('#map-canvas').length) {
    var map,
        service;

    // jQuery(function ($) {
    //     $(document).ready(function () {
    //         var latlng = new google.maps.LatLng(40.7564971, -73.9743277);
    //         var myOptions = {
    //             zoom: 16,
    //             center: latlng,
    //             mapTypeId: google.maps.MapTypeId.ROADMAP,
    //             scrollwheel: false
    //         };
    //
    //         map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    //
    //
    //         var marker = new google.maps.Marker({
    //             position: latlng,
    //             map: map
    //         });
    //         marker.setMap(map);
    //
    //
    //         $('a[href="#google-map-tab"]').on('shown.bs.tab', function (e) {
    //             google.maps.event.trigger(map, 'resize');
    //             map.setCenter(latlng);
    //         });
    //     });
    //
    //
    // });
}


$('.card-select > li').click(function () {
    var self = this;
    $(self).addClass('card-item-selected');
    $(self).siblings('li').removeClass('card-item-selected');
    $('.form-group-cc-number input').click(function () {
        $(self).removeClass('card-item-selected');
    });
});
// Lighbox gallery
// $('#popup-gallery').each(function () {
//     $(this).magnificPopup({
//         delegate: 'a.popup-gallery-image',
//         type: 'image',
//         gallery: {
//             enabled: true
//         }
//     });
// });

// Lighbox image
$('.popup-image').magnificPopup({
    type: 'image'
});

// Lighbox text
$('.popup-text').magnificPopup({
    removalDelay: 500,
    closeBtnInside: true,
    callbacks: {
        beforeOpen: function () {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true
});

// Lightbox iframe
$('.popup-iframe').magnificPopup({
    dispableOn: 700,
    type: 'iframe',
    removalDelay: 160,
    mainClass: 'mfp-fade',
    preloader: false
});


$('.form-group-select-plus').each(function () {
    var self = $(this),
        btnGroup = self.find('.btn-group').first(),
        select = self.find('select');
    btnGroup.children('label').last().click(function () {
        btnGroup.addClass('hidden');
        select.removeClass('hidden');
    });
});


// $(function () {
//     $('#ri-grid').gridrotator({
//         rows: 4,
//         columns: 8,
//         animType: 'random',
//         animSpeed: 1200,
//         interval: 1200,
//         step: 'random',
//         preventClick: false,
//         maxStep: 2,
//         w992: {
//             rows: 5,
//             columns: 4
//         },
//         w768: {
//             rows: 6,
//             columns: 3
//         },
//         w480: {
//             rows: 8,
//             columns: 3
//         },
//         w320: {
//             rows: 5,
//             columns: 4
//         },
//         w240: {
//             rows: 6,
//             columns: 4
//         }
//     });
//
// });

//Filter bus search by price high-low
function filterSearchByPriceHL(obj) {


    insertParamPriceHL(obj.id, obj.name);


}

//function to append the parameter to a URL USING javascript
//Function to filter the search of buses based on key-value pair for a high low price sort
function insertParamPriceHL(key, value) {
    key = encodeURI(key);
    value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i = kvp.length;
    var x;
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
    }

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
}


//Listen to the bus type filter checkbox check event
function filterSearchType(obj) {

    if ($("#" + obj.id).is(':checked')) {
        // alert(obj.value +" "+obj.name);
        insertParamBusType(obj.value, obj.name);
        $("#" + obj.id).checked(true);
    }
}


//function to append the parameter to a URL USING javascript
//Function to filter the search of buses based on key-value pair action
function insertParamBusType(key, value) {
    key = encodeURI(key);
    value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i = kvp.length;
    var x;
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
    }

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
}


//SORT the bus search by bus agency
function insertParamBusAgency(obj) {
    if ($("#" + obj.id).is(':checked')) {

        filterSearchByBusAgency(obj.name, obj.value);
    }
}

function filterSearchByBusAgency(key, value) {
    key = encodeURI(key);
    value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i = kvp.length;
    var x;
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
    }

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
}

//Sort the bus search by the bus departure time,
// a value of 1 means, morning, 2 means afternoon and 3 means Evening
function insertParamBusDepartTime(obj) {

    if ($("#" + obj.id).is(':checked')) {

        filterSearchByDepartureTime(obj.name, obj.value);
    }
}

function filterSearchByDepartureTime(key, value) {
    key = encodeURI(key);
    value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i = kvp.length;
    var x;
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
    }

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
}


// $(function () {
//     $('#ri-grid-no-animation').gridrotator({
//         rows: 4,
//         columns: 8,
//         slideshow: false,
//         w1024: {
//             rows: 4,
//             columns: 6
//         },
//         w768: {
//             rows: 3,
//             columns: 3
//         },
//         w480: {
//             rows: 4,
//             columns: 4
//         },
//         w320: {
//             rows: 5,
//             columns: 4
//         },
//         w240: {
//             rows: 6,
//             columns: 4
//         }
//     });
//
// });

var tid = setInterval(tagline_vertical_slide, 2500);

// vertical slide
function tagline_vertical_slide() {
    var curr = $("#tagline ul li.active");
    curr.removeClass("active").addClass("vs-out");
    setTimeout(function () {
        curr.removeClass("vs-out");
    }, 500);

    var nextTag = curr.next('li');
    if (!nextTag.length) {
        nextTag = $("#tagline ul li").first();
    }
    nextTag.addClass("active");
}

function abortTimer() { // to be called when you want to stop the timer
    clearInterval(tid);
}

//this file method will be used to handle passenger login attempt and authorization


function passengerLogin() {

//get the input field values to get login attempt

    var password = $('#password_side').val();
    var email = $('#email_side').val();
    var checkBox = $('#checkbox_side').checked;
    var regxEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (password == "" | email == "") {

        $('#feedback_error_msg').show();
        $('#feedback_error_msg').html('Please enter both  your email and password');
        $('#feedback_error_msg').delay(6000).slideUp(300);

    } else {


        if (regxEmail.test(email)) {

            if (password.length >= 6) {

                //all user client site validation has succeeded. we need to do an ajax call to do the
                //server side validation
                //alert('helllo man, you have succeeded');

                ajaxLogin(email, password, checkBox);


            } else {

                $('#feedback_error_msg').show();
                $('#feedback_error_msg').html('Password must be at least 6 characters ');
                $('#feedback_error_msg').delay(6000).slideUp(300);
            }

            //if all fields are fill
        }
        else {
            $('#feedback_error_msg').show();
            $('#feedback_error_msg').html('Please enter a valid email address');
            $('#feedback_error_msg').delay(6000).slideUp(300);
        }
    }


}

function ajaxLogin(email_side, pass_side, check_mem) {

    //this method will be used to carryout the ajax server side validation of user's credentials
    HoldOn.open({
        message: "Authenticating  user credentials  from the system, Please hold on",

        // background color


        textColor: "#d9534f"

    });
    $('#loginForm').hide();

    $.ajax({
        url: $('#baseUrl').val() + "/account/login/ajax",
        data: {

            _token: $('meta[name="csrf-token"]').attr('content'),
            email_side: email_side,
            password_side: pass_side,
            checkbox_remember: check_mem


        },

        datatype: "json",
        type: 'post',
        success: function (result) {
            HoldOn.close();
            $('#loginForm').show();
            console.log(result);
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                //$(location).attr('href', URL + "users");
                $('#feedback_error_msg').show();
                $('#feedback_error_msg').removeClass('alert-danger');
                $('#feedback_error_msg').addClass('alert-success');
                $('#feedback_error_msg').html('You have logged in successfully. Redirecting in 3s ...');
                $('#feedback_error_msg').delay(2500).slideUp(300);

                setInterval(function () {


                    window.location.replace($('#baseUrl').val() + '/' + rs.user_type + '/agency/' + rs.user_slug + '/' + rs.user_id);

                }, 3000)

            } else if (rs.state == "error") {

                $('#feedback_error_msg').show();
                $('#feedback_error_msg').html(rs.msg);
                $('#feedback_error_msg').delay(6000).slideUp(300);

            }
        },
        error: function () {
            HoldOn.close();
            $('#loginForm').show();
            $('#feedback_error_msg').show();
            $('#feedback_error_msg').html("Unable to authenticate user with email address  " + email_side);

            $('#feedback_error_msg').delay(6000).slideUp(300);


        }
    });
}


//page redirection to the event page
function redirectionEvent() {

    window.open("http://www.events.gowaka.net");
}
function showTabEvent() {


    // $('#event_tab_content').hide(500);
    // $('#event_tab_content').show(1000);


    setTimeout('redirectionEvent()', 3000);

}