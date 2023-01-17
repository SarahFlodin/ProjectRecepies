function getDishes() {
    //value är beroende på vilken knapp som trycks på (vilket värde som är itryckt)
    let value = this.value;
    //Skapar/sparar förfrågan
    let rqst = new Request("./getRecepies.php");

    //Skickar förfrågan, hantera responsen (resourse blir alla recepten)
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            document.querySelector("#recepies").innerHTML = "";
            let filtered = resource;

            //Filterar rätterna beroende på vilket värde (från knappen) som matchar med rättens kategori
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
                //Om en användaren går att hämta från localStorage
                if (localStorage.getItem("user")) {
                    let user = JSON.parse(localStorage.getItem("user"));
                    let fav = document.createElement("div");
                    fav.classList.add("favorites");

                    //för varje användares favoriter om id matchar med någon i användarens 
                    //favoriter ska hjärtat ha klassen liked (vilket gör det ifyllt)
                    user.favorites.forEach(id => {
                        if (id == dish.id) {
                            fav.classList.add("liked");
                        }
                    });

                    fav.addEventListener("click", function (event) {
                        if (fav.classList.contains("liked")) {
                            //Detta gör att vi endast klickar på hjärtat och inte på diven som ligger direkt under
                            event.stopPropagation();
                            delete_favorite_homepage(user.userId, dish.id);
                            fav.classList.toggle("liked");

                        } else {
                            //Detta gör att vi endast klickar på hjärtat och inte på diven som ligger direkt under
                            event.stopPropagation();
                            fav.classList.toggle("liked");

                            fav.id = dish.id;

                            //Sparar alla objekt/nycklar i en variabel
                            post_favorite = {
                                dishId: dish.id,
                                userId: user.userId
                            }
                            //Skapar en ny förfrågan för att lägga till en favorit i användarens favoritArray
                            let request = new Request("./addFavorite.php", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(post_favorite)
                            });
                            //Skickar förfrågan, omvandlar svar, resourse hanterad och läggs till i localStorage
                            //Samt hjärtat får klassen liked så att hjärtat är ifyllt
                            fetch(request)
                                .then(r => r.json())
                                .then(resource => {
                                    localStorage.setItem("user", JSON.stringify(resource));
                                    fav.classList.add("liked");
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

//Tar bort favoriter med parameterna som skickas med från funktionsanropet
function delete_favorite_homepage(id, dishId) {
    //Skapar en förfrågan
    let request = new Request("./deleteFavorite.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: id,
            dishId: dishId
        }),
    });
    //Skickar förfrågan, omvandlar svar och lägger resursen i localStorage 
    //(resursen uppdaterar favoritArrayen, borttagen favorit är borta)
    fetch(request)
        .then(r => r.json())
        .then(resource => {
            localStorage.setItem("user", JSON.stringify(resource));
        });
}

getDishes();
