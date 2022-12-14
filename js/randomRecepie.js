let panicButton = document.querySelector("#panic");
panicButton.addEventListener("click", get_random_dish);

function get_random_dish(){
    fetch("./getRandomRecepie.php")
    .then(r => r.json())
    .then(resource => {
        location.href = `./recepies.html?id=${resource}`;
    });
    
}