function get_comment() {
    let rqst = new Request("./getComments.php");
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            resource.forEach(comment => {


                let locationArray = location.href.split("?");
                let idString = locationArray[1];
                let idArray = idString.split("=");
                let id = idArray[1];
                // console.log(id);
                if (id == comment.dishId) {
                    console.log(comment.message);
                    buildComments(comment);
                };
            })
            
        });

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
            <h4>${comment.date.year}-${comment.date.month}-${comment.date.day}</h4>
            <p>${comment.message}</p>`;
}