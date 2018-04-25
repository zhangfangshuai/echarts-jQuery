/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15 09:05
 * Recode: zhangfs 2018/04/12 11:30
 * Note: Package and Add Handler
 */
// addVersionControl();
$(function () {
    var CAR_CACHE, OFFLINE_CACHE;
    var cityVal='',
        typeId="10";    // 1:日间上架率，10:10点上架率，17:17点上架率
    var carpage = 1,
        offpage = 1;
    var today = getDaysOffset(),
        yesterday = getDaysOffset(-1),
        weekAgo = getDaysOffset(-7),
        sixDaysAgo = getDaysOffset(-6);

    for (let i of [2,3,4,5,6,7,8,9]) {
        $('#appDateTime'+i).mobiscroll(APP.dateBar);
    }

    $('#appDateTime2, #appDateTime4').val(weekAgo);
    $('#appDateTime6').val(sixDaysAgo);
    $('#appDateTime3, #appDateTime5').val(yesterday);
    $('#appDateTime7').val(today);


    // 获取城市列表
    getCity(function(res, cityInit) {
        cityVal = cityInit;
        getCarInfo($('#appDateTime2').val(),$('#appDateTime3').val(), carpage);
        onlineCharts($('#appDateTime4').val(),$('#appDateTime5').val());
        offlineChart($('#appDateTime6').val(),$('#appDateTime7').val());
        offlineTable($('#appDateTime6').val(),$('#appDateTime7').val(), offpage);
    }, false);

    //nav 城市改变 及其刷新数据
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val() ==''){
            return;
        }
        cityVal = $('#value3').val();
        offpage = carpage = 1;
        $('.nowpage').html(1);
        $('.phoneBubble').hide('fast');
        cityVal == '1' && $('.responsiblePerson-box').hide('fast');
        onlineCharts($('#appDateTime4').val(),$('#appDateTime5').val());
        offlineChart($('#appDateTime6').val(),$('#appDateTime7').val());
        offlineTable($('#appDateTime6').val(),$('#appDateTime7').val(), offpage);
        getCarInfo($('#appDateTime2').val(),$('#appDateTime3').val(), carpage);
        getPrincipal(cityVal, [40,41,42,43]);
    });

    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });


    // 车辆概况
    function getCarInfo(s, e, p) {
        var data = {
            cityId: cityVal,
            startDate: s,
            endDate: e
        }
        buildAjax('get', 'car/getKpiCarInfo', data, true, false, function(res){
            CAR_CACHE = res.data;
            $('.car-allpage').html(Math.ceil(CAR_CACHE.length / 10) == 0 ? 1 : Math.ceil(CAR_CACHE.length / 10));
            setCarUI(CAR_CACHE.slice( 10 * ( p - 1 ), 10 * p));
        }, false);
    }
    let refCarUI = (p) => {
        CAR_CACHE ? setCarUI(CAR_CACHE.slice( 10 * ( p - 1 ), 10 * p))
                  : getCarInfo($('#appDateTime2').val(),$('#appDateTime3').val(), p);
    }
    let setCarUI = (d) => {
        let str = "";
        for (let i of d) {
            str += "<li> <p>" + i.dateId + "</p>" +
                "<p>" + i.totalCarNum + "</p>" +
                "<p>" + i.operateCarNum + "</p>" +
                "<p>" + i.onNum + "</p>" +
                "<p>" + i.offNum + "</p>" +
                "<p>" + i.lowVoltageNum + "</p>" +
                "<p>" + i.upkeepNum + "</p>" +
                "<p>" + i.accidentNum + "</p>" +
                "<p>" + i.maintainNum + "</p>" +
                "<p>" + i.offlineNum + "</p>" +
                "<p>" + i.missMateriailNum + "</p>" + "</li>";
        }
        $('.carVal').html(str);
    }



    // 上架率 堆叠图
    var myChart = echarts.init(document.getElementById("dateCarChart1"));
    myChart.showLoading({ effect:'ring' });

    function onlineCharts(s, e) {
        let data = {
            cityId: cityVal,
            startDate: s,
            endDate: e,
            hourId: typeId
        }
        buildAjax('get', 'car/getKpiCarRate', data, true, false, function(res){
            option.xAxis[0].data=res.data.date;
            option.series[0].data=res.data.data1;
            option.series[1].data=res.data.data2;
            option.series[2].data=res.data.data3;
            option.series[3].data=res.data.data4;
            myChart.setOption(option);
            myChart.hideLoading();
            $(".car-notedata").html(res.data.AvgPutawayRate+"%");
        }, false);
    }


    // 车机离线数量
    var myChart2 = echarts.init(document.getElementById("dateCarChart2"));
    myChart2.showLoading({ effect:'ring' });

    function offlineChart(s, e) {
        let data = {
            cityId: cityVal,
            startDate: s,
            endDate: e
        }
        buildAjax('get', 'car/getKpiCarofflineData', data, true, false, function(res){
            option1.xAxis.data=res.data.axisList;
            option1.series[0].data=res.data.dataList;
            myChart2.setOption(option1);
            myChart2.hideLoading();
        }, false);
    }

    // 机车离线表格
    function offlineTable(s, e, p) {
        let data = {
            cityId: cityVal,
            startDate: s,
            endDate: e
        }
        buildAjax('get', 'car/getCarofflineTableData', data, true, false, function(res){
            OFFLINE_CACHE = res.data.table;
            $('.off-allpage').html(Math.ceil(OFFLINE_CACHE.length / 10) == 0 ? 1 : Math.ceil(OFFLINE_CACHE.length / 10));
            setTableUI(OFFLINE_CACHE.slice(10 * ( p - 1 ), 10 * p));
        }, false);
    }

    let refTableUI = (p) => {
        OFFLINE_CACHE ? setTableUI(OFFLINE_CACHE.slice(10 * ( p - 1 ), 10 * p))
                      : offlineTable($('#appDateTime6').val(), $('#appDateTime7').val(), p);
    }

    let setTableUI = (data) => {
        let str = "";
        for (let d of data) {
            str += " <li> <p>" + d.data1 + "</p> <p>" + d.data0 + "</p> <p>" + d.data2 + "</p>" + "</li>";
        }
        $('.offVal').html(str);
    }



    // 车辆概况 分页控制
    $('.car-prepage, .car-nextpage').on('click',function() {
        carpage = pagingCtrl(this, carpage, refCarUI);
    });

    // 机车离线图 分页控制
    $('.off-prepage, .off-nextpage').on('click', function() {
        offpage = pagingCtrl(this, offpage, refTableUI);
    });


    $('.tcs').on('click',function(){
        $('.tcs').removeClass('active');
        $(this).addClass('active');
        typeId = $(this).attr('data-hourId');
        onlineCharts($('#appDateTime4').val(),$('#appDateTime5').val());
    });



    // 日历选择控制
    $('#appDateTime2, #appDateTime3').on('change',function () {
        carpage = resetPaging('car-nowpage');
        getCarInfo($('#appDateTime2').val(), $('#appDateTime3').val(), 1)
    });

    $('#appDateTime4, #appDateTime5').on('change',function () {
        onlineCharts($('#appDateTime4').val(),$('#appDateTime5').val())
    });

    $('#appDateTime6, #appDateTime7').on('change',function () {
        offlineChart($('#appDateTime6').val(),$('#appDateTime7').val());
        offpage = resetPaging('off-nowpage');
        offlineTable($('#appDateTime6').val(),$('#appDateTime7').val(), 1);
    });
});
