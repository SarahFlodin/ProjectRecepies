function getDishes() {

    let value = this.value;
    let rqst = new Request("./getRecepies.php");

    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            document.querySelector("#recepies").innerHTML = "";
            let filtered = resource;

            if (value) {
                filtered = resource.filter(dish => dish.category == value)
            }

            filtered.forEach(dish => {
                let div = document.createElement("div");
                div.classList.add("smallDishes");

                div.addEventListener("click", function () {
                    location.href = `./recepies.html?id=${dish.id}`;

                });

                document.querySelector("#recepies").append(div);

                div.innerHTML = `
            <h3 class="dish-name">${dish.name} - ${dish.time} min</h3>
            <p class="dish-info">${dish.info}</p>
            <div class="img-tape img-tape--1">
                <img src="${dish.pictureurl}" alt="bild på ${dish.name}" class="dish-img">
            </div>
            `;

                if (localStorage.getItem("user")) {
                    let user = JSON.parse(localStorage.getItem("user"));
                    let fav = document.createElement("div");
                    fav.classList.add("favorites");

                    user.favorites.forEach(id => {
                        if (id == dish.id) {
                            fav.classList.add("liked");
                        }
                    });

                    fav.addEventListener("click", function (event) {
                        if (fav.classList.contains("liked")) {
                            event.stopPropagation();
                            delete_favorite_homepage(user.userId, dish.id);
                            fav.classList.toggle("liked");

                        } else {

                            event.stopPropagation();
                            fav.classList.toggle("liked");

                            fav.id = dish.id;

                            post_favorite = {
                                dishId: dish.id,
                                userId: user.userId
                            }

                            let request = new Request("./addFavorite.php", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(post_favorite)
                            });

                            fetch(request)
                                .then(r => r.json())
                                .then(resource => {
                                    localStorage.setItem("user", JSON.stringify(resource));
                                    fav.classList.add("liked");
                                    console.log(resource);
                                })
                        }
                    });

                    div.append(fav);

                }

            });
        });
}

let filteredButtons = document.querySelectorAll(".filterButton")
filteredButtons.forEach(button => button.addEventListener("click", getDishes));

function delete_favorite_homepage(id, dishId) {

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
        });
}

getDishes();
