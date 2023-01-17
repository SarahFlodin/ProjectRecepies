function getFavorites() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    let id = user.userId;

    let favorites = user.favorites;
    //Om användaren har favoriter på localstorage
    if (favorites.length > 0) {
        //Loopar igenom alla favoriter beroende på hur många som finns i arrayen
        for (let i = 0; i < favorites.length; i++) {
            // Varje favorit sparas i en egen varibel
            let onefavorite = favorites[i];

            //Skapar förfrågan där vi hämtar en rätt med det favoritIdt som efterfrågas, detta görs för alla rätter i arrayen
            let request = new Request(`./getOneRecepie.php?id=${onefavorite}`);
            //Skickar förfrågan, omvandlar svar, dish är resursen som är en hel rätt, skapar rätterna
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
                        //Detta gör att vi endast klickar på hjärtat och inte på diven som ligger direkt under
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
    //Om inga favoriter kan hämtas får vi en söt bild ("Har inga favoriter")
    } else {

        let noFavorites = document.createElement("div");
        noFavorites.classList.add("noFavorites");

        recepies.append(noFavorites);
    }
}
//Tar bort favoriter med parameterna som skickas med från funktionsanropet
function delete_favorite(id, dishId, fav) {
    
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
            //Tar bort föräldern till hjärtat (vilket är hela rättens div)
            fav.parentElement.remove();
            //Om alla blir borttagna så laddar vi om sidan så att den söta bilden kan komma fram
            if (resource.favorites.length == 0) {
                location.reload();
            }
        });

}

getFavorites();

