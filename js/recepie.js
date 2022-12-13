function getDish (dishId) {
    let rqst = new Request("./getRecepies.php");
    fetch(rqst)
    .then(r => r.json())
    .then(resource => {
        resource.forEach(dish => {
            if (dish.id == dishId) {
                console.log(dish);
            }
        })
    })
}

function getDishId () {
    if (sessionStorage.length > 0) {
        let dishId = sessionStorage.getItem("dishId");
        getDish(dishId);
        sessionStorage.clear();
    }
}

getDishId();


    //ha innanför innerHTML med
    //dish.pictureurl dish.rating button = heart
    //(samma som heartfunktionen på startsidan)
    
   /* 
    
    
    
    här får vi rendera kommentarerna för varje recept
    let dishComments = document.createElement(“div”)
    let comment = comments.json[id]
    
    en if-sats för att matcha dish-id med rätt kommentarer
    
    dishComments.classList = “comments-container”
    dishComments.setAttribute(“id”, ´${comment.id}´);
    dishComments.innerHTML = ‘
    
    ${comment.user}
    
    ${datum för kommentaren}
    
    ${comment.message}
    
    }*/