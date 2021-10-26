

function addUsersFromJson(filename)
{
    readFile("users.json", function(data) {
        users = JSON.parse(data);

        var people_container = document.getElementById("people-container");

        for(var [key, value] of Object.entries(users))
        {
            var user = document.createElement("div");
            var image = document.createElement("img");
            var subtext = document.createElement("p");
            var username = document.createElement("h3");
        
            user.classList.add("user");
            user.classList.add("pointer");
            user.setAttribute("onclick", "user_click('"+key.replaceAll(" ", ".").toLowerCase()+"');");
        
            image.src = value[2];
            subtext.innerHTML = String(value[0]);
            username.innerHTML = key;
        
            user.appendChild(image);
            user.appendChild(subtext);
            user.appendChild(username);
        
            people_container.appendChild(user);
        }
    });
}


function user_click(username)
{
    window.location.replace("user.html?"+username);
}


function readFile(filename, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", filename, true);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState == 4 && rawFile.status == 200) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function userSearch()
{
    var input = document.getElementById("peopleSearchInput");
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("people-container");
    var li = ul.getElementsByClassName("user");

    for(var i = 0; i < li.length; i++)
    {
        a = li[i].getElementsByTagName("h3")[0];
        var txtValue = a.textContent || a.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1) {   
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


/* ----- STARTUP ----- */

addUsersFromJson();


window.setInterval(() => {
    userSearch();
}, 100);