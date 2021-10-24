
var username = window.location.search.replace("?", "").replace(".", " ");
var username_element = document.getElementById("username");
var subtext_element = document.getElementById("subtext");
var description_element = document.getElementById("description");
var user_image = document.getElementById("user-image");
var add_friend = document.getElementById("button-add-friend");

username_element.innerHTML = username;

add_friend.onclick = function() {
    add_friend.style = "background-color: var(--green);";
    add_friend.innerHTML = "Requested";
}

readFile("users.json", function(raw) {
    users = JSON.parse(raw);
    for(var [key, value] of Object.entries(users))
    {
        if(key.toLowerCase() == username.toLowerCase()) {
            user_image.src = value[2];
            subtext_element.innerHTML = value[0];
            description_element.innerHTML = value[1];
        }
    }
});

/* -------------------------- Functions ------------------------------- */

function readFile(filename, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", filename, true);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState == 4 && rawFile.status == 200) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}