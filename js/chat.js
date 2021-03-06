
var database = firebase.database();

var uid = window.location.search.replace("?", "");
var friend_image = document.getElementById("friend-image");
var friend_username = document.getElementById("friend-username");
var friend_state = document.getElementById("friend-state");
var entry = document.getElementById("message-entry");

database.ref("users").child(uid).on("value", (snap) => {
    var val = snap.val();
    friend_username.innerHTML = val.displayName;
    friend_state.innerHTML = val.state;
});

firebase.storage().ref("profile-images").child(uid+".jpg").getDownloadURL()
.then((url) => {
    friend_image.src = url;
})
.catch((error) => {
    firebase.storage().ref("profile-images").child("no-user.png").getDownloadURL()
    .then((url) => {
        friend_image.src = url;
    }) 
});


function new_message(message, time)
{
    var mbox = document.getElementById("message-box");
    var div = document.createElement("div");
    var p = document.createElement("p");

    p.innerHTML = message;
    p.className = "message-text";
    div.className = "message";

    div.appendChild(p);
    mbox.appendChild(div);
}


function send_message()
{
    var message = entry.value;
    var time = Date.now();

    new_message(message, time);
}