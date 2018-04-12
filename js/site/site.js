/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15
 * Time: 09:05
 *
 */
$(function () {
    var cityVal='';
    var selectType="1" ;         //网点明细  ／／10佳：1    10差：2     全部：3
    var daylast='1'; //网点明细  1；2；3；4
    var businessareaid1 = '';  //网点明细商圈
    var businessareaid2 = '';  //网点车辆商圈
    var hourId1 = '';  //网点车辆时刻
    var parkingKind1 = ''; //网点明细实体网点
    $('#last').val('近7日'); //时间默认为近7日
    $('#last1').val('商圈'); //商圈
    $('#last2').val('全部'); //全部，实体网点，虚拟网点
    $('#last4').val('时刻'); //网点车辆时刻
    $('#last3').val('商圈'); //网点车辆时刻
    var typeid=0; //网点订单车辆类型
    var newDate=new Date();
    var yearNow=newDate.getFullYear();
    var monthNow=newDate.getMonth()+1;
    var daynow = newDate.getDate();
    var nowDate=yearNow+''+addZero(monthNow)+ ''+addZero(daynow); //日期
    var day1 = new Date();
    day1.setDate(day1.getDate() - 7);
    var s1 = day1.format("yyyyMMdd")
    var day2 = new Date();
    day2.setDate(day2.getDate() - 1);
    var s2 = day2.format("yyyyMMdd")
    $('#appDateTime1').mobiscroll(opt);
    $('#appDateTime2').mobiscroll(opt);
    $('#appDateTime1').val(s1);
    $('#appDateTime2').val(s2);
    $('#appDateTime6').mobiscroll(opt);
    $('#appDateTime6').val(nowDate);
    startingWeek(6);
    $('#appDateTime7').mobiscroll(opt);
    $('#appDateTime7').val(s2);
    $('.showWeek7').html(getWeek(day2.getDay()));
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
            if (res.data[0].value==1){
                res.data.shift();
            }
            $('#demo3').val(res.data[0].text);
            cityVal=res.data[0].value;
            console.log(cityVal);
            // 页面加载时默认第一个城市
            orderAll(); //网点概况
            sitechange($('#appDateTime1').val(),$('#appDateTime2').val()); //网点变更
            orderAll2(); //网点明细
            siteCar($('#appDateTime6').val()); //网点车辆
            orderCar($('#appDateTime7').val()) //网点订单
            getPrincipal(cityVal, [34,35,36,38,39], 'site.html', function() {
                $('.box .cars .orderCommon').css('padding-bottom', '0');
                $('.box .cars .orderCommon .page').css('margin-bottom', '0.2rem');
                $('.box .cars .orderCommon1').css('padding-bottom', '0');
                $('.box .cars .orderCommon1 .page').css('margin-bottom', '0.2rem');
            });
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
            // 获取商圈
            $.ajax({
                url:http+'mobile/park/getBusinessArea',
                type:"get",
                dataType:"json",
                data:{
                    cityId:cityVal,
                    token:sessionStorage.token
                },
                success:function (res) {
console.log(res.data,"商圈")
                    var arr = [];
                    for (var i in res.data){
                        var json={"text":res.data[i].businessareaname,"value":res.data[i].businessareaid};
                        arr.push(json)
                    }
                    console.log(arr,"商圈转换")
                    // 网点明细商圈
                    var area6 = new LArea1();
                    area6.init({
                        'trigger':'#last1',
                        'valueTo':'#last1-s',
                        'keys':{
                            id:'value',
                            name:'text'
                        },
                        'type':2,
                        'data':[arr]
                    });
                    // 网点车辆商圈
                    var area8 = new LArea1();
                    area8.init({
                        'trigger':'#last3',
                        'valueTo':'#last3-s',
                        'keys':{
                            id:'value',
                            name:'text'
                        },
                        'type':2,
                        'data':[arr]
                    });
                }
            })

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
        orderAll(); //网点概况
        sitechange($('#appDateTime1').val(),$('#appDateTime2').val()); //网点变更
        orderAll2(); //网点明细
        siteCar($('#appDateTime6').val()) //网点车辆
        orderCar($('#appDateTime7').val()) //网点订单
        getPrincipal(cityVal, [34,35,36,38,39], 'site.html', function() {
            $('.box .cars .orderCommon').css('padding-bottom', '0');
            $('.box .cars .orderCommon1').css('padding-bottom', '0');
            $('.box .cars .orderCommon .page').css('margin-bottom', '0.2rem');
            $('.box .cars .orderCommon1 .page').css('margin-bottom', '0.2rem');
        });
    });

    // 责任人弹窗控制
    var BUBBLE_CACHE = '';
    $('.responsiblePerson').on('click', function() {
        $('.sbasic-phoneBubble').css('display','none');
        $('.schange-phoneBubble').css('display','none');
        $('.sdetail-phoneBubble').css('display','none');
        $('.scar-phoneBubble').css('display','none');
        $('.sorder-phoneBubble').css('display','none');
        if ( BUBBLE_CACHE == $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
            BUBBLE_CACHE = '';
            return;
        }
        switch ( $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
           case 'sbasic-phoneBubble':
               $('.sbasic-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'sbasic-phoneBubble';
               break;
           case 'schange-phoneBubble':
               $('.schange-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'schange-phoneBubble';
               break;
           case 'sdetail-phoneBubble':
               $('.sdetail-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'sdetail-phoneBubble';
               break;
           case 'scar-phoneBubble':
               $('.scar-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'scar-phoneBubble';
               break;
           case 'sorder-phoneBubble':
               $('.sorder-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'sorder-phoneBubble';
               break;
        }
    });


// orders start 网点概况
    function orderAll(){
        // 车辆概况
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre1').off('click')
        $('.next1').off('click')
        $.ajax({
            url : http+"/mobile/park/getGeneralSituationData",
            type : "get",
            async : true,
            data : {cityId:cityVal,'token':sessionStorage.token},
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
                        var imgUrl = "";
                        if(data1[i].tongbiRate > 0){
                            imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\">";
                        }else if(data1[i].tongbiRate < 0){
                            imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\">";
                        }else if(data1[i].tongbiRate == 0) {
                            imgUrl = "";
                        }
                        str1 += "<li class=\"anlysis\">" +
                            "<p style=\"width: 23%;\">" + data1[i].kpiname + "</p>" +
                            "<p>" + data1[i].kpiCurrent+ "</p>" +
                            "<p>" + data1[i].kpiYes + "</p>" +
                            "<p style=\"width: 19%;\">" + data1[i].kpiTongbi + "</p>" +
                            "<p style=\"width: 18%;\">" + data1[i].tongbiRate + "%" + imgUrl + "</p>" +
                            "</li>";
                    }

                    $('.sitestatus').html(str1);
                }
            }
        });
    }
// 网点变更
    function sitechange(startDate,endDate){
        var webdata=[];
        var pageall='';
        var data=[];
        $('.pre2').off('click')
        $('.next2').off('click')
        var pagenow='1';
        $('.now2').html(pagenow);
        $.ajax({
            url : http+"mobile/park/getParkingUpdateData",
            type : "get",
            async : true,
            data : {cityId:cityVal,startDate:startDate,endDate:endDate,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res);
                webdata = res.data;
                pageall=Math.ceil(webdata.length/10);
                if(pageall==0){
                    pageall=1
                }
                $('.totle2').html(pageall);
                data=webdata.slice(10*(pagenow-1),10*pagenow);
                page();
                $('.pre2').on('click',function(){
                    if(pagenow<=1){
                        return false;
                    };
                    pagenow--;
                    $('.now2').html(pagenow);
                    data=webdata.slice(10*(pagenow-1),10*pagenow);
                    page();
                });
                $('.next2').on('click',function(){
                    if(pagenow>=pageall){
                        return false;
                    };
                    pagenow++;
                    $('.now2').html(pagenow);
                    data=webdata.slice(10*(pagenow-1),10*pagenow);
                    page();
                })
            }
        });
        function page(){
            var str1 = "";
            for (i in data) {
                str1 += "<li class=\"anlysis\">" +
                    "<p style=\"width: 23%;\">" + data[i].parkName + "</p>" +
                    "<p>" + toshi(data[i].parkType)+ "</p>" +
                    "<p>" + data[i].carportNum + "</p>" +
                    "<p style=\"width: 19%;\">" + datatype(data[i].updateType) + "</p>" +
                    "<p style=\"width: 18%;\">" + todate(data[i].updateDate) + "</p>" +
                    "</li>";
            }
            $('.orderList2').html(str1);
        }
    }

    // 网点明细
    function orderAll2(){
        // 网点明细
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre3').off('click');
        $('.next3').off('click');
        $.ajax({
            url : http+"mobile/park/getParkDetail",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,selectType:selectType,reportType:daylast,businessareaid:businessareaid1,parkingKind:parkingKind1},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now3').html(pagenow);
                console.log(res);
                if(res.data.length>10){
                    webdata1 = res.data;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle3').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                    $('.pre3').on('click',function(){
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now3').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    });
                    $('.next3').on('click',function(){
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now3').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    })
                }else{
                    $('.totle3').html(1);
                    data1=res.data;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p class=\"orderOne\">"+data1[i].parkName+ "</p>\n" +
                            "                                <p class=\"orderTwo\" style=\"width: 12.8%;text-align: center;\">"+data1[i].carportNum+"</p>\n" +
                            "                                <p class=\"orderThree\" style=\"width: 12.8%;text-align: center;\">"+data1[i].carportAvgorder+"</p>\n" +
                            "                                <p class=\"orderFour\" style=\"width: 15.8%;text-align: center;\">"+data1[i].executAvgnum+"</p>\n" +
                            "                                <p class=\"orderFive\" style=\"width: 15.8%;text-align: center;\">"+data1[i].retrunAvgnum+"</p>\n" +
                            "                                <p class=\"orderFive\" style=\"width: 15.8%;text-align: center;\">"+data1[i].userAvgnum+"</p>\n" +
                            "                                <p class=\"orderFive\" style=\"width: 12.8%;\">"+todate(data1[i].openDate)+"</p>\n" +
                            "                            </li>";
                    }
                    $('.orderList3').html(str1);
                }
            }
        });

    }
    // 网点车辆
    function siteCar(val){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre4').off('click');
        $('.next4').off('click');
        $.ajax({
            url : http+"/mobile/park/getParkCarDetail",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,dateId:val,businessareaid:businessareaid2,hourId:hourId1},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now4').html(pagenow);
                console.log(res);
                if(res.data.length>10){
                    webdata1 = res.data;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle4').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                    $('.pre4').on('click',function(){
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now4').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    });
                    $('.next4').on('click',function(){
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now4').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    })
                }else{
                    $('.totle4').html(1);
                    data1=res.data;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p style=\"width: 14%;\">"+data1[i].parkName+" </p>" +
                            "                                <p style=\"text-align: center;\">"+toshi(data1[i].parkingkind)+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].parkplacenums+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].useparkplacenums+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].orderparkplacecount+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].waitCarnum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].poweroffCarnum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].operoffCarnum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].powerCarnum+"%</p>" +
                            "                            </li>";
                    }
                    $('.siteCar').html(str1);
                }
            }
        });

    }
    // 网点订单
    function orderCar(val){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre5').off('click');
        $('.next5').off('click');
        $.ajax({
            url : http+"/mobile/park/getParkOrderDetail",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,dateId:val,typeId:typeid},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now5').html(pagenow);
                console.log(res);
                if(res.data.length>10){
                    webdata1 = res.data;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle5').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                    $('.pre5').on('click',function(){
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now5').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    });
                    $('.next5').on('click',function(){
                        if(pagenow>=pageall1){
                            return false;
                        };
                        pagenow++;
                        $('.now5').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    })
                }else{
                    $('.totle5').html(1);
                    data1=res.data;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p style=\"width: 8%;\">"+data1[i].parkName+" </p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].operaTime+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].parkState+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].parkPlaceNum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].createOrderNum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].execOrderNum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].execOrderRate+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].finishOrderNum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].retrunOrderNum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].diffOrderNum+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].avgOrderMileage+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].avgOrderMinute+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].amount+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].payamount+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].placeAvgExecorder+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].placeAvgReturnorder+"</p>" +
                            "                                <p style=\"text-align: center;\">"+data1[i].diffReturnorderRate+"</p>" +
                            "                            </li>";
                    }
                    $('.ordercar').html(str1);
                }
            }
        });

    }
    $('.chooseCom').on('click',function(){
        $('.chooseCom').removeClass('active');
        $(this).addClass('active');
        selectType=$(this).index()+1;
        console.log(selectType,'selectType');
        orderAll2()
    });
    $('#last').bind('input propertychange', function() {
        if ($('#last').val()=='' || $('#last-s').attr('value')==undefined){
            return false
        }
        daylast=$('#last-s').attr('value');//更改城市后重新渲染页面图表
        console.log(daylast);
        orderAll2() //网点明细 近七日
    });
    $('#last1').bind('input propertychange', function() {
        if ($('#last1').val()=='' || $('#last1-s').attr('value')==undefined){
            return false
        }
        businessareaid1=$('#last1-s').attr('value');//更改城市后重新渲染页面图表
        console.log(businessareaid1);
        orderAll2() //网点明细 商圈
    });
    $('#last2').bind('input propertychange', function() {
        if ($('#last2').val()=='' || $('#last2-s').attr('value')==undefined){
            return false
        }
        parkingKind1=$('#last2-s').attr('value');//更改城市后重新渲染页面图表
        console.log(parkingKind1);
        orderAll2() //网点明细 实体网点
    });
    // 网点车辆商圈
    $('#last3').bind('input propertychange', function() {
        if ($('#last3').val()=='' || $('#last3-s').attr('value')==undefined){
            return false
        }
        businessareaid2=$('#last3-s').attr('value');
        siteCar($('#appDateTime6').val())
    });
    // 网点车辆时刻
    $('#last4').bind('input propertychange', function() {
        if ($('#last4').val()=='' || $('#last4-s').attr('value')==undefined){
            return false
        }
        hourId1=$('#last4-s').attr('value');
        siteCar($('#appDateTime6').val())
    });
    // $('.jia').on('click',function(){
    //     $('.now1').html(1);
    //     $('.totle1').html(1);
    // })

    $('#appDateTime1').on('change',function () {
        sitechange($('#appDateTime1').val(),$('#appDateTime2').val()); //网点变更
    });
    $('#appDateTime2').on('change',function () {
        sitechange($('#appDateTime1').val(),$('#appDateTime2').val()); //网点变更
    });
