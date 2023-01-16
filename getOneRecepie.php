<?php
//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variablel
$requestMethod = $_SERVER["REQUEST_METHOD"];


//Om filen finns hämta recepten
if (file_exists("./JSON/dishes.json")) {
    $json = file_get_contents("./JSON/dishes.json");
    $recepies = json_decode($json, true);
}

//Om metoden som används är GET
if($requestMethod == "GET"){

    //Om isset får tillbaka en variabel sätter den i en nytt varibelnamn
    if(isset($_GET["id"])){
        $id = $_GET["id"];

        //För varje recept, om receptets id matchar med en av de id vi får via get så ska det specifika receptet skickas med.
        foreach($recepies as $recepie){
            if($recepie["id"] == $id){
                sendStatus($recepie);
            }
        }
        

    }
    //Om get parametern inte innehåller id så ska den skicka ett error med en errortext att den inte hittar något recept med matchat id.
    $error = ["error" => "Sorry! no recepies found with the id ${id}, please try again!"];
    sendStatus($error, 404);
}

?>  