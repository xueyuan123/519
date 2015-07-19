/**
 * Created by chenyoake on 14-9-18.
 */

$(document).ready(function(){
    $("#warnning").hide();
    $("#mail").blur(function(){
        var data = document.form.username.value;
        if(!checkMail(data) && data != "")
            $("#warnning").fadeIn();
        if(checkMail(data))
            $("#warnning").fadeOut();
    });
});

function checkMail(mail) {
    var data  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (data.test(mail))
        return true;
    return false;
}

function checkNickname(name) {
    if(name.length < 1 || name.length > 30)
        return false;
    return true;
}

function checkPassword(password) {
    if(password.length < 6)
        return false;
    return true;
}

function check() {
    var mail = document.form.username.value;
    var password = document.form.password.value;
    var name = document.form.nickname.value;
    if(checkMail(mail) && checkPassword(password) && checkNickname(name))
        return true;
    return false;
}

