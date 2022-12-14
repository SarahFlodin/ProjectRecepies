<?php

require_once "functions.php";

$requestedMethod = $_SERVER["REQUEST_METHOD"];

$users = [];

if (file_exists("./JSON/user.json")) {
    $json = file_get_contents("./JSON/user.json");
    $users = json_decode($json, true);
}

$requestJson = file_get_contents("php://input");
$requestedData = json_decode($requestJson, true);

if($requestedMethod == "POST"){

    $dishId = $requestedData["dishId"];
    $userId = $requestedData["userId"];

    if(isset($requestedData["dishId"], $requestedData["userId"])){
        foreach($users as $number => $user){
            if($userId == $user["userId"]){
                $favorites = $user["favorites"];
                $favorites[] = $dishId;
                $updated = $favorites;
                $user["favorites"] = $updated;
                $users[$number] = $user;
                        
                $json = json_encode($users, JSON_PRETTY_PRINT);
                file_put_contents("./JSON/user.json", $json);
                sendStatus($user); 
            }
        }

    }

} 