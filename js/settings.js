
var image = document.getElementById("profile-image");
var username = document.getElementById("profile-username");
var save = document.getElementById("profile-save-button");

username.innerHTML = firebase.auth().currentUser.displayName;
console.log(firebase.auth().currentUser);