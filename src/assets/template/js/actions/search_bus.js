/**
 * Created by Dieudonne_Dengun on 11/16/15.
 */


var bus_id='0';
var bus_total_seats='0';
var bus_number='';
var bus_image='';
 var journey_id='0';

$('document').ready (function () {

 // $('#search_result').hide(2000);
   // $('#search_result').show(4000);



   // $('#search_result').html(rs.bus);
});


 function seatPlan(){





}




function stageBook(obj,b_id,j_id,s_total){

    bus_id=b_id;
    journey_id=j_id;
    bus_total_seats=s_total;
    bus_image=obj.id;

    initChart();
    $('#seatPlan').show();

     $('#image_animate').attr('src',$('#basePath').val()+'bus_images/thumb/'+bus_image);

    $('#message').html('Select Bus Seat Position for bus number  '+ bus_id);

    $('#seatPlan').hide(2000);
    $('#seatPlan').show(4000);



   // $("#myModal").modal('show');

}

function initChart(){

    var firstSeatLabel=1;

    var $cart = $('#selected-seats'),
        $counter = $('#counter'),
        $total = $('#total'),
        sc = $('#seat-plan').seatCharts({
            map: [
                'd____',
                'ff_ff',
                'ff_ff',
                'ee_ee',
                'ee_ee',
                'ee___',
                'ee_ee',
                'ee_ee',
                'ee_ee',
                'eeeee'
            ],
            seats: {
                d:{
                    classes:'driver',
                    category:'drive class'

                },

                f: {
                    price   : 100,
                    classes : 'first-class', //your custom CSS class
                    category: 'First Class'
                },
                e: {
                    price   : 40,
                    classes : 'economy-class', //your custom CSS class
                    category: 'Economy Class'
                }

            },
            naming : {
                top : false,
                getLabel : function (character, row, column) {
                    return firstSeatLabel++;
                }
            },
            legend : {
                node : $('#legend'),
                items : [
                    [ 'f', 'available',   'Normal Class' ],
                    [ 'e', 'available',   'VP Class'],
                    [ 'f', 'unavailable', 'Already Booked']
                ]
            },



            click: function () {
                if (this.status() == 'available') {
                    //let's create a new <li> which we'll add to the cart items
                    $('<li>'+this.data().category+' Seat # '+this.settings.label+': <b>$'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
                        .attr('id', 'cart-item-'+this.settings.id)
                        .data('seatId', this.settings.id)
                        .appendTo($cart);
                       $('#animateDiv').effect( "bounce", { times: 5 }, 2000 );
                    /*
                     * Lets update the counter and total
                     *
                     * .find function will not find the current seat, because it will change its stauts only after return
                     * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                     */
                    $counter.text(sc.find('selected').length+1);
                    $total.text(recalculateTotal(sc)+this.data().price);

                    return 'selected';
                } else if (this.status() == 'selected') {
                    //update the counter
                    $counter.text(sc.find('selected').length-1);
                    //and total
                    $total.text(recalculateTotal(sc)-this.data().price);

                    //remove the item from our cart
                    $('#cart-item-'+this.settings.id).remove();

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
    sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');

}

function recalculateTotal(sc) {
    var total = 0;

    //basically find every selected seat and sum its price
    sc.find('selected').each(function () {
        total += this.data().price;
    });

    return total;
}

function runClick(url){

}
//this will handle ajax pagination
 function paginate(){

     $('.pagination').find("a").each(function() {
        var url = $(this).attr('href'); //tried to erase #/ from all hrefs
         $(this).removeAttr('href');
         $(this).attr('id',url);
         $(this).attr('cursor','pointer');
         $(this).click(function(){
             var url2 = $(this).attr('id');
             $.ajax({

                 url : $('#baseUrl').val() + url2,
                 type : 'get',
                 success : function(result){
                     HoldOn.close();
                      $('#search_result').html(result);
                 },
                 error : function(e) {
                     console.log(e.error());


                     $('#search_result').html("Unable to load buses available  from the database successfully");

                     HoldOn.close();


                 }

             });

         });
     });


 }


 function searchBus(){

    //this method will be an ajax request being sent from the search bus form

     var to= $('#to_destination').val();
     var from=$('#from-destination').val();
     var arrive=$('#arrive-times').val();
     var depart=$('#depart-times').val();
         if($('#arrive_times').val().length==0|| $('#depart_times').val().length==0){

             alert('You must select an arrival and a departure date');
         }
   else {
     HoldOn.open({
         message: "Searching for  buses available for take off from the system",

         // background color
         backgroundColor:" #E6D5D5",

         textColor:"#d9534f"

     });

         //var form = $(this);

        // var dataString= 'destination ='+to+ ' '+ from + '  Time =' + arrive +' ' +depart;

         $.ajax({

             url : $('#baseUrl').val() + "/search/bus",
             data : {
                 _method: 'POST',
                 _token: $('meta[name="csrf-token"]').attr('content')
             },
            // dataType : "json",
             type : 'post',
             success : function(result){
                 HoldOn.close();
                // $('#search_result').html(result);
                 //console.log(result);
                 alert(result);

                 var rs = JSON.parse(result);

                 if (rs.state == "success") {

                     $('#search_result').hide(2000);
                     $('#search_result').show(4000);
                     $('#search_result').html(rs.bus);

                     paginate();
                 } else {
                     alert("An Error occurred while searching our database for bus availability. Please try again.");
                     //	$(location).attr('href',"#home");
                 }


             },
             error : function(e) {
                 console.log(e.error());


                 $('#search_result').html("Unable to load buses available  from the database successfully");

                 HoldOn.close();


             }

         });

         }

}