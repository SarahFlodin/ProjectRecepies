<?php

//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variabel
$requestMethod = $_SERVER["REQUEST_METHOD"];

//Hanterar den nya informationen och lägger den i en array
$users = [];

//Om filen finns, hämtar recepten från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/user.json")) {
    $json = file_get_contents("./JSON/user.json");
    $users = json_decode($json, true);
}

//file_get_contents(input) tillåter att läsa rawdata
$requestData = file_get_contents("php://input");
$_POST = json_decode($requestData, true);

//Om metoden som används är POST så ska
if($requestMethod == "POST"){

    //Alla värden ska omvandlas och sättas i nya variablar
    $newUsername = $_POST["userName"];
    $newPassword = $_POST["password"];
    $repeatedNewPassword = $_POST["repeatPassword"];

    //Om isset inte kan ta emot efterfrågad variabel/variabler
    //Om alla fält inte är ifyllda
    if(!isset($_POST["userName"], $_POST["password"], $_POST["repeatPassword"])){
        $error = ["error" => "Fyll i alla fält!"];
        sendStatus($error, 406);
    // Användarnamnet är tomt
    } elseif($newUsername == ""){
        $error1 = ["error1" => "Fyll i fältet!"];
        sendStatus($error1, 406);
    //Om lösenorden inte matchar
    } elseif($repeatedNewPassword != $newPassword){
        $error = ["error" => "Lösenordet matchar inte."];
        sendStatus($error, 406);
    //Om lösenordet är mindre än 6 karaktärer
    } elseif(strlen($newPassword) < 6 ){
        $error = ["error" => "Lösenordet ska vara minst 6 tecken."];
        sendStatus($error, 406);
    //Om användarnamnet innehåller mellanslag
    } elseif(count(explode(' ', $newUsername)) > 1) {
        $error1 = ["error1" => " Användarnament kan inte innehålla blankspace."];
        sendStatus($error1, 406);
    }

    //sätter värdet 0 i en variabel
    $newId = 0;

    //För varje användare
    foreach($users as $user){
        //Om användarid är större än newId när den kommer till den sista lägger det som det nya värdet i newId
        if($user["userId"] > $newId){
            $newId = $user["userId"];
        }
    }

    // för varje användare kolla så det nya namnet inte matchar med ett namn som redan finns om det finns få upp ett errormeddelande
    foreach($users as $user){
            
        if(($newUsername == $user["userName"])){
            $error1 = ["error1" => "Användarnamnet är upptaget."];
            sendStatus($error1, 409);
        }
    }
    //Ta newId och addera 1 för att skapa ett nytt id med rätt nummer
    $userId = $newId + 1;
    //Ta de nya värdena och sätter in dem som giltig json kod
    $newUser = ["userId" => $userId, "userName" => $newUsername, "password" => $newPassword, "favorites" => []];
    //Skickar in den nya användaren i userArrayen
    $users[] = $newUser;
    //Omvandlar till json läsbar kod
    $json = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents("./JSON/user.json", $json);
    //Skickar nya användaren till sendStatus
    sendStatus($newUser);
}

?>