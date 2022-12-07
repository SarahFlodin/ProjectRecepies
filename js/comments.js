function get_comments(){
    const rqst  = new Request("./getComments.php");
    fetch(rqst)
    .then(r => r.json())
    .then(resource => {
        resource.forEach(comment => {
            let div = document.createElement("div");
            document.querySelector("body").appendChild(div);
           //TO DO: ändra userId till username,
           //behöver först koppla/hitta den user
           //som har samma userId(user.json) som 
           //userId(comment.json) sen hämta namnet
           //därifrån
            div.innerHTML = `
            <h3>${comment.userId}</h3>
            <h3>${comment.date.year}-${comment.date.month}-${comment.date.day}</h3>
            <p>${comment.message}</p>`;
        })
    })
}

get_comments();
