<?php

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if (file_exists("dishes.json")) {
    $json = file_get_contents("dishes.json");
    $recepies = json_decode($json, true);
}

if($requestMethod == "GET"){
    if(isset($_GET["id"])){
        $id = $_GET["id"];

        foreach($recepies as $recepie){
            if($recepie["id"] == $id){
                sendStatus($recepie);
            }
        }
        $error = ["error" => "Sorry! no recepies found with the id ${id}, please try again!"];
        sendStatus($error, 404);

    }
  sendStatus($recepies);
}

?>  