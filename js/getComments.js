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
                <p>Det finns inga kommentarer än!</p>
                `;

            }
        })

};

function buildComments(comment) {

    let userId = comment.userId;
    let rqst = new Request(`./getUser.php?userId=${userId}`);
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

            if (localStorage.length != 0) {

                let user = JSON.parse(window.localStorage.getItem("user"));
                let id = user.userId;

                if (id == comment.userId) {
                    let buttons = document.createElement("div");
                    buttons.classList.add("commentButtons");

                    let edit = document.createElement("button");
                    edit.classList.add("edit");
                    edit.innerHTML = "Redigera kommentar";
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

function edit_comment(commentId) {
    let editedInput = document.querySelector("#saveEdit").value;

    edit_message = {
        message: editedInput,
        commentId: commentId,
    }

    let edited_comment = new Request("./editComment.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edit_message)
    });
    fetch(edited_comment)
        .then(r => r.json())
        .then(resource => {
            if (resource.error) {
                document.querySelector("#errorMessage5").style.fontSize = "11px", height = "8px";
                document.querySelector("#errorMessage5").innerHTML = `${resource.error}</p>`;
            } else {
                get_comment();
            }

        });
}

function delete_comment(commentId, comment) {
    console.log(commentId);
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

function comments_input() {
    let message = document.querySelector("#commentInput").value;
    let user = JSON.parse(window.localStorage.getItem("user"));
    let userId = user.userId;

    let locationArray = location.href.split("?");
    let idString = locationArray[1];
    let idArray = idString.split("=");
    let id = idArray[1];

    make_comment = {
        userId: userId,
        message: message,
        dishId: parseInt(id),
    }

    let rqst = new Request("./createComment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(make_comment)
    });
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            if (resource.error) {
                document.querySelector("#errorMessage4").style.fontSize = "11px", height = "8px";
                document.querySelector("#errorMessage4").style.color = "black";
                document.querySelector("#errorMessage4").innerHTML = `${resource.error}</p>`;
            } else {
                document.querySelector("#errorMessage4").innerHTML = "";
                get_comment();
            }

        });

    document.querySelector("#commentInput").value = "";
}

get_comment();
