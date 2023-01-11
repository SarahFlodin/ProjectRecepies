function getFavorites() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    let id = user.userId;

    let favorites = user.favorites;
    if (favorites.length > 0) {
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

                    fav.addEventListener("click", function (event) {
                        event.stopPropagation();
                        delete_favorite(id, dish.id, fav);
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
    } else {

        let noFavorites = document.createElement("div");
        noFavorites.classList.add("noFavorites");

        recepies.append(noFavorites);
    }
}

function delete_favorite(id, dishId, fav) {

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
            localStorage.setItem("user", JSON.stringify(resource));
            fav.parentElement.remove();
            if (resource.favorites.length == 0) {
                location.reload();
            }
        });

}

getFavorites();

