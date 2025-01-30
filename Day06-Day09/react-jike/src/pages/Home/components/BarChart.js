// 柱状图组件

import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function BarChart(props) {
  const echartsRef = useRef(null);

  useEffect(() => {
    // 基于准备好的 DOM，初始化 echarts 实例
    const myChart = echarts.init(echartsRef.current);

    // 指定图表的配置项和数据
    const option = {
      title: {
        // eslint-disable-next-line react/prop-types
        text: props.title,
      },
      tooltip: {},
      xAxis: {
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {},
      series: [
        {
          // eslint-disable-next-line react/prop-types
          name: props.title,
          type: "bar",
          data: [50, 50, 50],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, [props]);

  return (
    <div ref={echartsRef} style={{ width: "auto", height: "300px" }}></div>
  );
}

export default BarChart;
