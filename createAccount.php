<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

$users = [];

if (file_exists("user.json")) {
    $json = file_get_contents("user.json");
    $users = json_decode($json, true);
}

$requestData = file_get_contents("php://input");
$_POST = json_decode($requestData, true);


if($requestMethod == "POST"){

    $newUsername = $_POST["userName"];
    $newPassword = $_POST["password"];
    $repeatedNewPassword = $_POST["repeatPassword"];

    if(!isset($_POST["userName"], $_POST["password"], $_POST["repeatPassword"])){
        $error = ["error" => "Fyll i alla fält!"];
        sendStatus($error, 406);
     } elseif($newUsername == ""){
        $error1 = ["error1" => "Fyll i fältet!"];
        sendStatus($error1, 406);
     } elseif($repeatedNewPassword != $newPassword){
        $error = ["error" => "Lösenordet matchar inte."];
        sendStatus($error, 406);
    } elseif(strlen($newPassword) < 6 ){
        $error = ["error" => "Lösenordet ska vara minst 6 tecken."];
        sendStatus($error, 406);
    } elseif(count(explode(' ', $newUsername)) > 1) {
        $error1 = ["error1" => " Användarnament kan inte innehålla blankspace."];
        sendStatus($error1, 406);
    }

    $newId = 0;

    foreach($users as $user){

        if($user["userId"] > $newId){
            $newId = $user["userId"];
        }
    }

    foreach($users as $user){
            
        if(($newUsername == $user["userName"])){
            $error1 = ["error1" => "Användarnamnet är upptaget."];
            sendStatus($error1, 409);
        }
    }

    $userId = $newId + 1;
    $newUser = ["userId" => $userId, "userName" => $newUsername, "password" => $newPassword, "favorites" => []];
    $users[] = $newUser;
    $json = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents("user.json", $json);
    sendStatus($newUser);

}

?>