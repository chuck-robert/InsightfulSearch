<?php
    header("Content-Type: application/json;charset=utf-8");
    $c = 'i';
    $data = json_decode(file_get_contents('https://v1.hitokoto.cn/?'.'c='.$c), true);
    echo json_encode($data);
?>
