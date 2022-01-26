import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { selectTickerInfo, TickerInfoType } from "../../redux/slices/tickerSlice";
import genericOptions from './GenericPieOption';
import colors from '../chartColors';

export default function BondRatingsPieChart() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;

  const {
    bondRatings,
  } = tickerInfo;

  const bondRatingPieData = bondRatings.map((rating, index) => {
    return {
      name: Object.keys(rating)[0].toUpperCase(),
      y: Object.values(rating)[0],
      colors: Object.values(colors)[index],
      selected: false
    };
  });
  
  let bondRatingPieOptions: Highcharts.Options = {
    ...genericOptions,
    series: [
      {
        name: "Percent",
        type: "pie",
        data: bondRatingPieData
      }
    ],
    title: {
      text: ""
    },
    navigation: {
      bindingsClassName: "bondRatingPieChart" // informs Highcharts where to look for HTML elements for adding technical indicators, annotations etc.
    }
  };

  const bondRatingPieChartRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={bondRatingPieOptions}
      ref={bondRatingPieChartRef}
    />
  );
}
