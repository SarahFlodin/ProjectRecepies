"use strict"

function getFavorites () {
    let rqst = new Request("./getUser.php");
    fetch(rqst)
    .then(r => r.json())
    .then(user => {
        console.log(user);
    });
}

getFavorites();