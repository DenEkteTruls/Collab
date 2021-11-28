
var database = firebase.database();

var image = document.getElementById("profile-image-main");
var username = document.getElementById("profile-username-entry");
var email = document.getElementById("profile-email-entry");
var save = document.getElementById("profile-save-button");
var state = document.getElementById("status");


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.storage().ref("profile-images").child(user.uid+".jpg").getDownloadURL()
    .then((url) => {
        image.src = url;
    })
    .catch((error) => {
        firebase.storage().ref("profile-images").child("no-user.png").getDownloadURL()
        .then((url) => {
            image.src = url;
        });
    });
    username.value = user.displayName;
    email.value = user.email;

  } else {
      window.location.replace("index.html");
  }
});



function save_(event)
{

    var user = firebase.auth().currentUser;


    if(username.value != user.displayName) {
        user.updateProfile({
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

    if(email.value != user.email) {
        user.updateEmail(email.value)
        .then(() => {
            state.innerHTML = "Successfully changed.";
            state.style.color = "lightgreen";
        })
        .catch((error) => {
            state.innerHTML = error;
            state.style.color = "red";
        });
    }

    database.ref("users/"+user.uid).set({
        'displayName': username.value,
        'email': email.value
    });
}

function changeProfileImage(event)
{
    var file_ = event.target.files[0];
    var user = firebase.auth().currentUser;

    firebase.storage().ref("profile-images").child(user.uid+".jpg").put(file_)
    .then(() => {
        user.updateProfile({
            'photoURL': user.uid+".jpg"
        });
        console.log("saved!");
        firebase.storage().ref("profile-images").child(user.photoURL).getDownloadURL()
        .then((url) => {
            image.src = url;
            document.getElementById("profile-image").src = url;
        });
    })
    .catch((error) => {
        console.log(error);
    });
}
