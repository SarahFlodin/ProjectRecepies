<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

$comments = [];

if (file_exists("comments.json")) {
    $json = file_get_contents("comments.json");
    $comments = json_decode($json, true);
}

if ($requestMethod == "GET") {
    if(isset($_GET["id"])){
        $id = $_GET["id"];

        foreach($comments as $comment){
            if($comment["dishId"] == $id){
                sendStatus($comment);
            }
        }
        $error = ["error" => "Not Found"];
        sendStatus($error, 404);

    }
  sendStatus($comments);
}

?>