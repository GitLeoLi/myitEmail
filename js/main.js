/**
 * Created by Administrator on 10/5/2017.
 */
$("#menu").on("click",function(){
    $dropdown=$(this).next();
    console.log($dropdown);
    if($dropdown.css("display")=="none"){
        $dropdown.css("display","block");
    }
    else{
        $dropdown.css("display","none");
    }
})