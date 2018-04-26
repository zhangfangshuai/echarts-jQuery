/**
 * Author: dameng by webstorm
 * Update: zhangfs by Atom
 * Func: 获取选中日期周几
 * Params: 控件后面的采数字
 */
window.onload = function () {
    $('body, html').css({'min-height':$(window).height()});
    $('.slideBar').css({'height':$(window).height()});
    $('.slideBarBg').css({'height':$(window).height()});
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1){
            event.preventDefault();
        }
    }, false)
    var lastTouchEnd = 0;
    document.addEventListener('touchend',function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300){
            event.preventDefault();
        }
        lastTouchEnd = now;
    },false)
};
// 监控横竖屏现象
window.onresize = function(){
    $('.slideBar').css({'height':$(window).height()});
    $('.slideBarBg').css({'height':$(window).height()});
}




 /**
  * Created: zhangfs by Atom
  * Date: 2018/04/23 20:28
  * Func: 目录访问权限的控制及用户目录生成
  */
menuMaker();
function menuMaker() {
    sessionStorage.page = sessionStorage.page || menuConfig[0].page;
    buildAjax('get', 'getMenu', {}, false, false, function(res) {
       if (res.data && res.data.length != 0) {
          let slideUser = "<div class='slideUser'> <div></div> <div>"+ sessionStorage.nickname +"</div> </div>"
          let userMenu = "<div class='slideMenu'> <ul> "
          for (let m of menuConfig) {
              for(let d of res.data) {
                  if (d.menuId == m.id) {
                      let active = sessionStorage.page == m.page ? 'active' : '';
                      userMenu += "<li class='"+ m.class +"' data-menuId='"+ m.id +"' data-value='"+m.page+"'>" +
                      "<span class='"+ active +"'></span> <p class='"+ active +"'>"+ m.name +"</p> </li>";
                      break;
                  }
              }
          }
          userMenu += " </ul> </div> <a href='../index.html'>退出登陆</a>";
          let slideBar = document.createElement("div");
          slideBar.className = "slideBar";
          slideBar.style.display = "none";  // 防止出现加载缓慢时闪现黑色大字问题
          slideBar.innerHTML = slideUser + userMenu;
          $(document.body).prepend(slideBar);
          let slideBarBg = document.createElement("div");
          slideBarBg.className  = "slideBarBg";
          $(document.body).prepend(slideBarBg);
       }
    })
}




/**
 * Create: zhangfs by Atom
 * Date: 2018/04/24 12:08
 * Func: 路由控制 +随机数
 * Note: 函数执行在事件流的冒泡阶段，因此必须定义在目录创建之后
 */
$.each($('.slideMenu>ul>li'),function(i,e){
    $(this).on('click',function(){
        $('.slideMenu>ul>li').removeClass('active');
        $(this).addClass('active');
        // 除实时监控外，其他页面点击本页面不重载
        if (sessionStorage.page != menuConfig[0].page && sessionStorage.page == $(this).attr('data-value')) {
            $('.slideBarBg').fadeOut();
            $('.slideBar').stop().animate({'left':'-4.93rem'})
            return;
        }
        sessionStorage.page = $(this).attr('data-value');
        window.location.href='../html/'+$(this).attr('data-value')+'.html?v=' + version;   //  + '&r=' + Math.random().toFixed(5)
    });
});




/**
 * Created: zhangfs by Atom
 * Date: 2018/04/23 10:20
 * Func: 用户目录信息控制 及目录显示隐藏
 */
$('.slideBtn').on('click',function() {
    $('.slideBarBg').fadeIn();
    $('.slideBar').css('display', 'block');
    $('.slideBar').stop().animate({'left':0});
});
/* Func: 点击空白处隐藏 */
$('.slideBarBg').on('click',function(){
    $(this).fadeOut();
    $('.slideBar').stop().animate({'left':'-4.93rem'});
});




/**
 * Author: zhangfs by Atom
 * Date: 2018/04/09 18:50
 * Func: Ajax请求构造函数，请求默认带有token参数
 * Params: http方法，执行接口名，所需参数(默认带有token)，是否异步执行，是否含有需要遍历执行的参数，成功回调，失败回调
 */
