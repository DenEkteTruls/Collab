
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("Logged in");
        console.log(user);
    } else {
        console.log("Not logged in");
    }
});

var state = document.getElementById("status");


function login()
{
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((user) => {
        window.location.replace("index.html");
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        state.style = "color: red;";
        state.innerHTML = errorMessage;
    });
}
