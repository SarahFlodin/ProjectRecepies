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
    let div = document.createElement("div");
    document.querySelector("#commentDiv").append(div);
    //TO DO: koppla userid med username
    //behöver först koppla/hitta den user
    //som har samma userId(user.json) som 
    //userId(comment.json) sen hämta namnet
    //därifrån
    div.innerHTML = `
            <h3>${comment.userId}</h3>
            <h3>${comment.date.year}-${comment.date.month}-${comment.date.day}</h3>
            <p>${comment.message}</p>`;
}