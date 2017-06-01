/**
 * Created by Administrator on 11/5/2017.
 */
var start=0;
var step=5;
var n=0;
$(function(){
    $.ajax({
        type:"GET",
        url:"../json/details",
        dataType:"json",
        success:detailsSucc,
        error:detailsErr
    })
    function detailsSucc(data){
        var end=start+step;
        var itemJson=data.slice(start,end);
        start=end;
        var html= "";
        $.each(itemJson, function (index) {
            //循环获取数据
            var Sender = itemJson[index].sender;
            var Date = itemJson[index].date;
            var Subject = itemJson[index].subject;
            //var Content = itemJson[index].content;
            var attachment = itemJson[index].attachment;
            if(attachment){
                html += "<li name=\"li-" + n + "\" class=\"unread\"> <a href=\"read_mail.html?id=" + n + "\"> <ul class=\"sub\"> <li> <span class=\"left name\">" + Sender + "</span><span class=\"left attachment\"><i class=\"fa fa-paperclip\"></i></span> <span class=\"right date\">" + Date + "</span> </li> <li class=\"subject\">" + Subject + "</li></ul> </a> </li>";
            }
            else{//html+= `<li name="li-${n}">
                //            <a href="read_mail.html?id=${n}">
                //                <ul class="sub">
                //                    <li>
                //                        <span class="left name">${Sender}</span>
                //                        <span class="right date">${Date}</span>
                //                    </li>
                //                    <li class="subject">${Subject}</li>
                //                    <li class="content">${Content}</li>
                //                </ul>
                //            </a>
                //       </li>`;
                html += "<li name=\"li-" + n + "\" class=\"unread\"> <a href=\"read_mail.html?id=" + n + "\"> <ul class=\"sub\"> <li> <span class=\"left name\">" + Sender + "</span> <span class=\"right date\">" + Date + "</span> </li> <li class=\"subject\">" + Subject + "</li> </ul> </a> </li>";
            }
            n++;
        });
        $("#el").prepend(html);
    }
    function detailsErr(){
        confirm("error");
    }
})
var  obj=document.getElementById("js_more");
obj.addEventListener("click",function(){
    $liMore=$(this);
    $.ajax({
        type:"GET",
        url:"../json/details",
        dataType:"json",
        success:detailsSucc,
        error:detailsErr
    })
    function detailsSucc(data) {
        //var json = JSON.parse(data); //数组
        var end =start+step;
        var itemJson = data.slice(start, end);
        start=end;
        var html = "";
        $.each(itemJson, function (index) {
            //循环获取数据
            var Sender = itemJson[index].sender;
            var Day = itemJson[index].date;

            var Subject = itemJson[index].subject;
            //var Content = itemJson[index].content;
            var attachment = itemJson[index].attachment;
            if(attachment){
                html += "<li name=\"li-" + n + "\"> <a href=\"read_mail.html?id=" + n + "\"> <ul class=\"sub\"> <li> <span class=\"left name\">" + Sender + "</span><span class=\"left attachment\"><i class=\"fa fa-paperclip\"></i></span><span class=\"right date\">" + Day + "</span> </li> <li class=\"subject\">" + Subject + "</li> </ul> </a> </li>";
            }
            else{
                //html+= `<li name="li-${n}">
                //            <a href="read_mail.html?id=${n}">
                //                <ul class="sub">
                //                    <li>
                //                        <span class="left name">${Sender}</span>
                //                        <span class="right date">${Date}</span>
                //                    </li>
                //                    <li class="subject">${Subject}</li>
                //                    <li class="content">${Content}</li>
                //                </ul>
                //            </a>
                //       </li>`;
                html += "<li name=\"li-" + n + "\"> <a href=\"read_mail.html?id=" + n + "\"> <ul class=\"sub\"> <li> <span class=\"left name\">" + Sender + "</span> <span class=\"right date\">" + Day + "</span> </li> <li class=\"subject\">" + Subject + "</li></ul> </a> </li>";
            }
            n++;
        });
        $("#js_more").before(html);
        if(itemJson.length<step){
            $liMore.children().text("加載完成，沒有更多");
            $liMore.children()[0].addEventListener('click',function(e){e.preventDefault();})
        }
    }
    function detailsErr(){
        confirm("error");
    }
})
/*-------------下拉刷新----------------*/
//$(window).scroll(function() {
//    if ($(document).scrollTop() + $(window).height() > $(document).height() - 100) {
//        $.get(url, function(data) {
//            $('#list').append(data);
//        });
//    }
//});