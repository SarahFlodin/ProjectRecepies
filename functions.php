<?php


//Skickar med datan som vi begär samt statuskod som ska vara lika med 200
//http_response_code menas att vi skickar med datan om statuskoden är 200 (OK)
//datan i parametern omvanlas till JSON data och läggs i en ny variabel
//Skriver ut datan på webbläsaren
function sendStatus ($data, $statuscode = 200) {
    header("Content-Type: application/json");
    http_response_code($statuscode);
    $json = json_encode($data);
    echo $json;
    exit();
}

?>