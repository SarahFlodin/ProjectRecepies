<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if (file_exists("user.json")) {
    $json = file_get_contents("user.json");
    $users = json_decode($json, true);
}

$requestData = file_get_contents("php://input");
$_POST = json_decode($requestData, true);

if($requestMethod == "POST"){

    $username = $_POST["userName"];
    $password = $_POST["password"];


    if(isset($password, $username) ){
        foreach($users as $user){
            if($user["userName"] == $username and $user["password"] == $password){
                sendStatus($user);
            }
        }
           
    } 
    $error = ["error" => "Användaren hittas inte!"];
    sendStatus($error, 400);
}
?>