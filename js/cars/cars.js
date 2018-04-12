/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15
 * Time: 09:05
 *
 */
$(function () {
    // var http='http://122.14.205.135:8110/';
    // var http='http://192.168.10.56/'; //测试
    var cityVal='';
    var typeId="10" ;         //1-日间上架率，10-10点上架率，17-17点上架率
    var engine = ''; //车机离线图时刻
    var newDate=new Date();
    var yearNow=newDate.getFullYear();
    var monthNow=newDate.getMonth()+1;
    var daynow = newDate.getDate();
    var nowDate1=yearNow+''+addZero(monthNow)+ ''+addZero(daynow); //日期
    var day1 = new Date();
    day1.setDate(day1.getDate() - 7);
    var s1 = day1.format("yyyyMMdd");
    var day2 = new Date();
    day2.setDate(day2.getDate() - 1);
    var s2 = day2.format("yyyyMMdd")
    var day3 = new Date();
    day3.setDate(day3.getDate() - 6);
    var s3 = day3.format("yyyyMMdd")
    $('#appDateTime2').mobiscroll(opt);
    $('#appDateTime3').mobiscroll(opt);
    $('#appDateTime4').mobiscroll(opt);
    $('#appDateTime5').mobiscroll(opt);
    $('#appDateTime6').mobiscroll(opt);
    $('#appDateTime7').mobiscroll(opt);
    $('#appDateTime8').mobiscroll(opt);
    $('#appDateTime9').mobiscroll(opt);
    $('#appDateTime2').val(s1);
    $('#appDateTime3').val(s2);
    $('#appDateTime4').val(s1);
    $('#appDateTime5').val(s2);
    $('#appDateTime6').val(s3);
    $('#appDateTime7').val(nowDate1);
    $('#appDateTime8').val(s1);
    $('#appDateTime9').val(nowDate1);
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
            getfirst($('#appDateTime4').val(),$('#appDateTime5').val());
            carengine($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
            carengineForm($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
            revenueform($('#appDateTime2').val(),$('#appDateTime3').val())  //车辆状况form
            outage($('#appDateTime8').val(),$('#appDateTime9').val())  //车辆停运

        // 页面加载时默认第一个城市
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
        revenueform($('#appDateTime2').val(),$('#appDateTime3').val())  //车辆状况form
        outage($('#appDateTime8').val(),$('#appDateTime9').val())  //车辆停运
        getPrincipal(cityVal, [40,41,42,43], 'cars.html',function(){
            $('.box .formCommon').css('padding-bottom', '0');
            $('.box .formCommon .page').css('margin-bottom', '0.2rem');
            $('.box .cars .carCommon').css('height','auto');
            $('.box .cars .carCommon .carDetail .carDetailList').css('margin-bottom', '0.2rem');
        });
    });


    // 责任人弹窗控制
    var BUBBLE_CACHE = '';
    $('.responsiblePerson').on('click', function() {
        $('.carbasic-phoneBubble').css('display','none');
        $('.sjl-phoneBubble').css('display','none');
        $('.lxt-phoneBubble').css('display','none');
        $('.lxzk-phoneBubble').css('display','none');
        if ( BUBBLE_CACHE == $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
            BUBBLE_CACHE = '';
            return;
        }
        switch ( $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
           case 'carbasic-phoneBubble':
               $('.carbasic-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'carbasic-phoneBubble';
               break;
           case 'sjl-phoneBubble':
               $('.sjl-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'sjl-phoneBubble';
               break;
           case 'lxt-phoneBubble':
               $('.lxt-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'lxt-phoneBubble';
               break;
           case 'lxzk-phoneBubble':
               $('.lxzk-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'lxzk-phoneBubble';
               break;
        }
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
    function getfirst(startDate,endDate){
        $.ajax({
            url :http+"mobile/car/getKpiCarRate",
            type : "get",
            async : true,
            data : {cityId:cityVal,startDate:startDate,endDate:endDate,hourId:typeId,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res,'上架率');
                // if(res.code==500){
                //     Tip.success(res.desc);
                //     return false;
                // };
                option.xAxis[0].data=res.data.date;
                option.series[0].data=res.data.data1;
                option.series[1].data=res.data.data2;
                option.series[2].data=res.data.data3;
                option.series[3].data=res.data.data4;
                myChart.setOption(option);
                myChart.hideLoading();
                $(".carDatas1").html(res.data.AvgPutawayRate+"%");
            }
        });
    }
    // 车机离线数量
    function carengine(startDate,endDate){
        $.ajax({
            url :http+"mobile/car/getKpiCarofflineData",
            type : "get",
            async : true,
            data : {cityId:cityVal,startDate:startDate,endDate:endDate,hourId:engine,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res,'车机离线图');
                // if(res.code==500){
                //     Tip.success(res.desc);
                //     return false;
                // };
                option1.xAxis.data=res.data.axisList;
                option1.series[0].data=res.data.dataList;
                myChart2.setOption(option1);
                myChart2.hideLoading();
            }
        });
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
                    // var data = res.data;
                    for (i in data1) {
                        str1 += " <li class=\"anlysis\">\n" +
                            "                                <p class=\"orderFive\">"+data1[i].data1+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].data0+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].data2+"</p>" +
                            "                            </li>";
                    }
                    $('.offline').html(str1);
                }
            }
        });

    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    车辆概况
    function revenueform(startDate,endDate){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre1').off('click')
        $('.next1').off('click')
        $.ajax({
            url : http+"mobile/car/getKpiCarInfo",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,startDate:startDate,endDate:endDate},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now1').html(pagenow);
                console.log(res);
                if(res.data.length>10){
                    webdata1 = res.data;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle1').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                    $('.pre1').on('click',function(){
                        console.log(pagenow)
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now1').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    });
                    $('.next1').on('click',function(){
                        console.log(pagenow)
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now1').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    })
                }else{
                    $('.totle1').html(1);
                    data1=res.data;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p class=\"orderOne\" style=\"width: 5%;\">"+data1[i].dateId+"</p>" +
                            "                                <p class=\"orderTwo\">"+data1[i].totalCarNum+"</p>" +
                            "                                <p class=\"orderThree\">"+data1[i].operateCarNum+"</p>" +
                            "                                <p class=\"orderFour\">"+data1[i].onNum+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].offNum+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].lowVoltageNum+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].upkeepNum+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].accidentNum+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].maintainNum+"</p>" +
                            "                                <p class=\"orderFive\" style=\"width: 12%;\">"+data1[i].offlineNum+"</p>" +
                            "                                <p class=\"orderFive\" style=\"width: 12%;\">"+data1[i].missMateriailNum+"</p>" +
                            "                            </li>";
                    }
                    $('.revenue').html(str1);
                }
            }
        });

    }

