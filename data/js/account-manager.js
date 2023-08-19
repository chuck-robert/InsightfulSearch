$('.toolList li').click(function () {
	var f = this;
	$('.toolList li').each(function () {
		this.className = this == f ? 'active' : '';
	});
});
$(function () {
	$('.toolList li').click(function () {
		var index = $(this).index();
		$("div[data-0101023]").eq(index).show().siblings().hide();
	})
});


// 用户信息编辑上传
document.getElementById("upUserInformation").onclick = function () {
	var nick = $("#usernick").val();
	var mail = $("#usermail").val();
	var sex = $("#usersex").val();
	var b1 = $("#b1").val();
	var b2 = $("#b2").val();
	var b3 = $("#b3").val();
	var cookie = getCookie('XnUserName')
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	xhr.onreadystatechange = function (res) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var back = xhr.responseText
			if (back == 'true') {
				location.reload();
			}
		}
	}
	xhr.open('POST', '/../account/data.php', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send('mode=upUserInformation&cookie=' + cookie + '&nick=' + nick + '&mail=' + mail + '&sex=' + sex + '&b1=' + b1 + '&b2=' + b2 + '&b3=' + b3);
}
// 用户密码修改上传
document.getElementById("upUserPassword").onclick = function () {
	oldPassword = document.getElementById("oldPassword");
	newPassword = document.getElementById("newPassword");
	repeatPassword = document.getElementById("repeatPassword");
    reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?_&])[A-Za-z\d$@$!%*#?_&]{8,}$/;
	if (ContentDetection(oldPassword.value) == true) {
		oldPassword.style.background = "rgba(255, 0, 0, 0.1)";
		return false;
	} else {
		oldPassword.style.background = "";
	}
	if (ContentDetection(newPassword.value) == true) {
		newPassword.style.background = "rgba(255, 0, 0, 0.1)";
		return false;
	} else {
		newPassword.style.background = "";
	}
	if (ContentDetection(repeatPassword.value) == true) {
		repeatPassword.style.background = "rgba(255, 0, 0, 0.1)";
		return false;
	} else {
		repeatPassword.style.background = "";
	}
	if (newPassword.value != repeatPassword.value || reg.test(newPassword.value) == false || reg.test(repeatPassword.value) == false) {
		repeatPassword.style.background = "#00ffff38";
		newPassword.style.background = "#00ffff38";
		return false;
	} else {
		repeatPassword.style.background = "";
		newPassword.style.background = "";
		if (window.XMLHttpRequest) {
			userPasswordUploadLine = new XMLHttpRequest();
		} else {
			userPasswordUploadLine = new ActiveXObject('Microsoft.XMLHTTP');
		}
		userPasswordUploadLine.onreadystatechange = function (res) {
			if (userPasswordUploadLine.readyState == 4 && userPasswordUploadLine.status == 200) {
				var back = userPasswordUploadLine.responseText
				if (back == 'true') {
					location.reload();
				}
			}
		}
		userPasswordUploadLine.open('POST', '/../account/data.php', true);
		userPasswordUploadLine.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		userPasswordUploadLine.send('mode=upUserPassword&cookie=' + getCookie('XnUserName') + '&oldPassword=' + oldPassword.value + '&newPassword=' + newPassword.value);
	}
}
document.getElementById("loginOut").onclick = function () {
    if (window.XMLHttpRequest) {
        loginOutAcc = new XMLHttpRequest();
    } else {
        loginOutAcc = new ActiveXObject('Microsoft.XMLHTTP');
    }
    loginOutAcc.onreadystatechange = function (res) {
        if (loginOutAcc.readyState == 4 && loginOutAcc.status == 200) {
            setTimeout(() => {
                location.reload()
            }, 1000);
        }
    }
    loginOutAcc.open('POST', '/../account/data.php', true);
    loginOutAcc.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    loginOutAcc.send('cookie=' + getCookie("XnUserName") + '&type=loginOut');
}