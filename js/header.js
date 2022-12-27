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

function login() {

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
    <p id="errorMessage2"></p>
    
    <button id="login">Logga in</button>
    </div>
    <p id="ifNot">Inte medlem? Skapa konto</p>
    `;
    overlay.append(exitLoggo);

    exitLoggo.addEventListener("click", function () {
        overlay.remove();
    })

    document.querySelector("#login").addEventListener("click", getUser);

    let switchToCreateAccount = document.querySelector("#ifNot");
    switchToCreateAccount.addEventListener("click", function () {
        overlay.remove();
        createAccount();
    })
}

function getUser() {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    get_user = {
        userName: username,
        password: password,
    }

    let rqst = new Request("./login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(get_user)
    });
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            if (resource.error) {
                console.log(resource.error);
                document.querySelector("#errorMessage2").style.fontSize = "11px", height = "8px";
                document.querySelector("#errorMessage2").innerHTML = `${resource.error}</p>`;
            } else {
                let user = resource.userName;
                console.log(`Användaren ${user} är inloggad!`);
                document.querySelector(".overlay").style.display = "none";
            }
        })

}

function createAccount() {
    let wrapper = document.querySelector("#popUp");
    let overlay = document.createElement("div");
    wrapper.append(overlay);
    overlay.classList.add("overlay2");

    let exitLoggo = document.createElement("img");
    exitLoggo.src = "./images/exit.png";
    exitLoggo.classList.add("exitLoggo2");

    overlay.innerHTML = `
    <h1>Skapa konto</h1>
    <div id ="loginInput">
    <p>Ange användarnamn</p>
    <input id ="newUser" type="text">
    <p id="errorMessage1"></p>
    <p>Ange lösenord</p>
    <input id ="newPassword" type="text">
    <p>Upprepa lösenord</p>
    <input id ="repeatPassword" type="text">
    <p id="errorMessage3"></p>
    <button id="createUser">Bli medlem</button>
    </div>
    <p id="ifNot2">Redan medlem? Logga in</p>
    `;
    overlay.append(exitLoggo);

    exitLoggo.addEventListener("click", function () {
        overlay.remove();
    })

    document.querySelector("#createUser").addEventListener("click", createUser);

    let switchToLogin = document.querySelector("#ifNot2");
    switchToLogin.addEventListener("click", function () {
        overlay.remove();
        login();
    })
}

function createUser() {

    let username = document.querySelector("#newUser").value;
    let password = document.querySelector("#newPassword").value;
    let repeatPassword = document.querySelector("#repeatPassword").value;

    let new_user = {
        userName: username,
        password: password,
        repeatPassword: repeatPassword,
    }

    let rqst = new Request("./createAccount.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_user)
    });
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            if (resource.error1) {
                console.log(resource.error1);
                document.querySelector("#errorMessage1").style.fontSize = "11px", height = "8px";
                document.querySelector("#errorMessage1").innerHTML = `${resource.error1}</p>`;
                document.querySelector("#errorMessage1").style.display = "block";
                document.querySelector("#errorMessage3").style.display = "none";
            } else if (resource.error) {
                console.log(resource.error);
                document.querySelector("#errorMessage3").style.fontSize = "11px", height = "8px";
                document.querySelector("#errorMessage3").innerHTML = `${resource.error}</p>`;
                document.querySelector("#errorMessage3").style.display = "block";
                document.querySelector("#errorMessage1").style.display = "none";
            } else {
                let user = resource.userName;
                console.log(`Användaren ${user} är tillagd!`);
                document.querySelector(".overlay2").style.display = "none";
            }
        })
}

buildHeader();