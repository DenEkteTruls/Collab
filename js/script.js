
function try_now()
{
    var uname = document.getElementById("get-started-text").value;
    window.location.replace("collab_join.html?"+uname.replace(" ", "."));
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



var registered_users = document.getElementById("registered-users");

readFile("users.json", function(data) {
    users = JSON.parse(data);

    registered_users.innerHTML = Object.keys(users).length;
});