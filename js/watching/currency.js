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
    var cityVal='';var dataVal='';  //城市与时间
    var carTypeFirst = 0; //实时收现车辆类型，默认0全部；1-电车 2-燃油车
    var carTypeSecond = 0; //车辆状况车辆类型，默认0全部；1-电车 2-燃油车
    var carTypeThird = 0; //实时订单车辆类型，默认0全部；1-电车 2-燃油车
    var carall = 0; //实时订单车辆类型，默认0上架；1-下架 2-全部
    var hourId = '';
    var nowDate=new Date();
    var yearNow=nowDate.getFullYear();
    var monthNow=nowDate.getMonth()+1;
    var dayNow=nowDate.getDate();
    var nowDate=yearNow+''+addZero(monthNow)+''+addZero(dayNow); //日期
    $('#appDateTime1').mobiscroll(opt);
    $('#appDateTime2').mobiscroll(opt);
    $('#appDateTime3').mobiscroll(opt);
    $('#appDateTime4').mobiscroll(opt);
    $('#appDateTime5').mobiscroll(opt);
    $('#appDateTime6').mobiscroll(opt);
    var tDate=new Date();
    $('#appDateTime1').val(nowDate);
    $('#appDateTime2').val(nowDate);
    $('#appDateTime3').val(nowDate);
    $('#appDateTime4').val(nowDate);
    $('#appDateTime5').val(nowDate);
    $('#appDateTime6').val(nowDate);
    //渲染星期
    startingWeek(1);
    startingWeek(2);
    startingWeek(3);
    startingWeek(4);
    startingWeek(5);
    startingWeek(6);
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
            //渲染第一个城市数据
                getchart1data(nowDate);
                getchart2data(nowDate);
                getchart3data(nowDate);
                getchart4data(nowDate);
                getchart5data(nowDate);
                revenueform(nowDate)  //实时营收form
                carstatus(nowDate)  //实时车辆状况
                order(nowDate)  //实时车辆状况
                adduser(nowDate)  //新增用户状况
                sitestatus(nowDate)  //实时网点状况

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
            $('.box .cars .carCommon').css({'height':'8rem','padding-bottom':'0'});
            $('.box .cars .carRealChart').css('height','8.426rem');
            $('.box .cars .formCommon').css('padding-bottom','0.4rem');
            $('.box .cars .carCommon .carDetail').css('margin-bottom','0');
        }
        $('#appDateTime1').val(nowDate);
        $('#appDateTime2').val(nowDate);
        $('#appDateTime3').val(nowDate);
        $('#appDateTime4').val(nowDate);
        $('#appDateTime5').val(nowDate);
        getchart1data(nowDate);
        getchart2data(nowDate);
        getchart3data(nowDate);
        getchart4data(nowDate);
        getchart5data(nowDate);
        //渲染星期
        startingWeek(1);
        startingWeek(2);
        startingWeek(3);
        startingWeek(4);
        startingWeek(5);
        revenueform(nowDate)  //实时营收form
        carstatus(nowDate)  //实时车辆状况
        order(nowDate)  //实时车辆状况
        adduser(nowDate)  //新增用户状况
        sitestatus(nowDate)  //实时网点状况
        getPrincipal(cityVal, [1,2,3,4,5,6,7], 'cars.html', function(){
            $('.box .cars .carCommon').css({'height':'auto', 'padding-bottom':'.46667rem'});
            $('.box .cars .carReal').css({'height':'auto', 'padding-bottom':'0'});
            $('.box .cars .carCommon .carDetail').css('margin-bottom','.2rem');
            $('.box .cars .formCommon').css('padding-bottom','0');
            $('.box .cars .formCommon .page').css('margin-bottom','.2rem');
        });

    });
    // 责任人弹窗控制
    var BUBBLE_CACHE = '';
    $('.responsiblePerson').on('click', function() {
        $('.incReal-phoneBubble').css('display','none');
        $('.carReal-phoneBubble').css('display','none');
        $('.orderReal-phoneBubble').css('display','none');
        $('.newUserReal-phoneBubble').css('display','none');
        $('.elecReal-phoneBubble').css('display','none');
        $('.siteReal-phoneBubble').css('display','none');
        if ( BUBBLE_CACHE == $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
            BUBBLE_CACHE = '';
            return;
        }
        switch ( $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
           case 'incReal-phoneBubble':
               $('.incReal-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'incReal-phoneBubble';
               break;
           case 'carReal-phoneBubble':
               $('.carReal-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'carReal-phoneBubble';
               break;
           case 'orderReal-phoneBubble':
               $('.orderReal-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'orderReal-phoneBubble';
               break;
           case 'newUserReal-phoneBubble':
               $('.newUserReal-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'newUserReal-phoneBubble';
               break;
           case 'elecReal-phoneBubble':
               $('.elecReal-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'elecReal-phoneBubble';
               break;
           case 'siteReal-phoneBubble':
               $('.siteReal-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'siteReal-phoneBubble';
               break;
        }
    });


    $('#last').bind('input propertychange', function() {
        if ($('#last-s').val() == '') {
            return false
        }
        carall=$('#last-s').val()
        console.log(carall);
        getchart1data($('#appDateTime1').val())
    })
    $('#finalone').bind('input propertychange', function() {
        if ($('#finalone-s').val() == '') {
            return false
        }
        hourId=$('#finalone-s').val()
        console.log(hourId);
        sitestatus($('#appDateTime6').val())
    })
    var myChart = echarts.init(document.getElementById("dateCarChart1"));
    myChart.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    var myChart2 = echarts.init(document.getElementById("dateCarChart2"));
    myChart.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    var myChart3 = echarts.init(document.getElementById("dateCarChart3"));
    myChart.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    var myChart4 = echarts.init(document.getElementById("dateCarChart4"));
    myChart.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    var myChart5 = echarts.init(document.getElementById("dateCarChart5"));
    myChart.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    function getchart1data(value){
        $.ajax({
            url :http+"mobile/getCarRealData",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token,carType:carTypeSecond},
            dataType : "json",
            success : function(res){
                console.log(res);
                option.xAxis[0].data=res.data.data1;
                option.series[0].data=res.data.data2;
                option.series[1].data=res.data.data3;
                option.series[2].data=res.data.data4;
                optionOn.xAxis[0].data=res.data.data1;
                optionOn.series[0].data=res.data.data5;
                optionOn.series[1].data=res.data.data6;
                optionOn.series[2].data=res.data.data7;
                optionOn.series[3].data=res.data.data8;
                optionDown.xAxis[0].data=res.data.data1;
                optionDown.series[0].data=res.data.data9;
                optionDown.series[1].data=res.data.data10;
                optionDown.series[2].data=res.data.data11;
                optionDown.series[3].data=res.data.data12;
                $(".carDatas1").html(res.data.sumData0);
                $(".carDatas2").html(res.data.sumData1);
                $(".carDatas3").html(res.data.sumData2+"%");
                $(".carDatas4").html(res.data.sumData3);
                $(".carDatas5").html(res.data.sumData4);
                $(".carDatas6").html(res.data.sumData5);
                $(".carDatason1").html(res.data.sumData6);
                $(".carDatason2").html(res.data.sumData7);
                $(".carDatason4").html(res.data.sumData8);
                $(".carDatason5").html(res.data.sumData9);
                $(".carDatasdown1").html(res.data.sumData10);
                $(".carDatasdown2").html(res.data.sumData11);
                $(".carDatasdown3").html(res.data.sumData12);
                $(".carDatasdown4").html(res.data.sumData13);
                $(".carDatasdown5").html(res.data.sumData16);
                $(".carDatasdown6").html(res.data.sumData14);
                myChart.clear()
                if (carall==0) { //all
                    myChart.setOption(option);
                    $('.carDetailAll').show();
                    $('.carDetailOn').hide();
                    $('.carDetailDown').hide();
                }else if (carall==1){ //shangjia
                    myChart.setOption(optionOn);
                    $('.carDetailAll').hide();
                    $('.carDetailOn').show();
                    $('.carDetailDown').hide();
                }else if (carall==2){ //xiajia
                    myChart.setOption(optionDown);
                    $('.carDetailAll').hide();
                    $('.carDetailOn').hide();
                    $('.carDetailDown').show();
                }
                // myChart.setOption(option);
                myChart.hideLoading();
            }
        });
    }
    //实时订单
    function getchart2data(value){
        $.ajax({
            url : http+"mobile/getOrderRealData",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token,carType:carTypeThird},
            dataType : "json",
            success : function(res){
                console.log(res);
                option2.xAxis.data=res.data.data1;
                option2.series[0].data=res.data.data2;
                option2.series[1].data=res.data.data3;
                option2.series[2].data=res.data.data4;
                myChart2.setOption(option2);
                myChart2.hideLoading();

                // $(".carDatas7").html(res.data.sumData0);
                // $(".carDatas8").html(res.data.sumData1);
            }
        });
    }
    function getchart3data(value){
        $.ajax({
            url : http+"mobile/getOrderRealAmount",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token,carType:carTypeFirst},
            dataType : "json",
            success : function(res){
                console.log(res);
                option3.xAxis.data=res.data.data1;
                option3.series[0].data=res.data.data2;
                option3.series[1].data=res.data.data3;
                option3.series[2].data=res.data.data4;
                option3.series[3].data=res.data.data5;
                myChart3.setOption(option3);
                myChart3.hideLoading();
                // $(".carDatas9").html(res.data.sumData0);
                // $(".carDatas10").html(res.data.sumData1);
                // $(".carDatas11").html(res.data.sumData2+"%");
                // $(".carDatas12").html(res.data.sumData3);
                // $(".carDatas13").html(res.data.sumData4);

            }
        });
    }
    function getchart4data(value){
        $.ajax({
            url : http+"mobile/getRegisterRealData",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res);
                option4.xAxis.data=res.data.data1;
                option4.series[0].data=res.data.data2;
                option4.series[1].data=res.data.data3;
                option4.series[2].data=res.data.data4;
                option4.series[3].data=res.data.data5;
                option4.series[4].data=res.data.data6;

                myChart4.setOption(option4);
                myChart4.hideLoading();
                $(".carDatas14").html(res.data.sumData0);
                $(".carDatas15").html(res.data.sumData1);
                $(".carDatas16").html(res.data.sumData2);
                $(".carDatas17").html(res.data.sumData3);
                $(".carDatas18").html(res.data.sumData4);
                // $(".carDatas19").html(res.data.sumData5);
            }
        });

    }
    function getchart5data(value){
        $.ajax({
            url :http+"mobile/getKpiCarPower",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res);
                option5.xAxis.data=res.data.data1;
                option5.series[0].data=res.data.data2;
                option5.series[1].data=res.data.data3;
                option5.series[2].data=res.data.data4;
                option5.series[3].data=res.data.data5;
                option5.series[4].data=res.data.data6;
                myChart5.setOption(option5);
                myChart5.hideLoading();
                $(".carDatas55").html(res.data.sumData0);
                $(".carDatas56").html(res.data.sumData1);
            }
        });
    }
