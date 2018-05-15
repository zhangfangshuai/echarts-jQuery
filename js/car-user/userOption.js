// 用户转化漏斗图
var funnelOption = {
      color:['#008F4C','#00B054','#09CA65','#59E39B','#C6EFD9'],
      textStyle:{
          color:'#000',
          fontSize:36,
          textShadowColor:'#fff',
          textShadowBlur:'100',
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
        top:"10%"
      },
      calculable: true,
      series: [
        {
            name:'用户转化',
            type:'funnel',
            left: '15%',
            top: 60,
            bottom: 60,
            width: '70%',
            // height: {totalHeight} - y - y2,
            // max: 100,  // 设置比较小的max值能关闭漏斗效果
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

// 订单用户占比分析
pieOption = {
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
        data: [],
        x:"center",
        y:'bottom'
    },
    grid:{
        bottom:"0%"
    },
    series : [
        {
            name: '占比类型',
            type: 'pie',
            radius : '75%',
            center: ['50%', '45%'],
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
