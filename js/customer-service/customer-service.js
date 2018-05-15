/**
 * Author: zhangfs 2018/4/10 16:27
 * Note: Standard code and Add error handler
 */
$(function () {
    var CS_CACHE, DC_CACHE, WOD_CACHE, WONUM_CACHE;
    var cityVal = 1, cspage = 1, dcpage = 1, wodpage = 1, woapage = 1;
    var yesterday = getDaysOffset(-1),
        weekAgo = getDaysOffset(-7);
    for (let i of [1,2,3,4,5,6,7,8,9,10]) {
        $('#appDateTime' + i).mobiscroll(APP.dateBar);
    }
    for (let i of [1,3,5,7,9]) {
        $('#appDateTime' + i).val(weekAgo);
    }
    for (let i of [2,4,6,8,10]) {
        $('#appDateTime' + i).val(yesterday);
    }

    // 页面初始化
     getCity(function(res, cityInit){
         cityVal = cityInit;
         getCustServerDetail();
         getDoubleCardDetail();
         workOrderType();
         workOrderDetail();
         workOrderAmount();
     }, false);

    // 城市改变 及其刷新数据
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val()==''){
            return false
        }
        cityVal=$('#value3').val();
        cspage = dcpage = 1;
        $('.phoneBubble').hide('fast');
        cityVal == '1' && $('.responsiblePerson-box').hide('fast');
        getCustServerDetail();
        getDoubleCardDetail();
        workOrderType();
        workOrderDetail();
        workOrderAmount();
        getPrincipal(cityVal, [50,52]);
    });

    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });


    /**
     * 客服概况
     */
    function getCustServerDetail() {
        let params = {
            cityId: cityVal,
            startDate: $('#appDateTime1').val(),
            endDate: $('#appDateTime2').val()
        };
        buildAjax('get', 'getCustServerDetail', params, true, false, function(res){
            CS_CACHE = res.data.data;
            if (CS_CACHE.length) {
                cspage = resetPaging('cs-nowpage');
                $('.cs-allpage').html(Math.ceil(CS_CACHE.length / 10) == 0 ? 1 : Math.ceil(CS_CACHE.length / 10));
                setCSUI(CS_CACHE.slice(0, 10));
            } else {
                setCSUI([]);
            }
        }, false)
    };
    let refCSUI = (p) => {
        CS_CACHE ? setCSUI(CS_CACHE.slice( 10 * ( p - 1 ), 10 * p)) : getCustServerDetail();
    };
    let setCSUI = (data) => {
        let str = "";
        for (let d of data) {
            str += "<li> <p>" + d.date_id + "</p>" +
                "<p>" + d.total_num + "</p>" +
                "<p>" + d.ivr_num + "</p>" +
                "<p>" + d.topeople_num + "</p>" +
                "<p>" + d.success_num + "</p>" +
                "<p>" + d.success_rate + "%</p>" +
                "<p>" + d.phone_num + "</p>" +
                "<p>" + d.phonesucc_num + "</p>" +
                "<p>" + d.phonesucc_rate + "%</p>" +
                "<p>" + d.cpo + "%</p>" +
                "<p>" + d.agent_eff + "</p>" +
                "<p>" + d.first_rate + "%</p> </li>";
        }
        $('.csVal').html(str);
    }
    // 客服概况 时间监控
    $('#appDateTime1, #appDateTime2').on('change',function () {
        isDateValid(1,2) && getCustServerDetail();
    });
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


    /**
     * 双证审核
     */
    function getDoubleCardDetail() {
        let param = {
            cityId: cityVal,
            startDate: $('#appDateTime3').val(),
            endDate: $('#appDateTime4').val()
        }
        buildAjax('get', 'getDoubleCardDetail', param, true, false, function(res){
            DC_CACHE = res.data.data;
            if (DC_CACHE.length) {
                dcpage = resetPaging('dc-nowpage');
                $('.dc-allpage').html(Math.ceil(DC_CACHE.length / 10) == 0 ? 1 : Math.ceil(DC_CACHE.length / 10));
                setDcUI(DC_CACHE.slice(0, 10));
            } else {
                setDcUI([]);
            }
        }, false);
    };
    let refDcUI = (p) => {
        DC_CACHE ? setDcUI( DC_CACHE.slice( 10 * ( p - 1 ), 10 * p) ) : getDoubleCardDetail()
    };
    let setDcUI = (data) => {
        let str = "";
        for (let d of data) {
            str += "<li> <p>" + d.date_id + "</p>" +
                "<p>" + d.user_card_num + "</p>" +
                "<p>" + d.car_card_num + "</p>" +
                "<p>" + d.double_card_num + "</p>" +
                "<p>" + d.user_card_rate + "%</p>" +
                "<p>" + d.car_card_rate + "%</p>" +
                "<p>" + d.double_card_rate + "%</p> </li>";
        }
        $('.dcVal').html(str);
    }
    // 双证审核详情 分页控制
    $('.dc-prepage, .dc-nextpage').on('click',function() {
        dcpage = pagingCtrl(this, dcpage, refDcUI);
    });
    // 双证审核详情 时间监控
    $('#appDateTime3, #appDateTime4').on('change',function () {
        isDateValid(3,4) && getDoubleCardDetail();
    });


    /**
     * 工单类型占比分析setDcUI(WOD_CACHE.slice(0, 10));
     */
     var workorderChart = echarts.init(document.getElementById('workorderChart'));
     workorderChart.showLoading({ effect:'ring' });

    function workOrderType() {
        let param = {
            startDate: $('#appDateTime5').val(),
            endDate: $('#appDateTime6').val()
        }
        buildAjax('get', 'getWorkOrderType', param, true, false, function(res){
            try {
                pieOption.series[0].data = res.data.series;
                pieOption.legend.data = res.data.length;
                workorderChart.setOption(pieOption);
            } catch (e) {
                Tip.success('当月无用户占比数据');
                console.log(e);
            }
            workorderChart.hideLoading();
        }, false);
    }
    // 工单类型占比分析 时间监控
    $('#appDateTime5, #appDateTime6').on('change',function () {
        isDateValid(5,6) && workOrderType();
    });


    /**
     * 工单类型详情
     */
     function workOrderDetail() {
          let param = {
              startDate: $('#appDateTime7').val(),
              endDate: $('#appDateTime8').val()
          };
          buildAjax('get', 'getWorkOrderdetails', param, true, false, function(res){
              WOD_CACHE = res.data;
              // console.log(WOD_CACHE);
              if (WOD_CACHE.length) {
                  wodpage = resetPaging('woDetail-nowpage');
                  $('.woDetail-allpage').html(Math.ceil(WOD_CACHE.length / 10) == 0 ? 1 : Math.ceil(WOD_CACHE.length / 10));
                  setWodUI(WOD_CACHE.slice(0, 10));
              } else {
                  setWodUI([]);
              }
          }, false);
     }
     let refWodUI = (p) => {
          WOD_CACHE ? setWodUI(WOD_CACHE.slice(10*(p-1), 10*p)) : workOrderDetail();
     }
     let setWodUI = (data) => {
         let str = "";
         for (let d of data) {
             str += "<li> <p>" + d.date_id + "</p>" +
                 "<p>" + d.cl + "%</p>" +
                 "<p>" + d.dd + "%</p>" +
                 "<p>" + d.wd + "%</p>" +
                 "<p>" + d.zc + "%</p> </li>";
         }
         $('.woDetailVal').html(str);
     }
     // 双证审核详情 分页控制
     $('.woDetail-prepage, .woDetail-nextpage').on('click',function() {
         wodpage = pagingCtrl(this, wodpage, refWodUI);
     });
     // 双证审核详情 时间监控
     $('#appDateTime7, #appDateTime8').on('change',function () {
         isDateValid(7,8) && workOrderDetail();
     });


     /**
      * 工单量统计
      */
      function workOrderAmount() {
           let param = {
               startDate: $('#appDateTime9').val(),
               endDate: $('#appDateTime10').val()
           };
           buildAjax('get', 'getWorkOrderAmount', param, true, false, function(res){
               WONUM_CACHE = res.data;
               if (WONUM_CACHE.length) {
                   woapage = resetPaging('woAmount-nowpage');
                   $('.woAmount-allpage').html(Math.ceil(WONUM_CACHE.length / 10) == 0 ? 1 : Math.ceil(WONUM_CACHE.length / 10));
                   setWoaUI(WONUM_CACHE.slice(0, 10));
               } else {
                   setWoaUI([]);
               }
           }, false);
      }
      let refWoaUI = (p) => {
           WONUM_CACHE ? setWoaUI(WONUM_CACHE.slice(10*(p-1), 10*p)) : workOrderAmount();
      }
      let setWoaUI = (data) => {
          let str = "";
          for (let d of data) {
              str += "<li> <p>" + d.date_id + "</p>" +
                  "<p>" + d.total_num + "</p>" +
                  "<p>" + d.ing_num + "</p>" +
                  "<p>" + d.succ_num + "</p>" +
                  "<p>" + d.succ_rate + "%</p> </li>";
          }
          $('.woAmountVal').html(str);
      }
      // 双证审核详情 分页控制
      $('.woAmount-prepage, .woAmount-nextpage').on('click',function() {
          woapage = pagingCtrl(this, woapage, refWoaUI);
      });
      // 双证审核详情 时间监控
      $('#appDateTime9, #appDateTime10').on('change',function () {
          isDateValid(9,10) && workOrderAmount();
      });
});
