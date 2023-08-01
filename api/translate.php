<?php
include "./../admin/403.php";
header("Content-Type:text/json;charset=UTF-8");
$info = $_GET['text'];
$result = file_get_contents("https://api.vvhan.com/api/fy?text=" . $info);
echo $result;
?>