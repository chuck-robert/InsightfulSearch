<?php
include "./../admin/403.php";
header("Content-Type:text/json;charset=UTF-8");
date_default_timezone_set("PRC");
$xx = 'json';
$url = "https://api.vvhan.com/api/60s?type=" . $xx;
$data = file_get_contents($url);
echo $data;
?>