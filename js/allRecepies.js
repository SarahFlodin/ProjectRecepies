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
        
        filtered.forEach(dish => {
            let div = document.createElement("div");
            div.classList.add("smallDishes");
            div.addEventListener("click", function(){
                location.href = `./recepies.html?id=${dish.id}`;
            });
            document.querySelector("#recepies").append(div);
            //TO DO: lägg till picture url
            //& hjärta och rating
            //bild på klocka bredvid tiden
            div.innerHTML=`
            <h3 class="dish-name">${dish.name}</h3>
            <p class="dish-info">${dish.info}</p>
            <p class="time-duration">${dish.time} min</p>
            <img src="${dish.pictureurl}" alt="bild på ${dish.name}" class="dish-img">
            `;
        });
    });
}

getDishes();

let filteredButtons = document.querySelectorAll(".filterButton")
console.log(filteredButtons);

filteredButtons.forEach(button => button.addEventListener("click", getDishes));


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