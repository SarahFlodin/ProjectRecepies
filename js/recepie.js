function getDish() {
    let locationArray = location.href.split("?");
    let idString = locationArray[1];
    let idArray = idString.split("=");
    let id = idArray[1];

    let rqst = new Request(`./getOneRecepie.php?id=${id}`);
    fetch(rqst)
        .then(r => r.json())
        .then(dish => {
            buildDish(dish);
        })

}

function buildDish(dish) {

    let dishResult = document.querySelector("#recepie");
    let dishIntroduction = document.createElement("div");
    dishIntroduction.classList.add("dishIntro");
    dishResult.append(dishIntroduction);

    dishIntroduction.innerHTML = `
    <h1>${dish.name}</h1>
    <p>Tillagningstid ca: ${dish.time} min <br> Pris för 4 portioner ca: ${dish.price} kr</p>
    <p>${dish.info}</p>
    <img src="${dish.pictureurl}" alt="bild på ${dish.name}" class="dish-img">
    `;


    let dishIngredients = document.createElement("div");
    dishIngredients.innerHTML = `<h1>Ingredienser</h1> <ul></ul>`;
    let ingredients_container = dishIngredients.querySelector("ul");
    dishIngredients.classList.add("dishIngredients");
    dishResult.append(dishIngredients);

    for (let i = 0; i < dish.ingredients.length; i++) {
        let ingredient_dom = document.createElement("li");
        ingredient_dom.innerHTML = `${dish.ingredients[i]}`;
        ingredients_container.append(ingredient_dom);
    }

    let dishTodo = document.createElement("div");
    dishTodo.classList.add("dishTodo");
    dishResult.append(dishTodo);

    dishTodo.innerHTML = `
    <h1>Gör såhär:</h1>
    <p>${dish.todo}</p>
    `;
    let group = document.createElement("div");
    group.classList.add("group");
    group.append(dishIngredients, dishTodo);
    dishResult.append(group);

    let dishAllergies = document.createElement("div");
    dishAllergies.classList.add("dishAllergies");
    dishResult.append(dishAllergies);

    dishAllergies.innerHTML = `
    <h1>Allergener</h1>
    <p>${dish.allergies}</p>
    `;

}

getDish();