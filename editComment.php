<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$comments = [];

if (file_exists("./JSON/comments.json")) {
    $json = file_get_contents("./JSON/comments.json");
    $comments = json_decode($json, true);
}

$requestJson = file_get_contents("php://input");
$requestData = json_decode($requestJson, true);

if ($requestMethod == "PATCH") {
   
    $commentId = $requestData["commentId"];
    $message = $requestData["message"];

   if(isset($requestData["commentId"], $requestData["message"])){

    if($message == ""){
        $error = ["error" => "Du måste fylla i fältet!"];
        sendStatus($error, 406);
    }

        foreach($comments as $id => $comment) {
            if($comment["commentId"] == $commentId) {
                $comment["message"] = $message;
                $comments[$id] = $comment;
                
                $json = json_encode($comments, JSON_PRETTY_PRINT);
                file_put_contents("./JSON/comments.json", $json);
                sendStatus($comment);
            }
        }
    }

    $error = ["error" => "Not Found"];
    sendStatus($error, 404);

}

?>