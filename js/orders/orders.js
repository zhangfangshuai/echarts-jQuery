/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/15  09:05
 * Recode: zhangfs 2018/04/11 10:50
 * Note: Package and Add Handler
 */
APP.html = "orders.html";
$(function () {
    var odtype = 0,
        cancelType = 0,
        cityVal='';
    var yesterday = getDaysOffset(-1),
        weekAgo = getDaysOffset(-7);

    for (let i of [1,2,3]) {  // trigger scroller
        $('#appDateTime' + i).mobiscroll(APP.dateBar);
    }

    startingWeekYesterday(1);
    $('#appDateTime1, #appDateTime3').val(yesterday);
    $('#appDateTime2').val(weekAgo);

    // 页面初始化
    getCity(function(res, cityInit) {
        cityVal = cityInit;
        getorderAnalyze($('#appDateTime1').val(), odtype);
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
        getorderAnalyze($('#'+id).val(), odtype);
    });

    $('#appDateTime2, #appDateTime3').on('change',function () {
        getCancelReason($('#appDateTime2').val(),$('#appDateTime3').val(), cancelType)
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
