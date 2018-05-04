/**
 * Created: dameng by webstorm
 * Date: 2017/11/15 09:05
 * Recode: zhangfs by Atom 2018/04/21
 * Note: old: 1160 lines
 */
$(function () {
    var MAP_CACHE;  // 全国基础地图数据
    var ODAVG, CASH, SHELFRATE;  // kpis
    var odavgpage = 1, cashpage = 1, shelfratepage = 1;
    var city, ovCity, autoCenterflag = false;
    var today = getDaysOffset();


    // 构建全国基础地图
    var stationsMap = echarts.init(document.getElementById('stationsMap'));
    echarts.registerMap('china', chinaMapJson);


    // 获取城市列表
    getCity(function(res, cityInit) {
        ovCity = cityInit == '1' ? '2' : cityInit;
        city = cityInit;
        getStationMap();
        cityOverview();
        getKpi();
        getTarget(city);
    })

    // 切换城市监控
    $('#demo3').bind('input propertychange', function() {
        if (!$('#value3').val()) return;
        city = $('#value3').val();
        ovCity = city == '1' ? '2' : city;
        $('.phoneBubble').hide('fast');
        if (city == 1) {
            autoCenterflag = false;
            $('#forOverviewKPI').show();
            $('#forCityDetailKPI').hide();
            $('.responsiblePerson-box').hide('fast');
        } else {
            autoCenterflag = true;
            $('#forOverviewKPI').hide();
            $('#forCityDetailKPI').show();
            $('.responsiblePerson-box').show();
        }
        getTarget(city);
        getPrincipal(ovCity, [8,9,10,11,12,13,14]);
    });

    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });


    // 将开城站点绘入基础地图中
    function getStationMap() {
        buildAjax('get', 'kpi/getMapData', {}, false, false, function(res){
            MAP_CACHE = res.data;
            sessionStorage.locat = JSON.stringify(MAP_CACHE[0]);
            optionCity.series[0].data = MAP_CACHE;
            optionCity.series[1].data = [MAP_CACHE[0]];
            stationsMap.setOption(optionCity);
        });
    }

    // 地图上用户点击城市监控
    stationsMap.on('click', function (locat) {
        sessionStorage.locat = JSON.stringify(locat.data);
        if (locat.data) {
            // stationsMap.clear();
            let mapUpdate = {
                series: [{}, {
                    data: [locat.data]
                }]
            };
            if ( autoCenterflag ) {
                mapUpdate.geo = {};
                mapUpdate.geo.center = [locat.data.value[0], locat.data.value[1]];
            }
            stationsMap.setOption(mapUpdate);
            ovCity = locat.data.value[2];
            city = locat.data.value[2];
            $('#demo3').val(locat.data.name);
            cityOverview();
            getTarget(city);
            getPrincipal(ovCity, [8,9,10,11,12,13,14]);
        }
    })

    // 用户点击查看详情 交互
    $('.overview-btn').on('click', function(){
        $('.responsiblePerson-box').show();
        getPrincipal(ovCity, [8,9,10,11,12,13,14]);
        update2CityMap();
        getTarget(ovCity);
    });


    // 城市概览，默认北京
    function cityOverview() {
        buildAjax('get', 'kpi/getKPICityData', {cityId:ovCity}, true, false, function(res){
            $('.cityName').html(res.data.cityname);
            $('.openTime').html(res.data.opentime);
            $('.totleUser').html(res.data.users_reg_t);
            $('.validUser').html(res.data.deposit_num);
            $('.carOnline').html(res.data.car_total);
            $('.siteRange').html(res.data.parking);
            $('.orderAvg').html(res.data.order_avg);
            $('.siteNum').html(res.data.parkPlaceCount);
        });
    }


    // 单月KPI
    function getKpi(){
        buildAjax('get', 'kpi/getCurrMonthKpiData', {cityId:city}, true, false, function(res){
            KPI = res.data;
            $('.odAvg-allpage').html(Math.ceil(KPI.length / 10) == 0 ? 1 : Math.ceil(KPI.length / 10));
            $('.cash-allpage').html(Math.ceil(KPI.length / 10) == 0 ? 1 : Math.ceil(KPI.length / 10));
            $('.shelfrate-allpage').html(Math.ceil(KPI.length / 10) == 0 ? 1 : Math.ceil(KPI.length / 10));
            odavgpage = resetPaging('odAvg-nowpage');
            cashpage = resetPaging('cash-nowpage');
            shelfratepage = resetPaging('shelfrate-nowpage');
            setOdAvgUI(KPI.slice(0, 10));
            setCashUI(KPI.slice(0, 10));
            setShelfRateUI(KPI.slice(0, 10));
        });
    }
    // 车均单表格刷新
    let refOdAvgUI = (p) => {
        KPI ? setOdAvgUI(KPI.slice(10 * ( p - 1 ), 10 * p)) : getKpi(p);
    }
    let setOdAvgUI = (data) => {
        let str = "";
        for (let d of data) {
          str += "<li> <p>" + d.cityname + "</p>" +
              "<p>" + d.kpi_goala + "</p>" +
              "<p>" + d.kpi_passa + "</p>" +
              "<p>" + d.kpi_currenta + "</p>" +
              "<p>" + d.kpi_ratea + "%</p> </li>"
        }
        $('.odAvgVal').html(str);
    }
    // 车均单 分页控制
    $('.odAvg-prepage, .odAvg-nextpage').on('click', function(){
        odavgpage = pagingCtrl(this, odavgpage, refOdAvgUI);
    });

    // 收现表格刷新
    let refCashUI = (p) => {
        KPI ? setCashUI(KPI.slice(10 * ( p - 1 ), 10 * p)) : getKpi(p);
    }
    let setCashUI = (data) => {
      let str = "";
      for (let d of data) {
        str += "<li> <p>" + d.cityname + "</p>" +
            "<p>" + d.kpi_goalb + "</p>" +
            "<p>" + d.kpi_passb + "</p>" +
            "<p>" + d.kpi_currentb + "</p>" +
            "<p>" + d.kpi_rateb + "%</p> </li>"
      }
      $('.cashVal').html(str);
    }
    // 收现 分页控制
    $('.cash-prepage, .cash-nextpage').on('click', function(){
        cashpage = pagingCtrl(this, cashpage, refCashUI);
    });

    // 上架率刷新
    let refShelfRateUI = (p) => {
        KPI ? setShelfRateUI(KPI.slice(10 * ( p - 1 ), 10 * p)) : getKpi(p);
    }
    let setShelfRateUI = (data) => {
      let str = "";
      for (let d of data) {
        str += "<li> <p>" + d.cityname + "</p>" +
            "<p>" + d.kpi_goalc + "</p>" +
            "<p>" + d.kpi_passc + "</p>" +
            "<p>" + d.kpi_currentc + "</p>" +
            "<p>" + d.kpi_ratec + "%</p> </li>"
      }
      $('.shelfrateVal').html(str);
    }
    // 收现 分页控制
    $('.shelfrate-prepage, .shelfrate-nextpage').on('click', function(){
        shelfratepage = pagingCtrl(this, shelfratepage, refShelfRateUI);
    });


    // 核心指标
    function getTarget(c) {
        buildAjax('get', 'kpi/getCoreIndex', {cityId:c}, true, false, function(res) {
            setTgCarUI(res.data.kpi1, '.tgCarVal');
            setTgSiteUI(res.data.kpi2, '.tgSiteVal');
            setTgUserUI(res.data.kpi3, '.tgUserVal');
            setTgOrderUI(res.data.kpi4, '.tgOrderVal');
            setTgIncomeUI(res.data.kpi5, '.tgIncomeVal');
            c != 1 && setCircleData(res.data.assess);
        });
    }

    let setTgCarUI = (data, _class) => { setTargetUI(data, _class); }
    let setTgSiteUI = (data, _class) => { setTargetUI(data, _class); }
    let setTgUserUI = (data, _class) => { setTargetUI(data, _class); }
    let setTgOrderUI = (data, _class) => { setTargetUI(data, _class); }
    let setTgIncomeUI = (data, _class) => { setTargetUI(data, _class); }

    let setTargetUI = (data, _class) => {
        let str = "";
        for (let d of data) {
            let imgSrc = d.tongbi_rate == 0 ? '' : d.tongbi_rate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            str +=  "<li> <p>" + d.kpiname + "</p>" +
                    "<p>" + d.kpi_yes + "</p>" +
                    "<p>" + d.kpiorder + "</p>" +
                    "<p>" + d.kpi_tongbi + "</p>" +
                    "<p>" + d.tongbi_rate + "%" +
                    "<img src='" + imgSrc + "' alt=''/>" + "</p> </li>";
        }
        $(_class).html(str);
    }



    // 获取城市地图概览
    function update2CityMap() {
        let locat = JSON.parse(sessionStorage.locat)
        $('#demo3').val(locat.name);
        let mapUpdate = {
            geo: {
              center: [locat.value[0], locat.value[1]],
              zoom: 2
            },
            series: [{},{
                data: [locat]
            }]
        };
        autoCenterflag = true;
        stationsMap.setOption(mapUpdate);
        $('#forOverviewKPI').hide('fast');
        $('#forCityDetailKPI').show('fast');
    }


    function setCircleData(d){
        var odavgCircle = echarts.init(document.getElementById("orderAvgCircle"));
        optionCityCircle.series[0].data[0].value = d[0].kpi_ratea;
        odavgCircle.setOption(optionCityCircle)

        var cashCircle = echarts.init(document.getElementById("cashCircle"));
        optionCityCircle.series[0].data[0].value = d[0].kpi_rateb;
        cashCircle.setOption(optionCityCircle);

        var onshelfCircle = echarts.init(document.getElementById("onShelfCircle"));
        optionCityCircle.series[0].data[0].value = d[0].kpi_ratec;
        onshelfCircle.setOption(optionCityCircle);

        let y = getDaysOffset(-1);
        $('.ring-stopdate').html(y.slice(0, 4) + '-' + y.slice(4, 6) + '-' + y.slice(6, y.lenght));
        $('.coavg-now').html(d[0].kpi_currenta);
        $('.coavg-goal').html(d[0].kpi_goala);
        $('.cash-now').html(d[0].kpi_currenta);
        $('.cash-goal').html(d[0].kpi_goalb);
        $('.onshelf-now').html(d[0].kpi_currenta);
        $('.onshelf-goal').html(d[0].kpi_goalc);
    }
});
