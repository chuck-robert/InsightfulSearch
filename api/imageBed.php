<?php
include "./../admin/403.php";
header("Content-Type: application/json;charset=utf-8");
if(isset($_FILES["file"]) && !empty($_FILES["file"]["name"])) {
    $temp = explode(".", $_FILES["file"]["name"]);
    $fileName = time().'_'.$temp[0].'.png';
    move_uploaded_file($_FILES["file"]["tmp_name"], "./../data/image/bed/" .$fileName);
    $json = [
        "d" => "success",
        "UPfileName" => $fileName,
        "fileName" => $temp[0],
        "fileType" => $temp[1]
    ];
    echo json_encode($json);
} else {
    $json = [
        "d" => "faild"
    ];
    echo json_encode($json);
}

?>