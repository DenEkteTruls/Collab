
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
});


function send_message()
{
    var message = entry.value;
    var time = Date.now();

    document.write(message, time);      
}