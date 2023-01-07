<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$favorites = [];

if (file_exists("user.json")) {
    $json = file_get_contents("user.json");
    $favorites = json_decode($json, true);
}

$requestJson = file_get_contents("php://input");
$requestData = json_decode($requestJson, true);

if ($requestMethod == "DELETE") {
    
    $favoritesNum = $requestData["favorites"];

    if (!isset($favoritesNum)) {
        $error = ["error" => "Bad Request"];
        sendStatus($error, 400);
    }

    foreach($favorites as $favorite) {
        if($favorite["favorites"] == $favoritesNum) {
            array_splice($favorites, 1);
            $json = json_encode($favorites, JSON_PRETTY_PRINT);
            file_put_contents("user.json", $json);
            sendStatus($favoritesNum);
        }
    }

    $error = ["error" => "Not Found"];
    sendStatus($error, 404);
}