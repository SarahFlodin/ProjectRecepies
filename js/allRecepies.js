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
            <div class="favorites"> <img src="./images/heartloggoblack.png" alt="Bild på ett hjärta för favoriter" height="80px" width="80px"></div>
            `;

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