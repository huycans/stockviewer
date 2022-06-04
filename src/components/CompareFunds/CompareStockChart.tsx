import React from "react";
import { isEmpty } from "lodash";
import StockChart from "../StockChart";
type CompareStockChartType = {
  tickersPriceHistory: {
    [tickerName: string]: number[];
  };
  seriesOpts: Highcharts.SeriesOptionsType[];
};

export default function CompareStockChart({
  tickersPriceHistory,
  seriesOpts
}: CompareStockChartType) {
  if (!isEmpty(tickersPriceHistory))
    return (
      <StockChart
        HTMLTitle="Fund performance"
        series={seriesOpts}
        buttons={[]}
        enableNavigator={false}
        enableRangeSelector={false}
      />
    );
  else return null;
}
