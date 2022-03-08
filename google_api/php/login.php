<?php
require("../conn_pdo/connection.php");

header("Content-type: application/json; charset=utf-8");
$input = json_decode(file_get_contents("php://input"), true);

$UserEmail   = isset($input["UserEmail"]) ? $input["UserEmail"] : null;
$UserName   = isset($input["UserName"]) ? $input["UserName"] : null;
$UserLastName   = isset($input["UserLastName"]) ? $input["UserLastName"] : null;
$UserAction   = isset($input["userAction"]) ? $input["userAction"] : null;


if($UserAction == "login"){
    $st=$connection->prepare("SELECT * FROM users WHERE Useremail = ?");
    $st->bindParam(1,$UserEmail);
    $st->execute();
    $arr = $st->fetch(PDO::FETCH_ASSOC);

    if(isset($arr["userId"])){

        $response["logged"]=true;

        $response["info"] =$arr;

        session_start();

        setcookie("logged", '1',false, "/", $_SERVER["HTTP_HOST"]);
        setcookie("username", $UserName,false, "/", $_SERVER["HTTP_HOST"]);
        setcookie("lastName", $UserLastName,false, "/", $_SERVER["HTTP_HOST"]);
        setcookie("userEmail", $UserEmail,false, "/", $_SERVER["HTTP_HOST"]);

    }else{
        $response["logged"]=false;
        $response["mesagge"]=true;
    }

    echo json_encode($response);
    
    
}else if($UserAction=="logout"){
    session_start();
    setcookie('logged',null, 0, '/', $_SERVER["HTTP_HOST"]);
    setcookie('username',null, 0, '/', $_SERVER["HTTP_HOST"]);
    setcookie('lastName',null, 0, '/', $_SERVER["HTTP_HOST"]);
    setcookie('userEmail',null, 0, '/', $_SERVER["HTTP_HOST"]);
    
    session_destroy();
    echo json_encode(['logged'=>false]);
    }else{
        return false;
    }

?>