function buildAjax (method, uri, data, ayc, hasarrparam, s, f) {
    if (uri != "loginOn" ) { data.token = sessionStorage.token }
    $.ajax({
        url: http + 'mobile/' + uri,
        type: method,
        async: ayc,
        dataType: 'json',
        traditional: hasarrparam,
        data: data,
        success: (res) => {
            if (res.code != 200) {
                errorHandler(res, uri);
                f && f(res);
                return;
            }
            s && s(res);
        },
        error: (res) => {
            errorHandler(res, uri);
            f && f(res);
        }
    });
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/02  18:34
 * Func: 接口错误日志监控，token失效自动登出
 * Params: 两个参数： 执行返回的结果集，正在访问的接口名
 */
function errorHandler (r, i) {
    try {
        r && Tip.success(r.desc);
        if (i == 'loginOn' || i == 'event') return;
        window.location.href = '../index.html';
        console.log('Error: '+r.desc+' \nCode: ('+r.code+') '+' \nInterface: '+i+' \nPage: '+APP.html);
    } catch (e) {
        Tip.success('请求'+i+'失败');
        console.log('请求'+i+'失败 \n\nInterface: ' + i + ' \nPage: ' + APP.html);
    }
}




/**
 * Created: zhangfs by Atom
 * Date: 2018/04/11 11:10
 * Func: 获取城市列表页面适普函数
 * Params: 成功执行回调， 失败执行的回调
 */
function getCity(s, f) {
    buildAjax('get', 'getCity', {}, false, false, function(res){
        $('#demo3').val(res.data[0].text);
        let cityInit = res.data[0].value;
        triggerLArea1("#demo3", "#value3", res.data);
        s && s(res, cityInit);
    }, f);
}




/**
 * Created: zhangfs by Atom
 * Date: 2018/04/02 18:34
 * Func: 责任人功能适普函数
 * Params: 四个参数：城市id，查询的表格id数组，成功回调函数，失败回调函数
 */
function getPrincipal (city, idArr, s, f) {
   if (city == 1)  return;
   buildAjax('get', 'getPrincipal', {id:idArr, cityId: city}, true, true, function(res){
       $('.responsiblePerson-box').show('fast');
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
   }, f);
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/11 20:00
 * Func: 责任人泡泡弹窗适普函数
 * Params: 一个参数： 触发事件元素的父元素作用域
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
 * Func: 日期偏移及格式化。
 * Params: 0个或1个： 偏移的天数，正数表示以后几天，负数表示以前几天
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
 * Func: 单日期选择控件日期点击前一天后一天数据联动
 * Note: 为了向上兼容，日期部分必须要有id属性，周几部分必须要有class属性
 * E.g.: 订单分析
 */
function updateDate(_parent, num, limit) {
    let id = _parent.children[1].children[0].id,
        week = _parent.children[1].children[1].classList[0];
    if ($('#'+id).val()) {
        let d = $('#'+id).val();
        let dest = new Date(d.slice(0,4) +'/'+d.slice(4,6) +'/'+ d.slice(6,8));
        dest.setTime(dest.getTime() + num*24*3600000);
        if ( limit && dest.getTime() > new Date().getTime() ) {
            return d;
        }
        $('.'+week).html(getWeek(dest.getDay()));
        return dest.format('yyyyMMdd');
    }
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/14 16:48
 * Func: 列表的分页控制器。 页面格式需按照设定格式书写，否则不生效
 * Params: 三个参数： 作用域，当前页面，执行刷新页面函数
 */
function pagingCtrl (_this, page, refUI) {
    if (_this.classList[1].split('-')[1] == 'prepage') {
        page > 1 ? (() => {
            page --;
            refUI && refUI(page);
        })() : console.log('Top page!');
    } else {
        page < parseInt($('.'+_this.classList[1].split('-')[0]+'-allpage').html()) ? (() => {
            page ++;
            refUI && refUI(page);
        })() : console.log('Last page!');
    }
    $('.'+_this.classList[1].split('-')[0]+'-nowpage').html(page);
    return page;
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/17 15:23
 * Func: 条件切换时重置表格翻页的页面
 * Params: 要重置的表格当前页的class类
 * E.g.: 车辆分析
 */
function resetPaging (i) {
    $('.' + i).html(1);
    return 1;
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/16 11:37
 * Func: h5弹出元素选择列表控件
 * Params: 三个参数： 出发点击事件的id，执行反馈的id，插入到弹窗列表的数据
 * E.g.: 网点分析
 */
function triggerLArea1 (triggerId, actionId, data) {
    let area = new LArea1();
    area.init({
        'trigger': triggerId,
        'valueTo': actionId,
        'keys': {
            id: 'value',
            name: 'text'
        },
        'type': 2,
        'data': [data]
        //'data':[[{"text":"北京","value":"110000"},{"text":"天津","value":"120000"}]]
    });
}




/**
 * Author: dameng by webstorm
 * Func: 日期格式化函数
 */
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
 * Created: zhangfs by Atom
 * Date: 2018/04/10 10:21
 * Func: 设置单时间选择器的周几数据/html/watch.html?v=2.0.1
 * Params: 周几控件种的最后一个数据.如showeek1，则num = 1
 */
function startingWeek(num){
    $('.showWeek'+num).html(getWeek(new Date().getDay()));
};
function startingWeekYesterday (num){
    $('.showWeek'+num).html(getWeek(new Date().getDay() - 1));
};




/**
 * Author: dameng by webstorm
 * Func: 获取选中日期周几
 * Params: 控件后面的采数字
 */
function getWeek(i){
    return '周' + '日一二三四五六'.substr(i,1);
};
function updateWeek(_this){
    let i = $(_this).attr('id').charAt($(_this).attr('id').length-1);
    let d = $(_this).val();
    let dest = new Date(d.slice(0,4) +'/'+d.slice(4,6) +'/'+ d.slice(6,8));
    $('.showWeek'+i).html(getWeek(dest.getDay()));
}



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/16 15:12
 * Func: 将返回数据中网点类型翻译成中文
 * Params: 网点参数
 * E.g.: 网点分析
 */
function siteType (t) {
    return t == 0 ? "实体网店" : "虚拟网点"
}

/**
 * Func: 将返回数据中网点变更状态翻译成中文
 * Params: 变更状态参数
 */
function changeType (t) {
    return t == 1 ? "开启" : "关闭"
}

/**
 * Func: 处理返回值带null字段数据
 * Params: 需修改字段参数
 */
function nullHandle(t) {
    return t == null ? '-' : t;
};


/**
 * Func: 返回数据中时间戳转所需日期格式
 * Params: 要转换的时间戳
 */
function time2Date (timestamp) {
    let d = new Date();
    d.setTime(timestamp);
    return d.format('yyyyMMdd');
}




/**
 * Created: zhangfs by Atom
 * Date: 2018/04/26 12:01
 * Func: 埋点及事件上报
 */

function reportEntry(base) {
    var data = base || {};
    data['reportType'] = 'entry';
    buildReport(data);
}

function reportLeave(base) {
    var data = base || {};
    data['reportType'] = 'leave';
    buildReport(data);
}

function reportEvent(evt, base) {
    var data = base || {};
    data['reportType'] = 'event';
    data['reportName'] = evt || '';
    postReport(data);
}

function postReport(data, r) {
    var retry = r || 0;
    if (!data['reportTime']) {
        data['reportTime'] = new Date().toISOString();
        data['userName'] = localStorage.user || '';
        data['nickname'] = sessionStorage.nickname || '';
        data['ip'] = sessionStorage.ip || '';
        data['address'] = sessionStorage.address || '';
        data['entryTime'] = sessionStorage.entryTime || '';
        data['device'] = sessionStorage.device || '';
        data['platform'] = sessionStorage.platform || '';
        data['page'] = APP.html || '';
        data['BIversion'] = version;
        data['channel'] = 1;    // 1: app. 2: pc
    }
    console.log(data);
    // debugger;
    buildAjax('post', 'event', data, true, false, function(res) {
    }, function(res) {
        retry < 3 && setTimeout(function(){ postReport(data, ++retry) }, 200);
        retry > 3 && console.log(data['eventName'] + '上报失败');
    });
}
