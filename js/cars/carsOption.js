/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/19
 * Time: 10:08
 *
 */


option = {
//  backgroundColor:'red',  //背景颜色
    color:['#09CA65','#0DB0FF','#FF7263','#F5A623','#C584FF','#4D68E5'],
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
                    name:'上架率',
                    icon : 'bar'
                 },{
                    name:'故障下架率',
                    icon : 'bar'
                },
                {
                    name:'低电下架率',
                    icon : 'bar'
                },
                {
                    name:'运维下架率',
                    icon : 'bar'
                },
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
    grid: {
        top:'10%',
        bottom: '15%',
        containLabel: true
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
            name: '百分比',
            axisLabel:{'fontSize':22}
        }
    ],
    series : [
        {
            name:'上架率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'故障下架率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'低电下架率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        },
        {
            name:'运维下架率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {opacity:1}},
            data:[]
        }
    ]
};


// 机车离线图
option1 = {
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
                name:'数量',
                icon : 'bar'
            }],
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
    },
    grid:{
        left: '10%',
        right:'15%'
    },
    color : ['#09CA65','#F5A623','#0DB0FF','#FF7263','#C584FF','#4D68E5'],
    xAxis:  {
        axisLabel:{'fontSize':24},
        type: 'category',
        splitLine: {show: false},
        data: []
    },
    yAxis: [
        {
            axisLabel:{'fontSize':24},
            type: 'value',
            name: '数量'
        }
    ],
    series: [
        {
            name:'离线详情',
            type:'line',
            smooth: true,
            data: [],
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:5
                    }
                }
            },
        },

    ]
};
