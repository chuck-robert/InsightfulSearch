<?php
include "./../admin/403.php";
header('Content-type:text/json;charset=utf-8;');
date_default_timezone_set("PRC");
$result = file_get_contents("https://api.vvhan.com/api/visitor.info");
echo $result;
?>