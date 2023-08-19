<?php
require "stearsoft_works_config.php";
require "403.php";
include "./config.php";
$payload = file_get_contents('php://input');
$requestData = json_decode($payload, true);
$mode = $_GET['mode'];
$token = $_COOKIE['XnUserName'];
$responseData = array();



if ($mode == "upload") {
    if (isset($_COOKIE['XnUserName'])) {
        $timestamp = time();
        $memoList = json_encode($requestData['memoList'],JSON_UNESCAPED_UNICODE);
        $collectList = json_encode($requestData['CollectList'],JSON_UNESCAPED_UNICODE);
        $sql = "UPDATE `xn-user` SET memoList = '$memoList', collect = '$collectList', upDataDate = $timestamp WHERE token = '$token'";
        if (mysqli_query($server, $sql)) {
            $responseData = array(
                'state' => 1002,
                's' => '成功',
                'time' => $timestamp
            );
        } else {        
            $responseData = array(
                'state' => 1003,
                's' => '失败',
                'text' => '请联系网站管理员修复',
                'error' => mysqli_error($server)
            );
        }
        mysqli_close($server);
    } else {
        $responseData = array(
            'state' => 1001,
            's' => '失败',
            'text' => '请登陆'
        );
    }
} else if ($mode == "getInfo") {
    if (isset($_COOKIE['XnUserName'])) {
        $token = $_COOKIE['XnUserName'];
        $sql = "SELECT * FROM `xn-user` WHERE token = '$token'";
        $result = mysqli_query($server, $sql);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);

            $memoList = ($row['memoList'] === 'empty' || preg_match('/^\s*$/', $row['memoList'])) ? "[]" : $row['memoList'];
            $collect = ($row['collect'] === 'empty' || preg_match('/^\s*$/', $row['collect'])) ? "[]" : $row['collect'];

            $userInfo = array(
                'memoList' => $memoList,
                'collect' => $collect,
                'upDataDate' => $row['upDataDate']
            );

            $responseData = array(
                'state' => 2001,
                's' => '成功',
                'info' => $userInfo
            );
        } else {
            $responseData = array(
                'state' => 2003,
                's' => '失败',
                'text' => '用户信息不存在'
            );
        }
    } else {
        $responseData = array(
            'state' => 2002,
            's' => '失败',
            'text' => '请登录'
        );
    }
} else {
    $responseData = array(
        'state' => 2004,
        's' => '失败',
        'text' => '无效的操作模式'
    );
}

header('Content-Type: application/json');
echo json_encode($responseData);
?>