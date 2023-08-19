<?php
// ------------------------------------------------------
//配置
include "./config.php";
// ------------------------------------------------------
$mode = $_REQUEST['mode'];
if ($mode == 'startSave') {
    $d = $_REQUEST['title'].'|&|'.$_REQUEST['keywords'].'|&|'.$_REQUEST['description'].'|&|'.$_REQUEST['openShow'].'|&|'.$_REQUEST['version'];
    changeData(1,$d);
    echo "success";
}


function changeData($row,$infor) {
    $file = "./../api/text/pageDataText.text";
    $fp = fopen($file, "wb");
    fwrite($fp, str_replace(" ","_",str_replace("|&|","\r\n",$infor)));
    fclose($fp);
}