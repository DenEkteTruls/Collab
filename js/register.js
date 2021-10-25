

function register()
{
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
}