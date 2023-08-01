<?php
    $str = file_get_contents('https://cn.bing.com/HPImageArchive.aspx?idx=0&n=1');
    if (preg_match("/<urlBase>(.+?)<\/urlBase>/", $str, $matchText)) {
        $imgUrl='https://cn.bing.com'.$matchText[1].'_1920x1080.jpg';
    }
    if ($imgUrl) {
        header('Content-Type: image/JPEG');
        @ob_end_clean();
        @readfile($imgUrl);
        @flush();
        @ob_flush();
        exit();
    } else {
        exit('error');
    }
?>