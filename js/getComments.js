function get_comment() {
    //Tömmer kommentarsdiven, så de som ligger där försvinner
    document.querySelector("#commentDiv").innerHTML = "";

    //Delar upp vår url och tar bort tecken för att göra om de till en array besående av url och id
    let locationArray = location.href.split("?");
    let idString = locationArray[1];
    let idArray = idString.split("=");
    let id = idArray[1];

    //Skapar en request till getComments med idt från url, rättens id
    let rqst = new Request(`./getComments.php?id=${id}`);
    //Skickar en request, omvandlar svar och hanterar resursen
    //Resursen är alla kommentarerna beronde på rättens id
    fetch(rqst)
        .then(r => r.json())
        .then(comment => {
            comment.forEach(comment => {
                buildComments(comment);
            })
            //Om inga kommentarer finns så skrivs det ut
            if (comment.length == 0) {
                document.querySelector("#commentDiv").innerHTML = `
                <p>Det finns inga kommentarer än!</p>
                `;

            }
        })

};
//Bygger kommentarerna var för sig (Parametern kommer från funktionsanropet)
function buildComments(comment) {
    //Sparar kommentarens användarid i en variabel
    let userId = comment.userId;
    //Skapar en förfrågan att hämta användare med efterfrågat userId 
    let rqst = new Request(`./getUser.php?userId=${userId}`);
    //Skickar förfrågan, omvandlar svar och börjar skapa kommentarer med rätt namn (resursen vi får tillbaka är användaren)
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            let profileName = resource.userName;

            let commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            document.querySelector("#commentDiv").append(commentDiv);

            commentDiv.innerHTML += `
            <h3>${profileName}</h3>
            <p>${comment.message}</p>
            `;

            //Om localStorege inte är tomt
            if (localStorage.length != 0) {

                let user = JSON.parse(window.localStorage.getItem("user"));
                let id = user.userId;
                //Om användarens id matchar med kommentarens userid, kan man redigera och ta bort kommentarer.
                if (id == comment.userId) {
                    let buttons = document.createElement("div");
                    buttons.classList.add("commentButtons");

                    let edit = document.createElement("button");
                    edit.classList.add("edit");
                    edit.innerHTML = "Redigera kommentar";
                    //Om man tycker på redigera, kommer olika alternativ fram
                    edit.addEventListener("click", function () {

                        let editbox = document.createElement("div");
                        editbox.classList.add("editButtons");

                        let save = document.createElement("button");
                        save.classList.add("save");
                        save.innerHTML = "Spara";

                        let regret = document.createElement("button");
                        regret.classList.add("regret");
                        regret.innerHTML = "Ångra";

                        commentDiv.innerHTML = `
                        <h3>${profileName}</h3>
                        <textarea id="saveEdit" type="text">${comment.message} </textarea>
                        <p id="errorMessage5"></p>`;

                        commentDiv.append(editbox);

                        editbox.append(regret);
                        regret.addEventListener("click", get_comment);

                        editbox.append(save);
                        save.addEventListener("click", function () {
                            edit_comment(comment.commentId);
                        })
                    });

                    buttons.append(edit);

                    let takeAway = document.createElement("button");
                    takeAway.classList.add("takeAway");
                    takeAway.innerHTML = "Radera kommentar";
                    takeAway.addEventListener("click", function () {
                        delete_comment(comment.commentId, commentDiv);

                    });

                    buttons.append(takeAway);
                    commentDiv.append(buttons);
                }
            }
        });
}

//Redigera kommentar, parametern skickas med vid funktionsanrop
function edit_comment(commentId) {
    let editedInput = document.querySelector("#saveEdit").value;

    //Sparar objekt/nycklar i en varibel
    edit_message = {
        message: editedInput,
        commentId: commentId,
    }

    //Skapar förfrågan till editComment
    let edited_comment = new Request("./editComment.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit_message)
    });
    //Skickar förfrågan, omvandlar svar, resursen hanteras
    fetch(edited_comment)
        .then(r => r.json())
        .then(resource => {
            //Om resursen kommer tillbaka med ett objekt innehållandes error
            if (resource.error) {
                document.querySelector("#errorMessage5").style.fontSize = "11px", height = "8px";
                document.querySelector("#errorMessage5").innerHTML = `${resource.error}</p>`;
            //Annars om objektet kommer tillbaka utan error (Kommer tillbaka med ett objekt på nya kommentaren)
            } else {
                get_comment();
            }

        });
}

//Tar bort kommentar med parameterna som skickas med från funktionsanropet
function delete_comment(commentId, comment) {
    console.log(commentId);
    delete_message = {
        commentId: commentId,
    }
    //Skapar en förfrågan
    let rqst = new Request("./deleteComment.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(delete_message)
    });

    //Skickar förfrågan, omvandlar svar
    //Sedan tar bort kommentaren vi skickar med i funktionsanropet
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {

            comment.remove();
        });
}

let button = document.querySelector("#commentButton");
button.addEventListener("click", function () {
    if (localStorage.length > 0) {
        comments_input();
    } else if (localStorage.length == 0) {
        login();
    }
});

//Anropas om det finns något i localStorage
function comments_input() {
    let message = document.querySelector("#commentInput").value;
    let user = JSON.parse(window.localStorage.getItem("user"));
    let userId = user.userId;
    
    //Delar upp vår url och tar bort tecken för att göra om de till en array besående av url och id
    let locationArray = location.href.split("?");
    let idString = locationArray[1];
    let idArray = idString.split("=");
    let id = idArray[1];

    //Sparar objekt/nycklar i en variabel
    make_comment = {
        userId: userId,
        message: message,
        dishId: parseInt(id),
    }

    //Skapar en request till createComment
    let rqst = new Request("./createComment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(make_comment)
    });
    //Skickar en request, omvandlar svar, hanterar resursen.
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            //är resursen ett objekt med error
            if (resource.error) {
                document.querySelector("#errorMessage4").style.fontSize = "11px", height = "8px";
                document.querySelector("#errorMessage4").style.color = "black";
                document.querySelector("#errorMessage4").innerHTML = `${resource.error}</p>`;
            //Är resursen ett objekt med kommentaren, även error meddelanden töms.
            } else {
                document.querySelector("#errorMessage4").innerHTML = "";
                get_comment();
            }

        });

    document.querySelector("#commentInput").value = "";
}

get_comment();
