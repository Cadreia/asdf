$("document").ready(function () {

    $(window).bind("beforeunload", function () {
        var message_alert_close = $('#message_close_alert').val();


        //OnBeforeCloseInvoicePage();
        onBeforeCloseInvolvePageMessage();
        return "Are you sure, you will want to do this";


    });


    //Initially randomly assign the selected seat numbers to the traveling mates
    for (var i = 1; i <= $("#count").val(); i++) {
        var temp = "#S" + i + " option:eq(" + i + ")";
        $(temp).attr('selected', 'selected');
    }
    //Prepare multiple select flexibility where-in as soon as one's value is changed, it is transfer to the one that originally had the old value
    var previous;

    $(".seat-select").on('focus', function () {
        // Store the current value on focus and on change
        previous = this.value;
    }).change(function () {
        //Find the other selection that has the new value
        console.log(this.id);
        //Loop through the other selections and change the one that has thesame value as the newly selected vaue
        for (var i = 1; i <= $("#count").val(); i++) {
            var curr = "#S" + i;
            if (($(curr).val() == this.value) && (curr != ("#" + this.id))) {
                //console.log($(curr).val());
                $(curr).val(previous);
                //console.log($(curr).val());
            } else {

            }
        }
        //alert(this.value);

        // Make sure the previous value is updated
        previous = this.value;
    });

    $('#open_dialog_link').click(function (e) {
        showPaymentConfirmationDialog();
    });

    $(document).on('click', '#close_dialog_payment', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

});

function OnBeforeCloseInvoicePage() {

    $("#dialog-close-confirm").show();
    var message_alert_close = $('#message_close_alert').val();

    $('#alert_close_message').html(message_alert_close);
    $("#dialog-close-confirm").dialog({
        title: "Bus Ticket Payment Cancellation ....  ",
        width: 400,
        height: 260,
        resizable: false,
        position: {my: "center center", at: "center bottom", of: "#targetElement"},
        modal: true,
        buttons: {

            "Stay on Page": function () {
                $(this).dialog("close");
                return true;
            }
        }
    });


}

function onBeforeCloseInvolvePageMessage() {


    return $("#error_close_page_alert_msg").val();

}

/*

   Handle the booking for a single bus ticket
 */
function payForTickets(total) {
    var mobile_number = $('#phone').val();
    if (mobile_number != "") {

        //check if the user inputed a 9 character
        if (mobile_number.length == 9) {

            //check if the user has entered all passenger's information

            if ($("#phone").val() == '' || $("#Name").val() == '' || $("#No").val() == '' || $("#ID").val() == '') {


                alert($("#error_filll_all_msg").val())
            } else {

                $(".continue-payment").attr('id', total);
                $("#open_dialog_link").click();
                // alertMessage(total);
                // showPaymentConfirmationDialog();

            }


        } else {

            alert($("#error_invalid_momo_number_msg").val())
        }

    } else {
        alert($("#error_enter_momo_number_msg").val());
    }
}


//function to show payment confirmaion dialog
function showPaymentConfirmationDialog() {


    $('#open_dialog_link').magnificPopup({
        removalDelay: 500,
        closeBtnInside: true,
        type: 'inline',
        modal: false,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },

    });
}

//function to proceed with payment after confirmation
/*
   handle the continue button click from the dialog box , in this case , for single booking
 */
function continuePayment(obj) {

    $.magnificPopup.close();
    performPayTickets(obj.id);
}


/*
   Handle the continue button from the dialog box, in this case for a multiple booking

 */
function continuePaymentMany(obj) {

    $.magnificPopup.close();
    performPayTicketsManyAjax(obj.id);
}

