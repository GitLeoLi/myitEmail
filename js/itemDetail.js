$(function(){
    var id=0;
    function GetRequest() {
        var url = location.search;
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
                id=theRequest.id;
            }
        }
        return theRequest;
    }
        GetRequest();
        $.ajax({
            type:"GET",
            url:"../json/details",
            dataType:"json",
            success:detailsSucc,
            error:detailsErr
        })
        function detailsSucc(data){
            var json=data;
            var html= "";
            $.each(json, function (index,item) {
                //循环获取数据
                if(id==item.id){
                    var Sender = json[index].sender;
                    var Subject = json[index].subject;
                    var Content = json[index].content;
                    var attachment=json[index].attachment;
                    if(attachment){
                        //html +=    `<h1 name="h1-${id}">${Subject}</h1>
                        //   <p>
                        //       <a href="#">${Sender}</a>
                        //       <a href="javascript:void(0);"><i class="fa fa-paperclip"></i></a>
                        //   </p>
                        //   <div class="content">
                        //        ${Content}
                        //   </div>
                        //   <div class="attachment">
                        //        <dl>
                        //            <dt>
                        //               <i class="fa fa-download"></i>
                        //            </dt>
                        //            <dd>
                        //                附件：<span>${attachment}</span>
                        //            </dd>
                        //        </dl>
                        //        <a href="javascript:attachfun();"><i class="fa fa-ellipsis-v"></i></a>
                        //   </div>`;
                        html += "<h1 name=\"h1-" + id + "\">" + Subject + "</h1><p><a href=\"#\">" + Sender + "</a><a href=\"javascript:void(0);\"><i class=\"fa fa-paperclip\"></i></a></p><div class=\"content\">" + Content + "</div><div class=\"attachment\"><dl><dt><i class=\"fa fa-download\"></i></dt><dd>附件：<span>" + attachment + "</span></dd></dl><a href=\"javascript:attachfun();\"><i class=\"fa fa-ellipsis-v\"></i></a></div>";
                    }
                    else{
                        //html +=`<h1 name="h1-${id}">${Subject}</h1>
                        //        <p>
                        //            <a href="#">${Sender}</a>
                        //        </p>
                        //        <div class="content">
                        //                ${Content}
                        //        </div>`;
                        html += "<h1 name=\"h1-" + id + "\">" + Subject + "</h1><p><a href=\"#\">" + Sender + "</a></p><div class=\"content\">" + Content + "</div>";
                    }
                }
            });
            $("section").append(html);
            var content=$(".content")[0];
            var hString=getStyle(content,"height");
            var h=parseFloat(hString)/10;
            if(h<24){
                $(".attachment").addClass("fixed");
            }
        }
        function detailsErr(){
            confirm("error");
        }
    }
)
function getStyle(obj,css){
    if(obj.currentStyle){
        return obj.currentStyle[css];
    }
    else{
        return getComputedStyle(obj,false)[css];
    }
}
function attachfun(){
    var text=$(".attachment span").text();
    //textHtml=`<ul>
    //                <li><span>${text}</span></li>
    //                <li><a href="write_mail.html">郵件發送</a></li>
    //                <li><a href="javascript:download();">保存文件</a></li>
    //                <li><a href="javascript:cancel();">取消</a></li>
    //            </ul>`;
    var textHtml = "<ul><li><span>" + text + "</span></li><li><a href=\"write_mail.html\">郵件發送</a></li><li><a href=\"javascript:download();\">保存文件</a></li><li><a href=\"javascript:cancel();\">取消</a></li></ul>";
    $("#js_model").html(textHtml).css("display","block");
    $("#js_model>ul").addClass("show");
}
function cancel(){
    $("#js_model").html("<div>該條郵件已刪除</div>").css("display","none");
}
function download(){
    $("#js_model").html("<div>正在下載該附件...</div>");
    var time=setTimeout(function(){
        $("#js_model").html("<div>附件下載完畢！</div>");
        var t=setTimeout(function(){
            clearTimeout(t);
            t=null;
            $("#js_model").css("display","none");
        },2000);
        clearTimeout(time);
        time=null;
    },3000);
}
//function update(id){
//    $.ajax({
//        type:"GET",
//        url:"../json/details",
//        dataType:"json",
//        success:detailsSucc,
//        error:detailsErr
//    })
//    function detailsSucc(data){
//        var json = eval(data); //数组
//        var html= "";
//        $.each(json, function (index,item) {
//            //循环获取数据
//            if(id==item.id){
//                var Sender = json[index].sender;
//                //var Date = json[index].date;
//                var Subject = json[index].subject;
//                var Content = json[index].content;
//                html +=    `<h1 name="h1-${id}">${Subject}</h1>
//                           <p>
//                               <a href="javascript:void(0);">${Sender}</a>
//                               <a href="javascript:void(0);"><i class="fa fa-paperclip"></i></a>
//                           </p>
//                           <div class="content">
//                                ${Content}
//                           </div>
//                           <div class="attachment">
//                                <span>附件：xxx.rar</span>
//                                <a href="javascript:void(0);"><i class="fa fa-ellipsis-v"></i></a>
//                           </div>`;
//            }
//        });
//        $("section").html(html);
//    }
//    function detailsErr(){
//        confirm("error");
//    }
//}
//function prevItem(){
//    var name=$("h1[name^='h1-']").attr("name");
//    var i=name.indexOf("-");
//    var id=name.substr(i+1);
//    id-=(id>=1)?1:0;
//    update(id);
//}
//function nextItem(){
//    var name=$("h1[name^='h1-']").attr("name");
//    var i=name.indexOf("-");
//    var id=name.substr(i+1);
//    id++;
//    update(id);
//}

$("#js_prev")[0].addEventListener("click",function(e){
        e.preventDefault();
        prevItem();
})
$("#js_next")[0].addEventListener("click",function(e){
        e.preventDefault();
        nextItem();
})

$("#trash")[0].addEventListener("click",function(){
    $("#js_model").html("<div> 該郵件已刪除！</div>").css("display","block");
    var modelShow=setTimeout(function(){
        $("#js_model").css("display","none");
        clearTimeout(modelShow);
        modelShow=null;
        changeUrl();
    },3000)
})
function changeUrl(){
    var oldUrl=location.href;
    var index=oldUrl.lastIndexOf("/");
    if(index!=-1){
        var newHost=oldUrl.substr(0,index+1);
        var newUrl=newHost+"files.html";
        location.href=newUrl;
    }
}
function request(paras,num){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length);
    var paraArr=paraString.split("&");
    var paraObj = {};
    for (var i=0,j=paraArr[i];i<paraArr.length;i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = parseInt(paraObj[paras.toLowerCase()])+parseInt(num);
    var theurl=url.substr(0,url.indexOf("?"))+"?id=";
    if(typeof(returnValue)=="undefined"||returnValue<0){
        return true;
    }else if(returnValue>11){
        return false;

    }else{
        return theurl+returnValue;
    }
}

function prevItem(){
    var newUrl;
    newUrl=request("id",-1);
    if(typeof(newUrl)=="boolean"){
        $("#js_model").html("<div>當前郵件已為最前！</div>").css("display","block");
        var time=setTimeout(function(){
           $("#js_model").css("display","none");
        },2000);
    }
    else{
        location=newUrl;
    }
}
function nextItem(){
    var newUrl;
    newUrl=request("id",1);
    if(typeof(newUrl)=="boolean"){
        $("#js_model").html("<div>當前郵件已為最後！</div>").css("display","block");
        var time=setTimeout(function(){
            $("#js_model").css("display","none");
        },2000);
    }
    else{
        location=newUrl;
    }
}