<?php 

require_once "functions.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$comments = [];

if (file_exists("./JSON/comments.json")) {
    $json = file_get_contents("./JSON/comments.json");
    $comments = json_decode($json, true);
}

$requestData = file_get_contents("php://input");
$_POST = json_decode($requestData, true);

if ($requestMethod == "POST") {

    $userId = $_POST["userId"];
    $message = $_POST["message"];
    $dishId = $_POST["dishId"];

    if(isset($_POST["userId"], $_POST["message"], $_POST["dishId"])) {

        if($message == ""){
            $error = ["error" => "Du måste fylla i fältet!"];
            sendStatus($error, 406);
        }
       
        $newId = 0;

        foreach ($comments as $comment) {
            if ($comment["commentId"] > $newId) {
                $newId = $comment["commentId"];
            } 
        }

        $commentId = $newId + 1;
        $newComment = ["userId" => $userId, "commentId" => $commentId, "dishId" => $dishId, "message" => $message];
        $comments[] = $newComment;
        $json = json_encode($comments, JSON_PRETTY_PRINT);
        file_put_contents("./JSON/comments.json", $json);

        header("Content-Type: application/json");
        http_response_code(200);
        echo json_encode($newComment);
        exit();
    }

}

?>