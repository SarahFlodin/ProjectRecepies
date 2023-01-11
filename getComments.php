<?php

ini_set("display_errors", 1);

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];


if (file_exists("./JSON/comments.json")) {
    $json = file_get_contents("./JSON/comments.json");
    $comments = json_decode($json, true);
}
$comment_array = [];

if ($requestMethod == "GET") {
    if(isset($_GET["id"])){
      $id = $_GET["id"]; 

        foreach($comments as $comment){
            if($comment["dishId"] == $id){
                $comment_array[] = $comment;
                
            }
            
        }
       sendStatus($comment_array);

    }
    $error = ["error" => "Not Found"];
    sendStatus($error, 404);
}

?>