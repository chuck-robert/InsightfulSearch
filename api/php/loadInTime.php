<?php
include "./../../admin/403.php";
$oldTime = file_get_contents('../text/loadInTimeData.txt');
$newTime = (int) $oldTime;
$newTime=$newTime + 1;
$myFile = fopen("../text/loadInTimeData.txt", "w") or die("Unable to open file!");
fwrite($myFile, $newTime);
fclose($myFile);
?>