function getFavorites() {
    let id = window.localStorage.getItem("userId");

    let rqst = new Request(`./getUser.php?userId=${id}`);
    fetch(rqst)
        .then(r => r.json())
        .then(user => {
            console.log(user);
            console.log(user.favorites);
            let favorites = user.favorites;
            for (let i = 0; i < favorites.length; i++) {
                let onefavorite = favorites[i];
                console.log(onefavorite);

                let request = new Request(`./getOneRecepie.php?id=${onefavorite}`);
                fetch(request)
                    .then(r => r.json())
                    .then(dish => {
                        let div = document.createElement("div");
                        div.classList.add("smallDishes");

                        div.addEventListener("click", function () {
                            location.href = `./recepies.html?id=${dish.id}`;
                        });
                        
                        let fav = document.createElement("div");
                        fav.classList.add("liked");

                        fav.addEventListener("click", function(event){
                            event.stopPropagation();

                            console.log(dish.id);

                            delete_favorite(id, dish.id);
                        });

                        document.querySelector("#recepies").append(div);
                        div.innerHTML = `
                        <h3 class="dish-name">${dish.name} - ${dish.time} min</h3>
                        <p class="dish-info">${dish.info}</p>
                        <div class="img-tape img-tape--1">
                            <img src="${dish.pictureurl}" alt="bild på ${dish.name}" class="dish-img">
                        </div>`;

                        div.append(fav); 
                        
                    })

            }
        })
}

function delete_favorite(id, dishId){

    let request = new Request("./deleteFavorite.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: id,
            dishId: dishId
        }),
    });

    fetch(request)
        .then(r => r.json())
        .then(resource => {
            getFavorites();
        });
}


getFavorites();

