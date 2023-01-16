<?php

//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variabel
$requestedMethod = $_SERVER["REQUEST_METHOD"];

//Hanterar den nya informationen och lägger den i en array
$users = [];

//Om filen finns, hämtar recepten från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/user.json")) {
    $json = file_get_contents("./JSON/user.json");
    $users = json_decode($json, true);
}

//file_get_contents(input) tillåter att läsa rawdata
$requestJson = file_get_contents("php://input");
$requestedData = json_decode($requestJson, true);

//Om metoden är POST
if($requestedMethod == "POST"){

    //Sparar in översatt data i nya variablar
    $dishId = $requestedData["dishId"];
    $userId = $requestedData["userId"];

    //Om de finns variablar
    if(isset($requestedData["dishId"], $requestedData["userId"])){
        //För varje "plats" i index för användaren
        foreach($users as $number => $user){
            //Om idt matchar med användarens id
            if($userId == $user["userId"]){
                //Sätt favoriter som användarens favoriter
                $favorites = $user["favorites"];
                //$dishId vi klickar på vill vi pushas in i favorites Arrayen
                $favorites[] = $dishId;
                //favorites får en ny varibel som heter updaterad
                $updated = $favorites;
                //userfavorites är nu lika med updated vilket är den uppdaterade favoritarrayen
                $user["favorites"] = $updated;
                //Detta är för att veta vilket user som ska uppdateras
                $users[$number] = $user;
                
                //Omvandla till json objekt samt placerar den uppdaterade arrayen in i jsonfilen
                $json = json_encode($users, JSON_PRETTY_PRINT);
                file_put_contents("./JSON/user.json", $json);

                //Skicka till sendStatus
                sendStatus($user); 
            }
        }

    }

} 