function buildDish(dish){

    dish = {
        id: 1,
        name: "Spaghetti Carbonara",
        info: "En klassisk, krämig carbonara med parmesanost, ruccola och den finaste svartpepparn! Lika god en fredagkväll tillsammans med ett gott glas vin som till lyxlunch på helgen.",
        pictureurl: "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_168478/cf_259/kramig_carbonara.jpg",
        category: "meat",
        price: 80,
        ingridients: [
            "2 förp bacon",
            "500g spaghetti",
            "riven parmesanost",
            "4 äggulor",
            "2 krm svartpeppar",
            "1 dl vispgrädde",
            "1/2 tsk salt",
            "ruccola till garnering"
        ],
        time: 20,
        todo: "Koka spaghetti enligt anvisningarna på förpackningen. Stek baconbitarna knapriga i en stekpanna. Vispa ihop ägg, grädde, parmesanost, salt och svartpeppar i en bunke. Häll av pastan och häll tillbaka den i kastrullen, vänd ner äggblandningen och det stekta baconet. Rör runt på svag värme till en krämig pasta. Till servering: Lägg upp på ett fat tillsammans med ruccolasalladen. Servera med en extra äggula och dra några extra tag med pepparkvarnen över.",
        allergies: "Innehåller ägg och mjölkprotein. Gör glutenfri: välj glutenfri pasta. Gör laktosfri: välj laktosfri grädde."
    };
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

 buildDish();
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