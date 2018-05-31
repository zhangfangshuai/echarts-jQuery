/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15  09:05
 * Recode: zhangfs 2018/04/11 10:50
 * Note: Package and Add Handler
 */
$(function () {
    var ODH_CACHE;
    var odtype = 0,
        odHisType = 0,
        cancelType = 0,
        cityVal = '';
    var odhpage = '';
    var yesterday = getDaysOffset(-1),
        weekAgo = getDaysOffset(-7);

    for (let i of [1,2,3,4,5]) {  // trigger scroller
        $('#appDateTime' + i).mobiscroll(APP.dateBar);
    }

    startingWeekYesterday(1);
    $('#appDateTime1, #appDateTime3, #appDateTime5').val(yesterday);
    $('#appDateTime2, #appDateTime4').val(weekAgo);

    // 页面初始化
    getCity(function(res, cityInit) {
        cityVal = cityInit;
        getorderAnalyze($('#appDateTime1').val(), odtype);
        getHistoryOrder(1);
        getCancelReason($('#appDateTime2').val(),$('#appDateTime3').val(), cancelType);
    }, false);

    //nav 城市改变 及其刷新数据
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val()==''){
            return false
        }
        cityVal = $('#value3').val();
        $('.phoneBubble').hide('fast');
        cityVal == '1' && $('.responsiblePerson-box').css('display','none');
        getorderAnalyze($('#appDateTime1').val(), odtype);
        getHistoryOrder(1);
        getCancelReason($('#appDateTime2').val(),$('#appDateTime3').val(), cancelType);
        getPrincipal(cityVal, [32,33]);
    });

    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });

    // 车类型选择
    $('.od-ct, .odc-ct').on('click', function() {
        $('.'+this.classList[1]).removeClass('active');
        $(this).addClass('active');
        let _type = $(this).attr('data-type')
        this.classList[1] == 'od-ct' ? getorderAnalyze($('#appDateTime1').val(), _type)
                                     : getCancelReason($('#appDateTime2').val(),$('#appDateTime3').val(), _type);
    })

    // 订单概况时间监控 单日期
    $('.od-predate, .od-nextdate').on('click',function() {
        let id = this.parentNode.children[1].children[0].id;
        this.classList[1].split('-')[1] == 'predate' ? $('#'+id).val(updateDate(this.parentNode, -1, true))
                                          : $('#'+id).val(updateDate(this.parentNode, 1, true));
        getorderAnalyze($('#'+id).val(), 1);
    });
    // 订单概况时间监控 日历控件监控
    $('#appDateTime1').bind('change', function() {
        isDateValid(1) && getorderAnalyze($('#appDateTime1').val(), 1);
        updateWeek(this);
    });

    $('#appDateTime2, #appDateTime3').on('change',function () {
        isDateValid(2,3) && getCancelReason($('#appDateTime2').val(),$('#appDateTime3').val(), cancelType)
    });


    // 订单概况
    function getorderAnalyze(date, type) {
        let data = {
            cityId: cityVal,
            typeId: type,
            dateId: date
        }
        buildAjax('get', 'getorderAnalyze', data, true, false, function(res){
            let str = "";
            for (let d of res.data) {
                var imgUrl = d.avg_rate == 0 ? '' : '<img src="../images/'+ (d.avg_rate > 0 ? 'icon_rise' : 'icon_decline') + '.png"  class="orderUp fr" alt="">';
                str += "<li> <p>" + d.kpiname + "</p>" +
                    "<p>" + d.month_t + "</p>" +
                    "<p>" + d.month_avg + "</p>" +
                    "<p>" + d.month_last_t + "</p>" +
                    "<p>" + d.month_last_avg + "</p>" +
                    "<p>" + d.avg_rate + imgUrl + "</p>" + "</li>";
            }
            $('.odVal').html(str);
        }, false);
    }

    // 历史订单详情
    function getHistoryOrder(p) {
        let data = {
            cityId: cityVal,
            typeId: odHisType,
            startDate: $('#appDateTime4').val(),
            endDate: $('#appDateTime5').val()
        }
        buildAjax('get', 'getHistoryOrder', data, true, false, function(res) {
            ODH_CACHE = res.data;
            if (ODH_CACHE.length > 0) {
                let total = ODH_CACHE.pop();
                ODH_CACHE.unshift(total);
                odhpage = resetPaging('odHis-nowpage');
                $('.odHis-allpage').html(Math.ceil(ODH_CACHE.length / 10) == 0 ? 1 : Math.ceil(ODH_CACHE.length / 10));
                setOdhUI(ODH_CACHE.slice(0, 10), p);
            } else {
                setOdhUI(ODH_CACHE, p);
            }
        }, false)
    }
    let refOdhUI = (p) => {
        ODH_CACHE ? setOdhUI(ODH_CACHE.slice( 10 * ( p - 1 ), 10 * p), p)
                  : getHistoryOrder(p)
    }
    let setOdhUI = (data, p) => {
        let str = "";
        for (let d of data) {
            str += "<li> <p>" + d.date_id + "</p>" +
                "<p>" + d.order_total + "</p>" +
                "<p>" + d.order_up + "</p>" +
                "<p>" + d.order_cancel + "</p>" +
                "<p>" + d.order_real_avg + "</p>" +
                "<p>" + d.avg_sumAmount + "</p>" +
                "<p>" + d.avg_sumPayAmount + "</p>" +
                "<p>" + d.car_avgamount + "</p>" +
                "<p>" + d.car_avgpayamount + "</p>" + "</li>";
        }
        $('.odHisVal').html(str);
        $('.odHisVal>li').eq(0).css('background', p == 1 ? '#c2fbcb' : 'transparent');
    }
    // 历史订单 分页控制
    $('.odHis-prepage, .odHis-nextpage').on('click',function() {
        odhpage = pagingCtrl(this, odhpage, refOdhUI);
    });
    // 历史订单 日期监控
    $('#appDateTime4, #appDateTime5').on('change',function () {
        isDateValid(4, 5) && getHistoryOrder(1);
    });
    // 历史订单 车类型监控
    $('.odh-ct').on('click',function(){
        $('.odh-ct').removeClass('active');
        $(this).addClass('active');
        odHisType = $(this).attr('data-type');
        getHistoryOrder(1);
    });


    //订单取消原因
    function getCancelReason(s, e, type){
        option5 = {
            label:{
                position:'bottom'
            },
            textStyle:{
                color:'#647888',
                fontSize:30
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                textStyle : {
                    color: '#fff',
                    decoration: 'none',
                    fontFamily: 'Verdana, sans-serif',
                    fontSize: 24,
                    fontStyle: 'italic',
                    fontWeight: 'bold'
                },
            },
            legend: {
                data: [],
                fontSize:30
            },
            color : ['#09CA65'],
            grid: {
                left: '2%',
                // right: '4%',
                bottom: '1%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data:[],
                axisLabel:{'fontSize':30,'interval':0,'rotate':90}
            },
            yAxis: {
                type: 'value',
                data: [],
                axisLabel:{'fontSize':30,'interval':0}
            },
            series: [
                {
                    name: '',
                    type: 'bar',
                    data: [],
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color: '#5B9BD5'
                            }
                        }
                    }
                }
            ]
        };
        var myChart5 = echarts.init(document.getElementById("orderCancel"));
        myChart5.showLoading({   // chart数据组装时的过渡控制
            effect:'ring'
        });
        let data = {
            cityId: cityVal,
            typeId: type,
            startDate: s,
            endDate: e
        }
        buildAjax('get','getCancelReason', data, true, false, function(res){
            option5.xAxis.data = res.data.axis;
            option5.series[0].data = res.data.series;
            myChart5.setOption(option5);
            myChart5.hideLoading();
        }, false);
    };

});
