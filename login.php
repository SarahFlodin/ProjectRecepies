<?php

//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variabel
$requestMethod = $_SERVER["REQUEST_METHOD"];

//Om filen finns, hämtar användarna från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/user.json")) {
    $json = file_get_contents("./JSON/user.json");
    $users = json_decode($json, true);
}

//file_get_contents(input) tillåter att läsa rawdata
$requestData = file_get_contents("php://input");
$_POST = json_decode($requestData, true);

//Om metoden som används är POST
if($requestMethod == "POST"){
    //Alla värden ska omvandlas och sättas i nya variablar
    $username = $_POST["userName"];
    $password = $_POST["password"];

    //Om isset kan ta emot password och username
    if(isset($password, $username) ){
        //För varje användare
        foreach($users as $user){
            //Om användarens Name är samma som username OCH användarens lösenord och lösenord
            if($user["userName"] == $username and $user["password"] == $password){
                //Skicka hela user (Brister i säkerheten då vi skickar tillbaka hela user och det kan man hitta under nätverk)
                sendStatus($user);
            }
        }
           
    } 
    //Om isset inte kan uppfyllas skicka error
    $error = ["error" => "Användaren hittas inte!"];
    sendStatus($error, 404);
}
?>