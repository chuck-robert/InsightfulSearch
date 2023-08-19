<?php
require "./../../admin/stearsoft_works_config.php";
include "./../../admin/403.php";

// 获取请求的数据
$requestData = file_get_contents('php://input');
$requestData = json_decode($requestData, true);

// 设置OpenAI API的请求参数
$apiKey = $chatGPT_token;
$apiUrl = 'https://api.openai.com/v1/chat/completions';

// 发起API请求
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));

$response = curl_exec($ch);

// 处理API响应
if ($response === false) {
    // 请求失败
    $error = curl_error($ch);
    echo json_encode(['error' => $error]);
} else {
    // 请求成功
    echo $response;
}

// 关闭请求
curl_close($ch);

?>
