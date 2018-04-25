/**
 * Created with Atom.
 * Author: zhangfs
 * Date: 2018/03/21
 * Time: 16:10
 */
$(function () {
    var DATA_CACHE;
    var cityVal = 1,
        base = '0',
        page = 1,
        carType = '0';
    var today = getDaysOffset(),
        yesterday = getDaysOffset(-1),
        weekAgo = getDaysOffset(-7);

    for ( let i of [1,2,3]) {
        $('#appDateTime' + i).mobiscroll(APP.dateBar);
    }

    startingWeekYesterday(1);
    $('#appDateTime1, #appDateTime3').val(yesterday);
    $('#appDateTime2').val(weekAgo);

    // 获取城市信息
     getCity(function(res, cityInit){
         cityVal = cityInit;
         getIncome(cityVal, carType, yesterday);
         getRecharge(cityVal, weekAgo, yesterday, base, page);
     }, false);


     // nav 城市改变 及其刷新数据
     $('#demo3').bind('input propertychange', function() {
         if ($('#value3').val() == ''){
             return false
         }
         cityVal = $('#value3').val();   //更改城市后重新渲染页面图表
         $('.phoneBubble').hide('fast');
         cityVal == '1' && $('.responsiblePerson-box').hide('fast');
         getIncome(cityVal, carType, $('#appDateTime1').val());
         getRecharge(cityVal, $('#appDateTime2').val(), $('#appDateTime3').val(), base, page);
         getPrincipal(cityVal, [58,59]);
     });

     // 责任人弹窗控制
     $('.responsiblePerson').on('click', function() {
         triggerBubble(this.parentNode);
     });


    // 营收概况
    function getIncome(city, car, date) {
        var data = {
            cityId: city,
            carType: car,
            dateId: date
        };
        buildAjax('get','getInComeDetail', data, true, false, function(res){
            var str = "";
            var data = res.data.data;
            for (var i in data) {
                var imgUrl = data[i].data4 == 0 ? "" : data[i].data4 > 0 ? "<img src='../images/icon_rise.png?1' alt=''>" : "<img src='../images/icon_decline.png?1' alt=''>";
                str += "<li> <p>" + data[i].data0 + "</p>" +
                    "<p>" + data[i].data1+ "</p>" +
                    "<p>" + data[i].data2 + "</p>" +
                    "<p>" + data[i].data3 + "</p>" +
                    "<p>" + data[i].data4 + "%" + imgUrl + "</p> </li>";
            }
            $('.incVal').html(str);
        });
    };
    // 营收概况 时间监控 单日期
    $('.inc-predate, .inc-nextdate').on('click',function() {
      let id = this.parentNode.children[1].children[0].id;
      this.classList[1].split('-')[1] == 'predate' ? $('#'+id).val(updateDate(this.parentNode, -1, true))
                                             : $('#'+id).val(updateDate(this.parentNode, 1, true));
      getIncome(cityVal, carType, $('#'+id).val());
    });
    // 时间监控 日历控件监控
    $('#appDateTime1').bind('change', function() {
        getIncome(cityVal, carType, $('#appDateTime1').val());
        updateWeek(this);
    });

    // 营收概况 车辆类型选择监控
    $('.inc-ct').on('click', function() {
         $('.inc-ct').removeClass('active');
         $(this).addClass('active');
         carType = $(this).attr('data-type');
         getIncome(cityVal, carType, $('#appDateTime1').val());
    })



    // 用户充值
    function getRecharge(city, s, e, base, page) {
        let data = {
            cityId: city,
            startDate: s,
            endDate: e
        }
        buildAjax('get', 'getRechargeInfo', data, true, false, function(res){
            DATA_CACHE = res.data.data;
            $('.allpage').html( Math.ceil(DATA_CACHE.length / 10) == 0 ? 1 : Math.ceil(DATA_CACHE.length / 10) );
            page = resetPaging('nowpage');
            setUI(base, DATA_CACHE.slice( 10 * ( page - 1 ), 10 * page));
        });
    }

    let refRechargeUI = (base, page) => {
        DATA_CACHE ? setUI(base, DATA_CACHE.slice( 10 * ( page - 1 ), 10 * page))
                   : getRecharge(cityVal, $('#appDateTime2').val(), $('#appDateTime3').val(), base, page);
    }
    let setUI = (base, d) => {
        base = ['0','1','2'].indexOf(base.toString()) == -1 ? 0 : base;
        var str = "";
        for (var i in d) {
            switch (base) {
              case '0':
                str += "<li>" + "<p>" + d[i].data0 + "</p>" +
                    "<p>" + d[i].data1 + "</p>" + "<p>" + d[i].data2 + "</p>" +
                    "<p>" + d[i].data3 + "</p>" + "<p>" + d[i].data4 + "</p>" +
                    "<p> -- </p>" + "</li>";
                break;
              case '1':
                str += "<li>" + "<p>" + d[i].data0 + "</p>" +
                    "<p>" + d[i].data5 + "</p>" + "<p>" + d[i].data6 + "</p>" +
                    "<p>" + d[i].data7 + "</p>" + "<p>" + d[i].data8 + "</p>" +
                    "<p> -- </p>" + "</li>";
                break;
              case '2':
                str += "<li>" + "<p>" + d[i].data0 + "</p>" +
                    "<p>" + d[i].data9 + "</p>" + "<p>" + d[i].data10 + "</p>" +
                    "<p>" + d[i].data11 + "</p>" + "<p>" + d[i].data12 + "</p>" +
                    "<p>" + d[i].data13 + "</p>" + "</li>";
            }
        }
        $('.recgVal').html(str);
    }
    // 用户充值时间监控
    $('#appDateTime2, #appDateTime3').on('change', function() {
        getRecharge(cityVal, $('#appDateTime2').val(), $('#appDateTime3').val(), base, page);
    })

    // 用户充值价格区间选择监控
    $('.tcs').on('click', function() {
        $('.tcs').removeClass('active');
        $(this).addClass('active');
        base = $(this).attr('base');
        refRechargeUI(base, page);
    })

    // 用户充值分页控制
    $('.inc-prepage, .inc-nextpage').on('click',function() {
        page = pagingCtrl(this, page, refRechargeUI);
    });
});