//    实际营收概况
    function revenueform(value){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre1').off('click')
        $('.next1').off('click')
        $.ajax({
            url : http+"mobile/getOrderRealAmount",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token,carType:carTypeFirst},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now1').html(pagenow);
                console.log(res);
                if(res.data.table.length>10){
                    webdata1 = res.data.table;
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
                    data1=res.data.table;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p class=\"orderOne\" style=\"width: 10%;\">"+data1[i].hour_id+"</p>" +
                            "                                <p class=\"orderTwo\">"+data1[i].amount_hour+"</p>" +
                            "                                <p class=\"orderThree\">"+data1[i].payamoun_hour+"</p>" +
                            "                                <p class=\"orderFour\">"+data1[i].couponAmount_hour+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].noPayAmount_hour+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].amount_hour_every+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].payamoun_hour_every+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].couponAmount_hour_every+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].noPayAmount_hour_every+"</p>" +
                            "                            </li>";
                    }
                    $('.revenue').html(str1);
                }
            }
        });

    }
    //    实时车辆状况
    function carstatus(value){
        // 网点明细
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre2').off('click')
        $('.next2').off('click')
        $.ajax({
            url :http+"mobile/getCarRealData",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token,carType:carTypeSecond},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now2').html(pagenow);
                console.log(res.data.table);
                if(res.data.table.length>10){
                    webdata1 = res.data.table;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle2').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page2();
                    $('.pre2').on('click',function(){
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now2').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page2();
                    });
                    $('.next2').on('click',function(){
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now2').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page2();
                    })
                }else{
                    $('.totle2').html(1);
                    data1=res.data.table;
                    page2();
                }

                function page2() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p class=\"orderOne\" style=\"width: 5%;\">" + data1[i].hour_id +"</p>" +
                            "                                <p class=\"orderTwo\">"+data1[i].car_num3+"</p>" +
                            "                                <p class=\"orderThree\">"+data1[i].car_num4+"</p>" +
                            "                                <p class=\"orderFour\">"+data1[i].car_num5+"</p>" +
                            "                                <p class=\"orderFive\" style=\"width: 10%;\">"+data1[i].car_num6+"</p>" +
                            "                                <p class=\"orderFive\" style=\"width: 10%;\">"+data1[i].car_num7+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].car_num8+"</p>\n" +
                            "                                <p class=\"orderFive\">"+data1[i].car_num9+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].car_num10+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].car_num11+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].car_num12+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].car_num13+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].car_num14+"</p>" +
                            "                                <p class=\"orderFive\">"+data1[i].car_num15+"</p>" +
                            "                            </li>";
                    }
                    $('.carstatus').html(str1);
                }
            }
        });

    }
    //    实时订单
    function order(value){
        // 网点明细
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre3').off('click')
        $('.next3').off('click')
        $.ajax({
            url : http+"mobile/getOrderRealData",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token,carType:carTypeThird},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now3').html(pagenow);
                console.log(res);
                if(res.data.table.length>10){
                    webdata1 = res.data.table;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle3').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page3();
                    $('.pre3').on('click',function(){
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now3').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page3();
                    });
                    $('.next3').on('click',function(){
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now3').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page3();
                    })
                }else{
                    $('.totle3').html(1);
                    data1=res.data.table;
                    page3();
                }

                function page3() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += " <li class='anlysis'><p class=\"orderOne\" style=\"width: 8%;\">"+data1[i].hour_id+" </p>" +
                            "                            <p class=\"orderTwo\" style=\"width: 12%;\">"+data1[i].ordernum_create_hour+"</p>" +
                            "                            <p class=\"orderThree\" style=\"width: 15%;\">"+data1[i].ordernum_up_hour+"</p>" +
                            "                            <p class=\"orderFour\" style=\"width: 15%;\">"+data1[i].ordernum_cancel_hour+"</p>" +
                            "                            <p class=\"orderFive\" style=\"width: 11%;\">"+data1[i].ordernum_create_hour1+"</p>" +
                            "                            <p class=\"orderFive\" >"+data1[i].ordernum_up_hour1+"</p>" +
                            "                            <p class=\"orderFive\" >"+data1[i].ordernum_cancel_hour1+"</p>" +
                            "                            <p class=\"orderFive\">"+data1[i].ordernum_up_hour_every+"</p>" +
                            "                            <p class=\"orderFive\">"+data1[i].sumMileage_hour_every+"</p>\n" +
                            "                            <p class=\"orderFive\">"+data1[i].sumMinute_hour_every+"</p></li>";
                    }
                    $('.order').html(str1);
                }
            }
        });

    }
    //    实时新增
    function adduser(value){
        // 网点明细
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre4').off('click')
        $('.next4').off('click')
        $.ajax({
            url : http+"mobile/getRegisterRealData",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now4').html(pagenow);
                console.log(res.data.table);
                if(res.data.table.length>10){
                    webdata1 = res.data.table;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle4').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page4();
                    $('.pre4').on('click',function(){
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now4').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page4();
                    });
                    $('.next4').on('click',function(){
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now4').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page4();
                    })
                }else{
                    $('.totle4').html(1);
                    data1=res.data.table;
                    page4();
                }

                function page4() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p class=\"orderOne\" style=\"width: 10%;\">"+data1[i].hour_id+"</p>" +
                            "                                <p class=\"orderTwo\" >"+data1[i].users_reg_hour+"</p>" +
                            "                                <p class=\"orderThree\">"+data1[i].users_audit_hour+"</p>" +
                            "                                <p class=\"orderFour\" style=\"width: 19%;\">"+data1[i].deposit_users_hour+"</p>" +
                            "                                <p class=\"orderFive\" >"+data1[i].order_users_hour+"</p>" +
                            "                                <p class=\"orderFive\" >"+data1[i].orderfirst_users_hour+"</p>" +
                            "                            </li>";
                    }
                    $('.adduser').html(str1);
                }
            }
        });

    }
    //    实时网点概况
    function sitestatus(value){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre5').off('click')
        $('.next5').off('click')
        $.ajax({
            url : http+"mobile/getParkingRealData",
            type : "get",
            async : true,
            data : {cityId:cityVal,dateId:value,token:sessionStorage.token,hourId:hourId},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now5').html(pagenow);
                console.log(res.data.data);
                if(res.data.data.length>10){
                    webdata1 = res.data.data;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle5').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page5();
                    $('.pre5').on('click',function(){
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now5').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page5();
                    });
                    $('.next5').on('click',function(){
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now5').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page5();
                    })
                }else{
                    $('.totle5').html(1);
                    data1=res.data.data;
                    page5();
                }

                function page5() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p>"+data1[i].parks3+"</p>" +
                            "                                <p>"+data1[i].parks4+"</p>" +
                            "                                <p>"+data1[i].parks5+"</p>" +
                            "                                <p>"+data1[i].parks6+"</p>" +
                            "                                <p>"+data1[i].parks7+"</p>" +
                            "                                <p>"+data1[i].parks8+"</p>" +
                            "                                <p>"+data1[i].parks9+"</p>" +
                            "                            </li>";
                    }
                    $('.sitestatus').html(str1);
                }
            }
        });

    }