//function has been temporally not used
function alertMessage(total) {


    $("#dialog-confirm").show();
    var message_alert = $('#message_pay_alert').val();

    $('#alert_message').html(message_alert);
    $("#dialog-confirm").dialog({
        title: $("#error_itcket_alert_head_msg").val(),
        width: 400,
        height: 190,
        resizable: false,
        position: {my: "center center", at: "center bottom", of: "#targetElement"},
        modal: true,
        buttons: {
            "Continue": function () {
                performPayTickets(total)

                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
}


//Perform ajax payment of bus single bus ticket using mobile money
function performPayTickets(total) {


    HoldOn.open({
        message: $("#payment_progress_info").val()
    });
    $.ajax({
        url: $('#baseUrl').val() + "/pay/momo",
        data: {
            amount: total,
            account: $("#phone").val(),
            name: $("#Name").val(),
            number: $("#No").val(),
            id: $("#ID").val(),
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        datatype: "json",
        type: 'post',
        success: function (result) {
            HoldOn.close();
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                $("#feedback").html(rs.message);

                setTimeout(function () {
                    window.location.replace($('#baseUrl').val() + '/account/passenger/view/reservations');
                }, 15000);

            }
            else {
                if (rs.state == "failed") {
                    $("#feedback").html(rs.message);
                } else {
                    alert("An Error Occured. Please try again.");
                    //	$(location).attr('href',"#home");
                }
            }
        },
        error: function () {
            HoldOn.close();
            alert($('#error_network_msg').val());
        }
    });
}


//Perform ajax payment of bus multiple bus ticket using mobile money
function payForManyTickets(total) {
    var labels = "";
    var labels_validate = "";
    var seats = "";
    var seats_validate = "";
    var contacts = "";
    var contacts_validate = "";
    var names = "";
    var names_validate = "";
    var ids = "";
    var ids_validate = "";

    for (var i = 1; i <= $("#count").val(); i++) {

        labels += $("#S" + i + " option:selected").text();
        if (i != $("#count").val()) {
            labels += ","
        }

        seats += $("#S" + i + " option:selected").val();
        if (i != $("#count").val()) {
            seats += ","
        }
        contacts_validate = $("#No" + i + "").val();
        if (contacts_validate == '') {

            $("#No" + i + "").css("color", "red");
            // $("#No" + i + "").css("background", "red");
            // $("#No" + i + "").focus ();
        } else {

            $("#No" + i + "").css("color", "#6FD508");
            // $("#No" + i + "").css("background", "#6FD508");
            contacts += contacts_validate;
        }

        if (i != $("#count").val()) {
            contacts += ","
        }

        names_validate = $("#Name" + i + "").val();
        if (names_validate == '') {

            $("#Name" + i + "").css("color", "red");
            // $("#No" + i + "").css("background", "red");
            // $("#No" + i + "").focus ();
        } else {

            $("#Name" + i + "").css("color", "#6FD508");
            // $("#No" + i + "").css("background", "#6FD508");
            names += names_validate;
        }

        if (i != $("#count").val()) {
            names += ","
        }


        ids_validate = $("#ID" + i + "").val();
        if (ids_validate == '') {

            $("#ID" + i + "").css("color", "red");
            // $("#No" + i + "").css("background", "red");
            // $("#No" + i + "").focus ();
        } else {

            $("#ID" + i + "").css("color", "#6FD508");
            // $("#No" + i + "").css("background", "#6FD508");
            ids += ids_validate;
        }

        if (i != $("#count").val()) {
            ids += ","
        }

        console.log(labels + " " + seats + " " + contacts + " " + names + " " + ids);
    }


    //  Validate the first passenger information
    if ($("#phone").val() == '' || $("#Name").val() == '' || $("#No").val() == '' || $("#ID").val() == '') {

        if ($("#phone").val() == '') {

            $("#phone").css("color", "red");
            alert($("#error_filll_all_msg").val());
            return;

        } else if ($("#Name").val() == '') {

            $("#Name").css("color", "red");
            alert($("#error_filll_all_msg").val())
            return;
        } else if ($("#No").val() == '') {

            $("#No").css("color", "red");
            alert($("#error_filll_all_msg").val());
            return;

        } else if($("#ID").val()==''){

            $("#ID").css("color", "red");
            alert($("#error_filll_all_msg").val());
            return;
        }else {

            $("#ID").css("color", "#6FD508");
            $("#No").css("color", "#6FD508");
            $("#Name").css("color", "#6FD508");
            $("#phone").css("color", "#6FD508");

        }

    }


    //split the gotten input passenger details and split for client validation before submission
    var res_id = ids.split(",");
    var res_phone_numbers = contacts.split(",");
    var res_names = names.split(",");


    var id_test = "";
    var contact_test = "";
    var name_test = "";

    //check the respective user full name for incorrect entries
    for (index = 0; index < res_names.length; index++) {

        name_test = res_names[index];

        //check if the user inputed email addresses are valid email
        if (name_test == '') {

            alert($('#error_passenger_name_msg').val());

            return;
        }


    }

    //check the respective user contact numbers are incorrect entries
    for (index = 0; index < res_phone_numbers.length; index++) {

        contact_test = res_phone_numbers[index];

        //check if the user inputed email addresses are valid email
        if (contact_test == '') {

            alert($('#error_passenger_number_msg').val());

            return;
        }


    }

    //check the respective user ID/Passport  numbers are incorrect entries
    for (index = 0; index < res_id.length; index++) {

        id_test = res_id[index];

        //check if the user inputed email addresses are valid email
        if (id_test == '') {

            alert($('#error_passenger_id_msg').val());

            return;
        }


    }


    var mobile_number = $('#phone').val();
    if (mobile_number != "") {

        //check if the user inputed a 9 character
        if (mobile_number.length == 9) {

            $("#phone").css("color", "#6FD508");
            $(".continue-payment").attr('id', total);
            $("#open_dialog_link").click();

            $("#seats").val(seats);
            $("#contacts").val(contacts);
            $("#names").val(names);
            $("#ids").val(ids);
            $("#labels").val(labels);


        } else {

            alert($("#error_invalid_momo_number_msg").val())
        }

    } else {
        alert($("#error_enter_momo_number_msg").val());
    }
}

//execute the real ajax payments of bus seats
function performPayTicketsManyAjax(total) {

    HoldOn.open({
        message: $("#payment_progress_info").val()
    });
    $.ajax({
        url: $('#baseUrl').val() + "/pay/momo_many",
        data: {
            amount: total,
            account: $("#phone").val(),
            labels: $("#labels").val(),
            seats: $("#seats").val(),
            id_cards: $("#ids").val(),
            names: $("#names").val(),
            numbers: $("#contacts").val(),
            name: $("#Name").val(),
            number: $("#No").val(),
            id: $("#ID").val(),
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        datatype: "json",
        type: 'post',
        success: function (result) {
            HoldOn.close();
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                $("#feedback").html(rs.message);

                setTimeout(function () {
                    window.location.replace($('#baseUrl').val() + '/account/passenger/view/reservations');
                }, 15000);

            } else {
                $("#feedback").html(rs.message);
                //	$(location).attr('href',"#home");
            }
        },
        error: function () {
            HoldOn.close();
            alert($('#error_network_msg').val());
        }
    });
}