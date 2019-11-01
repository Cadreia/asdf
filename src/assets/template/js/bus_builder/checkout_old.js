
$("document").ready(function(){

});

function payForTickets(total){
    HoldOn.open({
        message: $("#payment_progress_info").val()
    });
    $.ajax({
        url : BASE_URL + "/pay/momo",
        data: {
            amount: total,
            account: $("#phone").val()
        },
        datatype : "json",
        type : 'post',
        success : function(result) {
            HoldOn.close();
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                $("#feedback").html(rs.message);
            } else {
                alert("An Error Occured. Please try again.");
                //	$(location).attr('href',"#home");
            }
        },
        error : function() {
            HoldOn.close();
            alert("Error reaching the server. Check your connection");
        }
    });
}