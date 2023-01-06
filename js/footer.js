function buildFooter(){
    let footerdiv = document.querySelector("footer");
    let year = new Date().getFullYear();
    footerdiv.innerHTML = `
    <p>&copy; ${year}</p>
    <p>yummytummy@hotmail.com</p>`;
    

    let loggo = document.createElement("img");
    //BYT icon till en gratis
    loggo.src = "./images/header.png";
    loggo.classList.add("footerLoggo");
    footerdiv.append(loggo);
}

buildFooter();
