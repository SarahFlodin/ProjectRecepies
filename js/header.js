function buildHeader(){

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
   
    document.querySelector(".headerLoggo").addEventListener("click", function(){
        location.href ="./index.html";
    });

    document.querySelector(".userLoggo").addEventListener("click", function(){
        //senare kanske en ifsats om du redan är inloggad
        login();
    });
}

function login(){

    //TO DO: få att fungera
    let wrapper = document.querySelector("#popUp");
    let overlay = document.createElement("div");
    wrapper.append(overlay);
    overlay.classList.add("overlay");
    console.log("hey");
}

buildHeader();