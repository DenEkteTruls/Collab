
var state = document.getElementById("status");
var database = firebase.database();


function register()
{
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        console.log(userCredential);
        userCredential.user.updateProfile({
            "displayName": username.value
        });
        database.ref("users/"+userCredential.user.uid).set({
            'displayName': username.value,
            'email': userCredential.user.email
        });
        window.setTimeout(() => {
            window.location.replace("index.html");
        }, 500);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        state.style = "color: red;";
        state.innerHTML = errorMessage;
    });
}