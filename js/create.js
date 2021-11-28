
var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
  
    } else {
        window.location.replace("index.html");
    }
  });
  