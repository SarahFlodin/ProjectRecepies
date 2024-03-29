
//Tar oss tillbaka till startsidan med url
function back() {
    window.location.href ="./index.html";
}

function buildHeader() {
    if (localStorage.length == 0) {
        let headerDiv = document.querySelector("header");
        let header = document.createElement("div");
        header.classList.add("headerdiv");

        headerDiv.append(header);

        let headerPic = document.createElement("img");
        headerPic.src = "./images/header.png";
        headerPic.classList.add("headerPic");
        header.append(headerPic);

        document.querySelector(".headerPic").addEventListener("click", function () {
            location.href = "./index.html";
        });

        let userLoggo = document.createElement("div");
        userLoggo.classList.add("userLoggo");
        header.append(userLoggo);
        userLoggo.innerHTML = `
            <img src="./images/userloggo.png" alt="green loggo" width="100px" height="100px">
        `;

        document.querySelector(".userLoggo").addEventListener("click", function () {
            login();
        });

        //Detta ska hända om du är inloggad
    } else if (localStorage.length > 0) {
        let headerDiv = document.querySelector("header");
        let header = document.createElement("div");
        header.classList.add("headerdiv");

        headerDiv.append(header);

        let headerPic = document.createElement("img");
        headerPic.src = "./images/header.png";
        headerPic.classList.add("headerPic");
        header.append(headerPic);

        document.querySelector(".headerPic").addEventListener("click", function () {
            location.href = "./index.html";
        });

        let div = document.createElement("div");
        div.classList.add("loggOut");
        document.querySelector(".headerdiv").append(div);
        div.innerHTML = `
            <img src="./images/loggout.png" alt="LogOut Button" width="40px" height="40px">
        `;

        document.querySelector(".loggOut").addEventListener("click", function () {
            window.localStorage.clear();
            location.href = "./index.html";
        });

        let userLoggo = document.createElement("div");
        userLoggo.classList.add("userLoggo");
        header.append(userLoggo);
        userLoggo.innerHTML = `
            <img src="./images/loggoactive.png" alt="green loggo" width="100px" height="100px">
        `;
        userLoggo.style.cursor = "default";
        addHeart();
    }

}

//Bygger favorithjärtat
function addHeart() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    let id = user.userId;
    if (id > 0) {
        let div = document.createElement("div");
        div.classList.add("favoritesLoggo");
        document.querySelector(".headerdiv").append(div);
        div.innerHTML = `
        <img src="./images/heartloggo.png" alt="green loggo" width="100px" height="100px">
        `

        document.querySelector(".favoritesLoggo").addEventListener("click", function () {
            location.href = "./favorites.html";
        })
    }
}

//Bygger logga in popup
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
    <input id ="password" type="password">
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


function getUser(event) {
    event.preventDefault(); //Glömde tas bort, påverkar inget
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
                document.querySelector("#errorMessage2").style.fontSize = "11px", height = "8px";
                document.querySelector("#errorMessage2").innerHTML = `${resource.error}</p>`;
            } else {
                let user = resource.userName;
                console.log(`Användaren ${user} är inloggad!`);
                document.querySelector(".overlay").style.display = "none";
                window.localStorage.setItem("user", JSON.stringify(resource));
                console.log(resource);
                location.reload();
            }
        })
}

//Skapar ny användare popup
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
    <input id ="newPassword" type="password">
    <p>Upprepa lösenord</p>
    <input id ="repeatPassword" type="password">
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

//Lägger till ny användare
function createUser() {

    let username = document.querySelector("#newUser").value;
    let password = document.querySelector("#newPassword").value;
    let repeatPassword = document.querySelector("#repeatPassword").value;

    // Sparar alla objekt/nycklar i en varibel
    let new_user = {
        userName: username,
        password: password,
        repeatPassword: repeatPassword,
    }
    //Skapar request till createAccount med begäran, skickar med new_user (nya användaren)
    let rqst = new Request("./createAccount.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_user)
    });
    //Skickar requesten, gör om den till json, får tillbaka resursen (nya användaren eller error meddelanden beroende på vad den får som svar)
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
                //setItem gör att vi sparar hela user i localstorage, för att detta avgör hur sidan är byggd (inloggad/utloggad)
                window.localStorage.setItem("user", JSON.stringify(resource));
                location.reload();
            }
        })
}
//Kallar på att byggaHeader
buildHeader();