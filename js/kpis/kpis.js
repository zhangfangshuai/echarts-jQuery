/**
 * Created: dameng by webstorm
 * Date: 2017/11/15 09:05
 * Recode: zhangfs by Atom 2018/04/21
 * Note: old: 1160 lines
 */
$(function () {
    var MAP_CACHE, ODAVG_CACHE;  // 全国基础地图数据
    var odavgpage = 1, cashpage = 1, shelfratepage = 1, licencepage = 1;
    var cartype = 0;
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
        getKpi(true);
        getTarget(city);
    })


    // 切换城市监控
    $('#demo3').bind('input propertychange', function() {
        if (!$('#value3').val()) return;
        city = $('#value3').val();
        ovCity = city == '1' ? '2' : city;
        $('.phoneBubble').hide('fast');
        if (city == 1) {
            update2CountryMap();
            $('.responsiblePerson-box').hide('fast');
        } else {
            for (let c of MAP_CACHE) {
                if (c.name == $('#demo3').val()) {
                    sessionStorage.locat = JSON.stringify(c);
                    break
                }
            }
            update2CityMap();
            $('.responsiblePerson-box').show();
        }
        cityOverview();
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
            city = locat.data.value[2];
            ovCity = city;
            cityOverview();
            // 具体城市才需要重查核心指标, 这里借用autoCenterflag表示具体城市事件
            if (autoCenterflag) {
                $('#demo3').val(locat.data.name);
                getTarget(city);
                getPrincipal(ovCity, [8,9,10,11,12,13,14]);
            }
        }
    })

    // 用户点击查看详情 交互
    $('.overview-btn').on('click', function(){
        $('.responsiblePerson-box').show();
        $('#demo3').val(JSON.parse(sessionStorage.locat).name);
        update2CityMap();
        getTarget(ovCity);
        getPrincipal(ovCity, [8,9,10,11,12,13,14]);
    });


    // 城市概览，默认北京
    function cityOverview() {
        buildAjax('get', 'kpi/getKPICityData', {cityId:ovCity}, true, false, function(res) {
            $('.cityName').html(res.data.cityname);
            $('.openTime').html(res.data.opentime);
            $('.totleUser').html(res.data.users_reg_t);
            $('.validUser').html(res.data.deposit_num);
            $('.carOnline').html(res.data.car_total);
            $('.siteRange').html(res.data.parking);
            $('.orderAvg').html(res.data.order_avg);
            $('.siteNum').html(res.data.parkPlaceCount);
            $('.orderNum').html(res.data.orders_month);
            $('.incomeAvg').html(res.data.car_avgpayamount);
            $('.dauUsers').html(res.data.dau_users);
        });
    }


    // 单月KPI
    function getKpi(flag){
        city = flag == 0 ? 1 : city;  // 处理全国下地图城市点击当月kpi不查询到具体城市
        buildAjax('get', 'kpi/getCurrMonthKpiData', {cityId:city, typeId:cartype}, true, false, function(res){
            KPI = res.data;
            $('.odAvg-allpage').html(Math.ceil(KPI.length / 10) == 0 ? 1 : Math.ceil(KPI.length / 10));
            odavgpage = resetPaging('odAvg-nowpage');
            setOdAvgUI(KPI.slice(0, 10));
            if(flag) {
                $('.cash-allpage').html(Math.ceil(KPI.length / 10) == 0 ? 1 : Math.ceil(KPI.length / 10));
                $('.shelfrate-allpage').html(Math.ceil(KPI.length / 10) == 0 ? 1 : Math.ceil(KPI.length / 10));
                $('.licence-allpage').html(Math.ceil(KPI.length / 10) == 0 ? 1 : Math.ceil(KPI.length / 10));
                cashpage = resetPaging('cash-nowpage');
                shelfratepage = resetPaging('shelfrate-nowpage');
                licencepage = resetPaging('licence-nowpage');
                setCashUI(KPI.slice(0, 10));
                setShelfRateUI(KPI.slice(0, 10));
                setLicenceUI(KPI.slice(0, 10));
            }
        });
    }
    // 车均单表格刷新
    let refOdAvgUI = (p) => {
        KPI ? setOdAvgUI(KPI.slice(10 * ( p - 1 ), 10 * p)) : getKpi();
    }
    let setOdAvgUI = (data) => {
        let str = "";
        for (let d of data) {
          str += "<li> <p>" + d.cityName + "</p>" +
              "<p>" + d.cjd_mb + "</p>" +
              "<p>" + d.cjd_dq + "</p>" +
              "<p>" + d.cjd_wc + "%</p> </li>"
        }
        $('.odAvgVal').html(str);
    }
    // 车均单 分页控制
    $('.odAvg-prepage, .odAvg-nextpage').on('click', function(){
        odavgpage = pagingCtrl(this, odavgpage, refOdAvgUI);
    });
    // 车均单 车辆类型选择
    $('.odAvg-ct').on('click', function() {
         $('.' + this.classList[1]).removeClass('active');
         $(this).addClass('active');
         cartype = $(this).attr('data-type');
         getKpi(0);
    });

    // 收现表格刷新
    let refCashUI = (p) => {
        KPI ? setCashUI(KPI.slice(10 * ( p - 1 ), 10 * p)) : getKpi(true);
    }
    let setCashUI = (data) => {
      let str = "";
      for (let d of data) {
        str += "<li> <p>" + d.cityName + "</p>" +
            "<p>" + d.djsx_mb + "</p>" +
            "<p>" + d.djsx_dq + "</p>" +
            "<p>" + d.djsx_wc + "%</p> </li>"
      }
      $('.cashVal').html(str);
    }
    // 收现 分页控制
    $('.cash-prepage, .cash-nextpage').on('click', function(){
        cashpage = pagingCtrl(this, cashpage, refCashUI);
    });

    // 上架率刷新
    let refShelfRateUI = (p) => {
        KPI ? setShelfRateUI(KPI.slice(10 * ( p - 1 ), 10 * p)) : getKpi(true);
    }
    let setShelfRateUI = (data) => {
      let str = "";
      for (let d of data) {
        str += "<li> <p>" + d.cityName + "</p>" +
            "<p>" + d.sjl_mb + "</p>" +
            "<p>" + d.sjl_dq + "</p>" +
            "<p>" + d.sjl_wc + "%</p> </li>"
      }
      $('.shelfrateVal').html(str);
    }
    // 收现 分页控制
    $('.shelfrate-prepage, .shelfrate-nextpage').on('click', function(){
        shelfratepage = pagingCtrl(this, shelfratepage, refShelfRateUI);
    });


    // 新增双证用户数 刷新
    let redLicenceUI = (p) => {
        KPI ? setLicenceUI(KPI.slice(10 * ( p - 1 ), 10 * p)) : getKpi(true);
    }
    let setLicenceUI = (data) => {
        let str = '';
        for (let d of data) {
          str += "<li> <p>" + d.cityName + "</p>" +
              "<p>" + d.bdyhs_mb + "</p>" +
              "<p>" + d.bdyhs_dq + "</p>" +
              "<p>" + d.bdyhs_wc + "%</p> </li>"
        }
        $('.licVal').html(str);
    }
    // 新增双证 分页控制
    $('.licence-prepage, .licence-nextpage').on('click', function(){
        licencepage = pagingCtrl(this, licencepage, redLicenceUI);
    });



    // 核心指标
    function getTarget(c) {
        buildAjax('get', 'kpi/getCoreIndex', {cityId:c}, true, false, function(res) {
            ODAVG_CACHE = res.data.assess[0];
            setTgCarUI(res.data.kpi1, '.tgCarVal');
            setTgSiteUI(res.data.kpi2, '.tgSiteVal');
            setTgUserUI(res.data.kpi3, '.tgUserVal');
            setTgOrderUI(res.data.kpi4, '.tgOrderVal');
            setTgIncomeUI(res.data.kpi5, '.tgIncomeVal');
            c != 1 && setCircleData(res.data.assess[0]);
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
                    "<p>" + d.month_total + "</p>" +
                    "<p>" + d.kpi_yes + "</p>" +
                    "<p>" + d.kpi_tongbi + "</p>" +
                    "<p>" + d.tongbi_rate + "%" +
                    "<img src='" + imgSrc + "' alt=''/>" + "</p> </li>";
        }
        $(_class).html(str);
    }


    // 获取城市地图概览
    function update2CityMap() {
        let locat = JSON.parse(sessionStorage.locat);
        let mapUpdate = {
            geo: {
              center: [locat.value[0], locat.value[1]],
              zoom: 2.2
            },
            series: [{},{
                data: [locat]
            }]
        };
        autoCenterflag = true;
        stationsMap.setOption(mapUpdate);
        $('#forOverviewKPI').hide('fast');
        $('#detailBtn').hide('fast');
        $('#forCityDetailKPI').show('fast');
    }

    // 获取全国地图概览
    function update2CountryMap() {
        let mapUpdate = {
            geo: {
                zoom: 1.2
            },
            series: [{
                data: MAP_CACHE,
            },{
                data: [MAP_CACHE[0]]
            }]
        }
        autoCenterflag = false;
        stationsMap.setOption(optionCity);
        sessionStorage.locat = JSON.stringify(MAP_CACHE[0]);
        $('#forOverviewKPI').show('fast');
        $('#detailBtn').show('fast');
        $('#forCityDetailKPI').hide('fast');
    }


    function setCircleData(d){
        var odavgCircle = echarts.init(document.getElementById("orderAvgCircle"));
        optionCityCircle.series[0].data[0].value = d.kpi_ratef;
        odavgCircle.setOption(optionCityCircle)

        var cashCircle = echarts.init(document.getElementById("cashCircle"));
        optionCityCircle.series[0].data[0].value = d.kpi_rated;
        cashCircle.setOption(optionCityCircle);

        var onshelfCircle = echarts.init(document.getElementById("onShelfCircle"));
        optionCityCircle.series[0].data[0].value = d.kpi_ratec;
        onshelfCircle.setOption(optionCityCircle);

        var licenceCircle = echarts.init(document.getElementById("licenceCircle"));
        optionCityCircle.series[0].data[0].value = d.kpi_ratee;
        licenceCircle.setOption(optionCityCircle)

        let y = getDaysOffset(-1);
        $('.ring-stopdate').html(y.slice(0, 4) + '-' + y.slice(4, 6) + '-' + y.slice(6, y.lenght));
        $('.coavg-now').html(d.kpi_currentf);
        $('.coavg-goal').html(d.kpi_goalf);
        $('.cash-now').html(d.kpi_currentd);
        $('.cash-goal').html(d.kpi_goald);
        $('.onshelf-now').html(d.kpi_currentc);
        $('.onshelf-goal').html(d.kpi_goalc);
        $('.licence-now').html(d.kpi_currente);
        $('.licence-goal').html(d.kpi_goale);
    }

    // 城市KPI 车辆类型监控
    $('.kpiCircle-ct').on('click', function() {
         $('.' + this.classList[1]).removeClass('active');
         $(this).addClass('active');
         var odavgCircle = echarts.init(document.getElementById("orderAvgCircle"));
         switch ($(this).attr('data-type')) {
            case '1':
                optionCityCircle.series[0].data[0].value = ODAVG_CACHE.kpi_ratea;
                odavgCircle.setOption(optionCityCircle);
                $('.coavg-now').html(ODAVG_CACHE.kpi_currenta);
                $('.coavg-text').html("全部车均单");
                $('.coavg-goal').html(ODAVG_CACHE.kpi_goala);
                break;
            case '2':
                optionCityCircle.series[0].data[0].value = ODAVG_CACHE.kpi_rateg;
                odavgCircle.setOption(optionCityCircle);
                $('.coavg-now').html(ODAVG_CACHE.kpi_currentg);
                $('.coavg-text').html("老电车车均单");
                $('.coavg-goal').html(ODAVG_CACHE.kpi_goalg);
                break;
            case '3':
                optionCityCircle.series[0].data[0].value = ODAVG_CACHE.kpi_rateh;
                odavgCircle.setOption(optionCityCircle);
                $('.coavg-now').html(ODAVG_CACHE.kpi_currenth);
                $('.coavg-text').html("燃油车车均单");
                $('.coavg-goal').html(ODAVG_CACHE.kpi_goalh);
                break;
           default:
                optionCityCircle.series[0].data[0].value = ODAVG_CACHE.kpi_ratef;
                odavgCircle.setOption(optionCityCircle);
                $('.coavg-now').html(ODAVG_CACHE.kpi_currentf);
                $('.coavg-text').html("新电车车均单");
                $('.coavg-goal').html(ODAVG_CACHE.kpi_goalf);
         }
    });
});
