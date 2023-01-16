//Bygger footer

function buildFooter() {
    let footerdiv = document.querySelector("footer");
    //Sätter datum med funktionen date som ger tillbaka nuvarande år
    let year = new Date().getFullYear();
    footerdiv.innerHTML = `
    <p>&copy; ${year}</p>
    <p>yummytummy@hotmail.com</p>`;

    //Sätter loggan
    let loggo = document.createElement("img");
    loggo.src = "./images/header.png";
    loggo.classList.add("footerLoggo");
    footerdiv.append(loggo);
}

buildFooter();
