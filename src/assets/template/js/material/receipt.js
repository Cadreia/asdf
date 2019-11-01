var app = document.querySelector('.app');
var button = document.querySelector('button');
button.addEventListener('click', function(e) {
  e.preventDefault();
  app.classList.toggle('active');
  app.classList.contains('active') ? this.innerHTML = "CLOSE" : this.innerHTML = "OPEN";
})

    function printReceipt(){

      $print_css=$('#print_css').attr('href');


      window.frames["print_frame"].document.body.innerHTML=$('#login-box').html();

      window.frames["print_frame"].window.focus();
      window.frames["print_frame"].window.print();


    }

function printReceiptPop(){

  var print_css=$('#print_css').attr('href');
  var boot_css=$('#boot_css').attr('href');
  var  admin_css=$('#admin_css').attr('href');
 // var data=;
  var mywindow = window.open('', 'receipt-section', 'height=400,width=600');
  mywindow.document.write('<html><head><br><title>Printing bus ticket for an agency</title><br>');

  mywindow.document.write('<link href="'+boot_css+'" rel="stylesheet" type="text/css" />');
  mywindow.document.write('<link href="'+admin_css+'" rel="stylesheet" type="text/css" />')
  mywindow.document.write('<link href="'+print_css+'" rel="stylesheet" type="text/css" />');
  mywindow.document.write('</head><br><body>');

  mywindow.document.write($('#login-box').html());
  mywindow.document.write('</body><br></html>');
  mywindow.document.close();
  mywindow.focus();
  mywindow.print();
  mywindow.close();

    return true;

}
