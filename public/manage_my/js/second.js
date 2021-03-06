$(function () {
    // 定义变量
    var myPageNum = 1;
    var myPageSize = 5;

    // 1.页面打开获取数据 渲染页面
    function getData() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            data: {
                page: myPageNum,
                pageSize: myPageSize
            },
            success: function (backData) {
                console.log(backData)
                $('tbody').html(template('second', backData));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(backData.total/backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        console.log(event)// 插件封装的事件参数
                        console.log(originalEvent);// 原始事件参数
                        console.log(type);// 点的按钮类型是什么
                        // 为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNum =page;
                        // 重新获取数据
                        getData();
                    }
                });

            }
        })
    }

    // 默认调用一次
    getData();

    // ajax传文件回顾
    /*
        var xhr = new XMLHttpRequest();
        xhr.open('post','xxx.php');
        xhr.setRequestHeader();
        xhr.onload = function(){
            console.log(xhr.responseText);
        }
        // xhr2.0
        // formData 自动获取表单中的数据 有name属性
        var sendData = new FormData(document.querySelector('form'));
        // 额外的追加 数据
        sendData.append('icon',document.querySelector('input[type=file]').files[0]);
        xhr.send();

        $.ajax({
            data:sendData,
            // 忽视请求头
            processType:false,
            // 不对数据格式转换
            contentType:false
        })
    */

    // 初始化文件上传
    $("#fileUpload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
        //   console.log(data);
          console.log(data.result.picAddr);
          // 设置给img
          $('form img').attr('src',data.result.picAddr);
        }
      });

})