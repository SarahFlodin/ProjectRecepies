function getDishes(){
    let value = this.value;
    let rqst = new Request("./getRecepies.php");
    fetch(rqst)
    .then( r => r.json())
    .then(resource => {
        document.querySelector("#recepies").innerHTML = "";
        let filtered = resource;
        if (value){
           filtered = resource.filter(dish => dish.category == value) 
        }

        let favoriteId = localStorage.getItem("favorites");

        console.log(favoriteId);
        
        filtered.forEach(dish => {
            let div = document.createElement("div");
            div.classList.add("smallDishes");

            div.addEventListener("click", function(){
                location.href = `./recepies.html?id=${dish.id}`;
                
            });
            
            //div.setAttribute("id", `${dish.id}`)

            document.querySelector("#recepies").append(div);
            //TO DO:
            //hjärta och rating
            //bild på klocka bredvid tiden
            div.innerHTML=`
            <h3 class="dish-name">${dish.name} - ${dish.time} min</h3>
            <p class="dish-info">${dish.info}</p>
            <div class="img-tape img-tape--1">
                <img src="${dish.pictureurl}" alt="bild på ${dish.name}" class="dish-img">
            </div>
            `;

            if (localStorage.getItem("userId")) {
                let fav = document.createElement("div");
                fav.classList.add("favorites");

                fav.addEventListener("click", function(event){
                event.stopPropagation();
                fav.classList.toggle("liked");

                fav.id = dish.id;
                //console.log(dish.id);

                let userId = localStorage.getItem("userId");
                
                post_favorite = {
                    dishId: dish.id,
                    userId: userId
                }

                let request = new Request("./addFavorite.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(post_favorite)
                });
                fetch(request)
                    .then(r => r.json())
                    .then(resource => {
                        console.log(resource);
                    })
            });
               div.append(fav); 
               
            }
            
            // document.querySelectorAll(".favorites").map(fav => {
            //     fav.addEventListener("click", liked);
            // });

            //let dishDiv = document.querySelectorAll(".smallDishes");

            //dishDiv.forEach(div => div.addEventListener("click", function () {
            //    sendToDish(dish.id);
            //    console.log();
            //}))

            //div.addEventListener("click", sendToDish)
            //console.log(sendToDish);
            // return div;
        });
    });
}

let filteredButtons = document.querySelectorAll(".filterButton")
// console.log(filteredButtons);

filteredButtons.forEach(button => button.addEventListener("click", getDishes));

//function sendToDish (dishId) {
    //document.querySelector(".smallDishes").onclick = function () {
        //sessionStorage.setItem("dishId", dishId);
        //location.href = "recepies.html"
    //}
//}


getDishes();

    //     dish.pictureurl
    //     dish.rating
    //     button = heart
        
    //     div.selector(“.heart”).addEventListener(“click”, event_likedDish)
    //     function event_likedDish () {
    //     likedDish(element.id)
    //     if (inloggad > inte inloggad)
    //     rätten blir likead och tillagd i favoriter
    //     }
        
    //     div.selector(“.heart”).addEventListener(“click”, event_unlikedDish)
    //     function event_unlikedDish () {
    //     unlikedDish(element.id)
    //     if (inloggad < inte inloggad)
    //     syns inga gilla-markeringar
    //     går inte att klicka på
    //     öppnas en inloggning
    //     }
    //     }