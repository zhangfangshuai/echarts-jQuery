// 公用参数
var APP = {
    html: 'charts.html',  // 全局当前页面去向控制
    // 页面日期选择面板弹窗
    dateBar: {
          preset:'date',       // 日期
          theme:'default',     // 皮肤样式
          display:'bottom',    // 显示位置
          lang:'zh',
          mode:'scroller',     // 日期选择模式
          dateFormat:'yymmdd', // 日期格式
          setText:'确定',
          cancelText:'取消',
          showNow:true,
          nowText:'今天',
          dateOrder:'yymmdd',   // 返回日期排列格式
          startYear:2016,
          endYear:new Date().getFullYear(),  // 最大年份
          dayText: '日',
          monthText: '月',
          yearText: '年',       // 面板中年月日文字
    },
    BUBBLE_CACHE: ''
}

// 日期格式补0规范
function addZero(n) {
    return n < 10 ? '0' + n : n;
};

// 页面日期显示更新
function changeDate(num,i) {
    if($('#appDateTime'+num).val()){
        var inputDate=$('#appDateTime'+num).val();
        var year=inputDate.substr(0,4);
        var month=inputDate.substr(4,2)-1;
        var day=inputDate.substr(6,2);
        var oDate=new Date();
        oDate.setFullYear(year,month,day);
        oDate.setTime(oDate.getTime()+24*3600*1000*i);
        console.log(oDate.getDay(),getWeek(oDate.getDay()));
        $('.showWeek'+num).html(getWeek(oDate.getDay()));
        return (oDate.getFullYear()+''+addZero(oDate.getMonth()+1)+''+addZero(oDate.getDate()));
    }
};


function changeDate1(num,i) {
    if($('#appDateTime'+num).val()){
        var inputDate=$('#appDateTime'+num).val();
        var year=inputDate.substr(0,4);
        var month=inputDate.substr(4,2)-1;
        var day=inputDate.substr(6,2);
        var oDate=new Date();
        var oDateTime=oDate.getTime();
        oDate.setFullYear(year,month,day);
        oDate.setTime(oDate.getTime()+24*3600*1000*i);
        if(oDateTime<oDate.getTime()){
            return inputDate
        }
        console.log(oDate.getDay(),getWeek(oDate.getDay()));
        $('.showWeek'+num).html(getWeek(oDate.getDay()));
        return (oDate.getFullYear()+''+addZero(oDate.getMonth()+1)+''+addZero(oDate.getDate()));
    }
};

// change week by html
function changeWeekByHtml(num){
    var inputDate=$('#appDateTime'+num).val();
    var year=inputDate.substr(0,4);
    var month=inputDate.substr(4,2)-1;
    var day=inputDate.substr(6,2);
    var oDate=new Date();
    oDate.setFullYear(year,month,day);
    $('.showWeek'+num).html(getWeek(oDate.getDay()));
};


// get week
function getWeek(i){
    return '周'+'日一二三四五六'.substr(i,1)
};
// showweek of starting
function startingWeek(num){
    $('.showWeek'+num).html(getWeek(new Date().getDay()));
};
function startingWeekYesterday (num){
    $('.showWeek'+num).html(getWeek(new Date().getDay() - 1));
};
// 清除null
function nullDelete(value) {
    return value==null?'':value+'%'
};
// 实体网点
function toshi(v){
    return v==0?'实体网点':'虚拟网点'
};
function datatype(v){
    return v==1?'开启':'关闭'
};
// 根据data-value跳转对应页面
var random=Math.random().toFixed(5)
$.each($('.slideList .list'),function(i,v){
    // console.log(i,v);
    $(this).on('click',function(){
        window.location.href='../html/'+$(this).attr('data-value')+'?'+random;
    });
});

// 侧边栏
$('.slideList .list').hide();
// 目录访问权限过滤
buildAjax('get', 'getMenu', {}, false, false, function(res){
    for(var i in res.data){
        var menuId = res.data[i].menuId;
        for( var j=0; j<$('.slideList .list').length; j++){
            if($('.slideList .list').eq(j).attr('data-menuId') == menuId){
                $('.slideList .list').eq(j).show()
            }
        }
    }
});


// 侧边栏隐藏
$('.slideBtn').on('click',function(){
    $('.slideBarBg').fadeIn();
    $('.slideBar').stop().animate({'left':0});
    $('.nickName1').html(sessionStorage.nickname)
});
$('.slideBarBg').on('click',function(){
    $(this).fadeOut();
    $('.slideBar').stop().animate({'left':'-4.9333333333rem'})
});
$('.slideBar').css({'height':$(window).height()});
$('.slideBarBg').css({'height':$(window).height()});

window.onload=function () {
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    })
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false)
};

// 背景色最小高
$('body,html').css({'min-height':$(window).height()});
window.onresize=function(){
    $('.slideBar').css({'height':$(window).height()});
    $('.slideBarBg').css({'height':$(window).height()});
}
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,   // 月份
        "d+": this.getDate(),        // 日
        "h+": this.getHours(),       // 小时
        "m+": this.getMinutes(),     // 分
        "s+": this.getSeconds(),     // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3),  // 季度
        "S": this.getMilliseconds()  // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



