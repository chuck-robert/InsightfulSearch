<!DOCTYPE html>
<html>

    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <title>聚源千意 | 数据上传</title>
        <link rel="stylesheet" href="./../../data/css/xn-ui.css">
        <link rel="shortcut icon" href="./../../data/image/icon/logo.v2.ico" type="image/x-icon">
        <style>
            * {
                outline: 0;
                border: 0;
                box-sizing: border-box;
            }

            input[type='text'] {
                width: 400px;
            }
            xn-box.main{
                width: 60%;
                position: absolute;
                left: 20%;
            }
            @media screen and (max-width:820px) {
                xn-box.main{
                    width: 100%;
                    left: 0;
                }
            }
        </style>
    </head>

    <body>
        <xn-box class="main">
            <xn-h2 class="xn_css h23_before_bar" style="--xn-tag-h-before-color:#0084ff;">聚源千意 | 数据上传</xn-h2>
<?php
$LockFile = 'lock.lock';
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);
if (file_exists($LockFile)) {
    echo "<p class=\"xn_css p_text warn_content\">锁文件已存在，在此文件存在的情况下，您将无法配置。如何您已配置完成，即可关闭此页面</p>";
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // 获取表单提交的配置信息
        $server_localhost = $_POST['server_localhost'];
        $server_user = $_POST['server_user'];
        $server_pwd = $_POST['server_pwd'];
        $server_db = $_POST['server_db'];
        $wallhaven_api = $_POST['wallhaven_api'];
        $mail_host = $_POST['mail_host'];
        $mail_user = $_POST['mail_user'];
        $mail_pwd = $_POST['mail_pwd'];
        $mail_SMTPSecure = $_POST['mail_SMTPSecure'];
        $mail_port = $_POST['mail_port'];
        $mail_from_mail = $_POST['mail_from_mail'];
        $mail_from_person = $_POST['mail_from_person'];
        $mail_get_mail = $_POST['mail_get_mail'];
        $mail_get_person = $_POST['mail_get_person'];
        $mail_websiteOwner_mail = $_POST['mail_websiteOwner_mail'];
        $chatGPT_token = $_POST['chatGPT_token'];
        $allowedDomainsListA = $_POST['allowedDomainsList'];
        $adminMainPass = $_POST['admin_pwd'];
        $adminMainKey = $_POST['admin_key'];
        $domainArray = explode(',', $allowedDomainsListA);
        $allowedDomainsList = array_map('trim', $domainArray);
        $allowedDomainsList = array_map(function($domain) {
            return "'$domain'";
        }, $allowedDomainsList);
        $allowedDomainsList = implode(', ', $allowedDomainsList);
    
        // 将配置信息保存到config.php文件
        $configContent = "<?php\n";
        $configContent .= "\$server_localhost = '$server_localhost';\n";
        $configContent .= "\$server_user = '$server_user';\n";
        $configContent .= "\$server_pwd = '$server_pwd';\n";
        $configContent .= "\$server_db = '$server_db';\n";
        $configContent .= "\$wallhaven_api = '$wallhaven_api';\n";
        $configContent .= "\$mail_host = '$mail_host';\n";
        $configContent .= "\$mail_user = '$mail_user';\n";
        $configContent .= "\$mail_pwd = '$mail_pwd';\n";
        $configContent .= "\$mail_SMTPSecure = '$mail_SMTPSecure';\n";
        $configContent .= "\$mail_port = $mail_port;\n";
        $configContent .= "\$mail_from_mail = '$mail_from_mail';\n";
        $configContent .= "\$mail_from_person = '$mail_from_person';\n";
        $configContent .= "\$mail_get_mail = '$mail_get_mail';\n";
        $configContent .= "\$mail_get_person = '$mail_get_person';\n";
        $configContent .= "\$mail_websiteOwner_mail = '$mail_websiteOwner_mail';\n";
        $configContent .= "\$chatGPT_token = '$chatGPT_token';\n";
        $configContent .= "\$allowedDomainsList = array($allowedDomainsList);\n";
        $configContent .= "?>";
    
        $pwdContent = "<?php\n";
        $pwdContent .= "\$adminMainPass = '$adminMainPass';\n";
        $pwdContent .= "\$day = 1;\n";
        $pwdContent .= "\$c = '$adminMainKey';\n";
        $pwdContent .= "if (\$_REQUEST['pass'] == \$adminMainPass) {\n";
        $pwdContent .= "echo 'true';\n";
        $pwdContent .= "setcookie(\"XnAdminUser\", \$c, time() + 60 * 60 * 24 * \$day, \"/\");\n";
        $pwdContent .= "} else {\n";
        $pwdContent .= "echo 'false';\n";
        $pwdContent .= "}\n";
        $pwdContent .= "?>";

        // 保存配置到config.php文件
        $filename = './../stearsoft_works_config.php';
        file_put_contents($filename, $configContent);
        echo "<p class=\"xn_css p_text success_content\">配置已保存到 $filename 文件中。</p>";
        // 保存配置到password.php文件
        $filename = './../password.php';
        file_put_contents($filename, $pwdContent);
        echo "<p class=\"xn_css p_text success_content\">配置已保存到 $filename 文件中。</p>";
        generateDatabaseTables();
    
    }
}
function generateDatabaseTables() {
    $connection = new mysqli($_POST['server_localhost'], $_POST['server_user'], $_POST['server_pwd'], $_POST['server_db']);
    if ($connection->connect_error) {
        echo '<p class="xn_css p_text faild_content">数据库链接失败</p>';
    } else {
        echo "<p class=\"xn_css p_text success_content\">数据库链接成功</p>";
    }
    $success = true; 
    $sqlLinks = "CREATE TABLE `xn-links` (
        `id` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        `title` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        `link` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        `about` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        `date` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
    if ($connection->query($sqlLinks) === TRUE) {
        echo "<p class=\"xn_css p_text success_content\">xn-links 表已成功创建</p>";
    } else {
        echo '<p class="xn_css p_text faild_content">创建 xn-links 表时出错</p>';
        echo '<p class="xn_css p_text warn_content p_cite">' . $connection->error . '</p>';
        $success = false;
    }
    $sqlSetting = "CREATE TABLE `xn-setting` (
        `id` text NOT NULL,
        `item` text NOT NULL,
        `mode` text NOT NULL,
        `name` text NOT NULL,
        `about` text NOT NULL
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8;";
    if ($connection->query($sqlSetting) === TRUE) {
        echo "<p class=\"xn_css p_text success_content\">xn-setting 表已成功创建</p>";
    } else {
        echo '<p class="xn_css p_text faild_content">创建 xn-setting 表时出错</p>';
        echo '<p class="xn_css p_text warn_content p_cite">' . $connection->error . '</p>';
        $success = false;
    }
    $sqlUser = "CREATE TABLE `xn-user` (
        `id` varchar(12) NOT NULL,
        `username` varchar(20) NOT NULL,
        `password` varchar(100) NOT NULL,
        `mail` text NOT NULL,
        `date` text NOT NULL,
        `nick` text NOT NULL,
        `sex` text NOT NULL,
        `birth1` varchar(4) NOT NULL,
        `birth2` varchar(2) NOT NULL,
        `birth3` varchar(2) NOT NULL,
        `token` text NOT NULL,
        `collect` text NOT NULL,
        `settingdata` text NOT NULL,
        `theme` text NOT NULL,
        `memoList` text NOT NULL,
        `upDataDate` text NOT NULL
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8;";
    if ($connection->query($sqlUser) === TRUE) {
        echo "<p class=\"xn_css p_text success_content\">xn-user 表已成功创建</p>";
    } else {
        echo '<p class="xn_css p_text faild_content">创建 xn-user 表时出错</p>';
        echo '<p class="xn_css p_text warn_content p_cite">' . $connection->error . '</p>';
        $success = false;
    }
    $connection->close();
    if ($success) {
        echo '<p class="xn_css p_text success_content">所有数据库表已成功创建</p>';
        $filename = 'lock.lock';
        $content = '删除此文件可重新进行配置，但同时其他人也可以访问此页面进行配置';
        if (file_put_contents($filename, $content) !== false) {
            echo "<p class=\"xn_css p_text success_content\">$filename 文件已成功创建</p>";
            echo '<p class="xn_css p_text success_content">所有的配置均已完成，祝贺您</p>';
        } else {
            echo "<p class=\"xn_css p_text faild_content\">创建 $filename 文件时出错</p>";
        }
    } else {
        echo '<p class="xn_css p_text faild_content">创建数据库表时出现错误，请检查数据库配置和权限</p>';
    }
}
?>
</xn-box>
        <script src="https://stear.cn/data/js/jq.js"></script>
        <script src="https://stear.cn/data/js/xn.js"></script>
    </body>

</html>