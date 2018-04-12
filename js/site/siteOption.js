/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/19
 * Time: 10:08
 *
 */

var lineWidth='4';
/////////////////////////////////////////////////option start////////////////////
    option = {
    // backgroundColor:'red',  //北京颜色
        color:['#00F977','#09CA65','#D0DFEE','#FFC32B','#ccc'],
        textStyle:{
            color:'#647888',
            fontSize:30
        },
        tooltip : {
            trigger: 'axis',
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
            data:[
                    {
                        name:'服务中',
                        icon : 'bar'
                     },{
                        name:'待租',
                        icon : 'bar'
                    },
                    {
                        name:'低电下架',
                        icon : 'bar'
                    },
                    {
                        name:'运维下架',
                        icon : 'bar'
                    },
                    {
                        name:'预约中',
                        icon : 'bar'
                    }
                ],
            x: 'center',               // 水平安放位置，默认为全图居中，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
        },
        /* toolbox: {
            feature: {
                saveAsImage: {}
            }
        }, */
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '14%',
        //     containLabel: true
        // },
        xAxis : [

            {
                type : 'category',
                data : [],
                axisLabel:{'fontSize':22}
            }

        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{'fontSize':22}
            }
        ],
        series : [
            {
                name:'服务中',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {opacity:1}},
                data:[]
            },
            {
                name:'待租',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {opacity:1}},
                data:[]
            },
            {
                name:'低电下架',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {opacity:1}},
                data:[]
            },
            {
                name:'运维下架',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {opacity:1}},
                data:[]
            },
            {
                name:'预约中',
                type:'line',
                stack: '总量',
                /* label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }, */
                areaStyle: {normal: {opacity:1}},
                data:[]
            }
        ]
    };
    // 网点分布折线图
var opt = {
    preset:'date',//日期
    theme:'default',//皮肤样式
    display:'bottom',//显示方式
    lang:'zh',
    mode:'scroller',//日期选择模式
    dateFormat:'yymmdd', // 日期格式
    setText:'确定',
    cancelText:'取消',
    showNow:true,
    nowText:'今天',
    dateOrder:'yymmdd', //面板中日期排列格式
    startYear:2016,
    endYear:new Date().getFullYear(), //结束年份
    dayText: '日',
    monthText: '月',
    yearText: '年', //面板中年月日文字
};
// 网点明细
var area5 = new LArea1();
area5.init({
    'trigger':'#last',
    'valueTo':'#last-s',
    'keys':{
        id:'value',
        name:'text'
    },
    'type':2,
    'data':[[{"text":"近7日","value":"1"},{"text":"近15日","value":"2"},{"text":"近1月","value":"3"},{"text":"近2月","value":"4"}]]
});

// 网点明细商圈
var area7 = new LArea1();
area7.init({
    'trigger':'#last2',
    'valueTo':'#last2-s',
    'keys':{
        id:'value',
        name:'text'
    },
    'type':2,
    'data':[[{"text":"全部","value":""},{"text":"实体","value":"0"},{"text":"虚拟","value":"1"}]]
});
var area7 = new LArea1();
area7.init({
    'trigger':'#last4',
    'valueTo':'#last4-s',
    'keys':{
        id:'value',
        name:'text'
    },
    'type':2,
    'data':[[{"text":"0点","value":"0"},{"text":"1点","value":"1"},{"text":"2点","value":"2"},{"text":"3点","value":"3"},{"text":"4点","value":"4"},{"text":"5点","value":"5"},{"text":"6点","value":"6"},{"text":"7点","value":"7"},{"text":"8点","value":"8"},{"text":"9点","value":"9"},{"text":"10点","value":"10"},{"text":"11点","value":"11"},{"text":"12点","value":"12"},{"text":"13点","value":"13"},{"text":"14点","value":"14"},{"text":"15点","value":"15"},{"text":"16点","value":"16"},{"text":"17点","value":"17"},{"text":"18点","value":"18"},{"text":"19点","value":"19"},{"text":"20点","value":"20"},{"text":"21点","value":"21"},{"text":"22点","value":"22"},{"text":"23点","value":"23"}]]
});

function todate(time) {
    var oDate=new Date();
    oDate.setTime(time);
    var year=oDate.getFullYear();
    var mon=oDate.getMonth()+1;
    var d=oDate.getDate();
    return year+'/'+addZero(mon)+'/'+addZero(d)
}


