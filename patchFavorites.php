<?php

ini_set("display_errors", 1);

require_once "functions.php";

$requestedMethod = $_SERVER["REQUEST_METHOD"];

$users = [];
if (file_exists("user.json")) {
    $json = file_get_contents("user.json");
    $users = json_decode($json, true);
}

$requestJson = file_get_contents("php://input");
$requestedData = json_decode($requestJson, true);

if($requestedMethod == "DELETE"){

    $dishId = $requestedData["dishId"];
    $userId = $requestedData["userId"];

    if(isset($dishId, $userId)){
       foreach($users as $user){
            if($user["userId"] == $userId){
                $favorites = $user["favorites"];
                foreach($favorites as $index => $favorite){
                    if($favorite == $dishId){
               
                        array_splice($favorites, $index, 1);
                        //var_dump($favorites);
                        $json = json_encode($users, JSON_PRETTY_PRINT);
                        file_put_contents("user.json", $json);
                        //sendStatus($favorites);
                    }
                    
                }
              
            }

        }

    }

}

       

