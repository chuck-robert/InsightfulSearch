<?php
    include "./../../admin/403.php";
    require "./../../admin/stearsoft_works_config.php";
    header("Content-Type: application/json;charset=utf-8");
    $page = $_REQUEST['page'];
    $data = json_decode(file_get_contents('https://wallhaven.cc/api/v1/search?apikey='.$wallhaven_api.'&ratios=16x9&q=&purity=100&sorting=toplist&topRange=6M&'.'page='.$page), true);
    echo json_encode($data);
?>