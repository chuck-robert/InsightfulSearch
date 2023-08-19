<?php  
header("Content-Type: application/json;charset=utf-8");
if (($_REQUEST['key'])) {
    $data = iconv("GBK","UTF-8",file_get_contents('https://suggestion.baidu.com/su?wd='.$_REQUEST['key']));
    $a = str_replace('window.baidu.sug({q:"'.$_REQUEST['key'].'",p:false,s','{"keyword":"'.$_REQUEST['key'].'","p":false,"backData:"',$data);
    $b = str_replace(');','',$a);
    echo $b;
} else {
    echo "\"Error: there is nothing in ['key']\"";
}
?>