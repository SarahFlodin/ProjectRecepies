<?php

//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variabel
$requestMethod = $_SERVER["REQUEST_METHOD"];

//Hanterar den nya informationen och lägger den i en array
$recipes = [];

//Om filen finns, hämtar recepten från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/dishes.json")) {
    $json = file_get_contents("./JSON/dishes.json");
    $recipes = json_decode($json, true);
}

//Om get metoden används så använder vi oss av functions.php för att skicka med data och responskod 
if ($requestMethod == "GET") {
    sendStatus($recipes);
}

?>