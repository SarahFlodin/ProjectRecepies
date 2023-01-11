<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

$recipes = [];

if (file_exists("./JSON/dishes.json")) {
    $json = file_get_contents("./JSON/dishes.json");
    $recipes = json_decode($json, true);
}

if ($requestMethod == "GET") {
    sendStatus($recipes);
}

?>