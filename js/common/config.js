// BImobile版本
let version = '2.2.3';

// let http = 'http://39.107.226.244/';                        // test_env
let http = 'http://122.14.205.135:8110/';                      // prod_env
// let http = 'http://172.26.1.127:8080/SQBIServer-web/';      // guoguang_env
// let http = 'http://172.26.2.49:8081/';                      // chengjt env


/**
 * Create: zhangfs by Atom
 * Date: 2018/04/24 18:38
 * Func: 用户登录权限，用户可视目录控制
 */
var  menuConfig = [
    { id: 2, name: '实时监控', class: 'm-watch', page: 'watch' },
    { id: 3, name: '城市KPI考核', class: 'm-kpis', page: 'kpis' },
    { id: 4, name: '用户分析', class: 'm-user', page: 'car-user' },
    { id: 5, name: '订单分析', class: 'm-orders', page: 'orders' },
    { id: 6, name: '网点分析', class: 'm-site', page: 'site' },
    { id: 7, name: '车辆分析', class: 'm-cars', page: 'cars' },
    { id: 8, name: '客服分析', class: 'm-customer', page: 'customer-service' },
    { id: 9, name: '运营分析', class: 'm-operation', page: 'operation' },
    { id:10, name: '营收分析', class: 'm-income', page: 'income' },
    { id:64, name: 'APP分析', class: 'm-app', page: 'app' }
];



// Mixin
let APP = {
      html: 'index',            // 全局当前页面去向控制
      dateBar: {
          preset: 'date',       // 日期
          theme: 'default',     // 皮肤样式
          display: 'bottom',    // 显示位置
          lang: 'zh',           // 中文语言(需要添加中文包)
          mode: 'scroller',     // 日期选择模式
          dateFormat: 'yymmdd', // 日期格式
          setText: '确定',       // 确认按钮文案
          cancelText: '取消',    // 取消按钮文案
          showNow: true,        // 是否显示今日按钮
          nowText: '今天',       // 按钮文案
          dateOrder: 'yymmdd',  // 返回日期排列格式
          startYear: 2016,      // 起始年份
          endYear: new Date().getFullYear(),   // 最大年份
          dayText: '日',
          monthText: '月',
          yearText: '年'        // 面板上部分年月日文字
      },
      monthBar: {
          preset: 'date',
          theme: 'default',
          display: 'bottom',
          lang: 'zh',
          mode: 'scroller',
          dateFormat: 'yymm',
          setText: '确定',
          cancelText: '取消',
          showNow: true,
          nowText: '当月',
          dateOrder: 'yymm',
          startYear: 2016,
          endYear: new Date().getFullYear(),
          monthText: '月',
          yearText: '年'
      },
      timeBar: [
          {"text":"0点","value":"0"},{"text":"1点","value":"1"},{"text":"2点","value":"2"},{"text":"3点","value":"3"},
          {"text":"4点","value":"4"},{"text":"5点","value":"5"},{"text":"6点","value":"6"},{"text":"7点","value":"7"},
          {"text":"8点","value":"8"},{"text":"9点","value":"9"},{"text":"10点","value":"10"},{"text":"11点","value":"11"},
          {"text":"12点","value":"12"},{"text":"13点","value":"13"},{"text":"14点","value":"14"},{"text":"15点","value":"15"},
          {"text":"16点","value":"16"},{"text":"17点","value":"17"},{"text":"18点","value":"18"},{"text":"19点","value":"19"},
          {"text":"20点","value":"20"},{"text":"21点","value":"21"},{"text":"22点","value":"22"},{"text":"23点","value":"23"}
      ],
      siteTypeBar: [{"text":"全部","value":""},{"text":"实体","value":"0"},{"text":"虚拟","value":"1"}],
      timePeriodBar: [{"text":"近7日","value":"1"},{"text":"近15日","value":"2"},{"text":"近1月","value":"3"},{"text":"近3月","value":"4"}],
      userPeriodBar: [{"text":"近7日","value":"2"},{"text":"近15日","value":"3"},{"text":"近1月","value":"4"},{"text":"近3月","value":"5"}],
      carOperateBar: [{"text":"全部","value":"0"},{"text":"上架","value":"1"},{"text":"下架","value":"2"}],
      appVersions: [],
      BUBBLE_CACHE: ''
};



/**
 * Created: zhangfs by Atom
 * Date: 2018/04/24 10:43
 * Func: 添加文件载入版本
 * Note: 在页面资源载入之前引入，否则会因为加载问题页面渲染不上带版本号的文件
 */
(function(doc, win) {
    // rem页面布局适配  - 目前沿用老版本的flexible.js方案
    // let docEl = doc.documentElement,
    //     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    //     recalc = function() {
    //         let clientWidth = docEl.clientWidth
    //         if (!clientWidth) return
    //         if (clientWidth < 550) {
    //             docEl.style.fontSize = 24 * (clientWidth / 720) + 'px'
    //         } else {
    //             docEl.style.fontSize = 24 * (clientWidth / 1440) + 'px'
    //         }
    //     }
    // win.addEventListener(resizeEvt, recalc, false)
    // if (!doc.addEventListener) return
    // doc.addEventListener('DOMContentLoaded', recalc, false)


    let baseURI = doc.documentElement.children["0"].baseURI;
    APP.html = baseURI.split('?')[0].split('/').pop().split('.').shift();  // 同时控制页面整体走向，错误处理时使用
    let cssCtrl = [APP.html, 'service'],
        jsCtrl = [APP.html, 'service'];

    for(let i = 0; i < $('link').length; i ++){
        let cssfile = $('link')[i].href.split('/').pop().split('.')[0];
        if ( cssCtrl.indexOf(cssfile) >= 0 ) {
            $('link')[i].href.split('?')[1] ? $('link')[i].href = $('link')[i].href + '&v=' + version
                                            : $('link')[i].href = $('link')[i].href.split('?')[0] + '?v=' + version;
        }
    };

    /* 服务器强制js访问刷新，不需要加版本 */  // $('script') -bug-打印发现拿不到所有页面上的script标签
    // for(let j = 0; j < $('script').length; j ++) {
    //     let jsfile = $('script')[j].src.split('/').pop().split('.')[0];
    //     if (jsCtrl.indexOf(jsfile) >= 0) {
    //         $('script')[j].src.split('?')[1] ? $('script')[j].src = $('script')[j].src + '&v=' + version
    //                                          : $('script')[j].src = $('script')[j].src + '?v=' + version;
    //     }
    // }
})(document, window);
