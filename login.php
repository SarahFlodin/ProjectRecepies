<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if (file_exists("user.json")) {
    $json = file_get_contents("user.json");
    $users = json_decode($json, true);
}

if($requestMethod == "GET"){

    $username = $_GET["userName"];
    $password = $_GET["password"];


    if(isset($password) && isset($username) ){
        foreach($users as $user){
            if($user["userName"] == $username && $user["password"] == $password){
                sendStatus($user);
                }
            }
            $error = ["error" => "Fälten stämmer inte överens!"];
            sendStatus($error, 400);
        }
        sendStatus($users);
}

?>