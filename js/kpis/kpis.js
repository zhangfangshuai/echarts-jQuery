/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15
 * Time: 09:05
 *
 */
$(function () {
    var geoCoordMap = {
        "海门":[121.15,31.89],
        "鄂尔多斯":[109.781327,39.608266],
        "招远":[120.38,37.35],
        "舟山":[122.207216,29.985295],
        "齐齐哈尔":[123.97,47.33],
        "盐城":[120.13,33.38],
        "赤峰":[118.87,42.28],
        "青岛":[120.33,36.07],
        "乳山":[121.52,36.89],
        "金昌":[102.188043,38.520089],
        "泉州":[118.58,24.93],
        "莱西":[120.53,36.86],
        "日照":[119.46,35.42],
        "胶南":[119.97,35.88],
        "南通":[121.05,32.08],
        "拉萨":[91.11,29.97],
        "云浮":[112.02,22.93],
        "梅州":[116.1,24.55],
        "文登":[122.05,37.2],
        "上海":[121.48,31.22],
        "攀枝花":[101.718637,26.582347],
        "威海":[122.1,37.5],
        "承德":[117.93,40.97],
        "厦门":[118.1,24.46],
        "汕尾":[115.375279,22.786211],
        "潮州":[116.63,23.68],
        "丹东":[124.37,40.13],
        "太仓":[121.1,31.45],
        "曲靖":[103.79,25.51],
        "烟台":[121.39,37.52],
        "福州":[119.3,26.08],
        "瓦房店":[121.979603,39.627114],
        "即墨":[120.45,36.38],
        "抚顺":[123.97,41.97],
        "玉溪":[102.52,24.35],
        "张家口":[114.87,40.82],
        "阳泉":[113.57,37.85],
        "莱州":[119.942327,37.177017],
        "湖州":[120.1,30.86],
        "汕头":[116.69,23.39],
        "昆山":[120.95,31.39],
        "宁波":[121.56,29.86],
        "湛江":[110.359377,21.270708],
        "揭阳":[116.35,23.55],
        "荣成":[122.41,37.16],
        "连云港":[119.16,34.59],
        "葫芦岛":[120.836932,40.711052],
        "常熟":[120.74,31.64],
        "东莞":[113.75,23.04],
        "河源":[114.68,23.73],
        "淮安":[119.15,33.5],
        "泰州":[119.9,32.49],
        "南宁":[108.33,22.84],
        "营口":[122.18,40.65],
        "惠州":[114.4,23.09],
        "江阴":[120.26,31.91],
        "蓬莱":[120.75,37.8],
        "韶关":[113.62,24.84],
        "嘉峪关":[98.289152,39.77313],
        "广州":[113.23,23.16],
        "延安":[109.47,36.6],
        "太原":[112.53,37.87],
        "清远":[113.01,23.7],
        "中山":[113.38,22.52],
        "昆明":[102.73,25.04],
        "寿光":[118.73,36.86],
        "盘锦":[122.070714,41.119997],
        "长治":[113.08,36.18],
        "深圳":[114.07,22.62],
        "珠海":[113.52,22.3],
        "宿迁":[118.3,33.96],
        "咸阳":[108.72,34.36],
        "铜川":[109.11,35.09],
        "平度":[119.97,36.77],
        "佛山":[113.11,23.05],
        "海口":[110.35,20.02],
        "江门":[113.06,22.61],
        "章丘":[117.53,36.72],
        "肇庆":[112.44,23.05],
        "大连":[121.62,38.92],
        "临汾":[111.5,36.08],
        "吴江":[120.63,31.16],
        "石嘴山":[106.39,39.04],
        "沈阳":[123.38,41.8],
        "苏州":[120.62,31.32],
        "茂名":[110.88,21.68],
        "嘉兴":[120.76,30.77],
        "长春":[125.35,43.88],
        "胶州":[120.03336,36.264622],
        "银川":[106.27,38.47],
        "张家港":[120.555821,31.875428],
        "三门峡":[111.19,34.76],
        "锦州":[121.15,41.13],
        "南昌":[115.89,28.68],
        "柳州":[109.4,24.33],
        "三亚":[109.511909,18.252847],
        "自贡":[104.778442,29.33903],
        "吉林":[126.57,43.87],
        "阳江":[111.95,21.85],
        "泸州":[105.39,28.91],
        "西宁":[101.74,36.56],
        "宜宾":[104.56,29.77],
        "呼和浩特":[111.65,40.82],
        "成都":[104.06,30.67],
        "大同":[113.3,40.12],
        "镇江":[119.44,32.2],
        "桂林":[110.28,25.29],
        "张家界":[110.479191,29.117096],
        "宜兴":[119.82,31.36],
        "北海":[109.12,21.49],
        "西安":[108.95,34.27],
        "金坛":[119.56,31.74],
        "东营":[118.49,37.46],
        "牡丹江":[129.58,44.6],
        "遵义":[106.9,27.7],
        "绍兴":[120.58,30.01],
        "扬州":[119.42,32.39],
        "常州":[119.95,31.79],
        "潍坊":[119.1,36.62],
        "重庆":[106.54,29.59],
        "台州":[121.420757,28.656386],
        "南京":[118.78,32.04],
        "滨州":[118.03,37.36],
        "贵阳":[106.71,26.57],
        "无锡":[120.29,31.59],
        "本溪":[123.73,41.3],
        "克拉玛依":[84.77,45.59],
        "渭南":[109.5,34.52],
        "马鞍山":[118.48,31.56],
        "宝鸡":[107.15,34.38],
        "焦作":[113.21,35.24],
        "句容":[119.16,31.95],
        "北京":[116.46,39.92],
        "徐州":[117.2,34.26],
        "衡水":[115.72,37.72],
        "包头":[110,40.58],
        "绵阳":[104.73,31.48],
        "乌鲁木齐":[87.68,43.77],
        "枣庄":[117.57,34.86],
        "杭州":[120.19,30.26],
        "淄博":[118.05,36.78],
        "鞍山":[122.85,41.12],
        "溧阳":[119.48,31.43],
        "库尔勒":[86.06,41.68],
        "安阳":[114.35,36.1],
        "开封":[114.35,34.79],
        "济南":[117,36.65],
        "德阳":[104.37,31.13],
        "温州":[120.65,28.01],
        "九江":[115.97,29.71],
        "邯郸":[114.47,36.6],
        "临安":[119.72,30.23],
        "兰州":[103.73,36.03],
        "沧州":[116.83,38.33],
        "临沂":[118.35,35.05],
        "南充":[106.110698,30.837793],
        "天津":[117.2,39.13],
        "富阳":[119.95,30.07],
        "泰安":[117.13,36.18],
        "诸暨":[120.23,29.71],
        "郑州":[113.65,34.76],
        "哈尔滨":[126.63,45.75],
        "聊城":[115.97,36.45],
        "芜湖":[118.38,31.33],
        "唐山":[118.02,39.63],
        "平顶山":[113.29,33.75],
        "邢台":[114.48,37.05],
        "德州":[116.29,37.45],
        "济宁":[116.59,35.38],
        "荆州":[112.239741,30.335165],
        "宜昌":[111.3,30.7],
        "义乌":[120.06,29.32],
        "丽水":[119.92,28.45],
        "洛阳":[112.44,34.7],
        "秦皇岛":[119.57,39.95],
        "株洲":[113.16,27.83],
        "石家庄":[114.48,38.03],
        "莱芜":[117.67,36.19],
        "常德":[111.69,29.05],
        "保定":[115.48,38.85],
        "湘潭":[112.91,27.87],
        "金华":[119.64,29.12],
        "岳阳":[113.09,29.37],
        "长沙":[113,28.21],
        "衢州":[118.88,28.97],
        "廊坊":[116.7,39.53],
        "菏泽":[115.480656,35.23375],
        "合肥":[117.27,31.86],
        "武汉":[114.31,30.52],
        "大庆":[125.03,46.58],
        "乐山":[103.75955,29.597439],
        "大理":[100.255584,25.677155]
    };
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    var cityVal='';var dataVal='';  //城市与时间
    var cityVal1='2';
    var nowDate=new Date();
    var yearNow=nowDate.getFullYear();
    var monthNow=nowDate.getMonth()+1;
    var dayNow=nowDate.getDate();
    var nowDate=yearNow+''+addZero(monthNow)+''+addZero(dayNow); //日期
    console.log(nowDate);
    //time end
    //getCityList start
    $.ajax({
        url:http+'/mobile/getCity',
        type:'get',
        dataType:'json',
        data:{
            token:sessionStorage.token
        },
        success:function(res){
            console.log(res.data);
            $('#demo3').val(res.data[0].text);
            cityVal=res.data[0].value;
            console.log(cityVal);
            if(cityVal==1){
                cityVal1='2';
                $('.nationKpi').show();
                $('.cityKpi').hide();
                nationMap(); //地图
                getNationKpi(); //全国页面列表
                nationCity();   //全国页面单个城市
            }else{
                $('.nationKpi').hide();
                $('.cityKpi').show();
                circle(); //圆圈图标
                cityKpi(); //第二版信息
                cityMap() //第一版信息
            }
            getCenter();
            //城市选择控件
            var area3 = new LArea1();
            area3.init({
                'trigger':'#demo3',
                'valueTo':'#value3',
                'keys':{
                    id:'value',
                    name:'text'
                },
                'type':2,
                //'data':[[{"text":"北京","value":"110000"},{"text":"天津","value":"120000"}]]
                'data':[res.data]
            });

        },
        error:function (res) {
            console.log(res,'失败')
        }
    });
    //nav 城市改变 及其刷新数据
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val()==''){
            return false
        }
        cityVal=$('#value3').val();   //更改城市后重新渲染页面图表
        $('.phoneBubble').css('display','none');
        if(cityVal==1){
            cityVal1='2';
            $('.responsiblePerson-box').css('display','none');
            $('.box .kpis .kpiCommon').css('padding-bottom', '0.4rem');
            $('.box .kpis .cityKpi .monthKpi').css('height','5.3333333rem');
            $('.nationKpi').show();
            $('.cityKpi').hide();
            nationMap(); //地图
            getNationKpi(); //全国页面列表
            nationCity();   //全国页面单个城市
        }else{
            $('.nationKpi').hide();
            $('.cityKpi').show();
            circle(); //圆圈图标
            cityKpi(); //第二版信息
            cityMap() //第一版信息
        }
        getCenter();
        getPrincipal(cityVal, [8,9,10,11,12,13,14], 'kpis.html', function(){
            $('.box .kpis .kpiCommon').css('padding-bottom', '0');
            $('.box .kpis .cityKpi .monthKpi').css('height','auto');
            $('.box .kpis .cityKpi .cityShow .cityKpiBottom').css('height', 'auto');
            $('.box .kpis .cityKpi .cityShow').css('height', 'auto');
        });
    });

    // 责任人弹窗控制
    var BUBBLE_CACHE = '';
    $('.responsiblePerson').on('click', function() {
        $('.cityBasic-phoneBubble').css('display','none');
        $('.monKpi-phoneBubble').css('display','none');
        $('.carKpi-phoneBubble').css('display','none');
        $('.siteKpi-phoneBubble').css('display','none');
        $('.userKpi-phoneBubble').css('display','none');
        $('.orderKpi-phoneBubble').css('display','none');
        $('.incomeKpi-phoneBubble').css('display','none');
        if ( BUBBLE_CACHE == $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
            BUBBLE_CACHE = '';
            return;
        }
        switch ( $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
           case 'cityBasic-phoneBubble':
               $('.cityBasic-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'cityBasic-phoneBubble';
               break;
           case 'monKpi-phoneBubble':
               $('.monKpi-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'monKpi-phoneBubble';
               break;
           case 'carKpi-phoneBubble':
               $('.carKpi-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'carKpi-phoneBubble';
               break;
           case 'siteKpi-phoneBubble':
               $('.siteKpi-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'siteKpi-phoneBubble';
               break;
           case 'userKpi-phoneBubble':
               $('.userKpi-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userKpi-phoneBubble';
               break;
           case 'orderKpi-phoneBubble':
               $('.orderKpi-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'orderKpi-phoneBubble';
               break;
           case 'incomeKpi-phoneBubble':
               $('.incomeKpi-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'incomeKpi-phoneBubble';
               break;
        }
    });

//KPI start
//     common kpi start 核心指标
    function getCenter(){
        $.ajax({
            url:http+'/mobile/kpi/getCoreIndex',
            type:'get',
            dataType:'json',
            data:{
                cityId:cityVal,
                token:sessionStorage.token
            },
            success:function(res){
                console.log(res,'核心指标');
                var str1 = "";
                var str2 = "";
                var str3 = "";
                var str4 = "";
                var str5 = "";
                var data = res.data;
                for (i in data.kpi1) {
                    var imgUrl = "";
                    if(data.kpi1[i].tongbi_rate > 0){
                        imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi1[i].tongbi_rate < 0){
                        imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi1[i].tongbi_rate == 0) {
                        imgUrl = "";
                    }
                    str1 += "<li class=\"anlysis\">" +
                        "<p style='width: 23%;'>" + data.kpi1[i].kpiname + "</p>" +
                        "<p>" + data.kpi1[i].month_total+ "</p>" +
                        "<p>" + data.kpi1[i].kpi_yes + "</p>" +
                        "<p style=\"width: 19%;\">" + data.kpi1[i].kpi_tongbi + "</p>" +
                        "<p style='width: 18%;'>" + data.kpi1[i].tongbi_rate + "%" + imgUrl + "</p>" +
                        "</li>";
                }
                for (i in data.kpi2) {
                    var imgUrl = "";
                    if(data.kpi2[i].tongbi_rate > 0){
                        imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi2[i].tongbi_rate < 0){
                        imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi2[i].tongbi_rate == 0) {
                        imgUrl = "";
                    }
                    str2 += "<li class=\"anlysis\">" +
                        "<p style='width: 23%;'>" + data.kpi2[i].kpiname + "</p>" +
                        "<p>" + data.kpi2[i].month_total+ "</p>" +
                        "<p>" + data.kpi2[i].kpi_yes + "</p>" +
                        "<p style=\"width: 19%;\">" + data.kpi2[i].kpi_tongbi + "</p>" +
                        "<p style='width: 18%;'>" + data.kpi2[i].tongbi_rate + "%" + imgUrl + "</p>" +
                        "</li>";
                }
                for (i in data.kpi3) {
                    var imgUrl = "";
                    if(data.kpi3[i].tongbi_rate > 0){
                        imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi3[i].tongbi_rate < 0){
                        imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi3[i].tongbi_rate == 0) {
                        imgUrl = "";
                    }
                    str3 += "<li class=\"anlysis\">" +
                        "<p style='width: 23%;'>" + data.kpi3[i].kpiname + "</p>" +
                        "<p>" + data.kpi3[i].month_total+ "</p>" +
                        "<p>" + data.kpi3[i].kpi_yes + "</p>" +
                        "<p style=\"width: 19%;\">" + data.kpi3[i].kpi_tongbi + "</p>" +
                        "<p style='width: 18%;'>" + data.kpi3[i].tongbi_rate + "%" + imgUrl + "</p>" +
                        "</li>";
                }
                for (i in data.kpi4) {
                    var imgUrl = "";
                    if(data.kpi4[i].tongbi_rate > 0){
                        imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi4[i].tongbi_rate < 0){
                        imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi4[i].tongbi_rate == 0) {
                        imgUrl = "";
                    }
                    str4 += "<li class=\"anlysis\">" +
                        "<p style='width: 23%;'>" + data.kpi4[i].kpiname + "</p>" +
                        "<p>" + data.kpi4[i].month_total+ "</p>" +
                        "<p>" + data.kpi4[i].kpi_yes + "</p>" +
                        "<p style=\"width: 19%;\">" + data.kpi4[i].kpi_tongbi + "</p>" +
                        "<p style='width: 18%;'>" + data.kpi4[i].tongbi_rate + "%" + imgUrl + "</p>" +
                        "</li>";
                }
                for (i in data.kpi5) {
                    var imgUrl = "";
                    if(data.kpi5[i].tongbi_rate > 0){
                        imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi5[i].tongbi_rate < 0){
                        imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data.kpi5[i].tongbi_rate == 0) {
                        imgUrl = "";
                    }
                    str5 += "<li class=\"anlysis\">" +
                        "<p style='width: 23%;'>" + data.kpi5[i].kpiname + "</p>" +
                        "<p>" + data.kpi5[i].month_total+ "</p>" +
                        "<p>" + data.kpi5[i].kpi_yes + "</p>" +
                        "<p style=\"width: 19%;\">" + data.kpi5[i].kpi_tongbi + "</p>" +
                        "<p style='width: 18%;'>" + data.kpi5[i].tongbi_rate + "%" + imgUrl + "</p>" +
                        "</li>";
                }
                $('.kpiList1').html(str1);
                $('.kpiList2').html(str2);
                $('.kpiList3').html(str3);
                $('.kpiList4').html(str4);
                $('.kpiList5').html(str5);
            }
        })
    }
    // common kpi end
//    nationKpi start
    function getNationKpi(){
        $.ajax({
            url:http+'/mobile/kpi/getCurrMonthKpiData',
            type:'get',
            dataType:'json',
            data:{
                cityId:cityVal,
                token:sessionStorage.token
            },
            success:function(res){
                console.log(res,"当月 kpi");
                var str1 = "";
                var str2="";
                var str3="";
                var data = res.data;
                for (i in data) {
                    str1 += "<li class=\"anlysis\">" +
                        "<p>" + data[i].cityname + "</p>" +
                        "<p>" + data[i].kpi_goala+ "</p>" +
                        "<p>" + data[i].kpi_passa + "</p>" +
                        "<p>" + data[i].kpi_currenta + "</p>" +
                        "<p>" + data[i].kpi_ratea + "%</p>" +
                        "</li>";
                    str2 += "<li class=\"anlysis\">" +
                        "<p>" + data[i].cityname + "</p>" +
                        "<p>" + data[i].kpi_goalb+ "</p>" +
                        "<p>" + data[i].kpi_passb + "</p>" +
                        "<p>" + data[i].kpi_currentb + "</p>" +
                        "<p>" + data[i].kpi_rateb + "%</p>" +
                        "</li>";
                    str3 += "<li class=\"anlysis\">" +
                        "<p>" + data[i].cityname + "</p>" +
                        "<p>" + data[i].kpi_goalc+ "</p>" +
                        "<p>" + data[i].kpi_passc + "</p>" +
                        "<p>" + data[i].kpi_currentc + "</p>" +
                        "<p>" + data[i].kpi_ratec + "%</p>" +
                        "</li>";
                }
                $('.nationList1').html(str1);
                $('.nationList2').html(str2);
                $('.nationList3').html(str3);
            }
        });

    }
    getNationKpi();
    // nationKpi end
//nationMap
    var myChart6 = echarts.init(document.getElementById('nationMap'));
    var chinaContourUrl = "../libs/china1.js";
    // var chinaContourUrl = "http://192.168.10.56/json/china.json";
    $.getJSON(chinaContourUrl, function(json) {
        echarts.registerMap('china', json);
        myChart6.setOption({
            geo: {
                map: 'china',
                zoom: 1.1,
                center: [104, 35],
                roam: true,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#2d333a'
                        }, {
                            offset: 1,
                            color: '#2d333a'
                        }]),
                        borderColor: '#2d333a',
                        shadowBlur: 8,
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowColor: '#2d333a'
                    },
                    emphasis: {
                        areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#2d333a'
                        }, {
                            offset: 1,
                            color: '#2d333a'
                        }]),
                        borderColor: '#2d333a',
                        shadowBlur: 8,
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowColor: '#2d333a'
                    }
                }
            }
        });

    });
    var accept;
    function nationMap(){
        $.ajax({
            url:http+'/mobile/kpi/getMapData',
            type:'get',
            dataType:'json',
            data:{
                token:sessionStorage.token
            },
            success:function(res){
                console.log(res);
                for(var i=0;i<res.data.length;i++){
                    res.data[i].value=res.data[i].value[2]
                }
                accept=res.data;
                console.log(res.data);
                 option6 = {
                    geo: {
                        map: 'china',
                        roam: true,
                        zoom:1.1,
                        center: [104, 35],
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: '#2d333a'
                                }, {
                                    offset: 1,
                                    color: '#2d333a'
                                }]),
                                borderColor: '#2d333a',
                                shadowBlur: 8,
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowColor: '#2d333a'
                            },
                            emphasis: {
                                areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: '#2d333a'
                                }, {
                                    offset: 1,
                                    color: '#2d333a'
                                }]),
                                borderColor: '#2d333a',
                                shadowBlur: 8,
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowColor: '#2d333a'
                            }
                        }
                    },
                    series: [
                        {
                            name: 'city',
                            // type: 'effectScatter',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(res.data),
                            symbolSize: [50,50],
                            symbol: 'image:////h5.shouqiev.com/gofunCockpit/images/iconGreen.png',
                            itemStyle: {
                                normal: {
                                    color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(13,185,95,1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(30,221,152,1)'
                                    }]),
                                    opacity:1,
                                    shadowBlur: 12,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 5,
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                },
                                emphasis: {
                                    color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: '#FFAA25'
                                    }, {
                                        offset: 1,
                                        color: '#FADC61'
                                    }]),
                                    opacity:1,
                                    shadowBlur: 12,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 5,
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }

                            },
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true,
                                    position:['0%','-70%'],
                                    formatter: '{b}',
                                    fontSize:40,
                                    textBorderColor: '#000',
                                    textBorderWidth: 2,
                                }
                            },
                        },
                        {
                            name: 'city2',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData([
                                res.data[0]
                            ]),
                            symbolSize: [50,50],
                            symbol: 'image:////h5.shouqiev.com/gofunCockpit/images/iconYellow.png',
                            itemStyle: {
                                normal: {
                                    // color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    //     offset: 0,
                                    //     color: 'rgba(13,185,95,1)'
                                    // }, {
                                    //     offset: 1,
                                    //     color: 'rgba(30,221,152,1)'
                                    // }]),
                                    opacity:1,
                                    shadowBlur: 12,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 5,
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                },
                                emphasis: {
                                    color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: '#FFAA25'
                                    }, {
                                        offset: 1,
                                        color: '#FADC61'
                                    }]),
                                    opacity:1,
                                    shadowBlur: 12,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 5,
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }

                            },
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true,
                                    position:['0%','-70%'],
                                    formatter: '{b}',
                                    fontSize:50,
                                    textBorderColor: '#000',
                                }
                            },
                        }
                    ]
                };
                myChart6.setOption(option6);
            },
            error:function(res){
                console.log(res,'maperror')
            }
        });


    }
        myChart6.on('click', function (res) {
            console.log(res.data,res);
            if(res.data!=undefined){
                myChart6.clear();  //可用，不完美
                cityVal1=res.data.value[2];
                nationCity();
                option6.series[1].data=convertData([res.data]);
                myChart6.setOption(option6);
            }
        });
    var myChart7;
    function cityMap(){
            // myChart7.clear();
            var cityLocation,cityLocation2;
            $.ajax({
                url:http+'/mobile/kpi/getMapData',
                type:'get',
                dataType:'json',
                data:{
                    token:sessionStorage.token
                },
                success:function(res){
                    console.log(res,1111);
                    for(var i=0;i<res.data.length;i++){
                        if(cityVal==res.data[i].value[2]){
                            cityLocation=[res.data[i].value[0],res.data[i].value[1]];
                            cityLocation2=res.data[i]
                        }
                    };
                    console.log(cityLocation,cityLocation2);
                    myChart7 = echarts.init(document.getElementById('cityMap'));
                    // var chinaContourUrl1 = "http://192.168.10.56/json/china.json";
                    var chinaContourUrl1 = "../libs/china1.js";
                    $.getJSON(chinaContourUrl1, function(json) {
                        echarts.registerMap('china', json);
                        myChart7.setOption({
                            geo: {
                                map: 'china',
                                zoom: 2,
                                center: cityLocation,
                                roam: true,
                                label: {
                                    emphasis: {
                                        show: false
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: '#2d333a'
                                        }, {
                                            offset: 1,
                                            color: '#2d333a'
                                        }]),
                                        borderColor: '#2d333a',
                                        shadowBlur: 8,
                                        shadowOffsetX: -2,
                                        shadowOffsetY: 2,
                                        shadowColor: '#2d333a'
                                    },
                                    emphasis: {
                                        areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: '#2d333a'
                                        }, {
                                            offset: 1,
                                            color: '#2d333a'
                                        }]),
                                        borderColor: '#2d333a',
                                        shadowBlur: 8,
                                        shadowOffsetX: -2,
                                        shadowOffsetY: 2,
                                        shadowColor: '#2d333a'
                                    }
                                }
                            }
                        });

                    });
                    option7 = {
                        geo: {
                            map: 'china',
                            roam: true,
                            label: {
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: '#2d333a'
                                    }, {
                                        offset: 1,
                                        color: '#2d333a'
                                    }]),
                                    borderColor: '#2d333a',
                                    shadowBlur: 8,
                                    shadowOffsetX: -2,
                                    shadowOffsetY: 2,
                                    shadowColor: '#2d333a'
                                },
                                emphasis: {
                                    areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: '#2d333a'
                                    }, {
                                        offset: 1,
                                        color: '#2d333a'
                                    }]),
                                    borderColor: '#2d333a',
                                    shadowBlur: 8,
                                    shadowOffsetX: -2,
                                    shadowOffsetY: 2,
                                    shadowColor: '#2d333a'
                                }
                            }
                        },
                        series: [
                            {
                                name: 'city',
                                // type: 'effectScatter',
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                data: convertData(res.data),
                                symbolSize: [50,50],
                                symbol: 'image:////h5.shouqiev.com/gofunCockpit/images/iconGreen.png',
                                itemStyle: {
                                    normal: {
                                        color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: 'rgba(13,185,95,1)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(30,221,152,1)'
                                        }]),
                                        opacity:1,
                                        shadowBlur: 12,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 5,
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    },
                                    emphasis: {
                                        color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: '#FFAA25'
                                        }, {
                                            offset: 1,
                                            color: '#FADC61'
                                        }]),
                                        opacity:1,
                                        shadowBlur: 12,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 5,
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    }

                                },
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: true,
                                        position:['0%','-70%'],
                                        formatter: '{b}',
                                        fontSize:40,
                                        textBorderColor: '#000',
                                        textBorderWidth: 2,
                                    }
                                },
                            },
                            {
                                name: 'city2',
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                data: convertData([
                                    cityLocation2
                                ]),
                                symbolSize: [50,50],
                                symbol: 'image:////h5.shouqiev.com/gofunCockpit/images/iconYellow.png',
                                itemStyle: {
                                    normal: {
                                        // color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        //     offset: 0,
                                        //     color: 'rgba(13,185,95,1)'
                                        // }, {
                                        //     offset: 1,
                                        //     color: 'rgba(30,221,152,1)'
                                        // }]),
                                        opacity:1,
                                        shadowBlur: 12,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 5,
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    },
                                    emphasis: {
                                        color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: '#FFAA25'
                                        }, {
                                            offset: 1,
                                            color: '#FADC61'
                                        }]),
                                        opacity:1,
                                        shadowBlur: 12,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 5,
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    }

                                },
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: true,
                                        position:['0%','-70%'],
                                        formatter: '{b}',
                                        fontSize:50,
                                        textBorderColor: '#000',
                                    }
                                },
                            }
                        ]
                    };
                    myChart7.setOption(option7);
                },
                error:function(res){
                    console.log(res,'maperror')
                }
            });


        }
    function cityKpi(){
        $.ajax({
            url:http+'/mobile/kpi/getKPICityData',
            type:'get',
            dataType:'json',
            data:{
                cityId:cityVal,
                token:sessionStorage.token
            },
            success:function(res){
                console.log(res,'kpicty');
                $('.cityTxt').html(res.data.cityname);
                $('.cityOpen').html(res.data.opentime);
                $('.amount').html(res.data.car_total);
                $('.scale').html(res.data.parking);
                $('.number').html(res.data.parkPlaceCount);
            },
            error:function(res){}
        })
    }
    function circle(){
        hoption = {
            color:["#00C466","#D5D9DD"],
            textStyle:{
                color:'#647888',
                fontSize:30
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['100%', '90%'],
                    hoverAnimation:false,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter:'{c}%',
                            //fontSize:60
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                 fontSize: '0',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:[
                        {value:30,
                            name:'直接访问',
                            label:{
                                normal:{
                                    show:true
                                }
                            }
                        },
                        {
                            value:70,
                            name:'邮件营销',
                            label:{
                                normal:{
                                    show:false
                                }
                            }

                        },

                    ]
                }
            ]
        };
        $.ajax({
            url:http+'/mobile/kpi/getCoreIndex',
            dataType:'json',
            type:'get',
            data:{
                cityId:cityVal,
                token:sessionStorage.token
            },
            success:function(res){
                console.log(res.data.assess,'circle');
                var strCircle='';
                var strCircle1='';
                var strCircle2='';
                for(var i=0 ;i<res.data.assess.length;i++){
                    strCircle+='<div class="monthKpiContentCommon"><div class="chartsCommonCover"></div>\n' +
                        '                                <div class="chartsCommon" id="tableChart0"></div>\n' +
                        '                                <div class="monthKpiContentBottom">\n' +
                        '                                    <p class="monthKpiOne">'+res.data.assess[i].kpi_currenta+'</p>\n' +
                        '                                    <p class="monthKpiTwo">车均单</p>\n' +
                        '                                    <p class="monthKpiThree">'+res.data.assess[i].kpi_goala+'</p>\n' +
                        '                                    <p class="monthKpiFour">目标值</p>\n' +
                        '                                </div>\n' +
                        '                            </div>';
                    strCircle1+='<div class="monthKpiContentCommon"><div class="chartsCommonCover"></div>\n' +
                        '                                <div class="chartsCommon" id="tableChart1"></div>\n' +
                        '                                <div class="monthKpiContentBottom">\n' +
                        '                                    <p class="monthKpiOne">'+res.data.assess[i].kpi_currentb+'</p>\n' +
                        '                                    <p class="monthKpiTwo">月总收现金额</p>\n' +
                        '                                    <p class="monthKpiThree">'+res.data.assess[i].kpi_goalb+'</p>\n' +
                        '                                    <p class="monthKpiFour">目标值</p>\n' +
                        '                                </div>\n' +
                        '                            </div>';
                    strCircle2+='<div class="monthKpiContentCommon"><div class="chartsCommonCover"></div>\n' +
                        '                                <div class="chartsCommon" id="tableChart2"></div>\n' +
                        '                                <div class="monthKpiContentBottom">\n' +
                        '                                    <p class="monthKpiOne">'+res.data.assess[i].kpi_currentc+'%</p>\n' +
                        '                                    <p class="monthKpiTwo">上架率</p>\n' +
                        '                                    <p class="monthKpiThree">'+res.data.assess[i].kpi_goalc+'%</p>\n' +
                        '                                    <p class="monthKpiFour">目标值</p>\n' +
                        '                                </div>\n' +
                        '                            </div>';

                }
                $('.monthKpiContent').html(strCircle+strCircle1+strCircle2);
                var arrtext=['运营车辆车均单','月总收现金额','运营车辆上架率'];
                var arrvalue=[res.data.assess[0].kpi_ratea,res.data.assess[0].kpi_rateb,res.data.assess[0].kpi_ratec];
                console.log(arrvalue,'------1111-------')
                    var tableChart = echarts.init(document.getElementById("tableChart0"));
                    var tableChart1 = echarts.init(document.getElementById("tableChart1"));
                    var tableChart2 = echarts.init(document.getElementById("tableChart2"));
                    // hoption.title.text=arrtext[j];
                    hoption.series[0].data[0].value=arrvalue[0];
                    // hoption.series[0].data[1].value=(100<res.data.assess[j].kpi_rate?0:100-res.data.assess[j].kpi_rate);
                    hoption.series[0].data[1].value=(100<arrvalue[0]?0:100-arrvalue[0]);
                    tableChart.setOption(hoption)
                    hoption.series[0].data[0].value=arrvalue[1];
                    // hoption.series[0].data[1].value=(100<res.data.assess[j].kpi_rate?0:100-res.data.assess[j].kpi_rate);
                    hoption.series[0].data[1].value=(100<arrvalue[1]?0:100-arrvalue[1]);
                    tableChart1.setOption(hoption)
                    hoption.series[0].data[0].value=arrvalue[2];
                    // hoption.series[0].data[1].value=(100<res.data.assess[j].kpi_rate?0:100-res.data.assess[j].kpi_rate);
                    hoption.series[0].data[1].value=(100<arrvalue[2]?0:100-arrvalue[2]);
                    tableChart2.setOption(hoption)
            }
        });
        var deadlineDate=new Date();
        deadlineDate.setTime(deadlineDate.getTime()-24*3600*1000);
        var deadlineM=deadlineDate.getMonth()+1;
        var deadlineD=deadlineDate.getDate();
        $('.monthKpiTileRight').html('截至'+deadlineM+'月'+deadlineD+'日');
    }
    //modify at 10：22 3.26
    function nationCity(){
        $.ajax({
            url:http+'/mobile/kpi/getKPICityData',
            type:'get',
            dataType:'json',
            data:{
                cityId:cityVal1,
                token:sessionStorage.token
            },
            success:function(res){
                console.log(res);
                $('.nationcityTxt').html(res.data.cityname);
                // $('.nationcityOpen').html(res.data.opentime);
                $('.nationOne').html(res.data.opentime);
                $('.nationTwo').html(res.data.users_reg_t);
                $('.nationThree').html(res.data.deposit_num);
                $('.nationFour').html(res.data.car_total);
                $('.nationFive').html(res.data.parking);
                $('.nationSix').html(res.data.order_avg);
            },
            error:function(res){}
        })
    }
// nationKpi to cityKpi
    $('.goToCity').on('click',function(){
        $('.nationKpi').hide();
        $('.cityKpi').show();
        cityVal='2';
        $('#demo3').val('北京');
        circle(); //圆圈图标
        cityKpi(); //第二版信息
        cityMap();  //第一版信息
        getCenter(); //核心指标
    })
});
