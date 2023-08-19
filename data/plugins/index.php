<?php
$directory = __DIR__; // 当前文件夹路径
$jsFiles = array(); // 用于存储JS文件信息的数组

// 扫描当前文件夹
$files = scandir($directory);

// 遍历扫描结果
foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
        $filePath = $directory . DIRECTORY_SEPARATOR . $file;
        $modificationTime = filemtime($filePath);
        $jsContents = file_get_contents($filePath);

        // 解析元数据
        preg_match('/\/\*\s*-+\s*\n\*\s*Name:\s*(.*?)\s*\n\*\s*Version:\s*(.*?)\s*\n\*\s*Author:\s*(.*?)\s*\n\*\s*Date:\s*(.*?)\s*\n\*\s*Mode:\s*(.*?)\s*\n\*\s*Json:\s*(.*?)\s*\n\*\s*-+\s*\*\//s', $jsContents, $matches);

        $jsFiles[] = array(
            'file' => $file,
            'modification_time' => date('Y-m-d H:i:s', $modificationTime),
            'name' => isset($matches[1]) ? trim($matches[1]) : '',
            'version' => isset($matches[2]) ? trim($matches[2]) : '',
            'author' => isset($matches[3]) ? trim($matches[3]) : '',
            'date' => isset($matches[4]) ? trim($matches[4]) : '',
            'mode' => isset($matches[5]) ? trim($matches[5]) : '',
            'json' => isset($matches[6]) ? trim($matches[6]) : ''
        );
    }
}

// 输出JSON
$jsonOutput = json_encode($jsFiles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
echo $jsonOutput;
?>
