
function addBrowserItems() {
    firebase.database().ref('users').on("value", function(snap) {
        var code = snap.val();
        console.log(code);
    });
}


function browseSearch()
{
    var input = document.getElementById("browseSearchInput");
    try { var filter = input.value.toUpperCase(); }
    catch { var filter = ""; }
    var ul = document.getElementById("browse-container");
    var li = ul.getElementsByClassName("item");

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

window.setTimeout(() => {
    addBrowserItems();
}, 1000);

window.setInterval(() => {
    browseSearch();
}, 100);