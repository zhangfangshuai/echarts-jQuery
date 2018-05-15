// 订单用户占比分析
pieOption = {
    // color:['#09CA65','#00F977','#D0DFEE','#FFC32B','#ccc'],
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
        data: [],
        x:"center",
        y:'bottom'
    },
    grid:{
        bottom:"0%"
    },
    series : [
        {
            name: '工单类型',
            type: 'pie',
            radius : '60%',
            center: ['50%', '40%'],
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
            },
            data: [],
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
