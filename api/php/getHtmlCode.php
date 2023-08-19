<?php
include "./../../admin/403.php";
header("Content-Type: application/json;charset=utf-8");
$url = iconv('utf-8', 'gbk', $_REQUEST['url']);
if (file_exists(realpath($url))) {
    $page = file_get_contents($url);
    $json = ["url" => $url, "back" => "success", "html" => $page];
    echo json_encode($json);
} else {
    $json = ["url" => $url, "back" => "failed", "html" => "请重新输入地址"];
    echo json_encode($json);
}