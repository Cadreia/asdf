var bus_id = '0';
var bus_number = '';

var bookings = '0';

$('document').ready(function () {


    $('button[data-toggle=confirmation]').confirmation();


    //preview the bus image
    $("#bus_image").change(function () {
        readURL(this);
    });


});

//stage  a route for delete
function stageBus(obj, b_id) {
    bus_id = b_id;
    bus_number = obj.id;
    // deleteBus();
    deleteBus();


}

//this function will handle the ajax call of the unSchedule button
function stageBusUnSchedule(obj, b_id) {

    bus_id = b_id;
    var number = obj.id;
    // bus_number=b_number;
    checkAvailableBookings(number,b_id);
    //UnScheduleBus(number, bus_id);
}


function stageBusUnScheduleReceptionist(b_id) {

    bus_id = b_id;
    //bus_number=obj.id;
    // bus_number=b_number;
    UnScheduleBusReceptionist();
}

//Method to preview the bus image before it is uploaded
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#pic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function checkAvailableBookings(number,j_id) {

    $.ajax({
        url: $('#mainLink').val() + "/check/booking/unSchedule/" + j_id,
        data: {
            _method: 'POST',
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        datatype: "json",
        type: 'post',
        success: function (result) {
            //HoldOn.close();
            console.log(result);
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                //$(location).attr('href', URL + "users");

                var booking = rs.msg;

                UnScheduleBus(number, j_id, booking);
                //return bookings;

            } else {
                alert($("#error_request_msg").val());
                //	$(location).attr('href',"#home");
            }
        },
        error: function () {


            alert($('#error_network_msg').val());
        }
    });

}


//function to unschedule a bus made available for take off

function UnScheduleBus(number, j_id, bookings) {
    //check if there are bookings which have done already by a passenger




    if (bookings > 0) {

        $("#dialog-confirm").show();
        $('#alert_message').html($("#unschedule_bus_alert_dialog_msg_1").val() + bookings + $("#unschedule_bus_alert_dialog_msg_2").val());
        $("#dialog-confirm").dialog({
            title: $("#unschedule_bus_details_alert_head_msg").val()  + number,
            width: 500,
            height: 220,
            modal: true,
            buttons: {
                "Continue": function () {
                    performUnscheduleBus();
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    } else {

        $("#dialog-confirm").show();
        $('#alert_message').html($("#unschedule_bus_details_alert_msg").val());
        $("#dialog-confirm").dialog({
            title: $("#unschedule_bus_details_alert_head_msg").val() + number,
            width: 500,
            height: 200,
            modal: true,
            buttons: {
                "Continue": function () {
                    performUnscheduleBus();
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    }


}


function performUnscheduleBus() {


    HoldOn.open({
        message: $("#unschedule_bus_details_hold_msg").val(),

        // background color
        backgroundColor: " #5bc0de",

        textColor: "#d9534f"

    });

    $.ajax({
        url: $('#mainLink').val() + "/bus/unSchedule/" + bus_id,
        data: {
            _method: 'POST',
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        datatype: "json",
        type: 'post',
        success: function (result) {
            HoldOn.close();
            console.log(result);
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                //$(location).attr('href', URL + "users");
                $('#panelMessage').show();
                $('#successMessage').html(rs.msg);

                setInterval(function () {


                    window.location.replace($('#mainLink').val() + '/agency/bus/schedules');

                }, 1000)

                $('#panelMessage').visible(false);


            } else {
                alert($("#error_request_msg").val());
                //	$(location).attr('href',"#home");
            }
        },
        error: function () {


            $('#panelMessage').show();
            $('#successMessage').html("Unable to unSchedule bus with bus  id   " + bus_id + " and  bus number   " + bus_number + "  from the database");

            HoldOn.close();


            setInterval(function () {


                window.location.replace($('#mainLink').val() + '/agency/bus/schedules');

            }, 5000)

            $('#panelMessage').visible(false);

        }
    });
}


function UnScheduleBusReceptionist() {

    HoldOn.open({
        message: $("#unschedule_bus_details_hold_msg").val(),

        // background color
        backgroundColor: " #5bc0de",

        textColor: "#d9534f"

    });

    $.ajax({
        url: $('#mainLink').val() + "/receptionist/bus/unSchedule/" + bus_id,
        data: {
            _method: 'POST',
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        datatype: "json",
        type: 'post',
        success: function (result) {
            HoldOn.close();
            console.log(result);
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                //$(location).attr('href', URL + "users");
                $('#panelMessage').show();
                $('#successMessage').html(rs.msg);

                setInterval(function () {


                    window.location.replace($('#mainLink').val() + '/agency/receptionist/bus/schedules');

                }, 1000)

                $('#panelMessage').visible(false);


            } else {
                alert($("#error_request_msg").val());
                //	$(location).attr('href',"#home");
            }
        },
        error: function () {


            $('#panelMessage').show();
            $('#successMessage').html("Unable to unSchedule bus with bus  id   " + bus_id + "  from the database");

            HoldOn.close();


            setInterval(function () {


                window.location.replace($('#mainLink').val() + '/agency/receptionist/bus/schedules');

            }, 5000)

            $('#panelMessage').visible(false);

        }
    });
}


function deleteBus() {

    HoldOn.open({
        message: $("#delete_bus_details_hold_msg").val(),

        // background color
        backgroundColor: " #5bc0de",

        textColor: "#d9534f"

    });

    $.ajax({
        url: $('#mainLink').val() + "/account/agency/bus/list/" + bus_id,
        data: {

            _token: $('meta[name="csrf-token"]').attr('content')
        },
        datatype: "json",
        type: 'post',
        success: function (result) {
            HoldOn.close();
            console.log(result);
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                //$(location).attr('href', URL + "users");
                $('#panelMessage').show();
                $('#successMessage').html(rs.msg);

                setInterval(function () {


                    window.location.replace($('#mainLink').val() + '/account/admin/buses/list');

                }, 1000)


            } else {
                alert($("#error_request_msg").val());
                //	$(location).attr('href',"#home");
            }
        },
        error: function () {


            $('#panelMessage').show();
            $('#successMessage').html("Can't delete bus with route id  " + bus_id + " and  bus number  " + bus_number + "  from the database");

            HoldOn.close();
            window.location.replace($('#mainLink').val() + '/account/admin/buses/list');
        }
    });
}