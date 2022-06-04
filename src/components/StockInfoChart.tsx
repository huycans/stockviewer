import React from "react";
import { useSelector } from "react-redux";
import {
  selectTickerPriceHistory,
  selectTickerInfo
} from "../redux/slices/tickerSlice";
import { Navigate } from "react-router-dom";
import StockChart from "./StockChart";

export default function StockInfoChart() {
  const selectPriceHistory = useSelector(selectTickerPriceHistory);
  const tickerInfo = useSelector(selectTickerInfo);

  if (tickerInfo === null) {
    return <Navigate to="/" replace={true} />;
  }
  const seriesOpts = [
    {
      type: "line",
      id: tickerInfo?.symbol,
      name: tickerInfo?.symbol,
      data: selectPriceHistory,
      tooltip: {
        valueDecimals: 2
      }
    }
  ] as Highcharts.SeriesOptionsType[]
  return (
    <div id="chart-container">
      <StockChart
        HTMLTitle={"<b>" + tickerInfo?.symbol + "</b>" + " price history"}
        series={seriesOpts}
      />
    </div>
  );
}
