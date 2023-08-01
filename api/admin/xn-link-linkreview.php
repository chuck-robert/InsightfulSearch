<?php
// ------------------------------------------------------
//配置
include "./../../admin/403.php";
include "./../../admin/config.php";
// ------------------------------------------------------


$pageNum = $_REQUEST['p'];
$pageFrom = $pageNum * $_REQUEST['num'] - 9;
$pageChild = $pageNum * $_REQUEST['num'];

// echo '从第'.$pageFrom.'添加'.$_REQUEST['num'].'到'.$pageChild;
$mode = $_REQUEST['mode'];
if ($_REQUEST['admin'] == 'preview') {
    // echo '从序号为' . ($pageFrom + 1) . "到序号为" . ($pageTo + 1) . "的链接</br>";
    $s = "SELECT * FROM `xn-links` order by `id`";
        $show = mysqli_query($server, $s);
        if (!$show) {
            die('无法读取数据,请联系管理员修复:' . mysqli_error($server));
        }
        if (mysqli_num_rows($show) !== 0) {
            while ($row = mysqli_fetch_array($show)) {
                $id = $row['id'];
                $title = $row['title'];
                $link = $row['link'];
                $about = $row['about'];
                echo '<tr><th scope="row">' . $id . '</th><td>' . $title . '</td><td>' . $link . '</td><td>' . $about . '</td><td><button onclick="delLink('.$id.')" type="button" class="btn btn-danger none">删除</button></td></tr>';
            }
        } else {
            echo 'null';
            // echo '<li class="none"><p>我还是有底线的ヽ(*。>Д<)o゜</p></li>';
        }
} else if ($_REQUEST['admin'] == 'number'){
    $s = "SELECT * FROM `xn-links`";
        $show = mysqli_query($server, $s);
        if (!$show) {
            die('无法读取数据,请联系管理员修复:' . mysqli_error($server));
        }
        echo mysqli_num_rows($show);
} else {
    if ($mode == 'search') {
        // 搜索
        $key = $_REQUEST['key'];
        $search = "SELECT * FROM `xn-links` where title like '%{$key}%'  or about like '%{$key}%'";
        $result = mysqli_query($server, $search);
        if (!$result) {
            die('无法读取数据,请联系管理员修复:' . mysqli_error($server));
        }
        if (mysqli_num_rows($result) !== 0) {
            while ($row = mysqli_fetch_array($result)) {
                $title = $row['title'];
                $link = $row['link'];
                $about = $row['about'];
                if (preg_match('/xnAppId/i',$link)) {
                    echo '<li onclick="addLinkFromServer(this);'.$link.'"><div class="link-pre-icon" a="' . $link . '"><a-div ><img src="../data/image/icon/logo.v3.ico" alt="' . $title . '"></a-div></div><div class="link-pre-info"><p class="title">' . $title . '</p><p class="about">' . $about . '</p></div></li>';
                } else {
                    echo '<li onclick="addLinkFromServer(this)"><div class="link-pre-icon" a="' . $link . '"><a-div target="_blank"><img src="https://stear.cn/api/favicon/get.php?url=' . $link . '" alt="' . $title . '"></a-div></div><div class="link-pre-info"><p class="title">' . $title . '</p><p class="about">' . $about . '</p></div></li>';
                }
            }
        } else {
            echo '<li class="none"><p>搜索无结果ヽ(*。>Д<)o゜</p></li>';
        }
    } else {
        // 默认排列
        $s = "SELECT * FROM `xn-links` order by `id` desc limit {$pageFrom},{$_REQUEST['num']}";
        $show = mysqli_query($server, $s);
        if (!$show) {
            die('无法读取数据,请联系管理员修复:' . mysqli_error($server));
        }
        if (mysqli_num_rows($show) !== 0) {
            while ($row = mysqli_fetch_array($show)) {
                $title = $row['title'];
                $link = $row['link'];
                $about = $row['about'];
                if ($_REQUEST['admin'] == 'preview') {
                    echo '<li onclick="addLinkFromServer(this)"><div class="link-pre-icon"><a href="' . $link . '" target="_blank"><img src="https://stear.cn/api/favicon/get.php?url=' . $link . '" alt="' . $title . '"></a></div><div class="link-pre-info"><p class="title">' . $title . '</p><p class="about">' . $about . '</p><input value="删除" onclick="delLink('.$row['id'].')"></div></li>';
                } else {
                    if (preg_match('/xnAppId/i',$link)) {
                        echo '<li onclick="addLinkFromServer(this);'.$link.'"><div class="link-pre-icon" a="' . $link . '"><a-div ><img src="../data/image/icon/logo.v3.ico" alt="' . $title . '"></a-div></div><div class="link-pre-info"><p class="title">' . $title . '</p><p class="about">' . $about . '</p></div></li>';
                    } else {
                        echo '<li onclick="addLinkFromServer(this)"><div class="link-pre-icon" a="' . $link . '"><a-div target="_blank"><img src="https://stear.cn/api/favicon/get.php?url=' . $link . '" alt="' . $title . '"></a-div></div><div class="link-pre-info"><p class="title">' . $title . '</p><p class="about">' . $about . '</p></div></li>';
                    }
                }
            }
        } else {
            echo 'null';
            // echo '<li class="none"><p>我还是有底线的ヽ(*。>Д<)o゜</p></li>';
        }
    }
}