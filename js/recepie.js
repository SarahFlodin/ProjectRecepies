function buildDish(dish){

    //TO DO: koppla till förstasidan :)
    let dishResult = document.querySelector("#wrapper");
    let dishIntroduction = document.createElement("div");
    dishIntroduction.classList.add("dishIntroduction");
    dishResult.append(dishIntroduction);
        
    dishIntroduction.innerHTML = `
    <h1>${dish.name}</h1>
    <p>${dish.time}  ${dish.price}</p>
    <p>${dish.info}</p>
    `;

    let dishIngredients = document.createElement("div");
    dishIngredients.classList.add("dishIngredients");
    dishResult.append(dishIngredients);
        
    dishIngredients.innerHTML =`
    <h1>Ingredienser</h1>
    <p>${dish.ingridients}</p>
    `;

    let dishTodo = document.createElement("div");
    dishTodo.classList.add("dishTodo");
    dishResult.append(dishTodo);
        
    dishTodo.innerHTML =`
    <h1>Gör såhär:</h1>
    <p>${dish.todo}</p>
    `;
    
    let dishAllergies = document.createElement("div");
    dishAllergies.classList.add("dishAllergies");
    dishResult.append(dishAllergies);
        
    dishAllergies.innerHTML =`
    <h1>Allergener</h1>
    <p>${dish.allergies}</p>
    `;
    
}

 //buildDish();
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