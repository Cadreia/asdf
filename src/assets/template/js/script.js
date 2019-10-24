$(document).ready(function(){
	/* This code is executed after the DOM has been completely loaded */

	/* Changing thedefault easing effect - will affect the slideUp/slideDown methods: */
	$.easing.def = "easeOutBounce";

	/* Binding a click event handler to the links: */
	$('li.button a').click(function(e){
	
		/* Finding the drop down list that corresponds to the current section: */
		var dropDown = $(this).parent().next();
		
		/* Closing all other drop down sections, except the current one */
		$('.dropdown').not(dropDown).slideUp('slow');
		dropDown.slideToggle('slow');
		
		/* Preventing the default event (which would be to navigate the browser to the link's address) */
		e.preventDefault();
	})
	
});


function submitNewsLetter(){

	 var email=$('#user_email').val();
	 var message_empty=$('#message').val();
	 var message_invalid=$('#message_1').val();
	var regxEmail=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;


	//check if the user email was entered

	 if(email == ''){

		 $('#message_div').html(message_empty);
		 $('#message_div').show();
		 $('#message_div').delay(6000).slideUp(300);

	 }else
	     if(regxEmail.test(email)){

			  performAjaxNewsLetter(email);

		 }else{

			 $('#message_div').html(message_invalid);
			 $('#message_div').show();
			 $('#message_div').delay(6000).slideUp(300);
		 }

}


  function performAjaxNewsLetter(email){

	  $.ajax({
		  url :$('#baseUrl').val() + "/newsletter/subsribe",
		  data : {

			  _token: $('meta[name="csrf-token"]').attr('content'),
			  email: email,

		  },

		  datatype : "json",
		  type : 'post',
		  success : function(result) {


			  var rs = JSON.parse(result);

			  if (rs.state == "success") {
				  //$(location).attr('href', URL + "users");
				  $('#user_email').val('');
				  $('#message_div').removeClass('alert-danger');
				  $('#message_div').addClass('alert-success');
				  $('#message_div').html(rs.message);
				  $('#message_div').show();
				  $('#message_div').delay(6000).slideUp(300);

			  } else
			  if(rs.state=="error")
			  {
				  $('#user_email').val('');
				  $('#message_div').show();
				  $('#message_div').html(rs.message);
				  $('#message_div').delay(6000).slideUp(300);

			  }
		  },
		  error : function() {


			  $('#message_div').show();
			  $('#message_div').removeClass('alert-warning');
			  $('#message_div').addClass('alert-danger');
			  $('#message_div').html("Unable to subscribe to our newsletter   ");

			  $('##message_div').delay(6000).slideUp(300);


		  }
	  });
  }