<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

$recipes = [];

if (file_exists("dishes.json")) {
    $json = file_get_contents("dishes.json");
    $recipes = json_decode($json, true);
}

if ($requestMethod == "GET") {
    if(!isset($recipes)) {
        sendStatus([], 200)
    } else {
        sendStatus($recipes);
    }
}

?>