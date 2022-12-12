async function filterDish(category) {
    let request = new Request ("http://localhost:8888/dishes.php", {
        method: "GET", 
        body: JSON.stringify({category: category}),
        header: {"Content-Type": "application/json"}
    });
    
    const response = await fetch(request);
    const data = await response.json();
}

document.querySelector(".filterButton").addEventListener("click", filterDish);
