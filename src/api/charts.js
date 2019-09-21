import echarts from 'echarts'

export const colorList=["#d81e06","#f4ea2a","#1afa29","#1296db","#13227a","#d4237a","#36ab60"];


export function bt(legendData,seriesData,id,title,colorList){
    let myChart = echarts.init(document.getElementById(id));
                    // 绘制图表
                    myChart.setOption({
                         title : {
                            text: title,
                            x:'center',
                            // height:3
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}, ({d}%)",
                        },
                        series : [
                       {
                            name: '访问来源',
                            type: 'pie',
                            hoverAnimation: false,
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
}