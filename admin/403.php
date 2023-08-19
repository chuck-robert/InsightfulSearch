<?php
require "stearsoft_works_config.php";

// $referer = $_SERVER['HTTP_REFERER'];
// $allowedDomains = $allowedDomainsList;
// if (!empty($referer)) {
//     $parsedUrl = parse_url($referer);
//     $refererDomain = $parsedUrl['host'] ?? '';
//     if (!in_array($refererDomain, $allowedDomains)) {
//         header('HTTP/1.1 403 Forbidden');
//         exit('<script>location.href = "//stear.cn/error/403.html?m=76as"</script>');
//     }
// } else {
//     header('HTTP/1.1 403 Forbidden');
//     exit('<script>location.href = "//stear.cn/error/403.html?m=76as"</script>');
// }


// $refer = $_SERVER['HTTP_REFERER'];   
// if($refer){   
//     $url = parse_url($refer);   
//     $host = explode('.',$url['host']);   
//     $count = count($host);   
//     $domainStr = $host[$count-2].'.'.$host[$count-1];   
//     if ($domainStr != 'stear.cn') {//123.com是你的网站域名
//         exit('拒绝访问A');   
//     }
// }
// if(isset($_SERVER['HTTP_REFERER'])) {
//     $url_array = explode('https://', $_SERVER['HTTP_REFERER']);
//     $url = explode('/', $url_array[1]);
//     if($_SERVER['SERVER_NAME'] != $url[0]) {
//         // 不是从本站来的
//         exit("Access Denied");
//     }
// } else {// 禁止直接访问本页面
//     exit('拒绝访问B');
// }
?>