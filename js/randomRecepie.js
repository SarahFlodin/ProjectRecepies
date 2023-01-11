let panicButton = document.querySelector("#panic");
panicButton.addEventListener("click", get_random_dish);


function get_random_dish() {
    fetch("./JSON/dishes.json")
        .then(r => r.json())
        .then(resource => {
            let rand = Math.floor(Math.random() * resource.length + 1);
            console.log(rand);
            location.href = `./recepies.html?id=${rand}`;
        });
}