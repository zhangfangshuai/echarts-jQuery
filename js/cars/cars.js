/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15 09:05
 * Recode: zhangfs 2018/04/12 11:30
 * Note: Package and Add Handler
 */
APP.html = "cars.html";
$(function () {
    var CAR_CACHE;
    var cityVal='',
        typeId="10",    // 1:日间上架率，10:10点上架率，17:17点上架率
        engine = '';    // 车机离线图时刻
    var carpage = 1;
    var today = getDaysOffset(),
        yesterday = getDaysOffset(-1),
        weekAgo = getDaysOffset(-7),
        sixDaysAgo = getDaysOffset(-6);

    for (let i of [2,3,4,5,6,7,8,9]) {
        $('#appDateTime'+i).mobiscroll(APP.dateBar);
    }

    $('#appDateTime2, #appDateTime4, #appDateTime8').val(weekAgo);
    $('#appDateTime6').val(sixDaysAgo);
    $('#appDateTime3, #appDateTime5').val(yesterday);
    $('#appDateTime7, #appDateTime9').val(today);
    $('.lateTime').val('0点');


    // 获取城市列表
    getCity(function(res, cityInit) {
        cityVal = cityInit;
        getKpiCarInfo($('#appDateTime2').val(),$('#appDateTime3').val(), carpage)  //车辆状况form
        getfirst($('#appDateTime4').val(),$('#appDateTime5').val());
        carengine($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
        carengineForm($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
        outage($('#appDateTime8').val(),$('#appDateTime9').val())  //车辆停运
    }, false);

    //nav 城市改变 及其刷新数据
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val()==''){
            return false
        }
        cityVal=$('#value3').val();   //更改城市后重新渲染页面图表
        $('.phoneBubble').css('display','none');
        if (cityVal == '1') {
            $('.responsiblePerson-box').css('display','none');
            $('.box .formCommon').css('padding-bottom', '0.4rem');
            $('.box .formCommon .page').css('margin-bottom', '0rem');
            $('.box .cars .carCommon').css('height','auto');
            $('.box .cars .carCommon .carDetail .carDetailList').css('margin-bottom', '0.4rem');
        }
        getfirst($('#appDateTime4').val(),$('#appDateTime5').val())  //上架率
        carengine($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
        carengineForm($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
        getKpiCarInfo($('#appDateTime2').val(),$('#appDateTime3').val(), carpage);
        outage($('#appDateTime8').val(),$('#appDateTime9').val())  //车辆停运
        getPrincipal(cityVal, [40,41,42,43], 'cars.html',function(){
            $('.box .formCommon').css('padding-bottom', '0');
            $('.box .formCommon .page').css('margin-bottom', '0.2rem');
            $('.box .cars .carCommon').css('height','auto');
            $('.box .cars .carCommon .carDetail .carDetailList').css('margin-bottom', '0.2rem');
        });
    });


    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });



//堆叠图
//     first
    var myChart = echarts.init(document.getElementById("dateCarChart1"));
    myChart.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    var myChart2 = echarts.init(document.getElementById("dateCarChart2"));
    myChart2.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    //上架率
    function getfirst(s, e){
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
    function carengine(s, e) {
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

    function carengineForm(startDate,endDate){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre2').off('click')
        $('.next2').off('click')
        $.ajax({
            url : http+"mobile/car/getCarofflineTableData",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,startDate:startDate,endDate:endDate},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now2').html(pagenow);
                console.log(res);
                if(res.data.table.length>10){
                    webdata1 = res.data.table;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle2').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                    $('.pre2').on('click',function(){
                        console.log(pagenow)
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now2').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    });
                    $('.next2').on('click',function(){
                        console.log(pagenow)
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now2').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    })
                }else{
                    $('.totle2').html(1);
                    data1=res.data.table;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    for (i in data1) {
                        str1 += " <li class=\"anlysis\">\n" +
                            "<p class=\"orderFive\">"+data1[i].data1+"</p>" +
                            "<p class=\"orderFive\">"+data1[i].data0+"</p>" +
                            "<p class=\"orderFive\">"+data1[i].data2+"</p>" +
                            "</li>";
                    }
                    $('.offline').html(str1);
                }
            }
        });

    }


    // 车辆概况
    function getKpiCarInfo(s, e, p) {
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
                  : getKpiCarInfo($('#appDateTime2').val(),$('#appDateTime3').val(), p);
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

    $('#appDateTime2, #appDateTime3').on('change',function () {
        getKpiCarInfo($('#appDateTime2').val(), $('#appDateTime3').val(), carpage)  //车辆状况form
    });

    // 车辆概况 分页控制
    $('.car-prepage, .car-nextpage').on('click',function() {
        if (this.classList[1] == 'car-prepage') {
            carpage > 1 ? (() => {
                carpage --;
                refCarUI(carpage);
                $('.car-nowpage').html(carpage);
            })() : console.log('Top page!');
        } else {
           carpage < parseInt($('.car-allpage').html()) ? (() => {
               carpage ++;
               refCarUI(carpage);
               $('.car-nowpage').html(carpage);
           })() : console.log('Last page!');
        }
    });



    // 车辆停运时间
    function outage(startDate,endDate){
        var webdata1=[],
            pageall1='',
            data1=[];
        $('.pre2， .next2').off('click')
        let data = {
            cityId: cityVal,
            startDate: s,
            endDate: e
        }
        buildAjax('get', 'car/getKpiCarStopData', data, true, false, function(res){
            var pagenow='1';
            $('.now2').html(pagenow);
            if(res.data.length>10){
                webdata1 = res.data;
                pageall1=Math.ceil(webdata1.length/10);
                $('.totle2').html(pageall1);
                data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                page1();
                $('.pre2').on('click',function(){
                    if(pagenow<=1){
                        return false;
                    };
                    pagenow--;
                    $('.now2').html(pagenow);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                });
                $('.next2').on('click',function(){
                    if(pagenow>=pageall1){
                        return false;
                    };
                    pagenow++;
                    $('.now2').html(pagenow);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                });
            }else{
                $('.totle2').html(1);
                data1=res.data;
                page1();
            }

            function page1() {
                var str1 = "";
                for (i in data1) {
                    str1 += "<li class=\"anlysis\">\n" +
                        "<p class=\"orderOne\" >"+data1[i].dateId+" </p>" +
                        "<p class=\"orderTwo\">"+data1[i].plateNum+"</p>" +
                        "<p class=\"orderThree\">"+data1[i].dates+"</p>" +
                        "<p class=\"orderFour\">"+data1[i].parkingLot+"</p>" +
                        "<p class=\"orderFive\">"+data1[i].parkingPlace+"</p>" +
                        "<p class=\"orderFive\">"+data1[i].maintainPlace+"</p>" +
                        "<p class=\"orderFive\">"+data1[i].problem+"</p>" +
                        "<p class=\"orderFive\">"+data1[i].upReason+"</p>" +
                        "</li>";
                }
                $('.outage').html(str1);
            }
        }, false);
    }



    $('.tcs').on('click',function(){
        $('.tcs').removeClass('active');
        $(this).addClass('active');
        typeId=$(this).attr('data-hourId');
        getfirst($('#appDateTime4').val(),$('#appDateTime5').val())  //上架率
    })

    $('#first-s').bind('input propertychange', function() {
        if ($('#first-s').val()=='' || $('#first-sv').attr('value')==undefined){
            return false
        }
        engine=$('#first-sv').attr('value');//更改城市后重新渲染页面图表
        carengine($('#appDateTime6').val(),$('#appDateTime7').val())  //上架率
        carengineForm($('#appDateTime6').val(),$('#appDateTime7').val())  //上架率
    });




    // 日历选
    $('#appDateTime4, #appDateTime5').on('change',function () {
        getfirst($('#appDateTime4').val(),$('#appDateTime5').val())  //上架率
    });

    // 日历选
    $('#appDateTime6, #appDateTime7').on('change',function () {
        carengine($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
        carengineForm($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
    });

    // 日历选
    $('#appDateTime8, #appDateTime9').on('change',function () {
        outage($('#appDateTime8').val(),$('#appDateTime9').val())  //车辆停运
    });
});
