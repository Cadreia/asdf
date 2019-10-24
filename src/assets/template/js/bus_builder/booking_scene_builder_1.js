var firstSeatLabel = 1;
var temp = $("#plan").val();
var res = temp.split("#");
var seat_numbers = "#";

var max_allow_seats = $('#max_passengers').val();
var bookings_made = $('#booking_made').val();
var journey_type = $('#journey_type').val();

var availabe_seats = max_allow_seats - bookings_made;

var text = ""
for (index = 0; index < res.length; index++) {
    text += "\""
    text += res[index];
    text += "\""
    if (index != (res.length - 1))
        text += ","
}

$(document).ready(function () {


    $("#momo").hide();
    var $cart = $('#selected-seats'),
        $counter = $('#counter'),
        $total = $('#total'),
        sc = $('#seat-map').seatCharts({
            map: res,
            seats: {
                a: {
                    price: parseFloat($("#bus_fare").val()),
                    classes: 'economy-class', //your custom CSS class
                    category: 'Economy Class'
                }

            },
            naming: {
                top: false,
                getLabel: function (character, row, column) {
                    return firstSeatLabel++;
                },
            },
            legend: {
                node: $('#legend'),
                items: [
                    ['a', 'available', $('#seat_legend_p_msg_1').val()],
                    ['s', 'selected',$('#seat_legend_p_msg_2').val()],
                    ['b', 'unavailable', $('#seat_legend_p_msg_3').val()]
                ]
            },
            click: function () {
                if (this.status() == 'available') {
                    //lets first check to make sure that there are still seats available for their jouney
                    if (thereAreFreeSeats(sc.find('selected').length)) {
                        //let's create a new <li> which we'll add to the cart items
                        $('<li>' + this.data().category + ' Seat # ' + this.settings.label + ': <b>' + this.data().price + ' FCFA</b> <a class="cancel-cart-item">[cancel]</a></li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);

                        $('#animateDiv').effect("bounce", {times: 5}, 2000);

                        /*
                         * Lets update the counter and total
                         *
                         * .find function will not find the current seat, because it will change its stauts only after return
                         * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                         */
                        var total_calculate = 0;
                        var price=this.data().price;

                        //basically find every selected seat and sum its price
                        sc.find('selected').each(function () {
                            total_calculate += price;
                        });


                        $counter.text(sc.find('selected').length + 1);
                        addSeatNumberToArray(this.settings.label);

                        var tot = total_calculate;
                        $("#checkout_total_cost").val(tot);
                        $total.text(tot);

                        //update the large price total div
                        //if($total.value==0){
                        //
                        //    $total.text(price);
                        //}else{
                        //    $('#total_head').text(tot);
                        //
                        //}



                        return 'selected';
                    } else {


                        alert($('#error_seat_finished_msg').val()+ availabe_seats + $('#error_seat_finished_msg_2').val());
                    }

                } else if (this.status() == 'selected') {
                    //update the counter
                    $counter.text(sc.find('selected').length - 1);
                    //and total
                    var total_calculate = 0;
                    var price=$("#checkout_total_cost").val();

                    // //basically find every selected seat and sum its price
                    // sc.find('selected').each(function () {
                    //     total_calculate += this.data().price;
                    // });


                    var tot = price - this.data().price;
                    removeSeatNumberFromArray(this.settings.label);
                    $("#checkout_total_cost").val(tot);
                    $total.text(tot);
                     //$('#total_head').text(tot);
                    //remove the item from our cart
                    $('#cart-item-' + this.settings.id).remove();

                    //seat has been vacated
                    return 'available';
                } else if (this.status() == 'unavailable') {
                    //seat has been already booked
                    return 'unavailable';
                } else {
                    return this.style();
                }
            }
        });

    //this will handle "[cancel]" link clicks
    $('#selected-seats').on('click', '.cancel-cart-item', function () {
        //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
        sc.get($(this).parents('li:first').data('seatId')).click();
    });

    //let's pretend some seats have already been booked
    //sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
    getOccupiedSeats(sc);

    $("form[name=checkout]").submit(function (e) {
        $("#checkout_selected_seats").val(sc.find('selected').seatIds);
        console.log(seat_numbers);
        $("#checkout_seat_numbers").val(seat_numbers);

        var selected_seats = $('#checkout_selected_seats').val();
        if(selected_seats==""){

            alert($("#select_seat_first").val());
            e.preventDefault();
        }else{



            $("#momo").show(500);
            e.preventDefault();

        }


        //$("form").bind("submit", preventDefault);
    });

     //showMomo();

});

function recalculateTotal(sc,price) {
    var total = 0;

    //basically find every selected seat and sum its price
    sc.find('selected').each(function () {
        total += price;
    });
    //console.log(sc.find('selected').seatIds);
    return total;
}

function addSeatNumberToArray(id) {
    var temp = id;
    temp = id.replace(" ", "");
    seat_numbers += id;
    seat_numbers += "#";
}


function removeSeatNumberFromArray(id) {
    seat_numbers = seat_numbers.replace("#" + id + "#", "#");
}


/**
 * make ajax request to get the list of seats that have been booked already
 * @param sc
 */
function getOccupiedSeats(sc) {
    $.ajax({
        url: $('#baseUrl').val() + "/get_occupied_seats",
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'),
            bus_id: $("#bus_id").val(),
            journey_id: $("#journey_id").val()
        },
        datatype: "json",
        type: 'post',
        success: function (result) {
            var rs = JSON.parse(result);

            if (rs.state == "success") {
                blurOutOccupiedSeats(sc, rs.seats);
            } else {
                alert($("#error_request_msg").val());
                //	$(location).attr('href',"#home");
            }
        },
        error: function () {
            alert($("#error_network_msg").val());
        }
    });


    setInterval(function () {
        $.ajax({
            url: $('#baseUrl').val() + "/get_occupied_seats",
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                bus_id: $("#bus_id").val(),
                journey_id: $("#journey_id").val()
            },
            datatype: "json",
            type: 'post',
            success: function (result) {
                var rs = JSON.parse(result);

                if (rs.state == "success") {
                    blurOutOccupiedSeats(sc, rs.seats);
                } else {
                    alert($("#error_request_msg").val());
                    //	$(location).attr('href',"#home");
                }
            },
            error: function () {
                alert($("#error_network_msg").val());
            }
        });
    }, 20000);
}

