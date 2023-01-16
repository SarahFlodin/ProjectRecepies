<?php

ini_set("display_errors", 1);

//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variablel
$requestMethod = $_SERVER["REQUEST_METHOD"];

//Om filen finns, hämtar kommentarerna från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/comments.json")) {
    $json = file_get_contents("./JSON/comments.json");
    $comments = json_decode($json, true);
}
//Hanterar den nya informationen och lägger den i en array
$comment_array = [];

//Om metoder är en GET
if ($requestMethod == "GET") {
    //Om isset kan ta emot efterfrågad varibel
    if(isset($_GET["id"])){
        //Alla värden ska omvandlas och sättas i nya variablar
        $id = $_GET["id"]; 

        //För varje kommentar
        foreach($comments as $comment){
            //Om kommentarens rättid matchar med id
            if($comment["dishId"] == $id){
                //Skicka in kommentaren i den nya kommentars arrayen
                $comment_array[] = $comment;
                
            }
            
        }
       sendStatus($comment_array);

    }
    //Skicka error om isset inte uppfylls
    $error = ["error" => "Not Found"];
    sendStatus($error, 404);
}

?>