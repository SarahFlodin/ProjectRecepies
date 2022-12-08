function getDishes(){

    let rqst = new Request("./getRecepies.php");
    fetch(rqst)
    .then( r => r.json())
    .then(resource => {
        resource.forEach(dish => {
            let div = document.createElement("div");
            div.classList.add("smallDishes");
            document.querySelector("#recepies").append(div);
            //TO DO: lägg till picture url
            //& hjärta och rating
            //bild på klocka bredvid tiden
            div.innerHTML=`
            <h3>${dish.name}</h3>
            <p>${dish.info}</p>
            <p>${dish.time} min</p>
            `;

        });
    });
}

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