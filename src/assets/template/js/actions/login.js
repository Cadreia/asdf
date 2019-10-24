


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