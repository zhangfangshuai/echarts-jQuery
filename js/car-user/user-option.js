
/////////////////////////////////////////////////option start////////////////////

var lineWidth='4';
// 用户转化漏斗图
    option3 = {
        color:['#008F4C','#00B054','#09CA65','#59E39B','#C6EFD9'],
        textStyle:{
            color:'#000',
            fontSize:36,
            textShadowColor:'#fff',
            textShadowBlur:'100',
            // textBorderColor:'#fff',
            // textBorderWidth:3
        },
        tooltip: {
            trigger: 'item',
            textStyle : {
                color: '#fff',
                decoration: 'none',
                fontFamily: 'Verdana, sans-serif',
                fontSize: 30,
                fontStyle: 'italic',
                fontWeight: 'bold'
            },
        },
        legend: {
             data: ['双证用户','可用车用户','注册用户','老用户','首单'],
            textStyle : {
                color: '#647888',
                // decoration: 'none',
                fontFamily: 'Verdana, sans-serif',
                fontSize: 24,
                fontStyle: 'italic',
                fontWeight: 'bold'
            },
            y:"bottom"
        },
        grid:{
top:"5%"
        },
        calculable: true,
        series: [
            {
                name:'用户转化',
                type:'funnel',
                left: '15%',
                top: 60,
                //x2: 80,
                bottom: 60,
                width: '70%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 36,
                            color:'#fff'
                        }
                    }
                },
                data: [
                ]
            }
        ]
    };
