function buildFooter(){
    let footerdiv = document.querySelector("footer");
    footerdiv.innerHTML = `
    <p>&copy;</p>
    <p>blabla@hotmail.com</p>`;
    document.write(new Date().getFullYear());

    let loggo = document.createElement("img");
    //BYT icon till en gratis
    loggo.src = "./images/loggo.png";
    loggo.classList.add("footerLoggo");
    footerdiv.append(loggo);
}

buildFooter();
