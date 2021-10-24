
var settings = document.getElementsByClassName("settings");
var collab = document.getElementsByClassName("collab");

var username = window.location.search.replace("?", "").replace(".", " ");

var settings_username = document.getElementById("settings-username");
if(username.replace(" ", "").length > 0) { settings_username.value = username; }

var settings_room_code = document.getElementById("settings-room-code");
var settings_button = document.getElementById("settings-button");
settings_button.onclick = function() {
    console.log(settings_room_code.value);
}