// 老拉新折线图
    option2 = {
    lineStyle:{
        width:20,
        color:'red'
    },
    textStyle:{
        color:'#647888',
        fontSize:30
    },
    tooltip: {
        trigger: 'axis', //坐标轴触发提示框，多用于柱状、折线图中
        textStyle : {
            color: '#fff',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 24,
            fontStyle: 'italic',
            fontWeight: 'bold'
        },
    },
    legend: {	//图表上方的类别显示
        show:true,
        itemGap: 100,
        data:[{
            name:'老拉新合计',
            icon : 'bar'
        }],
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
    },
        grid:{
        top:"5%",
            bottom:"15%"
        },
    color : ['#F5A623', '#09CA65'],
    xAxis:  {	//X轴
        type : 'category',
        data : [],
        axisLabel:{'fontSize':22}
    },
    yAxis: [
        {
            type: 'value',
            axisLabel:{'fontSize':22},

        }
    ],
    series: [
        {
            name:'老拉新合计',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{

                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'虚拟网点',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{

                        width:lineWidth
                    }
                }
            },
        }
    ]
};
// 新渠道用户饼图
option4 = {
    // color:['#008F4C','#00B054','#09CA65','#59E39B','#C6EFD9'],
    color:['#09CA65','#00F977','#D0DFEE','#FFC32B','#ccc'],
    textStyle:{
        color:'#647888',
        fontSize:30
    },
    tooltip : {
        trigger: 'item',

        fontStyle:{
            fontSize:28
        },
        textStyle:{
            fontSize:30
        },
    },
    legend: {
        // top: '0',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
        x:"center",
        y:'bottom'
    },
    grid:{
        bottom:"0%"
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '70%',
            center: ['50%', '40%'],
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
//用户注绑率
option5 = {
    textStyle:{
        color:'#647888',
        fontSize:30
    },
    tooltip: {
        trigger: 'axis', //坐标轴触发提示框，多用于柱状、折线图中
        textStyle : {
            color: '#fff',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 24,
            fontStyle: 'italic',
            fontWeight: 'bold'
        },
    },
    legend: {	//图表上方的类别显示
        show:true,
        itemGap: 50,
        data:[
            {
                name:'7天注绑率',
                icon : 'bar'
            },{
                name:'15天注绑率',
                icon : 'bar'
            },{
                name:'30天注绑率',
                icon : 'bar'
            },{
                name:'60天注绑率',
                icon : 'bar'
            }],
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
    },
    grid:{
        left: '13%',
        top: '5%',
        bottom: '15%',
    },
    color : ['#09CA65','#F5A623','#0DB0FF','#FF7263','#C584FF','#4D68E5'],
    xAxis:  {	//X轴
        type : 'category',
        data : [],
        axisLabel:{'fontSize':22}
    },
    yAxis: [
        {
            type: 'value',
            axisLabel:{'fontSize':22}
        }
    ],
    series: [
        {
            name:'7天注绑率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'15天注绑率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'30天注绑率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'60天注绑率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        }
    ]
};
//用户激活率
option6 = {
    textStyle:{
        color:'#647888',
        fontSize:30
    },
    tooltip: {
        trigger: 'axis', //坐标轴触发提示框，多用于柱状、折线图中
        textStyle : {
            color: '#fff',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 24,
            fontStyle: 'italic',
            fontWeight: 'bold'
        },
    },
    legend: {	//图表上方的类别显示
        show:true,
        itemGap: 5,
        data:[
            {
                name:'7天注册首单激活率',
                icon : 'bar'
            },{
                name:'30天注册首单激活率',
                icon : 'bar'
            },{
                name:'60天注册首单激活率',
                icon : 'bar'
            },
            {
                name:'7天绑后激活率',
                icon : 'bar'
            },{
                name:'30天绑后激活率',
                icon : 'bar'
            },{
                name:'60天绑后激活率',
                icon : 'bar'
            }],
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
    },
    grid:{
        // left: '13%',
        top: "5%",
        bottom: "25%",
    },
    color : ['#09CA65','#F5A623','#0DB0FF','#FF7263','#C584FF','#4D68E5'],
    xAxis:  {	//X轴
        type : 'category',
        data : [],
        axisLabel:{'fontSize':22}
    },
    yAxis: [
        {
            type: 'value',
            axisLabel:{'fontSize':22}
        }
    ],
    series: [
        {
            name:'7天注册首单激活率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'30天注册首单激活率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'60天注册首单激活率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'7天绑后激活率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            }
        },
        {
            name:'30天绑后激活率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            }
        },
        {
            name:'60天绑后激活率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            }
        }
    ]
};
//用户流失
option7 = {
    textStyle:{
        color:'#647888',
        fontSize:30
    },
    tooltip: {
        trigger: 'axis', //坐标轴触发提示框，多用于柱状、折线图中
        textStyle : {
            color: '#fff',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 24,
            fontStyle: 'italic',
            fontWeight: 'bold'
        },
    },
    legend: {	//图表上方的类别显示
        show:true,
        itemGap: 30,
        data:[
            {
                name:'注册无绑定率',
                icon : 'bar'
            },{
                name:'绑定无用车率',
                icon : 'bar'
            },{
                name:'可用车无下单率',
                icon : 'bar'
            },
            ],
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
    },
    grid:{
        left: '13%',
        top:"5%",
        bottom:"15%"
    },
    color : ['#09CA65','#F5A623','#0DB0FF','#FF7263','#C584FF','#4D68E5'],
    xAxis:  {	//X轴
        type : 'category',
        data : [],
        axisLabel:{'fontSize':22}
    },
    yAxis: [
        {
            type: 'value',
            axisLabel:{'fontSize':22}
        }
    ],
    series: [
        {
            name:'注册无绑定率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'绑定无用车率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            },
        },
        {
            name:'可用车无下单率',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:lineWidth
                    }
                }
            }
        }
    ]
};
option8 = {
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
    yAxis: [{
        type: 'value',
        data: [],
        axisLabel:{'fontSize':30,'interval':0}
    },{
        type: 'value',
        data: [],
        axisLabel:{'fontSize':30,'interval':0}
    }],
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
        }, {
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
var area1 = new LArea1();
area1.init({
    'trigger':'#first-s',
    'valueTo':'#first-sv',
    'keys':{
        id:'value',
        name:'text'
    },
    'type':2,
    'data':[[{"text":"近7日","value":"2"},{"text":"近15日","value":"3"},{"text":"近1月","value":"4"},{"text":"近2月","value":"5"}]]
});



function todate(time) {
    var oDate=new Date();
    oDate.setTime(time);
    var year=oDate.getFullYear();
    var mon=oDate.getMonth();
    var d=oDate.getDate();
    return year+'/'+mon+'/'+d
}


