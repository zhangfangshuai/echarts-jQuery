/**
 * Created with Atom.
 * Author: zhangfs
 * Date: 2018/03/26 15:12
 */
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

     for (let i of [1,2,3,4,5]) {
        $('#appDateTime' + i).mobiscroll(APP.dateBar)
     }
     for(let i of [1,3,5]) {
        $('#appDateTime'+i).val(yesterday);
     }
     for(let i of [2,4]) {
        $('#appDateTime'+i).val(weekAgo);
     }
     startingWeekYesterday(1);

     // 页面初始化
     getCity(function(res, cityInit){
         cityVal = cityInit || 1;
         getAccidentTop();
         getPeccancyInfo();
         getPeccancyDetail();
         getPushMoneyData();
     }, false);

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
        getAccidentTop();
        getPeccancyInfo();
        getPeccancyDetail();
        getPushMoneyData();
        getPrincipal(cityVal, [53,55,56,57]);
    });

    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });

    /**
     * 保险/事故
     **/
    function getAccidentTop() {
      let data = {
          cityId: cityVal,
          carType: carType
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


    /**
     * 违章概况
     **/
    function getPeccancyInfo() {
        let data = {
            cityId: cityVal,
            carType: carType,
            startDate: $('#appDateTime2').val(),
            endDate: $('#appDateTime3').val()
        };
        buildAjax('get', 'getPeccancyInfo', data, true, false, function(res){
            DATA_CACHE = res.data.data;
            pdPage = resetPaging('pd-nowpage');
            $('.pec-allpage').html( Math.ceil(DATA_CACHE.length / 10) == 0 ? 1 : Math.ceil(DATA_CACHE.length / 10) );
            setPeccancyUI(DATA_CACHE.slice(0, 10));
        }, false);
    };
    let refPeccancyUI = (page) => {
        DATA_CACHE ? setPeccancyUI( DATA_CACHE.slice( 10 * ( page - 1 ), 10 * page) ) : getPeccancyInfo();
    }
    let setPeccancyUI = (data) => {
        let str = "";
        for (let d of data) {
          str += "<li> <p>" + d.data0 + "</p>" +
              "<p>" + nullHandle(d.data5) + "</p>" +
              "<p>" + d.data1 + "</p>" +
              "<p>" + d.data2 + "% </p>" +
              "<p>" + d.data3 + "</p>" +
              "<p>" + d.data4 + "</p>" + "</li>";
        };
        $('.pecVal').html(str);
    }
    // 违章概况时间监控
    $('#appDateTime2, #appDateTime3').on('change', function() {
        isDateValid(2,3) && getPeccancyInfo();
    });
    // 违章概况分页控制
    $('.pec-prepage, .pec-nextpage').on('click',function() {
         page = pagingCtrl(this, page, refPeccancyUI);
    });


    /**
     * 车辆违章详情
     **/
    function getPeccancyDetail() {
        let data = {
            cityId: cityVal,
            carType: carType,
            dateId: $('#appDateTime1').val()
        }
        buildAjax('get', 'getPeccancyDetail', data, true, false, function(res){
            DETAIL_DATA_CACHE = res.data.data
            pdPage = resetPaging('pd-nowpage');
            $('.pd-allpage').html( Math.ceil(DETAIL_DATA_CACHE.length / 10) == 0 ? 1 : Math.ceil(DETAIL_DATA_CACHE.length / 10) );
            setPecDetailUI( DETAIL_DATA_CACHE.slice(0, 10) )
        }, false);
    }
    let refPeccancyDetailUI = () => {
        DETAIL_DATA_CACHE ? setPecDetailUI( DETAIL_DATA_CACHE.slice( 10*(pdPage-1 ), 10*pdPage) ) : getPeccancyDetail();
    }
    let setPecDetailUI = (data) => {
        let str = "";
        for (let d of data) {
          var marks = ( parseInt(d.data1) > 3 || parseInt(d.data3) >= 90 ) ? '***' : '';
          str += "<li> <p>" + d.data0 + "</p>" +
              "<p>" + d.data1 + "</p>" +
              "<p>" + d.data2 + "</p>" +
              "<p>" + d.data3 + "</p>" +
              "<p style='color:red'>" + marks + "</p>" + "</li>";
        };
        $('.pecDetailVal').html(str);
    }
    // 车辆违章详情分页控制
    $('.pd-prepage, .pd-nextpage').on('click', function() {
         pdPage = pagingCtrl(this, pdPage, refPeccancyDetailUI);
    });
    // 车辆违章详情 时间监控
    $('.pd-predate, .pd-nextdate').on('click',function() {
        let id = this.parentNode.children[1].children[0].id;
        this.classList[1].split('-')[1] == 'predate' ? $('#'+id).val(updateDate(this.parentNode, -1, true))
                                                     : $('#'+id).val(updateDate(this.parentNode, 1, true));
        getPeccancyDetail();
    });
    // 车辆违章详情 日历控件监控
    $('#appDateTime1').bind('change', function() {
        getPeccancyDetail();
        updateWeek(this);
    });


    /**
     * 推费概述
     **/
    function getPushMoneyData() {
        let data = {
            cityId: cityVal,
            carType: carType,
            startDate: $('#appDateTime4').val(),
            endDate: $('#appDateTime5').val()
        }
        buildAjax('get','getPushMoneyData', data, true, false, function(res){
            PM_DATA_CACHE = res.data.data
            pmPage = resetPaging('pm-nowpage');
            $('.pm-allpage').html( Math.ceil(PM_DATA_CACHE.length / 10) == 0 ? 1 : Math.ceil(PM_DATA_CACHE.length / 10) );
            setPushMoneyUI(PM_DATA_CACHE.slice(0, 10))
        });
    }
    let refPushMoneyUI = (page) => {
        PM_DATA_CACHE ? setPushMoneyUI(PM_DATA_CACHE.slice( 10*(page-1), 10*page) ) : getPushMoneyData();
    }
    let setPushMoneyUI = (data) => {
        let str = "";
        for (let d of data) {
            str += "<li> <p>" + d.data0 + "</p>" +
                "<p>" + nullHandle(d.data5) + "</p>" +
                "<p>" + d.data1 + "</p>" +
                "<p>" + d.data2 + "</p>" +
                "<p>" + d.data3 + "</p>" +
                "<p>" + d.data4 + "% </p>" + "</li>";
        }
        $('.pmVal').html(str);
    }
    // 推费概述时间监控
    $('#appDateTime4, #appDateTime5').on('change', function() {
        isDateValid(4,5) && getPushMoneyData();
    });
    // 推费概述 分页控制
    $('.pm-prepage, .pm-nextpage').on('click',function() {
        pmPage = pagingCtrl(this, pmPage, refPushMoneyUI);
    });


    // 车辆类型选择监控
    $('.accd-ct, .pec-ct, .pd-ct, .pm-ct').on('click', function() {
        $('.' + this.classList[1]).removeClass('active');
        $(this).addClass('active');
        carType = $(this).attr('data-type');
        switch (this.classList[1]) {
            case 'accd-ct':
                getAccidentTop();
                break;
            case 'pec-ct':
                getPeccancyInfo();
                break;
            case 'pd-ct':
                getPeccancyDetail();
                break;
            case 'pm-ct':
                getPushMoneyData();
        }
    });
})
