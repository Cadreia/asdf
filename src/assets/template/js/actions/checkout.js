
$("document").ready(function(){

   // $("[name='free_ticket-checkbox']").bootstrapSwitch();
    //Initially randomly assign the selected seat numbers to the traveling mates
    for(var i=1; i<=$("#count").val(); i++){
        var temp = "#S" + i + " option:eq(" + i + ")";
        $(temp).attr('selected', 'selected');
    }
    //Prepare multiple select flexibility where-in as soon as one's value is changed, it is transfer to the one that originally had the old value
    var previous;

    $(".seat-select").on('focus', function () {
        // Store the current value on focus and on change
        previous = this.value;
    }).change(function() {
        //Find the other selection that has the new value
        console.log(this.id);
        //Loop through the other selections and change the one that has thesame value as the newly selected vaue
        for(var i=1; i<=$("#count").val(); i++){
            var curr = "#S" + i;
            if(($(curr).val() == this.value) && (curr != ("#" + this.id))){
                //console.log($(curr).val());
                $(curr).val(previous);
                //console.log($(curr).val());
            }else{

            }
        }
        //alert(this.value);

        // Make sure the previous value is updated
        previous = this.value;
    });

});

function payForTickets(total){

   var free_check_box=0;
    var check_box=$('#free_ticket_checked').is(':checked');

  if(check_box==true){

      free_check_box=1;
      //alert(free_check_box);
  }else{
      free_check_box=2;
      //alert(free_check_box);
  }

    var phone_number=$("#phone").val();
    var id_num=$("#ID").val();

    if($("#phone").val()==""||$("#Name").val()=="" ||$("#ID").val()=="" ){
        
        alert($("#error_filll_all_msg").val());
    }else {

        if (id_num.length < 9) {

            alert($("#invalid_id_detials_msg").val());

        }
        else {


        HoldOn.open({
            message: $("#payment_progress_info").val()
        });
        $.ajax({
            url: $('#mainLink').val() + "/pay/momo",
            data: {
                amount: total,
                check_box_free: free_check_box,
                account: $("#phone").val(),
                name: $("#Name").val(),
                number: $("#No").val(),
                id: $("#ID").val(),

            },
            datatype: "json",
            type: 'post',
            success: function (result) {
                HoldOn.close();
                var rs = JSON.parse(result);

                if (rs.state == "success") {
                    $("#feedback").html(rs.message);
                } else {
                    alert("An Error Occured. Please try again.");
                    //	$(location).attr('href',"#home");
                }
            },
            error: function () {
                HoldOn.close();
                alert($('#error_network_msg').val());
            }
        });
    }
}
}

function payForManyTickets(total){
    var labels = "";
    var seats = "";
    var contacts = "";
    var names = "";
    var ids = "";
    for(var i=1; i<=$("#count").val(); i++){
        labels += $("#S" + i + " option:selected").text(); if(i!=$("#count").val()){ labels +="," };
        seats += $("#S" + i + " option:selected").val(); if(i!=$("#count").val()){ seats +="," };
        contacts += $("#No" + i + "").val(); if(i!=$("#count").val()){ contacts +="," };
        names += $("#Name" + i + "").val(); if(i!=$("#count").val()){ names +="," };
        ids += $("#ID" + i + "").val(); if(i!=$("#count").val()){ ids +="," };
        //console.log(labels + " " + seats + " " + contacts + " " + names + " " + ids);
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
        if (name_test =='') {

            alert($('#error_passenger_name_msg').val());

            return;
        }


    }

    //check the respective user contact numbers are incorrect entries
    for (index = 0; index < res_phone_numbers.length; index++) {

        contact_test = res_phone_numbers[index];

        //check if the user inputed email addresses are valid email
        if (contact_test =='') {

            alert($('#error_passenger_number_msg').val());

            return;
        }


    }

    //check the respective user ID/Passport  numbers are incorrect entries
    for (index = 0; index < res_id.length; index++) {

        id_test = res_id[index];

        //check if the user inputed email addresses are valid email
        if (id_test =='') {

            alert($('#error_passenger_id_msg').val());

            return;
        }


    }

    HoldOn.open({
        message: $("#payment_progress_info").val()
    });
    $.ajax({
        url : $('#mainLink').val() + "/pay/momo_many",
        data: {
            amount: total,
            account: $("#phone").val(),
            labels: labels,
            seats: seats,
            id_cards: ids,
            names: names,
            numbers: contacts,
            name : $("#Name").val(),
            number : $("#No").val(),
            id :$("#ID").val()
        },
        datatype : "json",
        type : 'post',
        success : function(result) {
            HoldOn.close();
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                $("#feedback").html(rs.message);
            } else {
                $("#feedback").html(rs.message);
                //	$(location).attr('href',"#home");
            }
        },
        error : function() {
            HoldOn.close();
            alert($('#error_network_msg').val());
        }
    });

}