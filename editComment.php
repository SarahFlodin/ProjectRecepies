<?php
//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variabel
$requestMethod = $_SERVER["REQUEST_METHOD"];

//Hanterar den nya informationen och lägger den i en array
$comments = [];

//Om filen finns, hämtar användarna från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/comments.json")) {
    $json = file_get_contents("./JSON/comments.json");
    $comments = json_decode($json, true);
}

//file_get_contents(input) tillåter att läsa rawdata
$requestJson = file_get_contents("php://input");
$requestData = json_decode($requestJson, true);

//Om metoden matchar med "PATCH"
if ($requestMethod == "PATCH") {

   //Alla värden ska omvandlas och sättas i nya variablar
    $commentId = $requestData["commentId"];
    $message = $requestData["message"];

    //Om isset kan ta emot comment och meddelande så ska
   if(isset($requestData["commentId"], $requestData["message"])){

    //Om meddelandet innehåller en tom sträng så skicka error
    if($message == ""){
        $error = ["error" => "Du måste fylla i fältet!"];
        sendStatus($error, 406);
    }
        //För varje "plats" i index för kommentarerna
        foreach($comments as $id => $comment) {
            //Om kommentarens id matchar med commentId som vi klickar på
            if($comment["commentId"] == $commentId) {
                //Lägg message i commentmessage array
                $comment["message"] = $message;
                //Lägg kommentaren i rätt kommentars index
                $comments[$id] = $comment;
                
                //Omvandlar till JSON kod
                $json = json_encode($comments, JSON_PRETTY_PRINT);
                file_put_contents("./JSON/comments.json", $json);
                sendStatus($comment);
            }
        }
    }
    
    //Om isset inte tar emot commentarid och meddelande
    $error = ["error" => "Not Found"];
    sendStatus($error, 404);
}

?>