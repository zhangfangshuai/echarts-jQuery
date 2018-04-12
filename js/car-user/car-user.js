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
    var appId='1';  //1;2
    var day="1";   // 用户转化                    //1；2；3；4；5
    var dayline='-7'; //老拉新 -7；-15；-30；-60
    var daycircle='1'; //新用户渠道占比 1；2；3；4
    $('.lateTime').val('近7日'); //时间默认为近7日
    var day1 = new Date();
    day1.setDate(day1.getDate() - 7);
    var s1 = day1.format("yyyyMMdd")
    var day2 = new Date();
    day2.setDate(day2.getDate() - 1);
    var nowDate = day2.format("yyyyMMdd")
    $('#appDateTime1').mobiscroll(opt);
    $('#appDateTime2').mobiscroll(opt);
    $('#appDateTime1').val(s1);
    $('#appDateTime2').val(nowDate);
    $('#appDateTime3').mobiscroll(opt);
    $('#appDateTime4').mobiscroll(opt);
    $('#appDateTime3').val(s1);
    $('#appDateTime4').val(nowDate);
    $('#appDateTime5').mobiscroll(opt);
    $('#appDateTime6').mobiscroll(opt);
    $('#appDateTime5').val(s1);
    $('#appDateTime6').val(nowDate);
    $('#appDateTime7').mobiscroll(opt);
    $('#appDateTime8').mobiscroll(opt);
    $('#appDateTime7').val(s1);
    $('#appDateTime8').val(nowDate);
    $('#appDateTime9').mobiscroll(opt);
    $('#appDateTime10').mobiscroll(opt);
    $('#appDateTime9').val(s1);
    $('#appDateTime10').val(nowDate);
    $('#appDateTime11').mobiscroll(opt);
    $('#appDateTime12').mobiscroll(opt);
    $('#appDateTime11').val(s1);
    $('#appDateTime12').val(nowDate);
    $('#appDateTime13').mobiscroll(opt);
    $('#appDateTime14').mobiscroll(opt);
    $('#appDateTime13').val(s1);
    $('#appDateTime14').val(nowDate);
    $('#appDateTime16').mobiscroll(opt);
    $('#appDateTime16').val(nowDate);
    // startingWeek(16);
    $('.showWeek16').html(getWeek(day2.getDay()));
    $('#appDateTime17').mobiscroll(opt);
    $('#appDateTime17').val(nowDate);
    // startingWeek(17);
    $('.showWeek17').html(getWeek(day2.getDay()));
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
            getfirst($('#appDateTime7').val(),$('#appDateTime8').val()); //老拉新
            getfirst3(); //用户转化漏斗
            getfirst4($('#appDateTime9').val(),$('#appDateTime10').val()); //新渠道占比
            orderAll4();
            orderAll5(); //用户复购率
            userline($('#appDateTime1').val(),$('#appDateTime2').val()) //用户注绑率
            userline1($('#appDateTime3').val(),$('#appDateTime4').val()) //用户激活率
            userline2($('#appDateTime5').val(),$('#appDateTime6').val()); //用户流失率
            revenueform($('#appDateTime11').val(),$('#appDateTime12').val()); //双证用户分析
            revenueform1($('#appDateTime13').val(),$('#appDateTime14').val()); //双证用户分析
            orderCancel($('#appDateTime16').val());
            orderCancel1($('#appDateTime17').val());
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
            $('.formCommon').css('padding-bottom', '0.4rem');
            $('.formCommon .page').css('margin-bottom', '0');
            $('.box .cars .orderCommon').css({'padding-bottom':'0.4rem'});
            $('.box .cars .orderCommon1').css({'padding-bottom':'0.4rem'});
            $('.box .cars .orderCommon .page').css('margin-bottom', '0');
            $('.box .cars .carCommon').css({'padding-bottom':'0.4rem'});
        }
        getfirst($('#appDateTime7').val(),$('#appDateTime8').val()); //老拉新
        getfirst3(); //用户转化
        getfirst4($('#appDateTime9').val(),$('#appDateTime10').val()); //新渠道占比
        orderAll4();
        orderAll5(); //用户复购率
        userline($('#appDateTime1').val(),$('#appDateTime2').val()) //用户注绑率
        userline1($('#appDateTime3').val(),$('#appDateTime4').val()) //用户激活率
        userline2($('#appDateTime5').val(),$('#appDateTime6').val()); //用户流失率
        revenueform($('#appDateTime11').val(),$('#appDateTime12').val()); //双证用户分析
        revenueform1($('#appDateTime13').val(),$('#appDateTime14').val()); //双证用户分析
        orderCancel($('#appDateTime16').val());
        orderCancel1($('#appDateTime17').val());
        getPrincipal(cityVal, [15,16,17,18,19,20,21,22,24,26,27,31], 'car-user.html', function(){
            $('.formCommon').css('padding-bottom', '0');
            $('.formCommon .page').css('margin-bottom', '.2rem');
            $('.box .cars .orderCommon').css({'padding-bottom':'0', 'height': 'auto'});
            $('.box .cars .orderCommon1').css({'padding-bottom':'0', 'height': 'auto'});
            $('.box .cars .carCommon .carDetail .carDetailList').css('margin-bottom', '.2rem');
            $('.box .cars .carCommon').css('height','auto');
            $('.box .cars .orderCommon .page').css('margin-bottom', '.2rem');
        });
    });

    // 责任人弹窗控制
    var BUBBLE_CACHE = '';
    $('.responsiblePerson').on('click', function() {
        $('.userfilter-phoneBubble').css('display','none');
        $('.userRebuy-phoneBubble').css('display','none');
        $('.userStay-phoneBubble').css('display','none');
        $('.userBind-phoneBubble').css('display','none');
        $('.userActivate-phoneBubble').css('display','none');
        $('.userLoss-phoneBubble').css('display','none');
        $('.userNew-phoneBubble').css('display','none');
        $('.userReg-phoneBubble').css('display','none');
        $('.userCert-phoneBubble').css('display','none');
        $('.userCarsAuth-phoneBubble').css('display','none');
        $('.userOrder-phoneBubble').css('display','none');
        $('.userFirstOrder-phoneBubble').css('display','none');
        if ( BUBBLE_CACHE == $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
            BUBBLE_CACHE = '';
            return;
        }
        switch ( $(this.parentNode).children(':eq(0)')[0].classList[1] ) {
           case 'userfilter-phoneBubble':
               $('.userfilter-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userfilter-phoneBubble';
               break;
           case 'userRebuy-phoneBubble':
               $('.userRebuy-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userRebuy-phoneBubble';
               break;
           case 'userStay-phoneBubble':
               $('.userStay-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userStay-phoneBubble';
               break;
           case 'userBind-phoneBubble':
               $('.userBind-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userBind-phoneBubble';
               break;
           case 'userActivate-phoneBubble':
               $('.userActivate-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userActivate-phoneBubble';
               break;
           case 'userLoss-phoneBubble':
               $('.userLoss-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userLoss-phoneBubble';
               break;
           case 'userNew-phoneBubble':
               $('.userNew-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userNew-phoneBubble';
               break;
           case 'userReg-phoneBubble':
               $('.userReg-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userReg-phoneBubble';
               break;
           case 'userCert-phoneBubble':
               $('.userCert-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userCert-phoneBubble';
               break;
           case 'userCarsAuth-phoneBubble':
               $('.userCarsAuth-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userCarsAuth-phoneBubble';
               break;
           case 'userOrder-phoneBubble':
               $('.userOrder-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userOrder-phoneBubble';
               break;
           case 'userFirstOrder-phoneBubble':
               $('.userFirstOrder-phoneBubble').css('display','block');
               BUBBLE_CACHE = 'userFirstOrder-phoneBubble';
               break;
        }
    });


    // 用户复购率
    function orderAll5(){
        $.ajax({
            url : http+"mobile/MUser/MuserRepurchase",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res);
                var str1 = "";
                var data = res.data;
                for (i in data) {
                    var imgUrl = "";
                    if(data[i].repurchase_rate3 > 0){
                        imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data[i].repurchase_rate3 < 0){
                        imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\">";
                    }else if(data[i].repurchase_rate3 == 0) {
                        imgUrl = "";
                    }
                    str1 += "<li class=\"anlysis\">" +
                        "<p style=\"width: 23%;\">" + data[i].reportName + "</p>" +
                        "<p>" + data[i].repurchase_rate+ "</p>" +
                        "<p>" + data[i].repurchase_rate1 + "</p>" +
                        "<p style=\"width: 19%;\">" + data[i].repurchase_rate2 + "</p>" +
                        "<p style=\"width: 18%;\">" + data[i].repurchase_rate3 + "%" + imgUrl + "</p>" +
                        "</li>";
                }
                $('.orderListPer').html(str1);
            }
        });
    }
    // 用户留存
    function orderAll4(){
        // 用户留存
        $.ajax({
            url : http+"mobile/MUser/MuserKeep",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,reportId:appId},
            dataType : "json",
            success : function(res){
                console.log(res);
                var str1 = "";
                var data = res.data;
                for (i in data) {
                    str1 +="<li class=\"anlysis\">\n" +
                        "                                <p class=\"orderOne\">"+data[i].data_date+"</p>\n" +
                        "                                <p class=\"orderTwo\">"+data[i].total_num+"</p>\n" +
                        "                                <p class=\"orderThree\">"+nullDelete(data[i].renten_1d_rate)+"</p>\n" +
                        "                                <p class=\"orderFour\">"+nullDelete(data[i].renten_2d_rate)+"</p>\n" +
                        "                                <p class=\"orderFive\">"+nullDelete(data[i].renten_3d_rate)+"</p>\n" +
                        "                                <p class=\"orderFive\">"+nullDelete(data[i].renten_4d_rate)+"</p>\n" +
                        "                                <p class=\"orderFive\">"+nullDelete(data[i].renten_5d_rate)+"</p>\n" +
                        "                                <p class=\"orderFive\">"+nullDelete(data[i].renten_6d_rate)+"</p>\n" +
                        "                                <p class=\"orderFive\">"+nullDelete(data[i].renten_7d_rate)+"</p>\n" +
                        "                            </li>";
                }
                $('.orderListapp').html(str1);
            }
        });
    }
// 老拉新折线图
    var myChart2 = echarts.init(document.getElementById("oldnewChart"));
    myChart2.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    function getfirst(minDate,maxDate){
        $.ajax({
            url : http+"mobile/MUser/MoldPullNew",
            type : "get",
            async : true,
            data : {cityId:cityVal,minDate:minDate,maxDate:maxDate,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res);
                option2.xAxis.data=res.data.axisList;
                option2.series[0].data=res.data.dataList;
                myChart2.setOption(option2);
                myChart2.hideLoading();

                $(".carDatas1").html(res.data.total+'人次');
            }
        });
    }
// 用户注绑率
    var myChart5 = echarts.init(document.getElementById("userChart"));
    myChart5.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    function userline(minDate,maxDate){
        $.ajax({
            url : http+"mobile/MUser/MuserSignInBinding",
            type : "get",
            async : true,
            data : {cityId:cityVal,minDate:minDate,maxDate:maxDate,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res);
                option5.xAxis.data=res.data.xaxis;
                option5.series[0].data=res.data.day7;
                option5.series[1].data=res.data.day15;
                option5.series[2].data=res.data.day30;
                option5.series[3].data=res.data.day60;
                myChart5.setOption(option5);
                myChart5.hideLoading();
            }
        });
    }
    // 用户激活率
    var myChart6 = echarts.init(document.getElementById("userChart1"));
    myChart6.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    function userline1(minDate,maxDate){
        $.ajax({
            url : http+"mobile/MUser/MuserActivate",
            type : "get",
            async : true,
            data : {cityId:cityVal,minDate:minDate,maxDate:maxDate,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res,"激活");
                option6.xAxis.data=res.data.xaxis;
                option6.series[0].data=res.data.day7;
                option6.series[1].data=res.data.day30;
                option6.series[2].data=res.data.day60;
                option6.series[3].data=res.data.after7;
                option6.series[4].data=res.data.after30;
                option6.series[5].data=res.data.after60;
                myChart6.setOption(option6);
                myChart6.hideLoading();
            }
        });
    }
    // 用户激活率
    var myChart7 = echarts.init(document.getElementById("userChart2"));
    myChart7.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    function userline2(minDate,maxDate){
        $.ajax({
            url : http+"mobile/MUser/MuserCurrent",
            type : "get",
            async : true,
            data : {cityId:cityVal,minDate:minDate,maxDate:maxDate,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res,"激活");
                option7.xAxis.data=res.data.xaxis;
                option7.series[0].data=res.data.audit;
                option7.series[1].data=res.data.nousable;
                option7.series[2].data=res.data.nocreate;
                myChart7.setOption(option7);
                myChart7.hideLoading();
            }
        });
    }
// 用户转化
    var myChart3 = echarts.init(document.getElementById("userchange"));
    myChart3.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    function getfirst3(value){
        $.ajax({
            url : http+"mobile/MUser/MuserTransformData",
            type : "get",
            async : true,
            data : {cityId:cityVal,reportId:day,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res);
                if(res.data.length>0){
                    var one=(res.data[3].value/res.data[4].value*100).toFixed(2);
                    var two=(res.data[2].value/res.data[3].value*100).toFixed(2);
                    var three=(res.data[1].value/res.data[2].value*100).toFixed(2);
                    var four=(res.data[0].value/res.data[1].value*100).toFixed(2);
                    $('.per-one').html(one+'%');
                    $('.per-two').html(two+'%');
                    $('.per-three').html(three+'%');
                    $('.per-four').html(four+'%');
                }
                option3.series[0].data=res.data;
                var arr3=[];
                for(var i=0;i<res.data.length;i++){
                    arr3.push(res.data[i].name)
                };
                option3.legend.data=arr3;
                myChart3.setOption(option3);
                myChart3.hideLoading();
            }
        });
    }
// 注册用户分析
    var myChart4 = echarts.init(document.getElementById("userchange1"));
    myChart4.showLoading({ //chart数据组装时的过渡控制
        effect:'ring'
    });
    function getfirst4(startDate,endDate){
        $.ajax({
            url : http+"mobile/MUser/MSignInPieData",
            type : "get",
            async : true,
            data : {cityId:cityVal,startDate:startDate,endDate:endDate,token:sessionStorage.token},
            dataType : "json",
            success : function(res){
                console.log(res,"饼图");
                option4.series[0].data=res.data.dataMap;
                option4.legend.data=res.data.legend;
                myChart4.setOption(option4);
                myChart4.hideLoading();
            }
        });
    }

    //双证用户分析
    function revenueform(startDate,endDate){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre1').off('click')
        $('.next1').off('click')
        $.ajax({
            url : http+"mobile/MUser/MdoubleCertificale",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,startDate:startDate,endDate:endDate},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now1').html(pagenow);
                console.log(res);
                if(res.data.tableData.length>10){
                    webdata1 = res.data.tableData;
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
                    data1=res.data.tableData;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += "<li class=\"anlysis\">\n" +
                            "                                <p style=\"width: 8%;\">"+data1[i].date_id+" </p>" +
                            "                                <p style=\"width: 13%;\">"+data1[i].users_id_new+"</p>" +
                            "                                <p style=\"width: 13%;\">"+data1[i].users_drive_new+"</p>" +
                            "                                <p style=\"width: 13%;\">"+data1[i].users_audit_new+"</p>" +
                            "                                <p style=\"width: 23%;\">"+data1[i].users_id_newrate+"</p>" +
                            "                                <p style=\"width: 15%;\">"+data1[i].users_drive_new+"</p>" +
                            "                                <p style=\"width: 15%;\">"+data1[i].users_audit_new+"</p>" +
                            "                            </li>";
                    }
                    $('.revenue').html(str1);
                }
            }
        });

    }
    //可用车用户分析
    function revenueform1(startDate,endDate){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre2').off('click')
        $('.next2').off('click')
        $.ajax({
            url : http+"mobile/MUser/MUsableCarUser",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,startDate:startDate,endDate:endDate},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now2').html(pagenow);
                console.log(res);
                if(res.data.tableData.length>10){
                    webdata1 = res.data.tableData;
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
                    data1=res.data.tableData;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        str1 += " <li class=\"anlysis\">\n" +
                            "                                <p style=\"width: 5%;\">"+data1[i].date_id+"</p>" +
                            "                                <p style=\"width:8%\">"+data1[i].deposit_users1+"</p>" +
                            "                                <p style=\"width:8%\">"+data1[i].deposit_users2+"</p>" +
                            "                                <p style=\"width:8%\">"+data1[i].zmxy_users+"</p>" +
                            "                                <p style=\"\">"+data1[i].deposit_users1_t+"</p>" +
                            "                                <p style=\"\">"+data1[i].deposit_users2_t+"</p>" +
                            "                                <p style=\"\">"+data1[i].zmxy_users_t+"</p>" +
                            "                                <p style=\"width:14%\">"+data1[i].deposit_users1_rate+"</p>" +
                            "                                <p style=\"width:14%\">"+data1[i].deposit_users2_rate+"</p>" +
                            "                                <p style=\"width:14%\">"+data1[i].zmxy_users_rate+"</p>" +
                            "                            </li>";
                    }
                    $('.revenue1').html(str1);
                }
            }
        });

    }

    //下单、首单用户分析
    function orderCancel(val){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre4').off('click')
        $('.next4').off('click')
        $.ajax({
            url : http+"mobile/MUser/MPlaceAnOrder",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,dateId:val},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now4').html(pagenow);
                console.log(res);
                if(res.data.orderData.length>10){
                    webdata1 = res.data.orderData;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle4').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                    $('.pre4').on('click',function(){
                        console.log(pagenow)
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now4').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    });
                    $('.next4').on('click',function(){
                        console.log(pagenow)
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
                    data1=res.data.orderData;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        var imgUrl = "";
                        if(data1[i].user_total_rate > 0){
                            imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\" style='margin-right: 1rem;'>";
                        }else if(data1[i].user_total_rate < 0){
                            imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\" style='margin-right: 1rem;'>";
                        }else if(data1[i].user_total_rate == 0) {
                            imgUrl = "";
                        }
                        str1 += "<li class=\"anlysis\">\n" +
                            "                        <p class=\"orderOne\" style=\"width: 20%;text-align: center\">"+data1[i].cityname+"</p>" +
                            "                        <p class=\"orderTwo\" style=\"width: 39.33%;text-align: center\">"+data1[i].user_total+"</p>" +
                            "                        <p class=\"orderThree\" style=\"width: 39.33%;text-align: center\">"+data1[i].user_total_rate+'%'+imgUrl+"</p>" +
                            "                    </li>";
                    }
                    $('.useranlysis').html(str1);
                }
            }
        });
    };
    function orderCancel1(val){
        var webdata1=[];
        var pageall1='';
        var data1=[];
        $('.pre3').off('click')
        $('.next3').off('click')
        $.ajax({
            url : http+"mobile/MUser/MFirstOrderUser",
            type : "get",
            async : true,
            data : {cityId:cityVal,token:sessionStorage.token,dateId:val},
            dataType : "json",
            success : function(res){
                var pagenow='1';
                $('.now3').html(pagenow);
                console.log(res,"xiadan ");
                if(res.data.firstOrder.length>10){
                    webdata1 = res.data.firstOrder;
                    pageall1=Math.ceil(webdata1.length/10);
                    $('.totle3').html(pageall1);
                    data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                    page1();
                    $('.pre3').on('click',function(){
                        console.log(pagenow)
                        if(pagenow<=1){
                            return false;
                        };
                        pagenow--;
                        $('.now3').html(pagenow);
                        data1=webdata1.slice(10*(pagenow-1),10*pagenow);
                        page1();
                    });
                    $('.next3').on('click',function(){
                        console.log(pagenow)
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
                    data1=res.data.firstOrder;
                    page1();
                }

                function page1() {
                    var str1 = "";
                    // var data = res.data;
                    for (i in data1) {
                        var imgUrl = "";
                        if(data1[i].firstorder_total_rate > 0){
                            imgUrl = "<img src=\"../images/icon_rise.png\" alt=\"\" class=\"orderUp fr\" style='margin-right: 1rem;'>";
                        }else if(data1[i].firstorder_total_rate < 0){
                            imgUrl = "<img src=\"../images/icon_decline.png\" alt=\"\" class=\"orderUp fr\" style='margin-right: 1rem;'>";
                        }else if(data1[i].firstorder_total_rate == 0) {
                            imgUrl = "";
                        }
                        str1 += "<li class=\"anlysis\">\n" +
                            "                        <p class=\"orderOne\" style=\"width: 20%;text-align: center\">"+data1[i].cityname+"</p>" +
                            "                        <p class=\"orderTwo\" style=\"width: 39.33%;text-align: center\">"+data1[i].firstorder_total+"</p>" +
                            "                        <p class=\"orderThree\" style=\"width: 39.33%;text-align: center\">"+data1[i].firstorder_total_rate+'%'+imgUrl+"</p>" +
                            "                    </li>";
                    }
                    $('.useranlysis1').html(str1);
                }
            }
        });
    };
//用户转化 时间变更 及其刷新数据
    $('#first-s').bind('input propertychange', function() {
        if ($('#first-s').val()=='' || $('#first-sv').attr('value')==undefined){
            return false
        }
        day=$('#first-sv').attr('value');//更改城市后重新渲染页面图表
        console.log(day);
        getfirst3()
    });
// 及其刷新数据
    $('#line').bind('input propertychange', function() {
        if ($('#line').val()=='' || $('#line-s').attr('value')==undefined){
            return false
        }
        dayline=$('#line-s').attr('value');//更改城市后重新渲染页面图表
        console.log(dayline);
    });
    $('.chooseCom').on('click',function(){
        $('.chooseCom').removeClass('active');
        $(this).addClass('active');
    });
    $('.all').on('click',function(){
        day=1;
        console.log(day);
        getfirst3();
        $('.first-s').hide();
    });
    $('.all1').on('click',function(){
        day=2;
        $('#first-s').val('近7日');
        getfirst3();
        $('.first-s').show();
    });
    $('.chooseCom1').on('click',function(){
        $('.chooseCom1').removeClass('active');
        $(this).addClass('active');
        appId=$(this).index()+1;
        console.log(appId,'appId');
        orderAll4()
    });
    $('#appDateTime1').on('change',function () {
        userline($('#appDateTime1').val(),$('#appDateTime2').val());
    });
    $('#appDateTime2').on('change',function () {
        userline($('#appDateTime1').val(),$('#appDateTime2').val());
    });
    $('#appDateTime3').on('change',function () {
        userline1($('#appDateTime3').val(),$('#appDateTime4').val());
    });
    $('#appDateTime4').on('change',function () {
        userline1($('#appDateTime3').val(),$('#appDateTime4').val());
    });
    $('#appDateTime5').on('change',function () {
        userline2($('#appDateTime5').val(),$('#appDateTime6').val());
    });
    $('#appDateTime6').on('change',function () {
        userline2($('#appDateTime5').val(),$('#appDateTime6').val());
    });
    $('#appDateTime7').on('change',function () {
        getfirst($('#appDateTime7').val(),$('#appDateTime8').val());
    });
    $('#appDateTime8').on('change',function () {
        getfirst($('#appDateTime7').val(),$('#appDateTime8').val());
    });
    $('#appDateTime9').on('change',function () {
        getfirst4($('#appDateTime9').val(),$('#appDateTime10').val());
    });
    $('#appDateTime10').on('change',function () {
        getfirst4($('#appDateTime9').val(),$('#appDateTime10').val());
    });
    $('#appDateTime11').on('change',function () {
        revenueform($('#appDateTime11').val(),$('#appDateTime12').val());
    });
    $('#appDateTime12').on('change',function () {
        revenueform($('#appDateTime11').val(),$('#appDateTime12').val());
    });
    $('#appDateTime13').on('change',function () {
        revenueform1($('#appDateTime13').val(),$('#appDateTime14').val());
    });
    $('#appDateTime14').on('change',function () {
        revenueform1($('#appDateTime13').val(),$('#appDateTime14').val());
    });
    //前进  1 实时车辆状况
    $('.nextDateBtn16').on('click',function(){
        var goDate11=changeDate1(16,1);
        $('#appDateTime16').val(goDate11);
        orderCancel($('#appDateTime16').val());
    });
// 后退
    $('.preDateBtn16').on('click',function(){
        var goDate12=changeDate(16,-1);
        $('#appDateTime16').val(goDate12);
        orderCancel($('#appDateTime16').val());
    });
    $('#appDateTime16').on('change',function () {
        orderCancel($('#appDateTime16').val());
    });
    //前进  1 实时车辆状况
    $('.nextDateBtn17').on('click',function(){
        var goDate11=changeDate1(17,1);
        $('#appDateTime17').val(goDate11);

        orderCancel1($('#appDateTime17').val());
    });
// 后退
    $('.preDateBtn17').on('click',function(){
        var goDate12=changeDate(17,-1);
        $('#appDateTime17').val(goDate12);
        orderCancel1($('#appDateTime17').val());
    });
    $('#appDateTime17').on('change',function () {
        orderCancel1($('#appDateTime17').val());
    });
});
