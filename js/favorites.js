"use strict"

function getFavorites () {
    let rqst = new Request("./getUser.php");
    fetch(rqst)
    .then(r => r.json())
    .then(resource => {
        resource.forEach(user => {
            
        })
    });
}

getFavorites();