<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if (file_exists("user.json")) {
    $json = file_get_contents("user.json");
    $users = json_decode($json, true);
}

if ($requestMethod == "GET") {
    if(isset($_GET["userId"])) {
        $id = $_GET["userId"];

        foreach($users as $user) {
            if($user["userId"] == $id) {
                sendStatus($user);
            }
        }

        $error = ["error" => "No user found!"];
        sendStatus($error, 404);
    } 
}

?>