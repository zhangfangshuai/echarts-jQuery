// dau漏斗图
var funnelOption = {
      color:['#C6EFD9','#59E39B','#09CA65','#00B054'],
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
              fontSize: 28,
              fontStyle: 'italic',
              fontWeight: 'bold'
          },
      },
      legend: {
          data: [],
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
            name:'DAU',
            type:'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            // max: 100,  // 如果想取消漏斗的大小变化效果,可以设置比较小的max值
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 0,
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
            data: []
        }
    ]
};
