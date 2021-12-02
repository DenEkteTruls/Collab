
var database = firebase.database();

var uid = window.location.search.replace("?", "");
var username = undefined;
var photoURL = undefined;

var username_element = document.getElementById("username");
var subtext_element = document.getElementById("subtext");
var description_element = document.getElementById("description");
var user_image = document.getElementById("user-image");
var add_friend = document.getElementById("button-add-friend");
var chat_Button = document.getElementById("button-chat");

add_friend.onclick = function() {
    add_friend.style = "background-color: var(--green);";
    add_friend.innerHTML = "Requested";
}

database.ref("users").child(uid).on("value", (snap) => {
    var val = snap.val();
    username_element.innerHTML = val.displayName;
    subtext_element.innerHTML = "norway";
    description_element.innerHTML = "";
});

firebase.storage().ref("profile-images").child(uid+".jpg").getDownloadURL()
.then((url) => {
    user_image.src = url;
})
.catch((error) => {
    firebase.storage().ref("profile-images").child("no-user.png").getDownloadURL()
    .then((url) => {
        user_image.src = url;
    }) 
});


chat_Button.onclick = () => {
    window.location.replace("chat.html?"+uid);
}