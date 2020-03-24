/*function get_list(url){
    var xmlhttp = new XMLHttpRequest();
    var output = document.getElementById("todolist");
    output.innerHTML = "<h2>Loading...</h2>";
	xmlhttp.open("GET", url, true);
	xmlhttp.onreadystatechange = function() {
        display_list(output, xmlhttp);
	}
	xmlhttp.send(null);
}

observeEvent(window, "load", function() {
    var btn = document.getElementById("btnStart");
    btn.style.alignItems = "right";
    observeEvent(btn, "click", start);
});
function display_list(output, xmlhttp) {
    var todo, eid, target, i;
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        output.style.display = "block";
        output.innerHTML = xmlhttp.responseText;

        if (xmlhttp.responseText.indexOf("Failed") == 0) {
            output.className = "Warning";
        } else {
            todo = output.getElementsByTagName("li");
            for (i = 0; i < todo.length; ++i) {
                observeEvent(todo[i], "click", function(e) {
                    target = getTarget(e);
                    eid = target.id.substring(3);
                    getCardForm("Add Card Details", eid);
                });
            }
        }
    }
}
function add_list(e){
    e.preventDefault();
    var data = $('input[name=name]').val();
    $.ajax({
        type: 'post',
        url: '/list',
        data: data,
        dataType: 'application/json',
        success: function(name){
            $("#todolist").html("<li><b>"+JSON.stringify(name)>"</b></li>")},
        fail:function(){
            alert("error");
        }
        });
}
function getCardForm(url, eid) {
    var xmlhttp = new XMLHttpRequest();
    var output = document.getElementById("FormDiv");
    var fields, field, value, i;
    output.innerHTML = "Loading...";
    xmlhttp.open("POST", url, true);
    xmlhttp.onreadystatechange = function() {
        display(output, xmlhttp);
        fields = output.getElementsByTagName("input");
        for (i = 0; i < fields.length; ++i) {
            observeEvent(fields[i], "change", function(e) {
                target = getTarget(e);
                field = target.name;
                value = target.value;
                updateCard("Edit Card", field, value, eid);
            });
        }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xmlhttp.send("eid=" + eid);
}

function updateCard(url, field, value, eid) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.onreadystatechange = cardUpdated;
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xmlhttp.send("eid=" + eid + "&field=" + field + "&value=" + value);

    function cardUpdated() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var msg = document.getElementById("MessageDiv");
            if (xmlhttp.responseText.indexOf("Failed") == 0) {
                msg.className = "Warning";
                msg.innerHTML = xmlhttp.responseText;
            } else {
                msg.innerHTML = "Updated!";
                get_list('List');
            }
            fadeElem(msg, 255, 255, 0, 255, 255, 255);
        }
    }
}*/

/*function add_list() {
       var container = document.createElement("LIST");
        container.innerHTML =document.getElementById("name").value;
        var card_row = document.createElement("li");
        var cards = document.createElement("BUTTON");
        cards.innerHTML = "Add Card";
        card_row.appendChild(cards);
        container.appendChild(cards);

        var dvContainer = document.getElementById("add_containers");

    var div = document.createElement("DIV");
    div.appendChild(container);
    //Create a Remove Button.
    var btnRemove = document.createElement("INPUT");
    btnRemove.value = "Remove";
    btnRemove.type = "button";
    btnRemove.onclick = function () {
        dvContainer.removeChild(this.parentNode);
    };

    //Add the Remove Buttton to DIV.
    div.appendChild(btnRemove);

    //Add the DIV to the container DIV.
    dvContainer.appendChild(div);
    dvContainer.style.color = "black";
    dvContainer.style.fontFamily="Montserrat"
    dvContainer.style.textAlign = "center";
    dvContainer.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
    dvContainer.style.padding = "80px";
    dvContainer.style.width = "50%";
    dvContainer.style.height ="50%";
    dvContainer.style.display = "block";
    dvContainer.style.marginLeft ="50px";
    dvContainer.style.backgroundColor ="white";

};
function add_new_card()
{
}*/