/**
 * Created with Atom
 * Author: zhangfs
 * Date: 2018/04/09 18:50
 * Func: Ajax请求构造函数，请求默认带有token参数
 */
function buildAjax (method, uri, data, ayc, hasarrparam, s, f) {
    data.token = sessionStorage.token;
    $.ajax({
        url: http + 'mobile/' + uri,
        type: method,
        async: ayc,
        dataType: 'json',
        traditional: hasarrparam,
        data: data,
        success: (res) => {
            res.code != 200 && (() => {
              logErr(res, uri);
              return;
            })();
            s && s(res);
        },
        error: (res) => {
            logErr(res, uri);
            f && f(res);
        }
    });
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/11 11:10
 * Func: 获取城市列表页面适普函数
 */
function getCity(s, f) {
    buildAjax('get', 'getCity', {}, false, false, function(res){
        $('#demo3').val(res.data[0].text);
        let cityInit = res.data[0].value;
        var area = new LArea1();
        area.init({
            'trigger':'#demo3',
            'valueTo':'#value3',
            'keys':{ id:'value', name:'text' },
            'type':2,
            //'data':[[{"text":"北京","value":"110000"},{"text":"天津","value":"120000"}]]
            'data':[res.data]
        });
        s && s(res, cityInit);
    }, f);
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/02  18:34
 * Func: 接口错误日志监控，token失效自动登出
 */
function logErr (r, i) {
    r && r.code == '401' && (() => {
          window.location.href='../index.html';
          console.log('\n Token Expired!')
    })();
    r ? console.log('Error: '+r.desc+' \nCode: ('+r.code+') '+' \nInterface: '+i+' \nPage: '+APP.html)
      : console.log('Request Rejected  \nInterface: ' + i + ' \nPage: ' + APP.html);
}



/**
 * Created with Atom.
 * Author: zhangfs
 * Date: 2018/04/02 18:34
 * Func: 责任人功能适普函数
 */
function getPrincipal (city, idArr, page, s, f) {
   if (city == 1)  return;
   buildAjax('get', 'getPrincipal', {id:idArr, cityId: city}, true, true, function(res){
       $('.responsiblePerson-box').css('display', 'block');
       for ( var i in res.data) {
           for ( var j = 0; j < $('.section-box').length; j ++) {
               if ( res.data[i].menu_id == $('.section-box').eq(j).attr('section-id') ) {
                   var p = res.data[i].sim ? res.data[i].sim : '未提供',
                       n = res.data[i].liablename ? res.data[i].liablename : '暂无';
                   $('.section-box').eq(j).find('.phoneBubble a').html('TEL: ' + p);
                   res.data[i].sim ? $('.section-box').eq(j).find('.phoneBubble a').attr('href', 'tel:' + p)
                                   : $('.section-box').eq(j).find('.phoneBubble a').removeAttr('href');
                   $('.section-box').eq(j).find('.responsiblePerson').html('责任人: ' +  n);
                   break;
               }
           }
       };
       s && s(res);
   });
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/11 20:00
 * Func: 责任人泡泡弹窗适普函数
 */
function triggerBubble (_parent) {
    $('.phoneBubble').hide('fast');
    let _bub = _parent.children[0].classList[1];
    if (_bub != APP.BUBBLE_CACHE) {
        $('.'+_bub).show('fast');
        APP.BUBBLE_CACHE = _bub
    } else {
        APP.BUBBLE_CACHE = '';
    }
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/09 16:13
 * Func: 日期偏移及格式化。正数表示以后几天，负数表示以前几天
 */
function getDaysOffset (num) {
    num = num || 0;
    var d = new Date();
    d.setDate(d.getDate() + num);
    return d.format("yyyyMMdd");
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/11 17:45
 * Func: 单日期选择控件日期联动
 * Note: 为了向上兼容，日期部分必须要有id属性，周几部分必须要有class属性
 */
function updateDate(_parent, num, limit) {
    let id = _parent.children[1].children[0].id,
        week = _parent.children[1].children[1].classList[0];
    if ($('#'+id).val()) {
        let d = $('#'+id).val();
        let dest = new Date(d.slice(0,4) +'/'+d.slice(4,6) +'/'+ d.slice(6,8));
        dest.setTime(dest.getTime() + num*24*3600000)
        if ( limit && dest.getTime() > new Date().getTime() ) {
            return d;
        }
        $('.'+week).html(getWeek(dest.getDay()));
        return dest.format('yyyyMMdd');
    }
}


/**
 * Created: zhangfs by Atom
 * Date: 2018/04/12 10:45
 * Func: 实现jquery的html页面each遍历列表功能 - 未成形，不可用
 */
function createDomEachElement(element, objArray){
    for (let i in objArray) {
        for (let j = 0; j < $('#'+element)[0].children[0].children.length; j++) {
            let attr = $('#'+element)[0].children[0].children[j].innerHTML
            $($('#'+element)[0].children[0].children[j]).html(objArray[i][attr]);
        }
        if (i != objArray.length) {
            // $('#'+element)[0].appeng('li')
        }
    }
}