//前进  1 实时车辆状况
    $('.nextDateBtn1').on('click',function(){
        var goDate11=changeDate1(1,1);
        $('#appDateTime1').val(goDate11);
        getchart1data(goDate11);
        carstatus(goDate11)  //实时车辆状况
    });
// 后退
    $('.preDateBtn1').on('click',function(){
        var goDate12=changeDate(1,-1);
        $('#appDateTime1').val(goDate12);
        getchart1data(goDate12);
        carstatus(goDate12)  //实时车辆状况
    });
// 日历选
    $('#appDateTime1').on('change',function () {
        changeWeekByHtml(1);
        getchart1data($('#appDateTime1').val());
        carstatus($('#appDateTime1').val())  //实时车辆状况
    });
//前进  2 实时订单
    $('.nextDateBtn2').on('click',function(){
        var goDate21=changeDate1(2,1);
        $('#appDateTime2').val(goDate21);
        getchart2data(goDate21);
        order(goDate21); //实时订单表格
    });
// 后退
    $('.preDateBtn2').on('click',function(){
        var goDate22=changeDate(2,-1);
        $('#appDateTime2').val(goDate22);
        getchart2data(goDate22);
        order(goDate22); //实时订单表格
    });
// 日历选
    $('#appDateTime2').on('change',function () {
        changeWeekByHtml(2);
        getchart2data($('#appDateTime2').val());
        order($('#appDateTime2').val()); //实时订单表格
    });
