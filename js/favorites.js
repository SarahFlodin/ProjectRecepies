"use strict"

let id = 1;

function getFavorites () {
    let rqst = new Request("./getUser.php");
    fetch(rqst)
    .then(r => r.json())
    .then(users => {
        users.forEach(user => {
            if (id == user.userId) {
                fetch("./dishes.json")
                .then(r => r.json())
                .then(dishes => {
                    dishes.forEach(dish => {
                        user.favorites.forEach(favorite => {
                            if (dish.id == favorite) {
                                let div = document.createElement("div");
                                div.classList.add("smallDishes");


                                document.querySelector("#recepies").append(div);
                                div.innerHTML = `
                                <h3 class="dish-name">${dish.name} - ${dish.time} min</h3>
                                <p class="dish-info">${dish.info}</p>
                                <div class="img-tape img-tape--1">
                                    <img src="${dish.pictureurl}" alt="bild på ${dish.name}" class="dish-img">
                                </div>
                                `;
                            }
                        })
                    })
                })
            }
        })
    });
}

getFavorites();