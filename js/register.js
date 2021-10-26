
var state = document.getElementById("status");


function register()
{
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        userCredential.updateProfile({
            "displayName": username.value,
            "photoURL": "no-user.png"
        });
        window.location.replace("index.html");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        state.style = "color: red;";
        state.innerHTML = errorMessage;
    });
}


