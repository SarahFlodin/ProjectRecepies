function buildHeader() {

    let headerDiv = document.querySelector("header");
    let header = document.createElement("div");
    header.classList.add("headerdiv");

    headerDiv.append(header);

    let loggo = document.createElement("img");
    loggo.src = "./images/loggo.png";
    loggo.classList.add("headerLoggo");
    header.append(loggo);
    let userLoggo = document.createElement("img");
    userLoggo.src = "./images/userloggo.png";
    userLoggo.classList.add("userLoggo");
    header.append(userLoggo);

    let favoritesLoggo = document.createElement("img");
    favoritesLoggo.src = "./images/heartloggo.png";
    favoritesLoggo.classList.add("favoritesLoggo");
    header.append(favoritesLoggo);

    //TO DO: Lägg till namnet på sidan

    document.querySelector(".headerLoggo").addEventListener("click", function () {
        location.href = "./index.html";
    });

    document.querySelector(".userLoggo").addEventListener("click", function () {
        //senare kanske en ifsats om du redan är inloggad
        login();
    });

    document.querySelector(".favoritesLoggo").addEventListener("click", function () {
        location.href = "./favorites.html";
    })
}

//TO DO: fix exit
//bigger overlay with skapa konto

function login() {

    //TO DO: få att fungera
    let wrapper = document.querySelector("#popUp");
    let overlay = document.createElement("div");
    wrapper.append(overlay);
    overlay.classList.add("overlay");

    let exitLoggo = document.createElement("img");
    exitLoggo.src = "./images/exit.png";
    exitLoggo.classList.add("exitLoggo");
    
    overlay.innerHTML = `
    <h1>Logga in</h1>
    <div id ="loginInput">
    <p>Användarnamn</p>
    <input id ="username" type="text">
    <p>Lösenord</p>
    <input id ="password" type="text">
    
    <button id="login">Logga in</button>
    </div>
    <p id="ifNot">Inte medlem? Skapa konto</p>
    `;
    overlay.append(exitLoggo);

    let switchToCreateAccount = document.querySelector("#ifNot");
    switchToCreateAccount.addEventListener("click", function(){
        createAccount();
    })
    console.log("hey");
}

function createAccount(){
    let wrapper = document.querySelector("#popUp");
    let overlay = document.createElement("div");
    wrapper.append(overlay);
    overlay.classList.add("overlay");

    let exitLoggo = document.createElement("img");
    exitLoggo.src = "./images/exit.png";
    exitLoggo.classList.add("exitLoggo");
    
    overlay.innerHTML = `
    <h1>Skapa konto</h1>
    <div id ="loginInput">
    <p>Ange användarnamn</p>
    <input id ="username" type="text">
    <p>Ange lösenord</p>
    <input id ="password" type="text">
    <p>Upprepa lösenord</p>
    <input id ="repeatPassword" type="text">
    <button id="login">Bli medlem</button>
    </div>
    <p id="ifNot">Redan medlem? Logga in</p>
    `;
    overlay.append(exitLoggo);

    let switchToCreateAccount = document.querySelector("#ifNot");
    switchToCreateAccount.addEventListener("click", function(){
        login();
    })
}

buildHeader();