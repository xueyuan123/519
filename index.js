var global_nickname = ""
var global_headshot = ""
var global_signature = ""

$(document).ready(function() {
    $.getJSON('/user/info/', function(data){
        global_headshot = data.headshot;
        global_nickname = data.nickname;
        global_signature = data.signature;
        $("#user_headshot").attr('src','/static/images/defaultheadshot.png');
    });


//~~~~~~Dynamic loading high praise photo      begin~~~~~~~~~~~~~~~~~~~
    var photocode = "<div class=\"photodiv col-md-2 photo_frame\">" +
        "<div class=\"img_div\">" +
        "<button class=\"thumbnail photoBtn\" data-toggle=\"modal\" data-target=\"#myModal\" value=\"\">" +
        "<img class=\"photo\" src=\"\">" +
        "</button>" +
        "</div>" +
        "<footer>" +
        "<span class=\"praise\" ><span class=\"glyphicon glyphicon-thumbs-up\"></span> </span>" +
        "<span class=\"comment\" style=\"margin-left: 20%;\"><span class=\"glyphicon glyphicon-comment\"></span> </span>" +
        "</footer>" +
        "</div>";

    var rowcode = "<div class=\"row photoShow\" style=\"margin-top: 2%; padding: 0;\">" +
                   "</div>";



    $.getJSON('/user/all/photo/', function(data){
        for(var i = 0, j = -1; i < data.length; i++)
        {
            var praise = data[i].praise;
            var comment = data[i].commnum;

            var photo_url = data[i].upload_photo;

            //var x = photo_url.split('.')[0] + "cut.";
            //var photo_url1 = x + photo_url.split('.')[1];
            //alert(photo_url);
            var photo_url1 = photo_url + "?imageView2/1/w/250/h/250/q/75";
            var photo_id = data[i].photo_id;
            var praisehtml = "<span class=\"glyphicon glyphicon-thumbs-up\"></span> " + praise;
            var commenthtml = "<span class=\"glyphicon glyphicon-comment\"></span> " + comment;


            if((i + 1) % 5 == 1)
            {
                j++;
                $("#photoFrame").append(rowcode);
                $(".photoShow:eq("+ String(j) +")").append(photocode);
                $(".photodiv:eq("+ String(i) +")").css("margin-left", "6%");
                $(".photo:eq("+ String(i) +")").attr("src", photo_url1);
                $(".praise:eq("+ String(i) +")").html(praisehtml);
                $(".comment:eq("+ String(i) +")").html(commenthtml);
                $(".photoBtn:eq("+ String(i) +")").val(photo_id);
            }
            else
            {
                $(".photoShow:eq("+ String(j) +")").append(photocode);
                $(".photo:eq("+ String(i) +")").attr("src", photo_url1);
                $(".praise:eq("+ String(i) +")").html(praisehtml);
                $(".comment:eq("+ String(i) +")").html(commenthtml);
                $(".photoBtn:eq("+ String(i) +")").val(photo_id);

            }
        }



        //~~~~~~~~~~~~ modal part dynamic loading      begin ~~~~~
        $(".photo").click(function(){
            $("#likeBtn").attr("disabled", false);
            pid = $(this).parent().val();
            $.getJSON('/photo/upload/user/info/?photo_id=' + pid, function(data){
                $("#original_photo").attr("src", data.upload_photo);
                $("#host_headshot").attr("src", data.headshot);
                $("#host_name").html(data.nickname);
                $("#photo_description").html(data.description);
                $("#likeBtn").html("<span class=\"glyphicon glyphicon-heart\"></span> " + data.praise).val(pid);
                $("#comm_img_id").val(pid);
                $("#followBtn").val(data.u_id);

                var commcode = "<div class=\"row\">" +
                    "<div class=\"col-md-3\">" +
                    "<img class=\"img-circle visitor_headshot\" src=\"\" style=\"width: 50px; height: 50px;\">" +
                    "</div>" +
                    "<div class=\"col-md-9\">" +
                    "<p class=\"visitor_nickname\" style=\"font-size: 25px; color: lawngreen;\"><span class=\"floorNum\" style=\"float: right; color: #000000; font-size: 15px; font-weight: lighter;\">1L</span></p>" +
                    "<span class=\"comment_content\"></span>" +
                    "</div>" +
                    "<hr style=\"width: 80%; margin-left: 3%;\">" +
                    "</div>";



                $.getJSON('/comment/upload/user/info/?photo_id=' + pid, function(data){
                    $("#comment_part").children().remove();
                    if(data.length != 0)
                    {
                        $("#commBtn").html("<span class=\"glyphicon glyphicon-comment\"></span> " + data.length);
                        for(var i = 0; i < data.length; i++)
                        {
                            $("#comment_part").append(commcode);
                            $(".visitor_headshot:eq("+ String(i) +")").attr("src",data[i].headshot);
                            $(".visitor_nickname:eq("+ String(i) +")").html(data[i].nickname);
                            $(".comment_content:eq("+ String(i) +")").html(data[i].content);
                            $(".floorNum:eq("+ String(i) +")").html(i + 1 + "L");
                        }
                    }
                    else
                        $("#commBtn").html("<span class=\"glyphicon glyphicon-comment\"></span> " + 0);

                });
            });
        });
        //~~~~~~~~~~~~ modal part dynamic loading      end ~~~~~~
    });
//~~~~~~Dynamic loading high praise photo      end~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~Praise Photo           begin~~~~~~~~~~~~~~~~~~~~~~~~~

    $("#likeBtn").click(function(){
        $.get("/user/praise/?pid="+ $(this).val(), function(data, status){
            if(String(data) != "0")
                $("#likeBtn").html("<span class=\"glyphicon glyphicon-heart\"></span> " + data).attr("disabled", "disabled");
        });
    });

// ~~~~~~~~~~~Praise Photo           end~~~~~~~~~~~~~~~~~~~~~~~~~


    $("#changeInfo").click(function(){
        $("#change_info_nickname").val(global_nickname);
        $("#change_info_signature").val(global_signature);
    });

    $("#change_info_submit_btn").click(function() {
        $("#myModal2").modal('toggle');
    });

    $("#followBtn").click(function(){
        $.get("/user/follow/?u_id="+ $(this).val(), function(data, status){

        });
    });


});

function CheckComment()
{
    comm = document.form.content.value;
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



