<?php
$mode = $_REQUEST['mode'];
if ($mode == 'pageSave') {
    $d = urldecode($_REQUEST['announcement']).'|&|'.$_REQUEST['background'].'|&|'.$_REQUEST['version'];
    changeData(1,$d);
    echo "success";
}
function changeData($row,$infor) {
    $file = "./../../../api/text/pageDataText-b.text";
    $fp = fopen($file, "wb");
    fwrite($fp, str_replace(" ","_",str_replace("|&|","\r\n",$infor)));
    fclose($fp);
}
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
    return $returnText;
}
?>