//前进  3  实时收现
    $('.nextDateBtn3').on('click',function(){
        var goDate31=changeDate1(3,1);
        $('#appDateTime3').val(goDate31);
        getchart3data(goDate31);
        revenueform(goDate31)  //实时营收form
    });
// 后退
    $('.preDateBtn3').on('click',function(){
        var goDate32=changeDate(3,-1);
        $('#appDateTime3').val(goDate32);
        getchart3data(goDate32);
        revenueform(goDate32)  //实时营收form
    });
// 日历选
    $('#appDateTime3').on('change',function () {
        changeWeekByHtml(3);
        getchart3data($('#appDateTime3').val());
        revenueform($('#appDateTime3').val())  //实时营收form
    });
//前进  4 新增用户
    $('.nextDateBtn4').on('click',function(){
        var goDate41=changeDate1(4,1);
        $('#appDateTime4').val(goDate41);
        getchart4data(goDate41);
        adduser(goDate41); //新增用户
    });
// 后退
    $('.preDateBtn4').on('click',function(){
        var goDate42=changeDate(4,-1);
        $('#appDateTime4').val(goDate42);
        getchart4data(goDate42);
        adduser(goDate42); //新增用户
    });
// 日历选
    $('#appDateTime4').on('change',function () {
        changeWeekByHtml(4);
        getchart4data($('#appDateTime4').val());
        adduser($('#appDateTime4').val()); //新增用户
    });
