import React, { useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

type StockChartProps = {
  HTMLTitle: string;
  series: Highcharts.SeriesOptionsType[];
};

export default function StockChart({ HTMLTitle, series }: StockChartProps) {
  const options: Highcharts.Options = {
    title: {
      useHTML: true,
      text: HTMLTitle,
      style: {
        fontSize: "1.5rem"
      }
    },
    credits: {
      enabled: false
    },
    navigation: {
      bindingsClassName: "chart-container" // informs Stock Tools where to look for HTML elements for adding technical indicators, annotations etc.
    },
    stockTools: {
      gui: {
        enabled: true // disable the built-in toolbar
      }
    },
    rangeSelector: {
      verticalAlign: "top",
      x: 0,
      y: 0,
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1m",
          title: "View 1 month"
        },
        {
          type: "month",
          count: 3,
          text: "3m",
          title: "View 3 months"
        },
        {
          type: "month",
          count: 6,
          text: "6m",
          title: "View 6 months"
        },
        {
          type: "ytd",
          text: "YTD",
          title: "View year to date"
        },
        {
          type: "year",
          count: 1,
          text: "1y",
          title: "View 1 year"
        },
        {
          type: "year",
          count: 3,
          text: "3y",
          title: "View 3 year"
        },
        {
          type: "year",
          count: 5,
          text: "5y",
          title: "View 5 year"
        },
        {
          type: "year",
          count: 10,
          text: "10y",
          title: "View 10 year"
        },
        {
          type: "all",
          text: "All",
          title: "View all"
        }
      ],
      selected: 4
    },
    series: series
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <div id="chart-container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
}
