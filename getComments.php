<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

$comments = [];

if (file_exists("comments.json")) {
    $json = file_get_contents("comments.json");
    $comments = json_decode($json, true);
}

if ($requestMethod == "GET") {
    if(!isset($comments)) {
        sendStatus([], 200);
    } else {
        sendStatus($comments);
    }
}

?>