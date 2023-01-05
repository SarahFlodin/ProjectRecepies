function commentBar() {
    if (localStorage.length > 0) {

    }
}

function get_comment() {

    let locationArray = location.href.split("?");
    let idString = locationArray[1];
    let idArray = idString.split("=");
    let id = idArray[1];

    let rqst = new Request(`./getComments.php?id=${id}`);
    fetch(rqst)
        .then(r => r.json())
        .then(comment => {
            console.log(comment);
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


function buildComments(comment) {
    let commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    document.querySelector("#commentDiv").append(commentDiv);

    
    //TO DO: koppla userid med username
    //behöver först koppla/hitta den user
    //som har samma userId(user.json) som 
    //userId(comment.json) sen hämta namnet
    //därifrån
    commentDiv.innerHTML = `
            <h3>${comment.userId}</h3>
            <p>${comment.message}</p>
            `;


    if (localStorage.getItem("userId") == comment.userId) {
        let buttons = document.createElement("div");
        buttons.classList.add("commentButtons");

        let edit = document.createElement("button");
        edit.classList.add("edit");
        edit.innerHTML = "Redigera kommentar";
        edit.addEventListener("click", function(){});
        buttons.append(edit);

        let takeAway = document.createElement("button");
        takeAway.classList.add("takeAway");
        takeAway.innerHTML = "Radera kommentar";
        takeAway.addEventListener("click", function(){});
        buttons.append(takeAway);

        commentDiv.append(buttons);
    }        
    
}

//   <h4>${comment.date.year}-${comment.date.month}-${comment.date.day}</h4>


let button = document.querySelector("#commentButton");
button.addEventListener("click", comments_input);

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