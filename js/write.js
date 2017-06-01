/**
 * Created by Administrator on 11/5/2017.
 */
$(function(){
    //$fragment=`<ul ><li>抄送/密送，發件人：<span>88888888@qq.com</span></li></ul>
    //           <ul style="display:none;" id="js_addUl">
    //                <li>
    //                    <div>
    //                        <span>抄送：</span>
    //                        <input type="text"/>
    //                        <a id="js_add1" href="../mail/contacts.html"><i class="fa fa-plus-square"></i></a>
    //                    </div>
    //                </li>
    //                <li>
    //                    <div>
    //                        <span>密送：</span>
    //                        <input type="text"/>
    //                        <a id="js_add2" href="../mail/contacts.html"><i class="fa fa-plus-square"></i></a>
    //                    </div>
    //                </li>
    //                <li> 發件人：<b>88888888.com</b></li>
    //           </ul>`;
    $fragment = "<ul ><li>抄送/密送，發件人：<span>88888888@qq.com</span></li></ul> <ul style=\"display:none;\" id=\"js_addUl\"><li><div><span>抄送：</span><input type=\"text\"/><a id=\"js_add1\" href=\"../mail/contacts.html\"><i class=\"fa fa-plus-square\"></i></a></div></li><li><div><span>密送：</span><input type=\"text\"/><a id=\"js_add2\" href=\"../mail/contacts.html\"><i class=\"fa fa-plus-square\"></i></a></div></li><li>發件人：<b>88888888.com</b></li></ul>";
    $("#el").append($fragment);
})

$(".write-file")[0].addEventListener("click",function(even){
    var target=even.target;
    var t=$(target);
    //var tClass= t[0].getAttribute("class");
    if($('#el').has(t).length==0|| $("#el")==t){
        $("#el>ul:first-child").css("display","block").next().css("display","none");
        $("#js_add").css("display","block");
    }
    else{
        $("#el>ul:first-child").css("display","none").next().css("display","block");
        $("#js_add").css("display","none");
    }
})

//$("#js_addUl")[0].addEventListener("click",function(e){
//    $("#js_add").css("display","none");
//    var target=e.target;
//    var t=$(target);
//    $grandpa=$("#js_add1").parent().parent();
//    console.log($grandpa);
//    if($grandpa.has(t).length==0||$grandpa==t){
//        $("#js_add1").css("display","none");
//        $("#js_add2").css("display","block");
//    }
//    else{
//        $("#js_add1").css("display","block");
//        $("#js_add2").css("display","none");
//    }
//})//注意:此時#js_add2的style.display不等於none;

$("#send")[0].addEventListener("click",function(e){
    e.preventDefault();
    $("#js_model").css("display","block");
    var modelShow=setTimeout(function(){
        $("#js_model").css("display","none");
        clearTimeout(modelShow);
        modelShow=null;
    },3000)
})
function addAtachment(){
    var result=$("#js_addAttach").hasClass('click');
    if(result){
        $("#js_attachment").css("display","none").removeClass("show");
        $("#js_addAttach").removeClass("click");
    }
    else{
        $("#js_attachment").css("display","block").addClass("show");
        $("#js_addAttach").addClass("click");
    }
}
//function time(){
//    var time=new Date();
//    var month=time.getMonth()+1>10?time.getMonth()+1:"0"+(time.getMonth()+1);
//    var day=time.getDate()>10?time.getDate():"0"+time.getDate();
//    var Day=month+"月"+day+"日";
//}