//前进  5 实时电量
    $('.nextDateBtn5').on('click',function(){
        var goDate51=changeDate1(5,1);
        $('#appDateTime5').val(goDate51);
        getchart5data(goDate51);
    });
// 后退
    $('.preDateBtn5').on('click',function(){
        var goDate52=changeDate(5,-1);
        $('#appDateTime5').val(goDate52);
        getchart5data(goDate52);
    });
// 日历选
    $('#appDateTime5').on('change',function () {
        changeWeekByHtml(5);
        getchart5data($('#appDateTime5').val());
    });
    //前进  6实时网点概况
    $('.nextDateBtn6').on('click',function(){
        var goDate61=changeDate1(6,1);
        $('#appDateTime6').val(goDate61);
        sitestatus(goDate61);
    });
// 后退
    $('.preDateBtn6').on('click',function(){
        var goDate62=changeDate(6,-1);
        $('#appDateTime6').val(goDate62);
        sitestatus(goDate62);
    });
// 日历选
    $('#appDateTime6').on('change',function () {
        changeWeekByHtml(6);
        sitestatus($('#appDateTime6').val());
    });
    //实时收现车辆选择按钮
    $('.revenuebtn').on('click',function () {
        $('.revenuebtn').removeClass('active')
        $(this).addClass('active')
        if(carTypeFirst == $(this).attr('data-carType')){
            console.log('double');
            return false
        }
        carTypeFirst = $(this).attr('data-carType')
        getchart3data($('#appDateTime3').val());
        revenueform($('#appDateTime3').val())  //实时营收form
        // console.log(carTypeFirst)
    })
    //实时车辆状况按钮
    $('.carstatusbtn').on('click',function () {
        $('.carstatusbtn').removeClass('active')
        $(this).addClass('active')
        if(carTypeSecond == $(this).attr('data-carType')){
            console.log('double');
            return false
        }
        carTypeSecond = $(this).attr('data-carType')
        getchart1data($('#appDateTime1').val());  //受上架下架影响
        carstatus($('#appDateTime1').val())  //实时营收form
        // console.log(carTypeFirst)
    })
    //实时订单按钮
    $('.orderbtn').on('click',function () {
        $('.orderbtn').removeClass('active')
        $(this).addClass('active')
        if(carTypeThird == $(this).attr('data-carType')){
            console.log('double');
            return false
        }
        carTypeThird = $(this).attr('data-carType')
        getchart2data($('#appDateTime2').val());  //受上架下架影响
        order($('#appDateTime2').val())  //实时营收form
        // console.log(carTypeFirst)
    })
});
