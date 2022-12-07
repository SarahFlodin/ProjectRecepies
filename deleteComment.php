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

if ($requestMethod == "DELETE") {

    $commentId = $requestData["commentId"];

    if (!isset($commentId)) {
        $error = ["error" => "Bad Request"];
        sendStatus($error, 400);
    }

    foreach($comments as $number => $comment) {
        if ($comment["commentId"] == $commentId) {
            array_splice($comments, $number, 1);
            $json = json_encode($comments, JSON_PRETTY_PRINT);
            file_put_contents("comments.json", $json);
            sendStatus($commentId);
        }
    }

    $error = ["error" => "Not Found"];
    sendStatus($error, 404);
}