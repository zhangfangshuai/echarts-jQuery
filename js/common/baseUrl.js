
//baseurl
var http='http://122.14.205.135:8110/'; //正式接口
// var http='http://10.16.86.213:8080/SQBIServer-web/'; //apple本地接口

// depends this json to judge login
// prod env
var menuArr = ['2','3','4','5','6','7','8','9','10'],
    menuJson = {
    '2':'charts.html',           //实时监控
    '3':'kpis.html',             //城市KPI考核
    '4':'car-user.html',         //用户分析
    '5':'oreders.html',          //订单分析
    '6':'site.html',             //网点分析
    '7':'cars.html',             //车辆分析
    '8':'customer-service.html', //客服分析分析
    '9':'operation.html',        //运营分析==车资
    '10':'income.html'           //营收分析
};
