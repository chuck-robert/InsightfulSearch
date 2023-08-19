<?php
include "./../admin/403.php";
header("Content-Type: application/json;charset=utf-8");
// header('Content-type:text/json;charset=utf-8;');
// $city = $_GET['city'];
$result = file_get_contents("https://api.vvhan.com/api/weather");
echo $result;
?>