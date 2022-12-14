function buildFooter(){
    let footerdiv = document.querySelector("footer");
    let year = new Date().getFullYear();
    footerdiv.innerHTML = `
    <p>${year} &copy;</p>
    <p>blabla@hotmail.com</p>`;
    

    let loggo = document.createElement("img");
    //BYT icon till en gratis
    loggo.src = "./images/loggo.png";
    loggo.classList.add("footerLoggo");
    footerdiv.append(loggo);
}

buildFooter();
