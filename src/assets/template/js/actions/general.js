/**
 * Created by Dieudonne_Dengun on 11/12/15.
 */
var bus_id = '0';
var journey_id = '0';


$('document').ready(function () {


})

function showPopover() {


    $('[data-toggle="popover"]').popover({
        placement: 'top'
    });

}



//function to get the bus id and journery id from the bus loader panel.


function checkPassenger(b_id, j_id) {

    bus_id = b_id;
    journey_id = j_id;

    $('#check_passenger_div').show();

    $('#check_passenger_div').hide(2000);

    $('#check_passenger_div').show(4000);

    //check if the passenger id num field is empty


    //populate the bus id and journey id field of the check passenger form
    populateFields(bus_id, journey_id);


}

function populateFields(b_id, j_id) {
    $('#bus_id').val(b_id);
    $('#journey_id').val(j_id);


}

function checkPassengerDetails() {

    var bus_id = $('#bus_id').val();
    var journey_id = $('#journey_id').val();
    var id_num = $('#passenger_id').val();


    if ($('#passenger_id').val() == "") {

        alert($("#error_passenger_check_in_msg").val());
    } else {

        //  alert(bus_id +' and ' + journey_id + " id num" + id_num);

        HoldOn.open({
            message: $("#hold_passenger_check_in_msg").val(),

            // background color
            backgroundColor: " #5bc0de",

            textColor: "#d9534f"

        });

        //make an ajax call to the system to check passenger information

        $.ajax({
            url: $('#mainLink').val() + "/account/loader/bus/schedules/list",
            data: {

                _token: $('meta[name="csrf-token"]').attr('content'),
                bus_id: bus_id,
                journey_id: journey_id,
                id_num: id_num


            },

            datatype: "json",
            type: 'post',
            success: function (result) {
                HoldOn.close();
                console.log(result);
                var rs = JSON.parse(result);

                if (rs.state == "success") {
                    //$(location).attr('href', URL + "users");
                    $('#message_div').show();
                    $('#message_div').html(rs.msg);

                    $('#message_div').delay(6000).slideUp(300);
                    $('#message_div').delay(6000).slideUp(300);

                } else {
                    alert($("#error_request_msg").val());
                    //	$(location).attr('href',"#home");
                }
            },
            error: function () {
                HoldOn.close();

                $('#message_div').show();
                $('#message_div').html("<div class='alert alert-success flash-msg'>  "+$("#hold_passenger_check_in_msg_error_1").val() + id_num + " "+$("#hold_passenger_check_in_msg_error_2").val() + bus_id + "</div>");


            }
        });
    }
}
   function CheckOutTax(){

       var amount = $('#amount').val();
       var mobile_number = $('#mobile_number').val();
       var current_balnce=$('#current_balance').val();

       if (amount == "" | mobile_number == "") {

           alert($("#check_out_tax_fill_all_msg").val());

       } else {
           //check if the user inputed 9 digits as mobile money number
           if (mobile_number.length == 9) {

               //perform the cash out action
               performCheckOutTax(amount,mobile_number,current_balnce);

           } else {

               alert($("#error_invalid_momo_number_msg").val());
           }


       }

   }

function CheckOutAgency() {

    var amount = $('#amount').val();
    var mobile_number = $('#mobile_number').val();
    var current_balnce=$('#current_balance').val();

    if (amount == "" | mobile_number == "") {

        alert($("#check_out_tax_fill_all_msg").val());

    } else {
        //check if the user inputed 9 digits as mobile money number
        if (mobile_number.length == 9) {

            //perform the cash out action
             performCheckOutAction(amount,mobile_number,current_balnce);

        } else {

            alert($("#error_invalid_momo_number_msg").val());
        }


    }
}

 function performCheckOutTax(amount,mobile_number,balance){
     HoldOn.open({
         message: $("#cash_money_hold_msg_1").val() + amount + $("#cash_money_hold_msg_2").val()+ mobile_number+", "+$("#cash_money_hold_msg_3").val(),

         // background color
         backgroundColor: " #5bc0de",

         textColor: "#d9534f"

     });

     $.ajax({
         url: $('#mainLink').val() + "/agency/mobile_money/checkout/tax",
         data: {

             _token: $('meta[name="csrf-token"]').attr('content'),
             amount: amount,
             mobile_number: mobile_number,
             current_balance: balance


         },

         datatype: "json",
         type: 'post',
         success: function (result) {
             HoldOn.close();
             console.log(result);
             var rs = JSON.parse(result);

             if (rs.state == "success") {
                 //$(location).attr('href', URL + "users");
                 $('#message_div').show();
                 $('#message_div').html(rs.message);

                 $('#message_div').delay(8000).slideUp(300);

                 setInterval(function () {


                     window.location.reload();

                 }, 7000)


                 // $('#message_div').delay(6000).slideUp(300);

             } else {
                 alert($("#error_request_msg").val());
                 //	$(location).attr('href',"#home");
             }
         },
         error: function () {
             HoldOn.close();

             $('#message_div').show();
             $('#message_div').html("<div class='alert alert-danger '> "+$('#cash_money_hold_msg_fail').val() + mobile_number + $('#cash_money_hold_msg_fail_2').val() + amount+ " CFA</div>");
             $('#message_div').delay(10000).slideUp(300);

         }
     });



 }

function performCheckOutAction(amount,mobile_number,balance) {


    HoldOn.open({
        message: $("#cash_money_hold_msg_1").val() + amount + $("#cash_money_hold_msg_2").val() + mobile_number+", "+$("#cash_money_hold_msg_3").val(),

        // background color
        backgroundColor: " #5bc0de",

        textColor: "#d9534f"

    });

    //make an ajax call to the system to check passenger information

    $.ajax({
        url: $('#mainLink').val() + "/agency/mobile_money/checkout",
        data: {

            _token: $('meta[name="csrf-token"]').attr('content'),
            amount: amount,
            mobile_number: mobile_number,
            current_balance: balance


        },

        datatype: "json",
        type: 'post',
        success: function (result) {
            HoldOn.close();
            console.log(result);
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                //$(location).attr('href', URL + "users");
                $('#message_div').show();
                $('#message_div').html(rs.message);

                $('#message_div').delay(8000).slideUp(300);

                window.location.reload();
               // $('#message_div').delay(6000).slideUp(300);

            } else {
                alert($("#error_request_msg").val());
                //	$(location).attr('href',"#home");
            }
        },
        error: function () {
            HoldOn.close();

            var msg_1=$('#cash_money_hold_msg_fail').val();
            $('#message_div').show();
            $('#message_div').html("<div class='alert alert-danger '>"+msg_1 + mobile_number +  $("#cash_money_hold_msg_fail_2").val() + amount+ " CFA</div>");
            $('#message_div').delay(10000).slideUp(300);

        }
    });
}