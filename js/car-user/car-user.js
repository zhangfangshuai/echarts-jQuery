/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15 09:05
 * Recode: zhangfs by Atom - 2018/04/16
 * Note: Package and Add Handler   old: 828 lines; recode: 450 lines;
 */
$(function () {
    var LICENSE_CACHE, CARUSABLE_CACHE, PURCHASE_CACHE, FO_CACHE;
    var licpage = 1,
        cupage = 1,
        purcpage = 1,
        fopage = 1;
    var cityVal = '',
        appId = '1',       // 1;2
        ut_period = "1";   // 用户转化
    var dayline = '-7',    // 老拉新 -7；-15；-30；-60
        daycircle = '1';   // 新用户渠道占比 1；2；3；4

    var weekAgo = getDaysOffset(-7),
        yesterday = getDaysOffset(-1);

    for (let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17]) {
        $('#appDateTime'+i).mobiscroll(APP.dateBar);
    }
    for (let i of [1,3,5,7,9,11,13]) {
        $('#appDateTime'+i).val(weekAgo);
    }
    for (let i of [2,4,6,8,10,12,14,16,17]) {
        $('#appDateTime'+i).val(yesterday);
    }

    startingWeekYesterday(16);
    startingWeekYesterday(17);
    triggerLArea1('#ut', '#ut-val', APP.userPeriodBar);

    // 获取城市列表，并初始化数据
    getCity(function(res, cityInit){
        cityVal = cityInit;
        $('.simpleSelection').hide();
        userTransform();
        userRepurchase();
        userStay();
        userBing($('#appDateTime1').val(),$('#appDateTime2').val());
        userActivate($('#appDateTime3').val(),$('#appDateTime4').val());
        userLoss($('#appDateTime5').val(),$('#appDateTime6').val());
        pullNew($('#appDateTime7').val(),$('#appDateTime8').val());
        userRegist($('#appDateTime9').val(),$('#appDateTime10').val());
        userLicense($('#appDateTime11').val(), $('#appDateTime12').val(), licpage);
        carUsable($('#appDateTime13').val(), $('#appDateTime14').val(), cupage);
        userPurchase($('#appDateTime16').val(), purcpage);
        userFirstOrder($('#appDateTime17').val(), fopage);
    });


    //nav 城市改变 及其刷新数据
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val() == '') return;
        cityVal = $('#value3').val();
        $('.phoneBubble').hide('fast');
        $('.simpleSelection').hide();
        cityVal == '1' && $('.responsiblePerson-box').hide('fast');
        userTransform();
        userRepurchase();
        userStay();
        userBing($('#appDateTime1').val(), $('#appDateTime2').val());
        userActivate($('#appDateTime3').val(), $('#appDateTime4').val());
        userLoss($('#appDateTime5').val(), $('#appDateTime6').val());
        pullNew($('#appDateTime7').val(), $('#appDateTime8').val());
        userRegist($('#appDateTime9').val(), $('#appDateTime10').val());
        userLicense($('#appDateTime11').val(), $('#appDateTime12').val(), licpage);
        carUsable($('#appDateTime13').val(), $('#appDateTime14').val(), cupage);
        userPurchase($('#appDateTime16').val(), purcpage);
        userFirstOrder($('#appDateTime17').val(), fopage);
        getPrincipal(cityVal, [15,16,17,18,19,20,21,22,24,26,27,31]);
    });

    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });



    // 用户转化
    var myChart3 = echarts.init(document.getElementById("ut-funnel"));
    myChart3.showLoading({ effect:'ring' });

    function userTransform() {
        buildAjax('get', 'MUser/MuserTransformData', {cityId: cityVal,reportId: ut_period}, true, false, function(res){
            if (res.data.length > 0) {
                $('.ut1').html((res.data[3].value/res.data[4].value*100).toFixed(2)+'%');
                $('.ut2').html((res.data[2].value/res.data[3].value*100).toFixed(2)+'%');
                $('.ut3').html((res.data[1].value/res.data[2].value*100).toFixed(2)+'%');
                $('.ut4').html((res.data[0].value/res.data[2].value*100).toFixed(2)+'%');
            }
            let arr = [];
            for(let d of res.data) {
                arr.push(d.name)
            }
            option3.series[0].data = res.data;
            option3.legend.data = arr;
            myChart3.setOption(option3);
            myChart3.hideLoading();
        }, false);
    }

    $('#ut').bind('input propertychange', function() {
        if ($('#ut-val').val()){
            ut_period = $('#ut-val').attr('value');
            userTransform();
        }
    });

    $('.ut-set').on('click', function() {
        $('.ut-set').removeClass('active');
        $(this).addClass('active');
        if ($(this).html() == '新增') {
            $('.simpleSelection').show('fast');
            $('#ut').html('近7日');
            ut_period = 2;
        } else {
            $('.simpleSelection').hide('fast');
            ut_period = 1;
        }
        userTransform();
    })

    // 用户复购率
    function userRepurchase () {
        buildAjax('get', 'MUser/MuserRepurchase', {cityId:cityVal}, true, false, function(res){
            let str = '';
            for (let d of res.data) {
                let imgSrc = d.repurchase_rate3 == 0 ? '' : d.repurchase_rate3 > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
                str +=  "<li> <p>" + d.reportName + "</p>" +
                        "<p>" + d.repurchase_rate + "</p>" +
                        "<p>" + d.repurchase_rate1 + "</p>" +
                        "<p>" + d.repurchase_rate2 + "</p>" +
                        "<p>" + d.repurchase_rate3 + "%" +
                        "<img src='" + imgSrc + "' alt=''/>" + "</p> </li>";
            }
            $('.rebuyVal').html(str);
        });
    }


    // 用户留存
    function userStay() {
        buildAjax('get','MUser/MuserKeep', {cityId:cityVal, reportId:appId}, true, false, function(res){
            let str = '';
            for (let d of res.data) {
                str += "<li> <p>" + d.data_date + "</p>" +
                    "<p>" + d.total_num + "</p>" +
                    "<p>" + d.renten_1d_rate + "%</p>" +
                    "<p>" + d.renten_2d_rate + "%</p>" +
                    "<p>" + d.renten_3d_rate + "%</p>" +
                    "<p>" + d.renten_4d_rate + "%</p>" +
                    "<p>" + d.renten_5d_rate + "%</p>" +
                    "<p>" + d.renten_6d_rate + "%</p>" +
                    "<p>" + d.renten_7d_rate + "%</p> </li>";
            }
            $('.stayVal').html(str);
        })
    }

    $('.us-set').on('click', function() {
        $('.us-set').removeClass('active');
        $(this).addClass('active');
        appId = $(this).index()+1;
        userStay();
    })


    // 用户注绑率
    var myChart5 = echarts.init(document.getElementById('ubindChart'))
    myChart5.showLoading({ effect: 'ring' })

    function userBing(s, e) {
        let data = {
            cityId: cityVal,
            minDate: s,
            maxDate: e
        }
        buildAjax('get', 'MUser/MuserSignInBinding', data, true, false, function(res){
            option5.xAxis.data = res.data.xaxis;
            option5.series[0].data = res.data.day7;
            option5.series[1].data = res.data.day15;
            option5.series[2].data = res.data.day30;
            option5.series[3].data = res.data.day60;
            myChart5.setOption(option5);
            myChart5.hideLoading();
        });
    }

    $('#appDateTime1, #appDateTime2').on('change', function(){
        userBing($('#appDateTime1').val(), $('#appDateTime2').val());
    })


    // 用户激活率
    var myChart6 = echarts.init(document.getElementById("uactChart"));
    myChart6.showLoading({ effect:'ring' });

    function userActivate(s, e) {
        buildAjax('get', 'MUser/MuserActivate', {cityId:cityVal, minDate:s, maxDate:e}, true, false, function(res) {
            option6.xAxis.data = res.data.xaxis;
            option6.series[0].data = res.data.day7;
            option6.series[1].data = res.data.day30;
            option6.series[2].data = res.data.day60;
            option6.series[3].data = res.data.after7;
            option6.series[4].data = res.data.after30;
            option6.series[5].data = res.data.after60;
            myChart6.setOption(option6);
            myChart6.hideLoading();
        });
    }

    $('#appDateTime3, #appDateTime4').on('change', function(){
        userActivate($('#appDateTime3').val(), $('#appDateTime4').val());
    })


    // 用户激活率
    var myChart7 = echarts.init(document.getElementById("ulossChart"));
    myChart7.showLoading({ effect:'ring' });

    function userLoss(s, e){
        buildAjax('get', 'MUser/MuserCurrent', {cityId:cityVal,minDate:s,maxDate:e}, true, false,function(res){
            option7.xAxis.data = res.data.xaxis;
            option7.series[0].data = res.data.audit;
            option7.series[1].data = res.data.nousable;
            option7.series[2].data = res.data.nocreate;
            myChart7.setOption(option7);
            myChart7.hideLoading();
        });
    }

    $('#appDateTime5, #appDateTime6').on('change', function(){
        userLoss($('#appDateTime5').val(), $('#appDateTime6').val());
    })



    // 老拉新折线图
    var myChart2 = echarts.init(document.getElementById("pullnewChart"));
    myChart2.showLoading({ effect:'ring' });

    function pullNew (s, e) {
        buildAjax('get', 'MUser/MoldPullNew', {cityId:cityVal, minDate:s, maxDate:e}, true, false, function(res){
            option2.xAxis.data = res.data.axisList;
            option2.series[0].data = res.data.dataList;
            myChart2.setOption(option2);
            myChart2.hideLoading();
            $('.pn-note').html(res.data.total + '人次');
        });
    }

    $('#appDateTime7, #appDateTime8').on('change', function(){
        pullNew($('#appDateTime7').val(), $('#appDateTime8').val());
    })



    // 注册用户分析
    var myChart4 = echarts.init(document.getElementById("uregistChart"));
    myChart4.showLoading({ effect:'ring' });

    function userRegist (s, e) {
        buildAjax('get', 'MUser/MSignInPieData', {cityId:cityVal,startDate:s, endDate:e}, true, false, function(res){
            option4.series[0].data=res.data.dataMap;
            option4.legend.data=res.data.legend;
            myChart4.setOption(option4);
            myChart4.hideLoading();
        });
    }

    $('#appDateTime9, #appDateTime10').on('change', function(){
        userRegist($('#appDateTime9').val(), $('#appDateTime10').val());
    })



    // 用户双证分析
    function userLicense (s, e, p) {
        buildAjax('get','MUser/MdoubleCertificale', {cityId:cityVal,startDate:s, endDate:e}, true, false, function(res){
            licpage = resetPaging('ulic-nowpage');
            LICENSE_CACHE = res.data.tableData;
            $('.ulic-allpage').html(Math.ceil(LICENSE_CACHE.length / 10) == 0 ? 1 : Math.ceil(LICENSE_CACHE.length / 10));
            setLicenseUI(LICENSE_CACHE.slice(10 * ( p - 1 ), 10 * p));
        });
    }

    let refLicenseUI = (p) => {
        LICENSE_CACHE ? setLicenseUI(LICENSE_CACHE.slice(10 * ( p - 1 ), 10 * p))
                      : userLicense($('#appDateTime11').val(), $('#appDateTime12').val(), p);
    }

    let setLicenseUI = (data) => {
        let str = '';
        for (let d of data) {
            let id_src = d.users_id_newrate == 0 ? '' : d.users_id_newrate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            let dri_src = d.users_drive_newrate == 0 ? '' : d.users_drive_newrate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            let aud_src = d.users_audit_newrate == 0 ? '' : d.users_audit_newrate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            str += "<li> <p>" + d.date_id + "</p>" +
                "<p>" + d.users_id_new + "</p>" +
                "<p>" + d.users_drive_new + "</p>" +
                "<p>" + d.users_audit_new + "</p>" +
                "<p>" + d.users_id_newrate + "% <img src='" + id_src + "' alt=''/> </p>" +
                "<p>" + d.users_drive_newrate + "% <img src='" + dri_src + "' alt=''/> </p>" +
                "<p>" + d.users_audit_newrate + "% <img src='" + aud_src + "' alt=''/> </p> </li>";
        }
        $('.licenseVal').html(str);
    }

    // 用户双证分析 时间监控
    $('#appDateTime11, #appDateTime12').on('change', function(){
        userLicense($('#appDateTime11').val(), $('#appDateTime12').val(), 1);
    })

    // 用户双证分析 分页控制
    $('.ulic-prepage, .ulic-nextpage').on('click', function(){
        licpage = pagingCtrl(this, licpage, refLicenseUI);
    });



    // 可用车用户分析
    function carUsable (s, e, p) {
        buildAjax('get', 'MUser/MUsableCarUser', {cityId:cityVal, startDate:s, endDate:e}, true, false, function(res) {
            CARUSABLE_CACHE = res.data.tableData;
            cupage = resetPaging('cu-nowpage');
            $('.cu-allpage').html(Math.ceil(CARUSABLE_CACHE.length / 10) == 0 ? 1 : Math.ceil(CARUSABLE_CACHE.length / 10));
            setCuUI(CARUSABLE_CACHE.slice(10 * ( p - 1 ), 10 * p));
        });
    }

    let refCuUI = (p) => {
        CARUSABLE_CACHE ? setCuUI(CARUSABLE_CACHE.slice(10 * ( p - 1 ), 10 * p))
                        : carUsable($('#appDateTime13').val(), $('#appDateTime14').val(), p);
    }

    let setCuUI = (data) => {
        let str = '';
        for (let d of data) {
            let src1 = d.deposit_users1_rate == 0 ? '' : d.deposit_users1_rate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            let src2 = d.deposit_users2_rate == 0 ? '' : d.deposit_users2_rate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            let src3 = d.zmxy_users_rate == 0 ? '' : d.zmxy_users_rate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            str += "<li> <p>" + d.date_id + "</p>" +
                "<p>" + d.deposit_users1 + "</p>" +
                "<p>" + d.deposit_users2 + "</p>" +
                "<p>" + d.zmxy_users + "</p>" +
                "<p>" + d.deposit_users1_t + "</p>" +
                "<p>" + d.deposit_users2_t + "</p>" +
                "<p>" + d.zmxy_users_t + "</p>" +
                "<p>" + nullHandle(d.deposit_users1_rate) + "% <img src='" + src1 + "' alt=''/> </p>" +
                "<p>" + nullHandle(d.deposit_users2_rate) + "% <img src='" + src2 + "' alt=''/> </p>" +
                "<p>" + nullHandle(d.zmxy_users_rate) + "% <img src='" + src3 + "' alt=''/> </p> </li>";
        }
        $('.carUsableVal').html(str);
    }

    // 可用车用户分析 时间监控
    $('#appDateTime13, #appDateTime14').on('change', function() {
        carUsable($('#appDateTime13').val(), $('#appDateTime14').val(), 1);
    })

    // 可用车用户分析 分页控制
    $('.cu-prepage, .cu-nextpage').on('click', function() {
        cupage = pagingCtrl(this, cupage, refCuUI);
    });



    // 下单、首单用户分析
    function userPurchase (date, p) {
        buildAjax('get', 'MUser/MPlaceAnOrder', {cityId:cityVal,dateId:date}, true, false, function(res){
            PURCHASE_CACHE = res.data.orderData;
            purcpage = resetPaging('purc-nowpage');
            $('.purc-allpage').html(Math.ceil(PURCHASE_CACHE.length / 10) == 0 ? 1 : Math.ceil(PURCHASE_CACHE.length / 10));
            setPurcUI(PURCHASE_CACHE.slice(10 * ( p - 1 ), 10 * p));
        });
    }
    let refPurcUI = (p) => {
        PURCHASE_CACHE ? setPurcUI(PURCHASE_CACHE.slice(10 * ( p - 1 ), 10 * p))
                       : userPurchase($('#appDateTime16').val(), p);
    }
    let setPurcUI = (data) => {
        let str = '';
        for (let d of data) {
            let imgSrc = d.user_total_rate == 0 ? "" : d.user_total_rate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            str += "<li> <p>" + d.cityname + "</p>" +
                "<p>" + d.user_total + "</p>" +
                "<p>" + d.user_total_rate + '%' +
                "<img src='" + imgSrc + "' alt=''/> </p> </li>";
        }
        $('.purchaseVal').html(str);
    }

    // 下单用户分析 时间控制 单日期
    $('.purc-predate, .purc-nextdate').on('click',function() {
      let id = this.parentNode.children[1].children[0].id;
      this.classList[1].split('-')[1] == 'predate' ? $('#'+id).val(updateDate(this.parentNode, -1, true))
                                             : $('#'+id).val(updateDate(this.parentNode, 1, true));
      userPurchase($('#appDateTime16').val(), purcpage);
    });
    // 下单用户分析 日历控件修改
    $('#appDateTime16').bind('change', function() {
        userPurchase($('#appDateTime16').val(), purcpage);
        updateWeek(this);
    });

    // 下单用户分析 分页控制
    $('.purc-prepage, .purc-nextpage').on('click', function(){
        purcpage = pagingCtrl(this, purcpage, refPurcUI);
    });


    // 首单用户分析
    function userFirstOrder(date, p) {
        buildAjax('get', 'MUser/MFirstOrderUser', {cityId:cityVal,dateId:date}, true, false, function(res){
            FO_CACHE = res.data.firstOrder;
            fopage = resetPaging('fo-nowpage');
            $('.fo-allpage').html(Math.ceil(FO_CACHE.length/10) == 0 ? 1: Math.ceil(FO_CACHE.length/10));
            setFoUI(FO_CACHE.slice(10 * ( p - 1 ), 10 * p));
        });
    }
    let refFoUI = (p) => {
        FO_CACHE ? setFoUI(FO_CACHE.slice(10 * ( p - 1 ), 10 * p))
                 : userFirstOrder($('#appDateTime17').val(), p);
    }
    let setFoUI = (data) => {
        let str = '';
        for (let d of data) {
            let imgSrc = d.firstorder_total_rate == 0 ? "" : d.firstorder_total_rate > 0 ? '../images/icon_rise.png' : '../images/icon_decline.png';
            str += "<li> <p>" + d.cityname + "</p>" +
                "<p>" + d.firstorder_total + "</p>" +
                "<p>" + d.firstorder_total_rate + '%' +
                "<img src='" + imgSrc + "' alt=''/> </p> </li>";
        }
        $('.foVal').html(str);
    }

    // 首单用户分析 时间控制 单日期
    $('.fo-predate, .fo-nextdate').on('click',function() {
      let id = this.parentNode.children[1].children[0].id;
      this.classList[1].split('-')[1] == 'predate' ? $('#'+id).val(updateDate(this.parentNode, -1, true))
                                             : $('#'+id).val(updateDate(this.parentNode, 1, true));
      userFirstOrder($('#appDateTime17').val(), fopage);
    });
    // 首单用户分析 日历控件监控
    $('#appDateTime17').bind('change', function() {
        userFirstOrder($('#appDateTime17').val(), fopage);
        updateWeek(this);
    });

    // 首单用户分析 分页控制
    $('.fo-prepage, .fo-nextpage').on('click', function(){
        fopage = pagingCtrl(this, fopage, refFoUI);
    });
});
