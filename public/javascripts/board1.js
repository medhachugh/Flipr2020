$( document ).ready(function() {
  $("#addcard").click(function(event){
    $('#cardform').show();
  });
  $("#display").click(function(event){
    event.preventDefault();
      ajaxPost4();
  });
  $("#removecard").click(function(event){
    event.preventDefault();
      ajaxPost2();
  });
  $("#newcardform").click(function(event) {
    if($("#card_name").val()=="")
    {
      alert("Enter card name");
    }
    else{
    event.preventDefault();
    ajaxPost3();
  }});
  $("#addlistform").submit(function(event) {
    event.preventDefault();
    ajaxPost();
  });
  $("#cardform").submit(function(event) {
    event.preventDefault();
    ajaxPost1();
  });
      function ajaxPost(){
        var formData = {
          name : $("#name").val(),
        }
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url :"/list",
        data : JSON.stringify(formData),
        dataType : 'json',
        complete : function(list_name) {
          alert("Your list is created successfully!");
          var list_name = list_name.responseText;
          $(list_name).appendTo("#displaycard");
        }
      });
      }
       function ajaxPost1(){
        var formData = {
          name : $("#name").val(),
          description : $("#description").val(),
          attachment : $("#attachment").val(),
          due_date : $("#due_date").val(),

        }
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url :"/card",
        data :JSON.stringify(formData),
        dataType : 'json',
        complete : function(list_name) {
          alert("Details added");
        }
      });
      }
      function ajaxPost3(){
        var formData = {
          list_name : $("#displaycard").val(),
          card_name:$("#card_name").val(),
        }
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url :"/newcard",
        data : JSON.stringify(formData),
        dataType : 'json',
        complete : function(list_name) {
          alert("Your card is created successfully!");
        }
      });
      }
      function ajaxPost4(){
        var formData = {
          list_name : $("#displaycard").val(),
        }
        $("#table").empty();
        $.ajax({
        type : "POST",
        url :"/showcards",
        data:formData,
        complete : function(cards){
          $('#table').removeClass('table table-striped table-hover');
          display_cards($(cards));
          $('#table').show();
          $('#table').addClass('table-striped table-hover table-light');
        }
      });
    }
    
    function ajaxPost2(){
      var formData = {
        card_name : $("#card_name").val(),
        list_name:$('#list_name').val(),
      }
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url :"/removecard",
      data : JSON.stringify(formData),
      dataType : 'json',
      complete : function() {
        var t=$("#table").val();
        for(i=0;i<t.length;i++)
        {
          if($(idClicked)==t[3].id)
          {
            $(this).remove();
          }
        }
        
      }
    });
  }
});
function display_cards(cards){
  var cards= JSON.stringify(cards);
  cards = JSON.parse(cards);
  var listname=cards[0].responseJSON[0];
  var t=cards[0].responseJSON.length;
  const div1=document.createElement('table');
  var list=div1.insertRow(0);
  list.innerHTML="<b>"+listname+"</b>";
  list.classList.add("w3-center");
  var table_head=div1.insertRow(1);
  table_head.classList.add("w3-center","w3-black","w3-text-white");
  table_head.innerHTML = "<th>Serial No.</th><th>Card Name</th><th>Add details</th><th>Remove</th><th>See details</th>";
  for(i=0;i<t;i++)
 { const div = div1.insertRow(i+2);
   var sno=div.insertCell(0);
   var card_name=div.insertCell(1);
   var add_details=div.insertCell(2);
   var remove=div.insertCell(3);
   var see_details=div.insertCell(4);
   var button1 = document.createElement('button');
   var button3 = document.createElement('button');
  button1.innerText="Add Details";
  button3.innerText="See details";
  var button2 = document.createElement('button');
  button1.setAttribute("data-toggle","modal");
  button1.setAttribute("data-target","#myModal");
  button2.setAttribute("data-toggle","modal");
  button2.setAttribute("data-target","#myModal1");
  button3.setAttribute("data-target","#myModal");
  button1.id="adddetails"+"i+1";
  button2.id="remove"+"i+1";
  button1.value=cards[0].responseJSON[i+1];
  button2.value=cards[0].responseJSON[i+1];
  button2.innerText="Remove";
  button1.classList.add("btn","btn-primary","w3-center");
  button2.classList.add("btn","btn-success","w3-center");
  button3.classList.add("btn","btn-danger","w3-center");
   sno.innerHTML=i+1;
   card_name.innerHTML=cards[0].responseJSON[i+1];
   add_details.appendChild(button1);
   remove.appendChild(button2);
   see_details.appendChild(button3);

  }
  document.getElementById('table').appendChild(div1);
}
