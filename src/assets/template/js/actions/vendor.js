

function openModalFormTax(obj,vat_rate){

    var agency_id=obj.id;

    $('#tax_rate').val(vat_rate);
   $('#agency_id').val(agency_id);
   //alert($('#agency_id').val());
    $('#current_tax_rate').val(vat_rate);
    $('#edit_modal').modal();


}

  function updateTaxRate(){
      var tax_rate= $('#tax_rate').val();
      var agency_id= $('#agency_id').val();
      var current_tax_rate=$('#current_tax_rate').val();

       if(current_tax_rate==tax_rate){

           var msg=$('#error_msg').val();
           $('#message_div').html(msg);
           $('#message_div').show();
           $('#message_div'). delay(4000).slideUp(300);
       }else
       if(tax_rate==''){

           var msg=$('#error_msg_2').val();
           $('#message_div').html(msg);
           $('#message_div').show();
           $('#message_div'). delay(4000).slideUp(300);
       }
       else{
           performAjaxUpdateTaxRate(agency_id,tax_rate);

       }



  }

function openModalForm(obj,com_id){
    var com_rate=$('#commission_hidden').val();
    var agency_id=obj.id;

    $('#commission_id').val(com_id);
    $('#agency_id').val(agency_id);
    //alert($('#agency_id').val());
    $('#current_commission_rate').val(com_id);
    $('#edit_modal').modal();


}


function updateCommission(){
    var com_rate=$('#commission_hidden').val();

    var update_commission=$('#commission_id').val();

    var agency_id= $('#agency_id').val();
    var current_commission_rate=$('#current_commission_rate').val();


    if(current_commission_rate==update_commission){
      var msg=$('#error_msg').val();
        $('#message_div').html(msg);
        $('#message_div').show();
        $('#message_div'). delay(4000).slideUp(300);
    }else
        if(update_commission==''){

            var msg=$('#error_msg_2').val();
            $('#message_div').html(msg);
            $('#message_div').show();
            $('#message_div'). delay(4000).slideUp(300);
        }
    else{

            $('#message_div').html('You have made changes to the old record. Updating record in 3s ...');
            $('#message_div').removeClass('alert-warning');
            $('#message_div').addClass('alert-success');
            $('#message_div').show();
            $('#message_div'). delay(5000).slideUp(300);

            performAjaxUpdateCommission(agency_id,update_commission);

    }

}

  function performAjaxUpdateTaxRate(agency_id, tax_rate){
      HoldOn.open({
          message: "Updating tax rate record for this agency id "+ agency_id +" ....",
          textColor:"#d9534f"
      });

      $.ajax({
          url :$('#mainLink').val() + "/account/vendor/tax_manager/update/tax",
          data : {

              _token: $('meta[name="csrf-token"]').attr('content'),
              tax_rate: tax_rate,
              agency_id: agency_id,
          },

          datatype : "json",
          type : 'post',
          success : function(result) {
              HoldOn.close();
              console.log(result);
              var rs = JSON.parse(result);

              if (rs.state == "success") {
                  //$(location).attr('href', URL + "users");

                  $('#message_div').removeClass('alert-danger');
                  $('#message_div').removeClass('alert-warning');
                  $('#message_div').addClass('alert-success');
                  $('#message_div').html(rs.message);
                  $('#message_div').show();
                  $('#message_div').delay(6000).slideUp(300);

                  setInterval(function(){


                      window.location.reload();

                  }, 3000)

              } else
              if(rs.state=="error")
              {

                  $('#message_div').show();
                  $('#message_div').html(rs.msg);
                  $('#message_div').delay(6000).slideUp(300);

              }
          },
          error : function() {
              HoldOn.close();

              $('#message_div').show();
              $('#message_div').removeClass('alert-warning');
              $('#message_div').addClass('alert-danger');
              $('#message_div').html("Unable to update record for agency with agency id  "+ agency_id );

              $('##message_div').delay(6000).slideUp(300);


          }
      });


  }

  function performAjaxUpdateCommission(agency_id,com_rate){

      HoldOn.open({
          message: "Updating commission record for this agency id "+ agency_id +" ....",
          textColor:"#d9534f"
      });

      $.ajax({
          url :$('#mainLink').val() + "/account/vendor/update/commission",
          data : {

              _token: $('meta[name="csrf-token"]').attr('content'),
              com_rate: com_rate,
              agency_id: agency_id,
          },

          datatype : "json",
          type : 'post',
          success : function(result) {
              HoldOn.close();
              console.log(result);
              var rs = JSON.parse(result);

              if (rs.state == "success") {
                  //$(location).attr('href', URL + "users");

                  $('#message_div').removeClass('alert-danger');
                  $('#message_div').addClass('alert-success');
                  $('#message_div').html(rs.message);
                  $('#message_div').show();
                  $('#message_div').delay(6000).slideUp(300);

                  setInterval(function(){


                      window.location.reload();

                  }, 3000)

              } else
              if(rs.state=="error")
              {

                  $('#message_div').show();
                  $('#message_div').html(rs.msg);
                  $('#message_div').delay(6000).slideUp(300);

              }
          },
          error : function() {
              HoldOn.close();

              $('#message_div').show();
              $('#message_div').removeClass('alert-warning');
              $('#message_div').addClass('alert-danger');
              $('#message_div').html("Unable to update record for agency with agency id  "+ agency_id );

              $('##message_div').delay(6000).slideUp(300);


          }
      });

  }