$('document').ready(function(){

    $('#login_feedback').hide();
    $('#signup_feedback').hide();


    //the login form was submitted

    $("#login_form").submit(function(e){
        e.preventDefault();
            authenticateUser();
    });


    //this means the create account form was submitted
    $("#signup_form").submit(function(e){
        if($('#password').val() != $('#password_confirm').val()){
            e.preventDefault();
            $('#signup_feedback').addClass("alert-danger");
            $('#signup_feedback').show();
            $('#signup_feedback').html($("#passwd_mismatch_error").val());
            $('#signup_feedback').delay(6000).slideUp(300);
        }
        else
            createAccountAndLogin();
        e.preventDefault();
    });

    //Event listener to check if a provided email is available
    $("#email").change(function(){
        emailCheck();
    });
});


/*
 Author: Dieudonne Dengun
 Date: 14/02/2017
 Function to handle login user into account via auth before redirecting to invoice page

 */
function authenticateUser(){

    HoldOn.open({
        message: $("#ajaxAuthLoadingMessage").val()
    });
    $.ajax({
        url : $('#baseUrl').val() + "/checkout/sign_in/ajax",
        data: $('form#login_form').serialize(),
        type : 'post',
        success : function(result) {
            HoldOn.close();
            var rs = JSON.parse(result);

            if (rs.state == "success") {

               // alert(rs.link);
                window.location.replace( $('#baseUrl').val() + '/ticket_checkout_invoice?redirect='+rs.link);
            }else{
                $('#login_feedback').addClass("alert-danger");
                $('#login_feedback').show();
                $('#login_feedback').html($("#check_out_auth_invalid_msg").val());
                $('#login_feedback').delay(6000).slideUp(300);
            }
        },
        error : function() {
            HoldOn.close();
            alert($("#error_network_msg").val());
        }
    });
}



/*
   Author: Dieudonne Dengun
   Date: 14/02/2017
   Function to handle create account  and auth before redirecting to invoice page

 */
function createAccountAndLogin(){
    HoldOn.open({
        message: $("#signing_up").val()
    });

    $.ajax({
        url : $('#baseUrl').val() + "/checkout/sign_up_and_login/ajax",
        data: $('form#signup_form').serialize(),
        type : 'post',
        success : function(result) {
            HoldOn.close();
            var rs = JSON.parse(result);

            if (rs.state == "success") {

                var red=rs.link;
                window.location.replace( $('#baseUrl').val() + '/ticket_checkout_invoice?redirect='+red);
            }else{
                $('#signup_feedback').addClass("alert-danger");
                $('#signup_feedback').show();
                $('#signup_feedback').html($("#account_create_failed").val());
                $('#signup_feedback').delay(6000).slideUp(300);
            }
        },
        error : function() {
            HoldOn.close();
            alert($("#error_network_msg").val());
        }
    });
}

/*
   Author: Dieudonne Dengun
   Date: 14/02/2017
   Function to use to handle onchange email check for the auth_account create view

 */
function emailCheck(){
    $("#check_email").val($("#check_email_message"));

    $.ajax({
        url : $('#baseUrl').val() + "/checkout/sign_up_and_login/check_email",
        data: {
            email : $("#email").val()
        },
        type : 'post',
        success : function(result) {
            HoldOn.close();
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                $("#check_email").css("color", "#6FD508");
                $("#check_email").html(rs.message);

            }else{
                $("#check_email").css("color", "red");
                $("#check_email").html(rs.message);
            }
        },
        error : function() {
            HoldOn.close();
            alert($("#error_network_msg").val());
        }
    });
}