

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("Logged in");
        console.log(user);
    } else {
        console.log("Not logged in");
    }
});

var state = document.getElementById("status");

function register()
{
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        userCredential.updateProfile({
            "displayName": username.value
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        state.style = "color: red;";
        state.innerHTML = errorMessage;
    });
}