//前进  网点车辆
    $('.nextDateBtn6').on('click',function(){
        var goDate61=changeDate1(6,1);
        $('#appDateTime6').val(goDate61);
        siteCar(goDate61);
    });
// 后退
    $('.preDateBtn6').on('click',function(){
        var goDate62=changeDate(6,-1);
        $('#appDateTime6').val(goDate62);
        siteCar(goDate62);
    });
// 日历选
    $('#appDateTime6').on('change',function () {
        changeWeekByHtml(6);
        siteCar($('#appDateTime6').val());
    });
    //前进  订单车辆
    $('.nextDateBtn7').on('click',function(){
        var goDate71=changeDate1(7,1);
        $('#appDateTime7').val(goDate71);
        orderCar(goDate71);
    });
// 后退
    $('.preDateBtn7').on('click',function(){
        var goDate72=changeDate(7,-1);
        $('#appDateTime7').val(goDate72);
        orderCar(goDate72);
    });
// 日历选
    $('#appDateTime7').on('change',function () {
        changeWeekByHtml(7);
        orderCar($('#appDateTime7').val());
    });
    $('.orderbtn').on('click',function () {
        $('.orderbtn').removeClass('active');
        $(this).addClass('active');
        typeid=$(this).attr('data-carType');
        orderCar($('#appDateTime7').val());
    })
});
