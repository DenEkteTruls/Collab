
var login_container = document.getElementById("login-container");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log("Logged in");
      loggedIn(user);
  } else {
      console.log("Not logged in");
      notLoggedIn();
  }
});

function getProfileImageURL(filename)
{
  firebase.storage().ref("profile-images/").child(filename).getDownloadURL()
  .then((url) => { return final_url; });
}

function loggedIn(user)
{
  login_container.innerHTML = "";
  var image = document.createElement("img");
  var username = document.createElement("h3");
  var logout = document.createElement("img");

  login_container.className = "loggedin-container";
  logout.classList.add("pointer");
  image.classList.add("pointer");
  logout.id = "logout-button";
  logout.setAttribute("onclick", "logout()");
  image.id = "profile-image";
  image.setAttribute("onclick", "window.location.replace('settings.html');");

  firebase.storage().ref("profile-images").child(user.photoURL).getDownloadURL()
  .then((url) => {
      image.src = url;
  });

  username.innerHTML = user.displayName;
  logout.src = "media/sign-out.png";

  login_container.appendChild(image);
  login_container.appendChild(username);
  login_container.appendChild(logout);
}


function notLoggedIn()
{
  login_container.innerHTML = "";
  var button1 = document.createElement("button");
  var button2 = document.createElement("button");

  login_container.className = "login-container";

  button1.className = "not-active-button pointer";
  button1.setAttribute("onclick", "window.location.replace('login.html');");
  button1.innerHTML = "Sign in";

  button2.className = "active-button pointer";
  button2.setAttribute("onclick", "window.location.replace('register.html');");
  button2.innerHTML = "Create new";

  login_container.appendChild(button1);
  login_container.appendChild(button2);
}


function logout()
{
  firebase.auth().signOut().then(() => {
    window.location.replace("index.html");
  }).catch((error) => {
    alert("Something unexpected happened.");
  });
}