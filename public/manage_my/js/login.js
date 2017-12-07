$(function(){
    $('button[type=submit]').click(function(event){
        event.preventDefault();
        // event.preventDefault();阻止事件跳转
        $.ajax({
            url:"/employee/employeeLogin",
            data:$("form").serialize(),
            type:'post',
            success:function(backData){
                console.log(backData);
            }
        })
    })
})