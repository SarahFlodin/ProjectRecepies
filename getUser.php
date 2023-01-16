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

//Om metoden som används är GET
if ($requestMethod == "GET") {

    //Om isset får tillbaka en variabel sätter den i en nytt varibelnamn
    if(isset($_GET["userId"])) {
        $id = $_GET["userId"];

        //För varje användare, om användarens id matchar med en av de id vi får via get så ska den specifika användaren skickas med.
        foreach($users as $user) {
            if($user["userId"] == $id) {
                sendStatus($user);
            }
        }

        
    }
    //Om get parametern inte innehåller id så ska den visa ett error meddelande med att den inte finner en användare med matchande id
    $error = ["error" => "No user found!"];
    sendStatus($error, 404);

}

?>