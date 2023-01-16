<?php
//console.log(errormeddelanden);
ini_set("display_errors", 1);

//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variabel
$requestedMethod = $_SERVER["REQUEST_METHOD"];

//Hanterar den nya informationen och lägger den i en array
$users = [];

//Om filen finns, hämtar användarna från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/user.json")) {
    $json = file_get_contents("./JSON/user.json");
    $users = json_decode($json, true);
}

//file_get_contents(input) tillåter att läsa rawdata
$requestJson = file_get_contents("php://input");
$requestedData = json_decode($requestJson, true);

//Alla värden ska omvandlas och sättas i nya variablar
$dishId = $requestedData["dishId"];
$userId = $requestedData["userId"];

//Om metoden som används är DELETE så ska
if ($requestedMethod == "DELETE") {

    //Om isset kan ta emot dishId och userId så ska
    if(isset($requestedData["dishId"], $requestedData["userId"])){
        
        //För varje "plats" i index för användarna
        foreach($users as $number => $user){

             //Om idt matchar med användarens id
            if($user["userId"] == $userId){
                
                //Användarens favoriteArray sparas i en egen variabel
                $favorites = $user["favorites"];
                //För varje "plats" i index för favoriterna
                foreach($favorites as $index => $favorite){
                    //Om favoritens index är samma som rättens id
                    if($favorite == $dishId){

                        //Ta bort med splice, ta bort från favorites array, de indexet samt hur många 1.
                        array_splice($favorites, $index, 1);
                        //Sparar den uppdaterade favorites i updated
                        $updated = $favorites;
                        //Sätter in Arrayen i updated
                        $user["favorites"] = $updated;
                        //uppdaterar användaren med rätt användarindex
                        $users[$number] = $user;

                         //Omvandlar till JSON kod
                        $json = json_encode($users, JSON_PRETTY_PRINT);
                        file_put_contents("./JSON/user.json", $json);
                        sendStatus($user);
                    }
                }
            }
        }

    }
    
}

//Om metoden inte är delete så skickar den error meddelande
$error = ["error" => "Bad Request"];
sendStatus($error, 400);