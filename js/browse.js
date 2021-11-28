
var browse_container = document.getElementById("browse-container");

function addBrowserItems() {
    firebase.database().ref("trails").on("value", (snapshot) => {
        snapshot.forEach((snap) => {
            console.log("Topic: "+snap.key);
            snap.forEach((trail) => {
                var val = trail.val();

                var trail_ = document.createElement("div");
                var trail_left = document.createElement("div");
                var trail_right = document.createElement("div");
                var trail_user = document.createElement("div");

                var image = document.createElement("img");
                var author_image = document.createElement("img");
                var author = document.createElement("p");
                var title = document.createElement("h3");
                var topic = document.createElement("h2");

                trail_.classList.add("pointer");
                trail_.classList.add("trail");
                trail_left.classList.add("trail_left");
                trail_right.classList.add("trail_right");   
                trail_user.classList.add("trail_user");
                trail_.setAttribute("onclick", "trail_click('"+trail.key+"');");

                firebase.storage().ref("trail-images").child(trail.key+".jpg").getDownloadURL()
                .then((url) => {
                    image.src = url;
                })
                .catch((error) => {
                    firebase.storage().ref("trail-images").child("no-trail.jpg").getDownloadURL()
                    .then((url) => {
                        image.src = url;
                    })
                });

                firebase.storage().ref("profile-images").child(val.author_uid+".jpg").getDownloadURL()
                .then((url) => {
                    author_image.src = url;
                })
                .catch((error) => {
                    firebase.storage().ref("profile-images").child("no-user.png").getDownloadURL()
                    .then((url) => {
                        author_image.src = url;
                    })
                });

                author.innerHTML = val.author;
                title.innerHTML = val.title;
                topic.innerHTML = snap.key;

                trail_user.appendChild(author_image);
                trail_user.appendChild(author);

                trail_left.appendChild(image);
                trail_right.appendChild(title);
                trail_right.appendChild(trail_user);

                trail_.appendChild(trail_left);
                trail_.appendChild(trail_right);

                browse_container.appendChild(trail_);
            });
        });
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