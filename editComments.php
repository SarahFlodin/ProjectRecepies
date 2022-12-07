<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$comments = [];

if (file_exists("comments.json")) {
    $json = file_get_contents("comments.json");
    $comments = json_decode($json, true);
}

$requestJson = file_get_contents("php://input");
$requestData = json_decode($requestJson, true);

if ($requestMethod == "PATCH") {
   
    $commentId = $requestData["commentId"];
    $message = $requestData["message"];
    $userId = $requestData["userId"];

   if(isset($userId, $commentId, $message)){

        foreach($comments as $id => $comment) {
            if($comment["commentId"] == $commentId) {
                $comment["message"] = $message;
                $comments[$id] = $comment;
                //TO DO: Fixa så att datum visas och
                //ändrar sig,
                //Ska vi ha något som visar på att den
                //är redigerad?
                //Typ någon kommentar på kommentaren
                //som säger att den är edited
                
                $json = json_encode($comments, JSON_PRETTY_PRINT);
                file_put_contents("comments.json", $json);
                sendStatus($comment);
            }
        }
    }

    $error = ["error" => "Not Found"];
    sendStatus($error, 404);

}

?>