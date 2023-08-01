<?php
    header("Content-Type: application/json;charset=utf-8");
    $key = $_REQUEST['key'];
    $data = json_decode(file_get_contents('http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_length=600&'.'bk_key='.$key), true);
    echo json_encode($data);
?>
