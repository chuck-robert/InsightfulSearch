<?php
require "stearsoft_works_config.php";
// require "403.php";
$server = new mysqli($server_localhost, $server_user, $server_pwd);
if ($server->connect_error) {
    die('数据库连接失败');
}
mysqli_select_db($server, $server_db);



function getLine($file,$line,$length = 40690) {
    $returnText = null;
    $i = 1;
    $handle = @fopen($file,"r");
    if ($handle) {
        while (!feof($handle)) {
            $buffer = fgets($handle,$length);
            if ($line == $i) $returnText = $buffer;
            $i++;    
        }
        fclose($handle);
    }
    return str_replace("
","",str_replace("_"," ",str_replace(" ","",$returnText)));
}
?>