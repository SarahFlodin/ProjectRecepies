<?php 

//Plockar länkningen en gång
require_once "functions.php";

//Plockar rätt metod och gör den till en variablel
$requestMethod = $_SERVER["REQUEST_METHOD"];

//Hanterar den nya informationen och lägger den i en array
$comments = [];

//Om filen finns, hämtar recepten från json och omvandlar jsontexten till "läsbar text" och lägger den i en variabel
if (file_exists("./JSON/comments.json")) {
    $json = file_get_contents("./JSON/comments.json");
    $comments = json_decode($json, true);
}

//file_get_contents(input) tillåter att läsa rawdata
$requestData = file_get_contents("php://input");
$_POST = json_decode($requestData, true);

//Om metoden som används är POST så ska
if ($requestMethod == "POST") {

    //Alla värden ska omvandlas och sättas i nya variablar
    $userId = $_POST["userId"];
    $message = $_POST["message"];
    $dishId = $_POST["dishId"];

    //Om isset inte kan ta emot efterfrågad variabel/variabler
    if(isset($_POST["userId"], $_POST["message"], $_POST["dishId"])) {
        //Om meddelandet är tomt ska det få fram ett error meddelande
        if($message == ""){
            $error = ["error" => "Du måste fylla i fältet!"];
            sendStatus($error, 406);
        }
       
        //sätter värdet 0 i en variabel
        $newId = 0;

        //För varje kommentar 
        foreach ($comments as $comment) {

            //Om kommentarid är större än newId när den kommer till den sista lägger det som det nya värdet i newId
            if ($comment["commentId"] > $newId) {
                $newId = $comment["commentId"];
            } 
        }

        //Ta newId och addera 1 för att skapa ett nytt id med rätt nummer
        $commentId = $newId + 1;
        //Ta de nya värdena och sätter in dem som giltig json kod
        $newComment = ["userId" => $userId, "commentId" => $commentId, "dishId" => $dishId, "message" => $message];
        //Skickar in den nya användaren i userArrayen
        $comments[] = $newComment;
        //Omvandlar till json kod
        $json = json_encode($comments, JSON_PRETTY_PRINT);
        file_put_contents("./JSON/comments.json", $json);

        //send_status($newComment)
        header("Content-Type: application/json");
        http_response_code(200);
        echo json_encode($newComment);
        exit();
    }

}

?>