//    车辆停运时间
    function outage(startDate,endDate){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre2').off('click')
        $('.next2').off('click')
        $.ajax({
            url : http+"mobile/car/getKpiCarStopData",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,startDate:startDate,endDate:endDate},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now2').html(pagenow);
                console.log(res,'停运时间');
                if(res.data.length>10){
                    webdata1 = res.data;
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
                    data1=res.data;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p class=\"orderOne\" >"+data1[i].dateId+" </p>" +
                            "                                <p class=\"orderTwo\">"+data1[i].plateNum+"</p>" +
                            "                                <p class=\"orderThree\">"+data1[i].dates+"</p>" +
                            "                                <p class=\"orderFour\">"+data1[i].parkingLot+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].parkingPlace+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].maintainPlace+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].problem+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].upReason+"</p>" +
                            "                            </li>";
                    }
                    $('.outage').html(str1);
                }
            }
        });

    }

//堆叠图end
    $('.chooseCom').on('click',function(){
        $('.chooseCom').removeClass('active');
        $(this).addClass('active');
        typeId=$(this).attr('data-hourId');
        console.log(typeId,'typeId');
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
    $('#appDateTime2').on('change',function () {
        revenueform($('#appDateTime2').val(),$('#appDateTime3').val())  //车辆状况form
    });
    $('#appDateTime3').on('change',function () {
        revenueform($('#appDateTime2').val(),$('#appDateTime3').val())  //车辆状况form
    });
    // 日历选
    $('#appDateTime4').on('change',function () {
        getfirst($('#appDateTime4').val(),$('#appDateTime5').val())  //上架率
    });
    $('#appDateTime5').on('change',function () {
        getfirst($('#appDateTime4').val(),$('#appDateTime5').val())  //上架率
    });
    // 日历选
    $('#appDateTime6').on('change',function () {
        carengine($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
        carengineForm($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
    });
    $('#appDateTime7').on('change',function () {
        carengine($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
        carengineForm($('#appDateTime6').val(),$('#appDateTime7').val())  //车机离线图
    });
    // 日历选
    $('#appDateTime8').on('change',function () {
        outage($('#appDateTime8').val(),$('#appDateTime9').val())  //车辆停运
    });
    $('#appDateTime9').on('change',function () {
        outage($('#appDateTime8').val(),$('#appDateTime9').val())  //车辆停运
    });
});
