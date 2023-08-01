<?php
header("Content-type:application/json");
include "./../../admin/403.php";
include "./../../admin/stearsoft_works_config.php";
$ch = curl_init();
$text = $_REQUEST['text'];
curl_setopt($ch, CURLOPT_URL, "https://api.openai.com/v1/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, '{
    "model": "text-davinci-003",
    "max_tokens": 2048,
    "prompt": "'.$text.'"
}');
curl_setopt($ch, CURLOPT_POST, 1);

$headers = array();
$headers[] = "Content-Type: application/json";
$headers[] = "Authorization: Bearer ".$chatGPT_token;
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);


$response = curl_exec($ch);
$response_data = json_decode($response, true);


if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {

    $result = array(
        'code'=> 200,
        'msg'=>"获取成功",
        'data'=>array(
            'html'=> $response_data['choices'][0]['text'],
            'title'=>$text
        ),
        'api_offer'=>"Chuck Robert in Stearsoft",
        'time'=> date('Y-m-d', time())
    );
    echo json_encode($result,320);
    exit();

}

curl_close($ch);
?>