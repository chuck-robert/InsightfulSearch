<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
include "./../../admin/403.php";
include "./../../admin/stearsoft_works_config.php";
require './src/Exception.php';
require './src/PHPMailer.php';
require './src/SMTP.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    $mail->CharSet ="UTF-8";                     //设定邮件编码
    $mail->SMTPDebug = 0;                        // 调试模式输出
    $mail->isSMTP();                              // 使用SMTP
    $mail->Host = $mail_host;                // SMTP服务器
    $mail->SMTPAuth = true;                      // 允许 SMTP 认证
    $mail->Username = $mail_user;                // SMTP 用户名  即邮箱的用户名
    $mail->Password = $mail_pwd;             // SMTP 密码  部分邮箱是授权码(例如163邮箱)
    $mail->SMTPSecure = $mail_SMTPSecure;                    // 允许 TLS 或者ssl协议
    $mail->Port = $mail_port;                           // 服务器端口 25 或者465 具体要看邮箱服务器支持
    $mail->setFrom($mail_from_mail, $mail_from_person);  //发件人
    $mail->addAddress($mail_get_mail, $mail_get_person);  // 收件人
    $mail->Subject = '星柠 - 反馈与帮助';
    $mail->Body  = "邮箱：".$_REQUEST['mail']."</br>时间：".date('Y-m-d H:i:s')."</br>窗口：".$_REQUEST['win'] ."</br>项目：".$_REQUEST['at']."</br>内容：".str_replace("|and|","&",$_REQUEST['content']);
    $mail->AltBody = $_REQUEST['bodyText'];

    $mail->send();
    echo 'true';
} catch (Exception $e) {
    echo '邮件发送失败: ', $mail->ErrorInfo;
}