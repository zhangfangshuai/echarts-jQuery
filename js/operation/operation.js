/**
 * Created with Atom.
 * Author: zhangfs
 * Date: 2018/03/26 15:12
 */
APP.html = 'operation.html';
$(function () {
     var DATA_CACHE, DETAIL_DATA_CACHE, PM_DATA_CACHE;
     var carType = '0',   // 0-All, 1-elec, 2-oil
         page = 1,        // 违章概况分页
         pdPage = 1,
         pmPage = 1,
         cityVal = 1;
     var today = getDaysOffset(),
         yesterday = getDaysOffset(-1),
         weekAgo = getDaysOffset(-7);

     for (let i of [1,2,3,4,5]) {  // trigger scroller
         $('#appDateTime' + i).mobiscroll(APP.dateBar)
     }
     startingWeekYesterday(1);
     $('#appDateTime1, #appDateTime3, #appDateTime5').val(yesterday);
     $('#appDateTime2, #appDateTime4').val(weekAgo);

     // 页面初始化
     getCity(function(res, cityInit){
         cityVal = cityInit || 1;
         getAccidentTop(cityVal, carType);
         getPeccancyInfo(cityVal, carType, weekAgo, yesterday, page);
         getPeccancyDetail(cityVal, carType, yesterday, pdPage);
         getPushMoneyData(cityVal, carType, weekAgo, yesterday, pmPage);
     }, false);

     // 保险/事故
     function getAccidentTop(city, car) {
        let data = {
            cityId: city,
            carType: car
        }
        buildAjax('get', 'getAccidentTop', data, true, false, function(res){
            let str = "";
            let d = res.data.data;
            for (let i in d) {
                var rank = parseInt(i) + 1
                str += "<li> <p>" + rank + "</p>" +
                    "<p>" + d[i].data0+ "</p>" +
                    "<p>" + d[i].data1 + "% </p>" +
                    "<p>" + d[i].data2 + "</p>" + "</li>";
            }
            $('.acdVal').html(str);
        }, false);
     };


    // 违章概况
    function getPeccancyInfo(city, car, s, e, page) {
        let data = {
            cityId: city,
            carType: car,
            startDate: s,
            endDate: e
        };
        buildAjax('get', 'getPeccancyInfo', data, true, false, function(res){
            DATA_CACHE = res.data.data;
            $('.pec-allpage').html( Math.ceil(DATA_CACHE.length / 10) == 0 ? 1 : Math.ceil(DATA_CACHE.length / 10) );
            setPeccancyUI( DATA_CACHE.slice( 10 * ( page - 1 ), 10 * page) );
        }, false);
    };
    // 违章概况 页面切换效果
    let refPeccancyUI = (page) => {
        DATA_CACHE ? setPeccancyUI( DATA_CACHE.slice( 10 * ( page - 1 ), 10 * page) )
                   : getPeccancyInfo(cityVal, carType, $('#appDateTime2').val(), $('#appDateTime3').val(), page);
    }
    let setPeccancyUI = (d) => {
        let str = "";
        for (let i in d) {
          str += "<li> <p>" + d[i].data0 + "</p>" +
              "<p>" + d[i].data1 + "</p>" +
              "<p>" + d[i].data2 + "% </p>" +
              "<p>" + d[i].data3 + "</p>" +
              "<p>" + d[i].data4 + "</p>" + "</li>";
        };
        $('.pecVal').html(str);
    }


    // 车辆违章详情
    function getPeccancyDetail(city, car, t, page) {
        let data = {
            cityId: city,
            carType: car,
            dateId: t
        }
        buildAjax('get', 'getPeccancyDetail', data, true, false, function(res){
            DETAIL_DATA_CACHE = res.data.data
            $('.pd-allpage').html( Math.ceil(DETAIL_DATA_CACHE.length / 10) == 0 ? 1 : Math.ceil(DETAIL_DATA_CACHE.length / 10) );
            setPecDetailUI( DETAIL_DATA_CACHE.slice( 10 * ( page - 1 ), 10 * page) )
        }, false);
    }
    // 车辆违章详情 页面切换效果
    let refPeccancyDetailUI = () => {
        DETAIL_DATA_CACHE ? setPecDetailUI( DETAIL_DATA_CACHE.slice( 10 * ( pdPage - 1 ), 10 * pdPage) )
                          : getPeccancyDetail(cityVal, carType, $('#appDateTime1').val(), pdPage);
    }
    let setPecDetailUI = (d) => {
        let str = "";
        for (let i in d) {
          var marks = ( parseInt(d[i].data1) > 3 || parseInt(d[i].data3) >= 90 ) ? '***' : '';
          str += "<li> <p>" + d[i].data0 + "</p>" +
              "<p>" + d[i].data1 + "</p>" +
              "<p>" + d[i].data2 + "</p>" +
              "<p>" + d[i].data3 + "</p>" +
              "<p style='color:red'>" + marks + "</p>" + "</li>";
        };
        $('.pecDetailVal').html(str);
    }


    // 推费概述
    function getPushMoneyData(city, car, s, e, page) {
        let data = {
            cityId: city,
            carType: car,
            startDate: s,
            endDate: e
        }
        buildAjax('get','getPushMoneyData', data, true, false, function(res){
            PM_DATA_CACHE = res.data.data
            $('.pm-allpage').html( Math.ceil(PM_DATA_CACHE.length / 10) == 0 ? 1 : Math.ceil(PM_DATA_CACHE.length / 10) );
            setPushMoneyUI(PM_DATA_CACHE.slice( 10 * ( page - 1 ), 10 * page))
        });
    }
    // 推费概述 页面切换效果
    let refPushMoneyUI = (page) => {
        PM_DATA_CACHE ? setPushMoneyUI(PM_DATA_CACHE.slice( 10 * ( page - 1 ), 10 * page))
                      : getPushMoneyData(cityVal, carType, $('#appDateTime4').val(), $('#appDateTime5').val(), 1);
    }
    let setPushMoneyUI = (d) => {
        let str = "";
        for (let i in d) {
            str += "<li> <p>" + d[i].data0 + "</p>" +
                "<p>" + d[i].data1 + "</p>" +
                "<p>" + d[i].data2 + "</p>" +
                "<p>" + d[i].data3 + "</p>" +
                "<p>" + d[i].data4 + "% </p>" + "</li>";
        }
        $('.pmVal').html(str);
    }


     // nav 城市改变 及其刷新数据
     $('#demo3').bind('input propertychange', function() {
         if ($('#value3').val() == ''){
             return false
         }
         cityVal = $('#value3').val();
         page = pdPage = pmPage = 1;
         $('.nowpage').html('1');
         $('.phoneBubble').hide('fast');
         cityVal == '1' && $('.responsiblePerson-box').hide('fast');
         getAccidentTop(cityVal, carType);
         getPeccancyInfo(cityVal, carType, $('#appDateTime2').val(), $('#appDateTime3').val(), page);
         getPeccancyDetail(cityVal, carType, $('#appDateTime1').val(), pdPage);
         getPushMoneyData(cityVal, carType, $('#appDateTime4').val(), $('#appDateTime5').val(), pmPage);
         getPrincipal(cityVal, [53,55,56,57]);
     });

     // 责任人弹窗控制
     $('.responsiblePerson').on('click', function() {
         triggerBubble(this.parentNode);
     });

     // 车辆类型选择监控
     $('.accd-ct, .pec-ct, .pd-ct, .pm-ct').on('click', function() {
          $('.' + this.classList[1]).removeClass('active');
          $(this).addClass('active');
          carType = $(this).attr('data-type');
          switch (this.classList[1]) {
              case 'accd-ct':
                  getAccidentTop(cityVal, carType);
                  break;
              case 'pec-ct':
                  getPeccancyInfo(cityVal, carType, $('#appDateTime2').val(), $('#appDateTime3').val(), page);
                  break;
              case 'pd-ct':
                  getPeccancyDetail(cityVal, carType, $('#appDateTime1').val(), pdPage);
                  break;
              case 'pm-ct':
                  getPushMoneyData(cityVal, carType, $('#appDateTime4').val(), $('#appDateTime5').val(), pmPage);
          }
     });


     // 违章概况时间监控
     $('#appDateTime2, #appDateTime3').on('change', function() {
         pdPage = resetPaging('pd-nowpage');
         getPeccancyInfo(cityVal, carType, $('#appDateTime2').val(), $('#appDateTime3').val(), pdPage);
     });

     // 推费概述时间监控
     $('#appDateTime4, #appDateTime5').on('change', function() {
         pmPage = resetPaging('pm-nowpage');
         getPushMoneyData(cityVal, carType, $('#appDateTime4').val(), $('#appDateTime5').val(), pmPage);
     });

     // 违章概况分页控制
     $('.pec-prepage, .pec-nextpage').on('click',function() {
          page = pagingCtrl(this, page, refPeccancyUI);
     });

     // 车辆违章详情分页控制
     $('.pd-prepage, .pd-nextpage').on('click', function() {
          pdPage = pagingCtrl(this, pdPage, refPeccancyDetailUI);
     });

     // 推费概述 分页控制
     $('.pm-prepage, .pm-nextpage').on('click',function() {
         pmPage = pagingCtrl(this, pmPage, refPushMoneyUI);
     });


     // 前一天后一天时间监控
     $('.pd-predate, .pd-nextdate').on('click',function() {
         let id = this.parentNode.children[1].children[0].id;
         this.classList[1].split('-')[1] == 'predate' ? $('#'+id).val(updateDate(this.parentNode, -1, true))
                                                      : $('#'+id).val(updateDate(this.parentNode, 1, true));
         pdPage = resetPaging('pd-nowpage');
         getPeccancyDetail(cityVal, carType, $('#appDateTime1').val(), 1);
     })
})
