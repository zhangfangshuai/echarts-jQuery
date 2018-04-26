// 项目版本 version
let version = '2.0.1';

// let http='http://10.16.86.213:8080/SQBIServer-web/';  // test_env
let http = 'http://122.14.205.135:8110/';  // prod_env

/**
 * Create: zhangfs by Atom
 * Date: 2018/04/24 18:38
 * Func: 用户登录权限检查，用户可视目录控制
 */
var  menuConfig = [
    { id: 2, name: '实时监控', class: 'm-watch', page: 'watch'},
    { id: 3, name: '城市KPI考核', class: 'm-kpis', page: 'kpis'},
    { id: 4, name: '用户分析', class: 'm-user', page: 'car-user'},
    { id: 5, name: '订单分析', class: 'm-orders', page: 'orders'},
    { id: 6, name: '网点分析', class: 'm-site', page: 'site'},
    { id: 7, name: '车辆分析', class: 'm-cars', page: 'cars'},
    { id: 8, name: '客服分析', class: 'm-customer', page: 'customer-service'},
    { id: 9, name: '运营分析', class: 'm-operation', page: 'operation'},
    { id:10, name: '营收分析', class: 'm-income', page: 'income'}
];




// Mixin
let APP = {
      html: menuConfig[0].page,     // 全局当前页面去向控制
      dateBar: {
          preset: 'date',       // 日期
          theme: 'default',     // 皮肤样式
          display: 'bottom',    // 显示位置
          lang: 'zh',
          mode: 'scroller',     // 日期选择模式
          dateFormat: 'yymmdd', // 日期格式
          setText: '确定',
          cancelText: '取消',
          showNow: true,
          nowText: '今天',
          dateOrder: 'yymmdd',   // 返回日期排列格式
          startYear: 2016,
          endYear: new Date().getFullYear(),  // 最大年份
          dayText: '日',
          monthText: '月',
          yearText: '年',       // 面板中年月日文字
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
      BUBBLE_CACHE: ''
};




/**
 * Created: zhangfs by Atom
 * Date: 2018/04/24 10:43
 * Func: 添加文件载入版本
 */
(function(doc, win) {
    let baseURI = doc.documentElement.children["0"].baseURI;
    APP.html = baseURI.split('?')[0].split('/').pop().split('.').shift();  // 也控制页面整体走向
    let cssCtrl = [APP.html, 'service'],
        jsCtrl = [APP.html, 'service'];

    for(let i = 0; i < $('link').length; i ++){
        let cssfile = $('link')[i].href.split('/').pop().split('.')[0];
        if ( cssCtrl.indexOf(cssfile) >= 0 ) {
            $('link')[i].href.split('?')[1] ? $('link')[i].href = $('link')[i].href + '&v=' + version
                                            : $('link')[i].href = $('link')[i].href.split('?')[0] + '?v=' + version;
        }
    };

    /* 服务器强制js访问刷新，不需要加版本 */  // $('script') -bug-获取不到页面上的所有标签
    // for(let j = 0; j < $('script').length; j ++) {
    //     let jsfile = $('script')[j].src.split('/').pop().split('.')[0];
    //     if (jsCtrl.indexOf(jsfile) >= 0) {
    //         $('script')[j].src.split('?')[1] ? $('script')[j].src = $('script')[j].src + '&v=' + version
    //                                          : $('script')[j].src = $('script')[j].src + '?v=' + version;
    //     }
    // }
})(document, window);
