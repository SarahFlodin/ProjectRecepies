<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if (file_exists("dishes.json")) {
    $json = file_get_contents("dishes.json");
    $recepies = json_decode($json, true);
}

if($requestMethod == "GET"){
sendStatus(array_rand($recepies, 1));
        
}
?>  