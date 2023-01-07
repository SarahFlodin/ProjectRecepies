function get_comment() {

    document.querySelector("#commentDiv").innerHTML = "";

    let locationArray = location.href.split("?");
    let idString = locationArray[1];
    let idArray = idString.split("=");
    let id = idArray[1];

    let rqst = new Request(`./getComments.php?id=${id}`);
    fetch(rqst)
        .then(r => r.json())
        .then(comment => {
            comment.forEach(comment => {
                buildComments(comment);
            })
            if (comment.length == 0) {
                document.querySelector("#commentDiv").innerHTML = `
                <p>Det finns inga kommentater än!</p>
                `;
                ///FIXA så att den försvinner om man lägger till en kommentar efteråt
            }
        })

};


get_comment();
// function getUserName () {
//     fetch("user.json")
//         .then(r => r.json())
//         .then(users => {
//             users.forEach(user => {          
//                 buildComments(user);
//             })
//         })
// }


function buildComments(comment) {

    //Hämta alla användare
    //om jag hämtar via local storage har alla kommentarer samma namn
    let commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    document.querySelector("#commentDiv").append(commentDiv);


    //TO DO: koppla userid med username
    //behöver först koppla/hitta den user
    //som har samma userId(user.json) som 
    //userId(comment.json) sen hämta namnet
    //därifrån
    commentDiv.innerHTML += `
            <h3>${comment.userId}</h3>
            <p>${comment.message}</p>
            `;


    if (localStorage.getItem("userId") == comment.userId) {
        let buttons = document.createElement("div");
        buttons.classList.add("commentButtons");

        let edit = document.createElement("button");
        edit.classList.add("edit");
        edit.innerHTML = "Redigera kommentar";
        edit.addEventListener("click", function () {

            let save = document.createElement("button");
            save.classList.add("save");
            save.innerHTML = "Spara redigerad kommentar";

            commentDiv.innerHTML = `
            <h3>${comment.userId}</h3>
            <p>${comment.message}</p>
            <input id="save" type="text" placeholder="Redigera din kommentar...">`;


            commentDiv.append(save);
            let input = document.querySelector("#save").value;
            if(input.length > 0){
                save.addEventListener("click", edit_comment(comment.commentId));
            }
            

        });
        buttons.append(edit);

        let takeAway = document.createElement("button");
        takeAway.classList.add("takeAway");
        takeAway.innerHTML = "Radera kommentar";
        takeAway.addEventListener("click", function () {
            delete_comment(comment.commentId);

        });
        buttons.append(takeAway);

        commentDiv.append(buttons);
    }

}

//Problem med att edit comments

function edit_comment(commentId) {

    let editedMessage = document.querySelector("#save").value;
    

    //först ändra till ett input field sen skicka med message därifrån


    edit_message = {
        message: editedMessage,
        commentId: commentId,
    }

    let rqst = new Request("./editComment.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit_message)
    });
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            console.log(resource)
            //get_comment();
        })
}

function delete_comment(commentId) {
    delete_message = {
        commentId: commentId,
    }

    let rqst = new Request("./deleteComment.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(delete_message)
    });
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            console.log(resource)
            get_comment();
        })
}

let button = document.querySelector("#commentButton");
button.addEventListener("click", function () {
    if (localStorage.length > 0) {
        comments_input();
    } else if (localStorage.length == 0) {
        login();
    }
});

function comments_input() {
    let message = document.querySelector("#commentInput").value;
    let userId = window.localStorage.getItem("userId");

    let locationArray = location.href.split("?");
    let idString = locationArray[1];
    let idArray = idString.split("=");
    let id = idArray[1];

    make_comment = {
        userId: parseInt(userId),
        message: message,
        dishId: parseInt(id),
    }

    //att den endast ska skickas om jag trycker på skicka

    let rqst = new Request("./createComment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(make_comment)
    });
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {

            console.log(resource);
            get_comment();
        })
    document.querySelector("#commentInput").value = "";




}