/**
 * Make the seats that have already been selected to be unclickeable
 * @param sc
 * @param seats
 */
function blurOutOccupiedSeats(sc, seats) {
    var temp = seats.split("#");
    sc.get(temp).status('unavailable');
}

/**
 * Function to submit checkout form with the payment method chosen to be MTN Mobile Money
 */
function getResultsByMomo() {
    $("#pay_method").val(1);
    $("form#checkout_form").unbind("submit", preventDefault);
    $("form#checkout_form").submit();



    var selected_seats = $('#checkout_selected_seats').val();
    var res = selected_seats.split(',');
    //var total_seats=res.length +1;

    //check if the user has selected atleast one seat before he can continue

    //alert(total_seats);
    if(selected_seats==""){

        alert($("#select_seat_first").val());
    }else{

        performGetResultMomo();

    }



}

  //This function is used to prepare passenger bus ticket invoice
  function performGetResultMomo(){

      HoldOn.open({
          message: $("#alert_hold_on_msg_invoice").val(),
      });
      $.ajax({
          url: $('#baseUrl').val() + "/checkout_seats",
          data: $("#checkout_form").serialize(),
          datatype: "json",
          type: 'post',
          success: function (result) {
              HoldOn.close();
              var rs = JSON.parse(result);

              if (rs.state == "success") {
                  window.location.replace($('#baseUrl').val() + '/ticket_checkout_invoice');
              } else {
                  alert($("#error_request_msg").val());
                  //	$(location).attr('href',"#home");
              }
          },
          error: function () {
              HoldOn.close();
              alert($('#error_network_msg').val());
          }
      });

  }


function preventDefault(e) {
    e.preventDefault();
}

/**
 * Function to check if there are still bookable seats in the bus
 * @return boolean
 */
function thereAreFreeSeats(counter) {
    var ret = true;
    var selected_seats = $('#checkout_selected_seats').val();
    var res = selected_seats.split(',');

    var max_allow_seats = $('#max_passengers').val();
    var bookings_made = $('#booking_made').val();
    var journey_type = $('#journey_type').val();

    var result = max_allow_seats - bookings_made;
    //check if the jouney type is a bus stop point
    if (journey_type == 0) {
        if (counter == result) {
            ret = false;
        }
    }
    console.log(counter);
    return ret;

}

  //This function is used to display the momo payment channel logo
  function showMomo(){

      //set the seat numbers and seat labels
      $("#checkout_selected_seats").val(sc.find('selected').seatIds);
       console.log(seat_numbers);
      $("#checkout_seat_numbers").val(seat_numbers);

      var selected_seats = $('#checkout_selected_seats').val();
      if(selected_seats==""){

          alert($("#select_seat_first").val());
      }else{



          $("#momo").show(500);

      }



      
  }