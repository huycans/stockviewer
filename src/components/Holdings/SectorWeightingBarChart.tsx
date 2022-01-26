import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  selectTickerInfo,
  TickerInfoType
} from "../../redux/slices/tickerSlice";
import * as _ from "lodash";
export default function SectorWeightingBarChart() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const { sectorWeightings } = tickerInfo;

  const [sectorWeightingsBarData, setSectorWeightingsBarData] = useState<
    [string, number][]
  >(
    sectorWeightings.map((sector, index) => {
      return [
        Object.keys(sector)[0].toUpperCase(),
        Math.round(Object.values(sector)[0] * 100 * 100) / 100
      ];
    })
  );

  // let sectorWeightingsBarData: [string, number][] = sectorWeightings.map(
  //   (sector, index) => {
  //     return [
  //       Object.keys(sector)[0].toUpperCase(),
  //       Math.round(Object.values(sector)[0] * 100 * 100) / 100
  //     ];
  //   }
  // );

  const sectorWeightingsOptions: Highcharts.Options = {
    chart: {
      type: "bar"
    },
    title: {
      text: ""
    },
    subtitle: {
      text: ""
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
      enabled: false
    },
    tooltip: {
      // pointFormat: "<b>{series.name} {point.y:.1f}%</b>"
      pointFormat: "{point.y}%"
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
        showInLegend: false,
        type: "bar",
        data: sectorWeightingsBarData,
        // data: [["A", 12],["B", 10]],
        name: "Weight"
      }
    ]
  };

  const sortData = (direction: "asc" | "des") => {
    let sectorWeightingsBarDataCopy = _.cloneDeep(sectorWeightingsBarData);
    if (direction === "asc") {
      sectorWeightingsBarDataCopy.sort((sector1, sector2) => {
        //sectorWeightingsBarData looks like this: [["A", 10], ["B", 20],...]
        return sector1[1] - sector2[1];
      });
    } else if (direction === "des") {
      sectorWeightingsBarDataCopy.sort((sector1, sector2) => {
        return sector2[1] - sector1[1];
      });
    } else return null;

    setSectorWeightingsBarData(sectorWeightingsBarDataCopy);
  };
  const sectorWeightingsBarChartRef = useRef<HighchartsReact.RefObject>(null);
  const sectorWeightingBarChart = (
    <HighchartsReact
      highcharts={Highcharts}
      options={sectorWeightingsOptions}
      ref={sectorWeightingsBarChartRef}
    />
  );
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mx-3"
        onClick={() => sortData("asc")}
      >
        Sort ascending
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={() => sortData("des")}
      >
        Sort descending
      </button>
      {sectorWeightingBarChart}
    </>
  );
}
