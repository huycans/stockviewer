import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { selectTickerInfo, TickerInfoType } from "../redux/slices/tickerSlice";

export default function Holdings() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const colors = {
    blue: "#0d6efd",
    indigo: "#6610f2",
    purple: "#6f42c1",
    pink: "#d63384",
    red: "#dc3545",
    orange: "#fd7e14",
    yellow: "#ffc107",
    green: "#198754",
    teal: "#20c997",
    cyan: "#0dcaf0",
    black: "#000"
  };

  const {
    bondPosition,
    cashPosition,
    stockPosition,
    preferredPosition,
    convertiblePosition,
    otherPosition
  } = tickerInfo;

  const fundCompositionPieData = [
    {
      name: "Stock",
      y: stockPosition * 100,
      color: colors.blue,
      selected: false
    },
    {
      name: "Bond",
      y: bondPosition * 100,
      color: colors.red,
      selected: false
    },
    {
      name: "Cash",
      y: cashPosition * 100,
      color: colors.green,
      selected: false
    },
    {
      name: "Preferred",
      y: preferredPosition * 100,
      color: colors.teal,
      selected: false
    },
    {
      name: "Convertible",
      y: convertiblePosition * 100,
      color: colors.orange,
      selected: false
    },
    {
      name: "Other",
      y: otherPosition * 100,
      color: colors.black,
      selected: false
    }
  ];
  const options: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: "Fund composition"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    navigation: {
      bindingsClassName: "fundCompositionPieChart" // informs Highcharts where to look for HTML elements for adding technical indicators, annotations etc.
    },
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %"
        }
      }
    },
    series: [
      {
        name: "Percent",
        type: "pie",
        data: fundCompositionPieData
      }
    ]
  };

  const pieChartRef = useRef<HighchartsReact.RefObject>(null);
  const fundCompositionPieChart = (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={pieChartRef}
    />
  );

  return (
    <div className="container">
      <div className="row" id="fundCompositionPieChart">
        <div className="col-md-6">
          <h3 className="fw-bold">Fund composition</h3>
          {fundCompositionPieChart}
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">Bond holding table</h3>
          <div>Data</div>
          <h3 className="fw-bold">Stock holding table</h3>
          <div>Data</div>
        </div>
      </div>
      <div className="row">
        <p>
          Display a pie chart of bond/equity portion (bondPosition,
          cashPosition, stockPosition, preferredPosition, convertiblePosition,
          otherPosition)
        </p>
        <p>Bond holdings (bondHoldings{})</p>
        <p>Equity holdings (equityHoldings{})</p>
        <p>Top holdings (holdings[{}])</p>
        <p>Bond ratings (bondRatings[])</p>
      </div>
    </div>
  );
}
