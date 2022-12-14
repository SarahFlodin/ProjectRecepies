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
    <p id="errorMessage"></p>
    <p>Lösenord</p>
    <input id ="password" type="text">
    <p id="errorMessage2"></p>
    
    <button id="login">Logga in</button>
    </div>
    <p id="ifNot">Inte medlem? Skapa konto</p>
    `;
    overlay.append(exitLoggo);

    document.querySelector("#login").addEventListener("click", getUser);

    let switchToCreateAccount = document.querySelector("#ifNot");
    switchToCreateAccount.addEventListener("click", function () {
        createAccount();
    })
    console.log("hey");
}

function getUser() {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let rqst = new Request("./login.php");
    fetch(rqst)

        .then(r => r.json())
        .then(resource => {
            resource.forEach(user => {
                if (username == user.userName && password == user.password) {
                    console.log(`${user.userName} is inlogged`);
                    //eller koppla till php error
                    //få popup sidan att stängas ner
                    //else satsen fungerar inte
                } //else if (username != user.userName && password != user.password) {
                //     document.querySelector("#errorMessage2").style.fontSize = "11px";
                //     document.querySelector("#errorMessage2").innerHTML = `<p>Användaren hittas inte!</p>`;
                // }
            })
        })
}

function createAccount() {
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
    switchToCreateAccount.addEventListener("click", function () {
        login();
    })
}

buildHeader();