/**
 * Created by chenyoake on 14-9-20.
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


function checkPassword(password) {
    if(password.length < 6)
        return false;
    return true;
}

function check() {
    var mail = document.form.username.value;
    var password = document.form.password.value;
    if(checkMail(mail) && checkPassword(password))
        return true;
    return false;
}