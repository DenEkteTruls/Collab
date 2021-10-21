
var users_element = document.getElementById("users");

var users = {
    "Casper": 2881,
    "Marjan": 1022,
    "Layla": 992,
    "Anders": 832,
    "P.Olsen": 792,
    "Peter": 502,
    "Ola-Petter Sandberg": 22,
    "DenEkteTruls": 1
};


for(var [key, value] of Object.entries(users))
{
    var element = document.createElement("div");
    var image = document.createElement("img");
    var subtext = document.createElement("p");
    var name_ = document.createElement("h3");

    element.classList.add("user");
    element.classList.add("pointer");
    image.src = "../media/user.svg";
    subtext.innerHTML = "Catched "+String(value);
    name_.innerHTML = key;

    element.setAttribute("onclick", "click_user('"+key.replace(" ", ".").toLowerCase()+"');");

    element.appendChild(image);
    element.appendChild(subtext);
    element.appendChild(name_);

    users_element.appendChild(element);
}

function click_user(username)
{
    console.log(username);
}