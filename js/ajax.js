//www.baidu.com?a=1&b=2
//get方式有缓存
//相同的网址只访问一次
//www.baidu.com?t=0.1111
//www.baidu.com?t=0.222
function json2url(json) {
    //{a:1,b:2};--->'a=1&b=2'
    var arr=[];
    json.t=Math.random();
    //{a:1,b:2,t:0.111}
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    //[a=1,b=2,t=0.111]
    return arr.join('&')
}
function ajax(json) {
    //防止用户如果没有传json会程序报错
    var json=json||{};
    var data=json.data||{};
    //如果没有路径，不行
    if(!json.url){
        alert('必须填写路径');
        return
    }
    var type=json.type||'GET';  //默认get
    var async=json.async||true; //默认异步

    //创建一个ajax
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch (type.toUpperCase()){
        case 'GET':
            //建立连接  oAjax.open(method,url,是否异步)
            //数据在地址栏中拼接发送
            oAjax.open('GET',json.url+'?'+json2url(data),async);
            //发送
            oAjax.send();
            break;
        case 'POST':
            oAjax.open('POST',json.url,async);
            //设置一个消息头
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            //Content-Type:application/x-www-form-urlencoded
            //数据在send里面发送
            oAjax.send(json2url(data));
            break
    }

    //接收
    oAjax.onreadystatechange=function () {
        if(oAjax.readyState==4){
            if(oAjax.status>=200 && oAjax.status<300){
                json.success && json.success(oAjax.responseText);  //如何有成功的函数就调用成功的函数，成功的函数传接收到的数据
            }else{
                json.error && json.error(oAjax.status);
            }
        }
    }
}
















