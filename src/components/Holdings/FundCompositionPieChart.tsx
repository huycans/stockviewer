import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { selectTickerInfo, TickerInfoType } from "../../redux/slices/tickerSlice";
import genericOptions from './GenericPieOption';
import colors from '../chartColors';

export default function FundCompositionPieChart() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const {
    bondPosition,
    cashPosition,
    stockPosition,
    preferredPosition,
    convertiblePosition,
    otherPosition,
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

  let fundCompositionPieOptions: Highcharts.Options = {
    ...genericOptions,
    series: [
      {
        name: "Percent",
        type: "pie",
        data: fundCompositionPieData
      }
    ],
    title: {
      text: ""
    },
    navigation: {
      bindingsClassName: "fundCompositionPieChart" // informs Highcharts where to look for HTML elements for adding technical indicators, annotations etc.
    }
  };

  const fundCompositionPieChartRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={fundCompositionPieOptions}
      ref={fundCompositionPieChartRef}
    />
  );
}
