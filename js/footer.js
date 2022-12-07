function buildFooter(){
    let footerdiv = document.querySelector("footer");
    let footer = document.createElement("div");
    footer.innerHTML = `
    <p>&copy;</p>

    </p>
    <p>test</p>

    `;
    document.write(new Date().getFullYear());
    footerdiv.append(footer);
}

buildFooter();
