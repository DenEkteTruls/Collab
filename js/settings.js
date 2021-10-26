


var image = document.getElementById("profile-image");
var username = document.getElementById("profile-username-entry");
var email = document.getElementById("profile-email-entry");
var save = document.getElementById("profile-save-button");
var state = document.getElementById("status");


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.storage().ref("profile-images").child(user.photoURL).getDownloadURL()
    .then((url) => {
        image.src = url;
    });
    username.value = user.displayName;
    email.value = user.email;

  } else {
      window.location.replace("index.html");
  }
});




function save_()
{
    username = document.getElementById("profile-username-entry");
    email = document.getElementById("profile-email-entry");

    if(username.value != firebase.auth().currentUser.displayName) {
        firebase.auth().currentUser.updateProfile({
            "displayName": username.value
        }).then(() => {
            state.innerHTML = "Successfully changed.";
            state.style.color = "lightgreen";
        })
        .catch((error) => {
            state.innerHTML = error;
            state.style.color = "red";
        });
    }
    
    if(email.value != firebase.auth().currentUser.email) {
        firebase.auth().currentUser.updateEmail(email.value)
        .then(() => {
            state.innerHTML = "Successfully changed.";
            state.style.color = "lightgreen";
        })
        .catch((error) => {
            state.innerHTML = error;
            state.style.color = "red";
        });
    }

    var file_ = event.target.files[0];
    changeProfileImage(file_);
}



function changeProfileImage(file_)
{
    var user = firebase.auth().currentUser;
    firebase.storage().ref("profile-images").child(user.uid+".jpg").put(file_)
    .then(() => {
        console.log("saved!");
    })
    .catch((error) => {
        console.log(error);
    });
}