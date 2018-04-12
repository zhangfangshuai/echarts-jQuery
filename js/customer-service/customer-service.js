/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15 09:05
 * Upd: zhangfs 2018/4/10 16:27
 * Note: Standard code and Add error handler
 */
APP.html = 'customer-service.html';
$(function () {
    var CS_CACHE, DC_CACHE;
    var cityVal = 1,
        cspage = 1,
        dcpage = 1;
    var yesterday = getDaysOffset(-1),
        weekAgo = getDaysOffset(-7);
    for (let i of [1,2,3,4]) {
        $('#appDateTime' + i).mobiscroll(APP.dateBar);
    }
    $('#appDateTime1, #appDateTime3').val(weekAgo);
    $('#appDateTime2, #appDateTime4').val(yesterday);

    // 页面初始化
     getCity(function(res, cityInit){
         cityVal = cityInit;
         getCustServerDetail($('#appDateTime1').val(), $('#appDateTime2').val(), 1);
         getDoubleCardDetail($('#appDateTime3').val(),$('#appDateTime4').val(), 1);
     }, false);

    // nav 城市改变 及其刷新数据
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val()==''){
            return false
        }
        cityVal=$('#value3').val();
        cspage = dcpage = 1;
        $('.phoneBubble').hide('fast');
        cityVal == '1' && $('.responsiblePerson-box').hide('fast');
        getCustServerDetail($('#appDateTime1').val(),$('#appDateTime2').val(), 1);
        getDoubleCardDetail($('#appDateTime3').val(),$('#appDateTime4').val(), 1);
        getPrincipal(cityVal, [50,52]);
    });


    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });


    // 客服概况
    function getCustServerDetail(s, e, p) {
        let data = {
            cityId: cityVal,
            startDate: s,
            endDate: e
        };
        buildAjax('get', 'getCustServerDetail', data, true, false, function(res){
            CS_CACHE = res.data.data;
            $('.cs-allpage').html(Math.ceil(CS_CACHE.length / 10) == 0 ? 1 : Math.ceil(CS_CACHE.length / 10))
            setCSUI( CS_CACHE.slice( 10 * ( p - 1 ), 10 * p) )
        }, false)
    };
    let refCSUI = (p) => {
        CS_CACHE ? setCSUI(CS_CACHE.slice( 10 * ( p - 1 ), 10 * p))
                 : getCustServerDetail($('#appDateTime1').val(), $('#appDateTime2').val(), p);
    };
    let setCSUI = (d) => {
        let str = "";
        for (let i in d) {
            str += "<li> <p>" + d[i].date_id + "</p>" +
                "<p>" + d[i].total_num + "</p>" +
                "<p>" + d[i].ivr_num + "</p>" +
                "<p>" + d[i].topeople_num + "</p>" +
                "<p>" + d[i].success_num + "</p>" +
                "<p>" + d[i].success_rate + "</p>" +
                "<p>" + d[i].phone_num + "</p>" +
                "<p>" + d[i].phonesucc_num + "</p>" +
                "<p>" + d[i].phonesucc_rate + "</p>" +
                "<p>" + d[i].cpo + "</p>" + "</li>";
        }
        $('.csVal').html(str);
    }


    // 双证审核
    function getDoubleCardDetail(s, e, p) {
        buildAjax('get', 'getDoubleCardDetail', {cityId:cityVal, startDate:s, endDate:e}, true, false, function(res){
            DC_CACHE = res.data.data;
            $('.dc-allpage').html(Math.ceil(DC_CACHE.length / 10) == 0 ? 1 : Math.ceil(DC_CACHE.length / 10));
            setDcUI( DC_CACHE.slice( 10 * ( p - 1 ), 10 * p) );
        }, false);
    };
    let refDcUI = (p) => {
        DC_CACHE ? setDcUI( DC_CACHE.slice( 10 * ( p - 1 ), 10 * p) )
                 : getDoubleCardDetail($('#appDateTime3').val(), $('#appDateTime4').val(), p)
    };
    let setDcUI = (d) => {
        let str = "";
        for (let i in d) {
            str += "<li> <p>" + d[i].date_id + "</p>" +
                "<p>" + d[i].user_card_num + "</p>" +
                "<p>" + d[i].car_card_num + "</p>" +
                "<p>" + d[i].double_card_num + "</p>" +
                "<p>" + d[i].user_card_rate + "</p>" +
                "<p>" + d[i].car_card_rate + "</p>" +
                "<p>" + d[i].double_card_rate + "</p>" + "</li>";
        }
        $('.dcVal').html(str);
    }



    // 客服概况 分页控制
    $('.cs-prepage, .cs-nextpage').on('click',function() {
        if (this.classList[1] == 'cs-prepage') {
            cspage > 1 ? (() => {
                cspage --;
                refCSUI(cspage);
                $('.cs-nowpage').html(cspage);
            })() : console.log('Top page!');
        } else {
           cspage < parseInt($('.cs-allpage').html()) ? (() => {
               cspage ++;
               refCSUI(cspage);
               $('.cs-nowpage').html(cspage);
           })() : console.log('Last page!');
        }
    });

    // 双证审核详情 分页控制
    $('.dc-prepage, .dc-nextpage').on('click',function() {
        if (this.classList[1] == 'dc-prepage') {
            dcpage > 1 ? (() => {
                dcpage --;
                refDcUI(dcpage);
                $('.dc-nowpage').html(dcpage);
            })() : console.log('Top page!');
        } else {
           dcpage < parseInt($('.dc-allpage').html()) ? (() => {
               dcpage ++;
               refDcUI(dcpage);
               $('.dc-nowpage').html(dcpage);
           })() : console.log('Last page!');
        }
    });

    $('#appDateTime1, #appDateTime2').on('change',function () {
        cspage = 1;
        $('.cs-nowpage').html(1);
        getCustServerDetail($('#appDateTime1').val(),$('#appDateTime2').val(), cspage);
    });

    $('#appDateTime3, #appDateTime4').on('change',function () {
        dcpage = 1;
        $('.dc-nowpage').html(1);
        getDoubleCardDetail($('#appDateTime3').val(),$('#appDateTime4').val(), dcpage);
    });
});
