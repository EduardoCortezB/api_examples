<?php  

$host = "localhost";
$user = "root";
$password = "";
try {
    $connection = new PDO("mysql:host=$host;dbname=appweb",$user,$password);
    $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $connection->exec("set names utf8");
    return $connection;
} catch (PDOException $err) {
    var_dump($err);
}


?>