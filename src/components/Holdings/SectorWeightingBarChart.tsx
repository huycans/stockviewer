import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { selectTickerInfo, TickerInfoType } from "../../redux/slices/tickerSlice";

export default function SectorWeightingBarChart() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;

  const {
    sectorWeightings
  } = tickerInfo;


  let sectorWeightingsBarData = sectorWeightings
  .map((sector, index) => {
    return [Object.keys(sector)[0].toUpperCase(), Math.round((Object.values(sector)[0])*100*100)/100 ]
  });

  const sectorWeightingsOptions: Highcharts.Options = {
    chart: {
      type: "bar"
    },
    title: {
      text: ""
    },
    subtitle: {
      text: ''
    },
    navigation: {
      bindingsClassName: "sectorWeightingsBarChart"
    },
    xAxis: {
      // categories: sectorWeightingsBarData.categories,
      type: "category", // In a category axis, the point names of the chart's
      //  series are used for categories, if not a categories array is defined.
      title: {
        text: ""
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Percentage",
        align: "middle"
      },
      labels: {
        overflow: "justify"
      }
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      // pointFormat: "<b>{series.name} {point.y:.1f}%</b>"
      pointFormat: '{point.y}%',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false
        }
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        dataSorting: {
          enabled: true,
          
        },
        showInLegend: false,
        type:"bar",
        data: sectorWeightingsBarData,
        // data: [["A", 12],["B", 10]],
        name: "Weight"
      }
    ]
  };
  
  const sectorWeightingsBarChartRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={sectorWeightingsOptions}
      ref={sectorWeightingsBarChartRef}
    />
  );
}
