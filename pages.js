/**
 * Created by chenyoake on 14-9-23.
 */
global_headshot = ""
global_nickname = ""

$(document).ready(function(){

    $.getJSON('/pages/user/info/', function(data){
        global_headshot = data.headshot;
        global_nickname = data.nickname;
        $("#owner_nickname").html(global_nickname);
        $("#owner_headshot").attr('src',global_headshot);
        $("#photo_num").html(data.photo_num);
        $("#praise_num").html(data.praise_num);
        $("#followed_num").html(data.followed_num);
        $("#following_num").html(data.following_num);
        $("#user_headshot").attr('src', global_headshot);
    });

    var photocode = "<div class=\"col-md-2 photo_frame\">" +
        "<div class=\"img_div\">" +
        "<button class=\"thumbnail photoBtn\" data-toggle=\"modal\" data-target=\"#myModal1\" value=\"\">" +
        " <img class=\"photo\" src=\"\">" +
        "</button>" +
        "</div>" +
        "<div>";


    var rowcode = "<div class=\"row photoShow\" style=\"margin-top: 2%; padding: 0;\">" +
                   "</div>";



    $.getJSON('/user/photo/', function(data) {
        for (var i = 0, j = -1; i < data.length; i++) {
            var praise = data[i].praise;
            var comment = data[i].commnum;

            var photo_url = data[i].upload_photo;

            //alert(photo_url);
            //var x = photo_url.split('.')[0] + "cut.";
            //var photo_url1 = x + photo_url.split('.')[1];
            //photo_url1 = photo_url1.substr(7, photo_url1.length) + "?imageView2/1/w/250/h/250/q/75";
            var photo_url1 = photo_url + "?imageView2/1/w/250/h/250/q/75";
            //alert(photo_url1);
            var photo_id = data[i].photo_id;
            var praisehtml = "<span class=\"glyphicon glyphicon-thumbs-up\"></span> " + praise;
            var commenthtml = "<span class=\"glyphicon glyphicon-comment\"></span> " + comment;


            if ((i + 1) % 5 == 1) {
                j++;
                $("#photoFrame").append(rowcode);
                $(".photoShow:eq(" + String(j) + ")").append(photocode);
                $(".photodiv:eq(" + String(i) + ")").css("margin-left", "6%");
                $(".photo:eq(" + String(i) + ")").attr("src", photo_url1);
                $(".praise:eq(" + String(i) + ")").html(praisehtml);
                $(".comment:eq(" + String(i) + ")").html(commenthtml);
                $(".photoBtn:eq(" + String(i) + ")").val(photo_id);
            }
            else {
                $(".photoShow:eq(" + String(j) + ")").append(photocode);
                $(".photo:eq(" + String(i) + ")").attr("src",photo_url1);
                $(".praise:eq(" + String(i) + ")").html(praisehtml);
                $(".comment:eq(" + String(i) + ")").html(commenthtml);
                $(".photoBtn:eq(" + String(i) + ")").val(photo_id);

            }
        }


        //~~~~~~~~~~~~ modal part dynamic loading      begin ~~~~~
        $(".photo").click(function () {
            $("#likeBtn").attr("disabled", false);
            pid = $(this).parent().val();
            $.getJSON('/photo/upload/user/info/?photo_id=' + pid, function (data) {
                $("#original_photo").attr("src", data.upload_photo);
                $("#host_headshot").attr("src", data.headshot);
                $("#host_name").html(data.nickname);
                $("#photo_description").html(data.description);
                $("#likeBtn").html("<span class=\"glyphicon glyphicon-heart\"></span> " + data.praise).val(pid);
                $("#comm_img_id").val(pid);

                var commcode = "<div class=\"row\">" +
                    "<div class=\"col-md-3\">" +
                    "<img class=\"img-circle visitor_headshot\" src=\"\" style=\"width: 50px; height: 50px;\">" +
                    "</div>" +
                    "<div class=\"col-md-9\">" +
                    "<p class=\"visitor_nickname\" style=\"font-size: 25px; color: lawngreen;\"><p class=\"floorNum\" style=\"float: right; color: #000000; font-size: 15px; font-weight: lighter;\"></p></p>" +
                    "<span class=\"comment_content\"></span>" +
                    "</div>" +
                    "<hr style=\"width: 80%; margin-left: 3%;\">" +
                    "</div>";


                $.getJSON('/comment/upload/user/info/?photo_id=' + pid, function (data) {
                    $("#comment_part").children().remove();
                    if (data.length != 0) {
                        $("#commBtn").html("<span class=\"glyphicon glyphicon-comment\"></span> " + data.length);
                        for (var i = 0; i < data.length; i++) {
                            $("#comment_part").append(commcode);
                            $(".visitor_headshot:eq(" + String(i) + ")").attr("src",data[i].headshot);
                            $(".visitor_nickname:eq(" + String(i) + ")").html(data[i].nickname);
                            $(".comment_content:eq(" + String(i) + ")").html(data[i].content);
                            $(".floorNum:eq(" + String(i) + ")").html(i + 1 + "L");
                        }
                    }
                    else
                        $("#commBtn").html("<span class=\"glyphicon glyphicon-comment\"></span> " + 0);

                });
            });
        });
        //~~~~~~~~~~~~ modal part dynamic loading      end ~~~~~~
    });

    $("#likeBtn").click(function(){
        $.get("/user/praise/?pid="+ $(this).val(), function(data, status){
            if(String(data) != "0")
                $("#likeBtn").html("<span class=\"glyphicon glyphicon-heart\"></span> " + data).attr("disabled", "disabled");
        });
    });


    $("#followingBtn").click(function(){
        $("#photoFrame").children().remove();
        $.getJSON('/following/user/photo/', function(data){

            for (var i = 0, j = -1; i < data.length; i++) {
                var praise = data[i].praise;
                var comment = data[i].commnum;

                var photo_url = data[i].upload_photo;

                //var x = photo_url.split('.')[0] + "cut.";
                //var photo_url1 = x + photo_url.split('.')[1];
                photo_url1 = photo_url + "?imageView2/1/w/250/h/250/q/75";


                var photo_id = data[i].photo_id;
                var praisehtml = "<span class=\"glyphicon glyphicon-thumbs-up\"></span> " + praise;
                var commenthtml = "<span class=\"glyphicon glyphicon-comment\"></span> " + comment;


                if ((i + 1) % 5 == 1) {
                    j++;
                    $("#photoFrame").append(rowcode);
                    $(".photoShow:eq(" + String(j) + ")").append(photocode);
                    $(".photodiv:eq(" + String(i) + ")").css("margin-left", "6%");
                    $(".photo:eq(" + String(i) + ")").attr("src", photo_url1);
                    $(".praise:eq(" + String(i) + ")").html(praisehtml);
                    $(".comment:eq(" + String(i) + ")").html(commenthtml);
                    $(".photoBtn:eq(" + String(i) + ")").val(photo_id);
                }
                else {
                    $(".photoShow:eq(" + String(j) + ")").append(photocode);
                    $(".photo:eq(" + String(i) + ")").attr("src", photo_url1);
                    $(".praise:eq(" + String(i) + ")").html(praisehtml);
                    $(".comment:eq(" + String(i) + ")").html(commenthtml);
                    $(".photoBtn:eq(" + String(i) + ")").val(photo_id);

                }
            }

            $(".photo").click(function () {
                pid = $(this).parent().val();
                $.getJSON('/photo/upload/user/info/?photo_id=' + pid, function (data) {
                    $("#original_photo").attr("src", data.upload_photo);
                    $("#host_headshot").attr("src", data.headshot);
                    $("#host_name").html(data.nickname);
                    $("#photo_description").html(data.description);
                    $("#likeBtn").html("<span class=\"glyphicon glyphicon-heart\"></span> " + data.praise).val(pid);
                    $("#comm_img_id").val(pid);

                    var commcode = "<div class=\"row\">" +
                        "<div class=\"col-md-3\">" +
                        "<img class=\"img-circle visitor_headshot\" src=\"\" style=\"width: 50px; height: 50px;\">" +
                        "</div>" +
                        "<div class=\"col-md-9\">" +
                        "<p class=\"visitor_nickname\" style=\"font-size: 25px; color: lawngreen;\"><p class=\"floorNum\" style=\"float: right; color: #000000; font-size: 15px; font-weight: lighter;\"></p></p>" +
                        "<span class=\"comment_content\"></span>" +
                        "</div>" +
                        "<hr style=\"width: 80%; margin-left: 3%;\">" +
                        "</div>";


                    $.getJSON('/comment/upload/user/info/?photo_id=' + pid, function (data) {
                        $("#comment_part").children().remove();
                        if (data.length != 0) {
                            $("#commBtn").html("<span class=\"glyphicon glyphicon-comment\"></span> " + data.length);
                            for (var i = 0; i < data.length; i++) {
                                $("#comment_part").append(commcode);
                                $(".visitor_headshot:eq(" + String(i) + ")").attr("src", data[i].headshot);
                                $(".visitor_nickname:eq(" + String(i) + ")").html(data[i].nickname);
                                $(".comment_content:eq(" + String(i) + ")").html(data[i].content);
                                $(".floorNum:eq(" + String(i) + ")").html(i + 1 + "L");
                            }
                        }
                        else
                            $("#commBtn").html("<span class=\"glyphicon glyphicon-comment\"></span> " + 0);

                    });
                });
            });
        });
    });

});


function CheckComment()
{
    comm = document.form1.content.value;

    if(comm == "")
        return false;
    else
    {
        $("#commentForm").submit();
        $("#comment_textarea").val("");

        var commcode = "<div class=\"row\">" +
        "<div class=\"col-md-3\">" +
        "<img id=\"cheat_headshot\" class=\"img-circle visitor_headshot\" src=\"\" style=\"width: 50px; height: 50px;\">" +
        "</div>" +
        "<div class=\"col-md-9\">" +
        "<p id=\"cheat_nickname\" style=\"font-size: 25px; color: lawngreen;\"></p>" +
        "<span id=\"cheat_comment\" class=\"comment_content\"></span>" +
        "</div>" +
        "<hr style=\"width: 80%; margin-left: 3%;\">" +
        "</div>";

        $("#comment_part").append(commcode);
        $("#cheat_headshot").attr("src",global_headshot);
        $("#cheat_nickname").html(global_nickname);
        $("#cheat_comment").html(comm);

        return false;
    }

}