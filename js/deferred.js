/**
 * Created by wufulin on 14-9-26.
 */

$.ajax({
    url: 'test.html',
    success:function(){},
    error:function(){}
});

$.ajax('test.html')
    .done(function(){})
    .fail(function(){})
    .done(function(){alert("第二个回调函数！")});


// 为多个操作指定回调函数

$.when($.ajax("test.html"), $.ajax("test2.html"))
 .done(function(){alert("哈哈")})
 .fail(function(){});

// 普通操作的回调函数接口
var wait = function(dtd){
    var dtd = $.Deferred(); // 在函数内部，新建一个deferred对象
    var task = function(){
        alert("执行完毕");
        dtd.resolve();  // 改变deferred对象的执行状态
//        dtd.reject();
    };
    setTimeout(task, 5000);
    return dtd.promise();
};

$.when(wait())
 .done(function(){alert("哈哈，成功了")})
 .fail(function(){alert('出错啦')});

$.when($.ajax('/main.php'))
 .then(successFunc, failureFunc)
 .always(function(){});