//Skaka fram random maträtt

let panicButton = document.querySelector("#panic");

//klickevent på knappen som kallar på get_random_dish
panicButton.addEventListener("click", get_random_dish);

function get_random_dish() {

    //Skickar en request till servern om hela JSON dishes
    fetch("./JSON/dishes.json")
        //Vänta på responsen innan vi gör om den till JSON objekt
        .then(r => r.json())
        //När responsen är omgjort så har vi en resource som innehåller alla rätter
        .then(resource => {
            //Math.random är en fuktion som tar fram ett random nummer av längden av hur många 
            //rätter vi har + 1 för att inte ha risken att hamna på siffran 0 (Då ingen rätt har id = 0). 
            //Math.floor avrundar denna siffra neråt vid decimaler.
            let rand = Math.floor(Math.random() * resource.length + 1);
            console.log(rand);
            //Skickar oss till random rätt via href och använder oss av varibeln rand för att definera idt.
            location.href = `./recepies.html?id=${rand}`;
        });
}