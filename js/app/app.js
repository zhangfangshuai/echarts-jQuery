/**
 * Date: 2017/11/15 09:05
 * Create: zhangfs by Atom - 2018/04/16
 */
$(function () {
    var DAUT_CACHE, DUR_CACHE;
    var dautpage = 1, durpage = 1;
    var duaF_appOs = 1, duaT_appOs = 1, dur_appOs = 1;
    var cityVal = '';

    var weekAgo = getDaysOffset(-7),
        yesterday = getDaysOffset(-1);
    for (let i of [1,2,3,4]) {
        $('#appDateTime'+i).mobiscroll(APP.dateBar);
    }
    for (let i of [1,3]) {
        $('#appDateTime'+i).val(weekAgo);
    }
    for (let i of [2,4]) {
        $('#appDateTime'+i).val(yesterday);
    }

    // 获取城市列表，并初始化数据
    getCity(function(res, cityInit){
        cityVal = cityInit;
        buildAjax('get', 'dau/getAppVersions', {}, true, false, function(res) {
            APP.appVersions = [];
            for (let v of res.data) {
                APP.appVersions.push({'text':v,'value':v});
            }
            triggerLArea('#dauf', '#dauf-val', APP.appVersions);
            triggerLArea('#dur', '#dur-val', APP.appVersions);
            dauFunnel();
            dauTable();
            diffUserReport();
        })
    });

    // 城市效果联动
    $('#demo3').bind('input propertychange', function() {
        if ($('#value3').val() == '') return;
        cityVal = $('#value3').val();
        $('.phoneBubble').hide('fast');
        cityVal == '1' && $('.responsiblePerson-box').hide('fast');
        dauFunnel();
        dauTable();
        diffUserReport();
        // getPrincipal(cityVal, []);
    });

    // 责任人弹窗控制
    $('.responsiblePerson').on('click', function() {
        triggerBubble(this.parentNode);
    });


    /**
     * DAU漏斗
     */
    var dauOpenFunnel = echarts.init(document.getElementById("dauOpenFunnel"));
    dauOpenFunnel.showLoading({ effect:'ring' });
    var dauStartFunnel = echarts.init(document.getElementById("dauStartFunnel"));
    dauStartFunnel.showLoading({ effect:'ring' });

    function dauFunnel() {
        let param = {
            cityId: cityVal,
            appVersion: $('#dauf').val(),
            os: duaF_appOs
        }
        buildAjax('get', 'dau/getReportByPeople', param, true, false, function(res){
            let nums = res.data.nums,
                userNum = res.data.userNum,
                names = [];
            for (let i of [0,1,2]) {
                if (nums[i].value) {   // exclude null && 0
                    $('.dauf'+i).html((nums[i+1].value/nums[i].value*100).toFixed(2)+'%');
                    $('.dauf'+(i+3)).html((userNum[i+1].value/userNum[i].value*100).toFixed(2)+'%');
                    $('.echarts').css('height', '5.2rem');
                } else {
                    Tip.success('用户漏斗数据异常!');
                    dauOpenFunnel.hideLoading();
                    dauStartFunnel.hideLoading();
                    $('.echarts').css('height', '0.2rem');
                    return;
                }
            };
            try {
                for(let d of nums) {
                  names.push(d.name);
                }
                funnelOption.series[0].data = nums;
                funnelOption.legend.data = names;
                dauOpenFunnel.setOption(funnelOption);
                for(let d of userNum) {
                    names.push(d.name);
                }
                funnelOption.series[0].data = userNum;
                funnelOption.legend.data = names;
                dauStartFunnel.setOption(funnelOption);
            } catch (e) {
                console.log('用户漏斗数据异常!', e);
            }
            dauOpenFunnel.hideLoading();
            dauStartFunnel.hideLoading();
        }, false);
    }

    $('#dauf').bind('input propertychange', function() {
        $('#dauf-val').val() && dauFunnel();
    });

    $('.dauf-set').on('click', function() {
        $('.dauf-set').removeClass('active');
        $(this).addClass('active');
        duaF_appOs = $(this).attr('data');
        dauFunnel();
    });


    /**
     * DAU统计报表
     **/
    function dauTable() {
        let param = {
            cityId: cityVal,
            appVersion: $('#dauT-val').val(),
            os: duaT_appOs,
            startDate: $('#appDateTime1').val(),
            endDate: $('#appDateTime2').val()
        };
        buildAjax('get', 'dau/getDauListReport', param, true, false, function(res) {
            DAUT_CACHE = res.data;
            dautpage = resetPaging('dauT-nowpage');
            $('.dauT-allpage').html(Math.ceil(DAUT_CACHE.length / 10) == 0 ? 1 : Math.ceil(DAUT_CACHE.length / 10));
            setDautUI(DAUT_CACHE.slice(0, 10));
        }, false);
    }
    let refDautUI = (p) => {
        DAUT_CACHE ? setDautUI(DAUT_CACHE.slice(10 * ( p - 1 ), 10 * p)) : dauTable();
    }
    let setDautUI = (data) => {
        let str = "";
        for (let d of data) {
          str += "<li> <p>" + d.dateId + "</p>" +
              "<p>" + d.startappUsers + "</p>" +
              "<p>" + d.pickupcarUsers + "</p>" +
              "<p>" + d.returncarUsers + "</p>" +
              "<p>" + d.downorderUsers + "</p> </li>"
        }
        $('.dauTVal').html(str);
    }
    // DAU统计报表 app版本切换
    $('#dauT').bind('input propertychange', function() {
        $('#dauT-val').val() && dauTable();
    });
    // DAU统计报表 系统切换
    $('.dauT-set').on('click', function() {
        $('.dauT-set').removeClass('active');
        $(this).addClass('active');
        duaT_appOs = $(this).attr('data');
        dauTable();
    });
    // DAU统计报表 时间监控
    $('#appDateTime1, #appDateTime2').on('change', function(){
        isDateValid(1, 2) && dauTable();
    })
    // DAU统计报表 分页控制
    $('.dauT-prepage, .dauT-nextpage').on('click', function(){
        dautpage = pagingCtrl(this, dautpage, refDautUI);
    });


    /**
     * 不同类型用户启动APP报表
     **/
    function diffUserReport() {
        let param = {
            cityId: cityVal,
            appVersion: $('#dur-val').val(),
            os: dur_appOs,
            startDate: $('#appDateTime3').val(),
            endDate: $('#appDateTime4').val()
        };
        buildAjax('get', 'dau/getOpenListReport', param, true, false, function(res) {
            DUR_CACHE = res.data;
            dautpage = resetPaging('dur-nowpage');
            $('.dur-allpage').html(Math.ceil(DUR_CACHE.length / 10) == 0 ? 1 : Math.ceil(DUR_CACHE.length / 10));
            setDurUI(DUR_CACHE.slice(0, 10));
        }, false);
    }
    let refDurUI = (p) => {
        DUR_CACHE ? setDurUI(DUR_CACHE.slice(10 * ( p - 1 ), 10 * p)) : diffUserReport();
    }
    let setDurUI = (data) => {
        let str = "";
        for (let d of data) {
          str += "<li> <p>" + d.dateId + "</p>" +
              "<p>" + d.openappRegusers + "</p>" +
              "<p>" + d.openappAuditusers + "</p>" +
              "<p>" + d.openappUsableusers + "</p>" +
              "<p>" + nullHandle(d.openappOrderusers) + "</p> </li>"
        }
        $('.durVal').html(str);
    }
    // 启动APP报表 app版本切换
    $('#dur').bind('input propertychange', function() {
        $('#dur-val').val() && diffUserReport();
    });
    // 启动APP报表 系统切换
    $('.dur-set').on('click', function() {
        $('.dur-set').removeClass('active');
        $(this).addClass('active');
        dur_appOs = $(this).attr('data');
        diffUserReport();
    });
    // 启动APP报表 时间监控
    $('#appDateTime3, #appDateTime4').on('change', function(){
        isDateValid(3, 4) && diffUserReport();
    })
    // 启动APP报表 分页控制
    $('.dur-prepage, .dur-nextpage').on('click', function(){
        dur_appOs = pagingCtrl(this, dur_appOs, refDurUI);
    });
});
