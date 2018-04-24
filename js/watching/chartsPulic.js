/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/19 10:08
 * Recode: zhangfs 2018/04/20 10:33
 */
var lineWidth='4';
option = {
// backgroundColor:'red',  //北京颜色
    color:['#09CA65','#00F977','#D0DFEE','#FFC32B','#00B74D','#FFAE29'],
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
    grid:{
        top: "5%",
        bottom:"15%"
    },
    legend: {
        itemGap: 100,
        data:[
                {
                    name:'上架',
                    icon : 'bar'
                 },{
                    name:'下架',
                    icon : 'bar'
                },
                {
                    name:'停止运营',
                    icon : 'bar'
                },
                // {
                //     name:'运维下架',
                //     icon : 'bar'
                // },
                // {
                //     name:'预约中',
                //     icon : 'bar'
                // }
            ],
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
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
            name:'上架',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'下架',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'停止运营',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        }
    ]
};
// 上架
optionOn = {
    // backgroundColor:'red',  //北京颜色
    color:['#09CA65','#00F977','#D0DFEE','#FFC32B','#00B74D','#FFAE29'],
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
    grid:{
        top: "5%",
        bottom: "15%",
    },
    legend: {
        data:[
            {
                name:'待租',
                icon : 'bar'
            },{
                name:'已预订',
                icon : 'bar'
            },
            {
                name:'服务中-未取车',
                icon : 'bar'
            },
            {
                name:'服务中-已取车',
                icon : 'bar'
            }
        ],
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
    },
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
            name:'待租',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'已预订',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'服务中-未取车',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'服务中-已取车',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        }
    ]
};
// 下架
optionDown = {
    // backgroundColor:'red',
    color:['#09CA65','#00F977','#D0DFEE','#FFC32B','#00B74D','#FFAE29'],
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
    grid:{
        top: "5%",
        bottom:"15%"
    },
    legend: {
        data:[
            {
                name:'运维中车辆',
                icon : 'bar'
            },{
                name:'维修中',
                icon : 'bar'
            },
            {
                name:'低续航',
                icon : 'bar'
            },
            {
                name:'车机离线',
                icon : 'bar'
            }
        ],
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
    },
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
            name:'运维中车辆',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'维修中',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'低续航',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'车机离线',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        }
    ]
};

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
        grid:{
            top: "5%",
            bottom:"15%"
        },
        legend: {	//图表上方的类别显示
            show:true,
            itemGap: 100,
            data:[
                {
                    name:'下单量',
                    icon : 'bar'
                },{
                name:'取车量',
                icon : 'bar'
            },{
                name:'取消订单',
                icon : 'bar'
            }],
            x: 'center',               // 水平安放位置，默认为全图居中，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
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
                axisLabel:{'fontSize':22},

            }
        ],
        series: [
            {
                name:'下单量',
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
                name:'取车量',
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
                name:'取消订单',
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

    option3 = {
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
            data:[
                {
                    name:'收入',
                    icon : 'bar'
                },{
                    name:'收现',
                    icon : 'bar'
                },{
                    name:'优惠',
                    icon : 'bar'
                },{
                    name:'未结算',
                    icon : 'bar'
                }],
            x: 'center',               // 水平安放位置，默认为全图居中，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
            padding:0
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
                name:'收入',
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
                name:'收现',
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
                name:'优惠',
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
                name:'未结算',
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

    option4 = {
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
        grid:{
            top: "5%",
            bottom:"15%"
        },
        legend: {	//图表上方的类别显示
            show:true,
            itemGap: 10,
            bottom:"20%" ,
            data:[
                {
                    name:'新增注册',
                    icon : 'bar'
                },{
                    name:'新增双证',
                    icon : 'bar'
                },{
                    name:'新增押金',
                    icon : 'bar'
                },{
                    name:'新增下单用户',
                    icon : 'bar'
                },{
                    name:'新增首单用户',
                    icon : 'bar'
                }],
            x: 'center',               // 水平安放位置，默认为全图居中，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
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
                name:'新增注册',
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
                name:'新增双证',
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
                name:'新增押金',
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
                name:'新增下单用户',
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
                name:'新增首单用户',
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
    option5 = {
    color:['#008F4C','#00B054','#09CA65','#59E39B','#C6EFD9'],
    tooltip : {
        trigger: 'axis',

        textStyle : {
            color: '#fff',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 28,
            fontStyle: 'italic',
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
    },
    legend: {
        // top:'0',
        data: ['0%-20%', '20%-40%','40%-60%','60%-80%','80%-100%'],
        textStyle:{
            color:'#647888',
            fontSize:24
        },
        y:'bottom',
        x:'center'
    },
    grid: {
        left: '3%',
        right: '3%',
        bottom: '7%',
        containLabel: true
    },
    xAxis:  {
        type: 'category',
        data: [],
        axisLabel:{'fontSize':22}

    },
    yAxis: {
        type: 'value',
        axisLabel:{'fontSize':22}
    },
    series: [
        {
            name: '0%-20%',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: []
        },
        {
            name: '20%-40%',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: []
        },
        {
            name: '40%-60%',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: []
        },
        {
            name: '60%-80%',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: []
        },
        {
            name: '80%-100%',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: []
        }
    ]
};
