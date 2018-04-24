/**
 * Created with webstorm.
 * Author: dameng
 * Date: 2017/11/19
 * Time: 10:08
 *
 */


option = {
// backgroundColor:'red',  //背景颜色
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
        top:'5%',
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
    xAxis:  {	//X轴
        axisLabel:{'fontSize':24},
        type: 'category',
        name: '日期',
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



// 车机离线图
// var area4 = new LArea1();
// area4.init({
//     'trigger':'#first-s',
//     'valueTo':'#first-sv',
//     'keys':{
//         id:'value',
//         name:'text'
//     },
//     'type':2,
//     'data':[[{"text":"0点","value":"0"},{"text":"1点","value":"1"},{"text":"2点","value":"2"},{"text":"3点","value":"3"},{"text":"4点","value":"4"},{"text":"5点","value":"5"},{"text":"6点","value":"6"},{"text":"7点","value":"7"},{"text":"8点","value":"8"},{"text":"9点","value":"9"},{"text":"10点","value":"10"},{"text":"11点","value":"11"},{"text":"12点","value":"12"},{"text":"13点","value":"13"},{"text":"14点","value":"14"},{"text":"15点","value":"15"},{"text":"16点","value":"16"},{"text":"17点","value":"17"},{"text":"18点","value":"18"},{"text":"19点","value":"19"},{"text":"20点","value":"20"},{"text":"21点","value":"21"},{"text":"22点","value":"22"},{"text":"23点","value":"23"}]]
// });
