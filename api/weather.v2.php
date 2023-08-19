<?php
include "./../admin/403.php";




header("Content-Type: application/json;charset=utf-8");
$city = $_GET['city'];
if ($city) {
    $url = "http://t.weather.itboy.net/api/weather/city/".$city;
    $result = geturldata($url);
    echo $result;
} else {
    echo "\"error\"";
}

function geturldata($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    $content = curl_exec($ch);
    curl_close($ch);
    return $content;
}
?>