/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15 09:05
 * Recode: zhangfs by Atom - 2018/04/16
 * Note: Package and Add Handler   old: 828 lines;
 */
$(function () {
    var REGIST_CACHE, LICENSE_CACHE, CARUSABLE_CACHE, PURCHASE_CACHE, FO_CACHE, STAY_CACHE, RECALL_CACHE;
    var registpage = 1, licpage = 1, cupage = 1, purcpage = 1, fopage = 1, staypage = 1, recallpage = 1;
    var cityVal = '',
        appId = '1',       // 1;2
        ut_period = "1";   // 用户转化
    var dayline = '-7',    // 老拉新 -7；-15；-30；-60
        daycircle = '1';   // 新用户渠道占比 1；2；3；4

    var weekAgo = getDaysOffset(-7),
        yesterday = getDaysOffset(-1),
        lastMonth = getMonthOffset(-1);

    for (let i of [1,2,3,4,5,6,7,8]) {
        $('#appDateTime'+i).mobiscroll(APP.dateBar);
    }
    for (let i of [1,2,3,4]) {
        $('#appMonth'+i).mobiscroll(APP.monthBar);
    }
    for (let i of [1,3,5,7]) {
        $('#appDateTime'+i).val(weekAgo);
    }
    for (let i of [2,4,6,8]) {
        $('#appDateTime'+i).val(yesterday);
    }
    for (let i of [1,2,3,4]) {
        $('#appMonth'+i).val(lastMonth)
    }

    triggerLArea('#ut', '#ut-val', APP.userPeriodBar);

    // 获取城市列表，并初始化数据
    getCity(function(res, cityInit){
        cityVal = cityInit;
        $('.simpleSelection').hide();
        userTransform();
        userRegist();
        userLicense();
        carUsable();
        userPurchase();
        orderUserRate();
        firstOrderUser();
        thisMonthKeep();
        recallUser();
    });


    //nav 城市改变 及其刷新数据
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val() == '') return;
        cityVal = $('#value3').val();
        $('.phoneBubble').hide('fast');
        $('.simpleSelection').hide();
        cityVal == '1' && $('.responsiblePerson-box').hide('fast');
        userTransform();
        userRegist();
        userLicense();
        carUsable();
        userPurchase();
        orderUserRate();
        firstOrderUser();
        thisMonthKeep();
        recallUser();
        getPrincipal(cityVal, [15,22,24,26,27,31]);
    });

    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });


    /**
     * 用户转化
     */
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
            funnelOption.series[0].data = res.data;
            funnelOption.legend.data = arr;
            myChart3.setOption(funnelOption);
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

    /**
     * 用户注册分析
     */
    function userRegist() {
        let params = {
            cityId: cityVal,
            startDate: $('#appDateTime1').val(),
            endDate: $('#appDateTime2').val()
        }
        buildAjax('get', 'User/SignInTableData', params, true, false, function(res){
            REGIST_CACHE = res.data;
            registpage = resetPaging('regist-nowpage');
            $('.regist-allpage').html(Math.ceil(REGIST_CACHE.length / 10) == 0 ? 1 : Math.ceil(REGIST_CACHE.length / 10));
            setRegistUI(REGIST_CACHE.slice(0, 10));
        }, false);
    }
    let refRegistUI = (p) => {
        REGIST_CACHE ? setRegistUI(REGIST_CACHE.slice(10 * ( p - 1 ), 10 * p)) : userRegist();
    }
    let setRegistUI = (data) => {
        let str = "";
        for (let d of data) {
          str += "<li> <p>" + d.date_id + "</p>" +
              "<p>" + d.users_reg_t + "</p>" +
              "<p>" + d.users_reg + "</p>" +
              "<p>" + d.users_reg_inviter + "</p>" +
              "<p>" + d.inviter_rate + "%</p> </li>"
        }
        $('.registVal').html(str);
    }
    // 用户注册分析 时间监控
    $('#appDateTime1, #appDateTime2').on('change', function(){
        isDateValid(1, 2) && userRegist();
    })
    // 用户注分析 分页控制
    $('.regist-prepage, .regist-nextpage').on('click', function(){
        registpage = pagingCtrl(this, registpage, refRegistUI);
    });


    /**
     * 用户双证分析
     */
    function userLicense () {
        let params = {
            cityId: cityVal,
            startDate: $('#appDateTime3').val(),
            endDate: $('#appDateTime4').val()
        }
        buildAjax('get','User/DoubleCertificale', params, true, false, function(res){
            LICENSE_CACHE = res.data;
            licpage = resetPaging('ulic-nowpage');
            $('.ulic-allpage').html(Math.ceil(LICENSE_CACHE.length / 10) == 0 ? 1 : Math.ceil(LICENSE_CACHE.length / 10));
            setLicenseUI(LICENSE_CACHE.slice(0, 10));
        });
    }
    let refLicenseUI = (p) => {
        LICENSE_CACHE ? setLicenseUI(LICENSE_CACHE.slice(10 * ( p - 1 ), 10 * p)) : userLicense();
    }
    let setLicenseUI = (data) => {
        let str = '';
        for (let d of data) {
            str += "<li> <p>" + d.date_id + "</p>" +
                "<p>" + d.users_audit_t + "</p>" +
                "<p>" + d.users_id_t + "</p>" +
                "<p>" + d.users_drive_t + "</p>" +
                "<p>" + d.users_audit_new + "</p>" +
                "<p>" + d.users_id_new + "</p>" +
                "<p>" + d.users_drive_new + "</p>" +
                "<p>" + d.audit_rate + "%</p> </li>";
        }
        $('.licenseVal').html(str);
    }
    // 用户双证分析 时间监控
    $('#appDateTime3, #appDateTime4').on('change', function(){
        isDateValid(3, 4) && userLicense();
    })
    // 用户双证分析 分页控制
    $('.ulic-prepage, .ulic-nextpage').on('click', function(){
        licpage = pagingCtrl(this, licpage, refLicenseUI);
    });


    /**
     * 可用车用户分析
     */
    function carUsable () {
        let params = {
            cityId: cityVal,
            startDate: $('#appDateTime5').val(),
            endDate: $('#appDateTime6').val()
        };
        buildAjax('get', 'User/UsableCarUser', params, true, false, function(res) {
            CARUSABLE_CACHE = res.data;
            cupage = resetPaging('cu-nowpage');
            $('.cu-allpage').html(Math.ceil(CARUSABLE_CACHE.length / 10) == 0 ? 1 : Math.ceil(CARUSABLE_CACHE.length / 10));
            setCuUI(CARUSABLE_CACHE.slice(0, 10));
        });
    }
    let refCuUI = (p) => {
        CARUSABLE_CACHE ? setCuUI(CARUSABLE_CACHE.slice( 10 * ( p - 1), 10 * p )) : carUsable();
    }
    let setCuUI = (data) => {
        let str = '';
        for (let d of data) {
            str += "<li> <p>" + d.date_id + "</p>" +
                "<p>" + d.users_usable_t + "</p>" +
                "<p>" + d.deposit_users1_t + "</p>" +
                "<p>" + d.deposit_users2_t + "</p>" +
                "<p>" + d.zmxy_users_t + "</p>" +
                "<p>" + d.users_usable + "</p>" +
                "<p>" + d.deposit_users1 + "</p>" +
                "<p>" + d.deposit_users2 + "</p>" +
                "<p>" + d.zmxy_users + "</p>" +
                "<p>" + d.users_usable_rate + "%</p> </li>";
        }
        $('.carUsableVal').html(str);
    }
    // 可用车用户分析 时间监控
    $('#appDateTime5, #appDateTime6').on('change', function() {
        isDateValid(5, 6) && carUsable();
    })
    // 可用车用户分析 分页控制
    $('.cu-prepage, .cu-nextpage').on('click', function() {
        cupage = pagingCtrl(this, cupage, refCuUI);
    });


    /**
     * 下单用户分析
     */
    function userPurchase() {
        let params = {
            cityId: cityVal,
            startDate: $('#appDateTime7').val(),
            endDate: $('#appDateTime8').val()
        };
        buildAjax('get', 'User/PlaceAnOrder', params, true, false, function(res){
            PURCHASE_CACHE = res.data;
            purcpage = resetPaging('purc-nowpage');
            $('.purc-allpage').html(Math.ceil(PURCHASE_CACHE.length / 10) == 0 ? 1 : Math.ceil(PURCHASE_CACHE.length / 10));
            setPurcUI(PURCHASE_CACHE.slice(0, 10));
        });
    }
    let refPurcUI = (p) => {
        PURCHASE_CACHE ? setPurcUI(PURCHASE_CACHE.slice(10 * ( p - 1 ), 10 * p)) : userPurchase();
    }
    let setPurcUI = (data) => {
        let str = '';
        for (let d of data) {
            str += "<li> <p>" + d.date_id + "</p>" +
                "<p>" + d.users_order + "</p>" +
                "<p>" + d.users_fristorder + "</p>" +
                "<p>" + d.users_oldorder + "</p>" +
                "<p>" + d.users_fristorder_rate + "%</p>" +
                "<p>" + d.users_oldorder_rate + "%</p>" +
                "<p>" + d.users_order_rate + "%</p> </li>";
        }
        $('.purcVal').html(str);
    }
    // 下单用户分析 时间监控
    $('#appDateTime7, #appDateTime8').on('change', function() {
        isDateValid(7, 8) && userPurchase();
    })
    // 下单用户分析 分页控制
    $('.purc-prepage, .purc-nextpage').on('click', function(){
        purcpage = pagingCtrl(this, purcpage, refPurcUI);
    });


    /**
     * 订单用户占比分析
     */
    var odUserRateChart = echarts.init(document.getElementById("odUserRateChart"));
    odUserRateChart.showLoading({ effect:'ring' });

    function orderUserRate() {
        let params = {
            cityId: cityVal,
            dateId: $('#appMonth1').val()
        };
        buildAjax('get', 'MUser/getOrderUserRate', params, true, false, function(res){
            try {
                pieOption.series[0].data = res.data.listData;
                pieOption.legend.data = res.data.arr;
                odUserRateChart.setOption(pieOption);
            } catch (e){
                Tip.success('当月无用户占比数据');
                console.log(e);
            }
            odUserRateChart.hideLoading();
        });
    }
    // 订单用户占比分析 时间监控
    $('#appMonth1').on('change', function(){
        isMonthValid(1) && orderUserRate();
    })
    // 订单用户占比分析 月份监控
    $('.odUserRate-premonth, .odUserRate-nextmonth').on('click', function(){
        let id = this.parentNode.children[1].children[0].id;
        this.classList[1].split('-')[1] == 'premonth' ? $('#'+id).val(updateMonth(this.parentNode, -1, true))
                                               : $('#'+id).val(updateMonth(this.parentNode, 1, true));
        isMonthValid(1) && orderUserRate();
    });


    /**
     * 首单用户分析
     */
    function firstOrderUser() {
        let params = {
            cityId: cityVal,
            dateId: $('#appMonth2').val()
        }
        buildAjax('get', 'MUser/getfirstOrderUser', params, true, false, function(res){
            FO_CACHE = res.data;
            fopage = resetPaging('fo-nowpage');
            $('.fo-allpage').html(Math.ceil(FO_CACHE.length/10) == 0 ? 1: Math.ceil(FO_CACHE.length/10));
            setFoUI(FO_CACHE.slice(0, 10));
        });
    }
    let refFoUI = (p) => {
        FO_CACHE ? setFoUI(FO_CACHE.slice(10 * ( p - 1 ), 10 * p)) : firstOrderUser();
    }
    let setFoUI = (data) => {
        let str = '';
        for (let d of data) {
            str += "<li> <p>" + d.cityName + "</p>" +
                "<p>" + d.fristorder_users + "</p>" +
                "<p>" + d.fristorder_nums + "</p>" +
                "<p>" + d.fristorder_avg + "</p>" +
                "<p>" + d.fristorder_rate + "%</p> </li>";
        }
        $('.foVal').html(str);
    }
    // 首单用户分析 月份选择控制
    $('#appMonth2').on('change', function(){
        isMonthValid(2) && firstOrderUser();
    })
    $('.fo-premonth, .fo-nextmonth').on('click', function(){
        let id = this.parentNode.children[1].children[0].id;
        this.classList[1].split('-')[1] == 'premonth' ? $('#'+id).val(updateMonth(this.parentNode, -1, true))
                                               : $('#'+id).val(updateMonth(this.parentNode, 1, true));
        isMonthValid(2) && firstOrderUser();
    })
    // 首单用户分析 分页控制
    $('.fo-prepage, .fo-nextpage').on('click', function(){
        fopage = pagingCtrl(this, fopage, refFoUI);
    });


    /**
     * 留存用户分析
     */
    function thisMonthKeep() {
        let params = {
            cityId: cityVal,
            dateId: $('#appMonth3').val()
        }
        buildAjax('get', 'MUser/getthisMonthKeep', params, true, false, function(res){
            STAY_CACHE = res.data;
            staypage = resetPaging('uStay-nowpage');
            $('.uStay-allpage').html(Math.ceil(STAY_CACHE.length/10) == 0 ? 1: Math.ceil(STAY_CACHE.length/10));
            setStayUI(STAY_CACHE.slice(0, 10));
        });
    }
    let refStayUI = (p) => {
        STAY_CACHE ? setStayUI(STAY_CACHE.slice(10 * ( p - 1 ), 10 * p)) : thisMonthKeep();
    }
    let setStayUI = (data) => {
        let str = '';
        for (let d of data) {
            str += "<li> <p>" + d.cityName + "</p>" +
                "<p>" + d.retain_users + "</p>" +
                "<p>" + d.firstorder_users_last + "</p>" +
                "<p>" + d.nextorder_users_last + "</p>" +
                "<p>" + d.retain_orders + "</p>" +
                "<p>" + d.retain_users_avg + "</p>" +
                "<p>" + d.retain_users_rate + "%</p> </li>";
        }
        $('.uStayVal').html(str);
    }
    // 留存用户分析 月份选择控制
    $('#appMonth3').on('change', function(){
        isMonthValid(3) && thisMonthKeep();
    })
    $('.uStay-premonth, .uStay-nextmonth').on('click', function(){
        let id = this.parentNode.children[1].children[0].id;
        this.classList[1].split('-')[1] == 'premonth' ? $('#'+id).val(updateMonth(this.parentNode, -1, true))
                                               : $('#'+id).val(updateMonth(this.parentNode, 1, true));
        isMonthValid(3) && thisMonthKeep();
    })
    // 留存用户分析 分页控制
    $('.uStay-prepage, .uStay-nextpage').on('click', function(){
        staypage = pagingCtrl(this, staypage, refStayUI);
    });


    /**
     * 召回用户分析
     */
    function recallUser() {
        let params = {
            cityId: cityVal,
            dateId: $('#appMonth4').val()
        }
        buildAjax('get', 'MUser/getthisMonthRecallUser', params, true, false, function(res){
            RECALL_CACHE = res.data;
            recallpage = resetPaging('recall-nowpage');
            $('.recall-allpage').html(Math.ceil(RECALL_CACHE.length/10) == 0 ? 1: Math.ceil(RECALL_CACHE.length/10));
            setRcUI(RECALL_CACHE.slice(0, 10));
        });
    }
    let refRcUI = (p) => {
        RECALL_CACHE ? setRcUI(RECALL_CACHE.slice(10 * ( p - 1 ), 10 * p)) : recallUser();
    }
    let setRcUI = (data) => {
        let str = '';
        for (let d of data) {
            str += "<li> <p>" + d.cityName + "</p>" +
                "<p>" + d.recall_users + "</p>" +
                "<p>" + d.recall_orders + "</p>" +
                "<p>" + d.recall_users_avg + "</p>" +
                "<p>" + d.recall_users_rate + "%</p>" +
                "<p>" + d.retain_rate + "%</p> </li>";
        }
        $('.recallVal').html(str);
    }
    // 留存用户分析 月份选择控制
    $('#appMonth4').on('change', function(){
        isMonthValid(4) && recallUser();
    })
    $('.recall-premonth, .recall-nextmonth').on('click', function(){
        let id = this.parentNode.children[1].children[0].id;
        this.classList[1].split('-')[1] == 'premonth' ? $('#'+id).val(updateMonth(this.parentNode, -1, true))
                                               : $('#'+id).val(updateMonth(this.parentNode, 1, true));
        isMonthValid(4) && recallUser();
    })
    // 留存用户分析 分页控制
    $('.recall-prepage, .recall-nextpage').on('click', function(){
        recallpage = pagingCtrl(this, recallpage, refRcUI);
    });

});
