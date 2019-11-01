
var route_id='0';

//stage  a route for delete
function stageRoute(r_id){
    route_id = r_id;


   deleteRoute();




}

function showPopover(){


    $('[data-toggle="popover"]').popover({
        placement : 'top'
    });

}




function deleteRoute(){

    HoldOn.open({
        message: "Deleting Travel Route from database, Please hold on",

        // background color
        backgroundColor:" #5bc0de",

        textColor:"#d9534f"

    });

    $.ajax({
        url :$('#mainLink').val() + "/routes/" + route_id,
        data : {
            _method: 'DELETE',
            _token: $('meta[name="csrf-token"]').attr('content'),
        },
        datatype : "json",
        type : 'DELETE',
        success : function(result) {
            HoldOn.close();
            console.log(result);
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                //$(location).attr('href', URL + "users");
                $('#panelMessage').show();
                $('#successMessage').html(rs.msg);

                setInterval(function(){


                    window.location.replace( $('#mainLink').val() +'/routes');

                }, 1000)


            } else {
                alert("An Error Occured. Please try again.");
                //	$(location).attr('href',"#home");
            }
        },
        error : function() {


            $('#panelMessage').show();
            $('#successMessage').html("Can't delete route with route id  "+ route_id + "  from the database");
            HoldOn.close();
        }
    });
}