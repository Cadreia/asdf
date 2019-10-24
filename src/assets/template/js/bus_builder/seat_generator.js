$('document').ready(function () {

});

/**
 * function to generate the the seating data for the JSC seating plan APO
 */
function generateSeatsForJSC() {
    //This function loops through all the seat inputs and then generates the markup data for JSC(The front-end API)
    var ret = ""; //'ret' is the variable that will be saved as the markup of the bus
    var rows = $('#rows').val();
    var columns = $('#columns').val();

    //alert("Rows: " + rows + ", Columns: " + columns);
    for (var i = 1; i <= rows; i++) {
        for (var j = 1; j <= columns; j++) {
            var current_id = "#" + i + "_" + j;
            //Check if the text field is empty or not, if it is, then its a space
            if ($(current_id).val() == "")
                ret += "_";
            else {
                ret += "a[" + i + "_" + j + ", " + $(current_id).val() + "]";
            }
        }
        if (i != rows)
            ret += "#";
    }
    saveGeneratedSeatPlan(ret);
}


function addZeroe(obj) {
    //this function will be used to add zero to an input field when click

    var current_id = obj.id;
    var current_value = $("#" + current_id).val();

    if (current_value == "") {

        $("#" + current_id).val("0");

    }else{

        $("#" + current_id).val("");
    }


}

function populateSeatNumbers() {
    var rows = $('#rows').val();
    var columns = $('#columns').val();
    var number = 1;
    //alert("Rows: " + rows + ", Columns: " + columns);
    for (var i = 1; i <= rows; i++) {
        for (var j = 1; j <= columns; j++) {
            var current_id = "#" + i + "_" + j;
            //Check if the text field is empty or not, if it is, then its a space
            if ($(current_id).val() == "0")
                $(current_id).val("");
            else {
                $(current_id).val(number);
                number++;
            }
        }
    }
}

function saveGeneratedSeatPlan(plan) {
    HoldOn.open({
        message: $("#ajax_progress").val()
    });
    $.ajax({
        url: $('#mainLink').val() + "/save_new_bus",
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'),
            seats: $("#seats").val(),
            plan: plan,
            bus_id: $("#bus_id").val()

        },
        datatype: "json",
        type: 'post',
        success: function (result) {
            HoldOn.close();
            console.log(result);
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                $("#feedback").html(rs.msg);
                //alert("success");
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

