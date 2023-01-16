<?php

//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variabel
$requestMethod = $_SERVER["REQUEST_METHOD"];

//Hanterar den nya informationen och lägger den i en array
$comments = [];

//Om filen finns, hämtar kommentarerna från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/comments.json")) {
    $json = file_get_contents("./JSON/comments.json");
    $comments = json_decode($json, true);
}

//file_get_contents(input) tillåter att läsa rawdata
$requestJson = file_get_contents("php://input");
$requestData = json_decode($requestJson, true);

//Om metoden som används är DELETE så ska
if ($requestMethod == "DELETE") {
    
    //Alla värden ska omvandlas och sättas i nya variablar
    $commentId = $requestData["commentId"];

    //Om isset inte kan ta emot efterfrågad variabel/variabler
    //Skicka error
    if (!isset($requestData["commentId"])) {
        $error = ["error" => "Bad Request"];
        sendStatus($error, 400);
    }

    //För varje "plats" i index för kommentaren
    foreach($comments as $number => $comment) {
        //Om idt matchar med kommentarens id
        if ($comment["commentId"] == $commentId) {
            //Array_splice använder vi och tar bort den kommentaren beroende på index och tar endast bort 1 kommentar 
            array_splice($comments, $number, 1);

            //Omvandlar till JSON kod
            $json = json_encode($comments, JSON_PRETTY_PRINT);
            file_put_contents("./JSON/comments.json", $json);
            sendStatus($commentId);
        }
    }

    //Om den inte innehåller efterfrågad variabel så skickar den error meddelande
    $error = ["error" => "Not Found"];
    sendStatus($error, 404);
}