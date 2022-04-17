import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";
import colors, { colorNames } from "../chartColors";
import {
  getListOfTickers,
  selectTickersInfo,
  selectTimestamps,
  selectTickersPriceHistory
} from "../../redux/slices/compareSlice";
import SearchBar from "../SearchBar";
import { formatPercent } from "../utils";
import CompareStockChart from "./CompareStockChart";

type ReturnObject = {
  "1Y": string;
  "6M": string;
  YTD: string;
  "3Y": string;
  "5Y": string;
  "10Y": string;
  MAX: string;
  ending: string;
};

export default function CompareFunds() {
  const [tickerListString, setTickerListString] = useState("");
  const tickersPriceHistory = useSelector(selectTickersPriceHistory);
  const tickersInfo = useSelector(selectTickersInfo);
  let timestamps = useSelector(selectTimestamps).slice(); //copy timestamps arr
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    setTickerListString(target.value);
  };

  const handleTickerListSearch = () => {
    let tickerList = tickerListString.toUpperCase().replaceAll(/ /g, "");
    setTickerListString(tickerList);
    dispatch(getListOfTickers(tickerList.split(",")));
  };

  // init default values for displaying data
  let returns = {} as {
    [tickerName: string]: ReturnObject;
  };
  let startDateStr = "",
    endDateStr = "";

  if (timestamps.length > 0) {
    for (const [tickerName, tickerPriceArr] of Object.entries(
      tickersPriceHistory
    )) {
      let latestDate = DateTime.fromMillis(
        timestamps[timestamps.length - 1]
      ).setZone("utc");

      endDateStr = latestDate.toFormat("LLL/yyyy");
      startDateStr = DateTime.fromMillis(timestamps[0])
        .setZone("utc")
        .toFormat("LLL/yyyy");

      let latestPrice = tickerPriceArr[tickerPriceArr.length - 1];
      let maximumMonthsOfHistory = tickerPriceArr.length - 1; //maximum months of available data
      // note: for 12 months of data, we need 13 monthly data points (from Jan/2021->Jan/2022 there are 13 dates, spanning 12 months)
      // if tickerPriceArr has 12 data points, we have only 11 months of data

      // milestone prices
      let sixMonthAgo, oneYearAgo, threeYearAgo, fiveYearAgo, tenYearAgo, ytd;
      sixMonthAgo = oneYearAgo = threeYearAgo = fiveYearAgo = tenYearAgo = 0;
      let sixMonthReturn,
        oneYearReturn,
        threeYearReturn,
        fiveYearReturn,
        tenYearReturn,
        maxReturn,
        ytdReturn;

      let monthsToDate = latestDate.month;
      if (maximumMonthsOfHistory >= monthsToDate) {
        ytd = tickerPriceArr[maximumMonthsOfHistory - monthsToDate + 1];
        ytdReturn = formatPercent((latestPrice - ytd) / ytd);
      }

      if (maximumMonthsOfHistory >= 6) {
        sixMonthAgo = tickerPriceArr[maximumMonthsOfHistory - 6];
        sixMonthReturn = formatPercent(
          (latestPrice - sixMonthAgo) / sixMonthAgo
        );
      }
      if (maximumMonthsOfHistory >= 12) {
        oneYearAgo = tickerPriceArr[maximumMonthsOfHistory - 12];
        oneYearReturn = formatPercent((latestPrice - oneYearAgo) / oneYearAgo);
      }
      if (maximumMonthsOfHistory >= 36) {
        threeYearAgo = tickerPriceArr[maximumMonthsOfHistory - 36];
        threeYearReturn = formatPercent(
          (latestPrice - threeYearAgo) / threeYearAgo
        );
      }
      if (maximumMonthsOfHistory >= 60) {
        fiveYearAgo = tickerPriceArr[maximumMonthsOfHistory - 60];
        fiveYearReturn = formatPercent(
          (latestPrice - fiveYearAgo) / fiveYearAgo
        );
      }
      if (maximumMonthsOfHistory >= 120) {
        tenYearAgo = tickerPriceArr[maximumMonthsOfHistory - 120];
        tenYearReturn = formatPercent((latestPrice - tenYearAgo) / tenYearAgo);
      }
      maxReturn = formatPercent(
        (latestPrice - tickerPriceArr[0]) / tickerPriceArr[0]
      );
      returns[tickerName] = {
        "1Y": oneYearReturn ? oneYearReturn : "-",
        "6M": sixMonthReturn ? sixMonthReturn : "-",
        YTD: ytdReturn ? ytdReturn : "-",
        "3Y": threeYearReturn ? threeYearReturn : "-",
        "5Y": fiveYearReturn ? fiveYearReturn : "-",
        "10Y": tenYearReturn ? tenYearReturn : "-",
        MAX: maxReturn ? maxReturn : "-",
        ending:
          tickerPriceArr.length > 0
            ? tickerPriceArr[tickerPriceArr.length - 1] + ""
            : "-"
      };
    }
  }

  const redOrGreen = (stringReturn: string) => {
    if (stringReturn.length > 1) {
      // is not empty or '-'
      if (stringReturn[0] === "-") {
        return colors.red;
      } else return colors.green;
    }
  };

  let tabelDataRows = [];
  let fundCount = 1;
  for (let [tickerName, tickerInfo] of Object.entries(tickersInfo)) {
    let tickerReturn = returns[tickerName];
    let infoRow = (
      <tr key={tickerName}>
        <td>{fundCount++}</td>
        <td>{`${tickerInfo.longName} (${tickerName})`}</td>
        <td>{10000}</td>
        <td>{tickerReturn.ending}</td>
        <td style={{ color: redOrGreen(tickerReturn.YTD) }}>
          {tickerReturn.YTD}
        </td>
        <td style={{ color: redOrGreen(tickerReturn["6M"]) }}>
          {tickerReturn["6M"]}
        </td>
        <td style={{ color: redOrGreen(tickerReturn["1Y"]) }}>
          {tickerReturn["1Y"]}
        </td>
        <td style={{ color: redOrGreen(tickerReturn["3Y"]) }}>
          {tickerReturn["3Y"]}
        </td>
        <td style={{ color: redOrGreen(tickerReturn["5Y"]) }}>
          {tickerReturn["5Y"]}
        </td>
        <td style={{ color: redOrGreen(tickerReturn["10Y"]) }}>
          {tickerReturn["10Y"]}
        </td>
        <td style={{ color: redOrGreen(tickerReturn.MAX) }}>
          {tickerReturn.MAX}
        </td>
        <td>
          {tickerInfo.annualReportExpenseRatio
            ? formatPercent(tickerInfo.annualReportExpenseRatio)
            : "N/A"}
        </td>
        <td>
          {tickerInfo.morningStarOverallRating
            ? `${tickerInfo.morningStarOverallRating}/5`
            : "N/A"}
        </td>
      </tr>
    );
    tabelDataRows.push(infoRow);
  }
  let seriesOpts = [] as Highcharts.SeriesOptionsType[];
  //create combined [timestamps, price] arr

  seriesOpts = Object.keys(tickersPriceHistory).map((tickerName, ind) => {
    const priceArr = tickersPriceHistory[tickerName];
    // zip timestamps and price together
    let combinedPriceHistory = priceArr.map((price, ind) => {
      return [timestamps[ind], price];
    });

    //create series options to pass to stock chart
    return {
      type: "line",
      id: tickerName,
      name: tickerName,
      color: colors[colorNames[ind]],
      data: combinedPriceHistory, // [[time, price], ...]
      tooltip: {
        valueDecimals: 2
      },
      showInNavigator: false
    };
  });

  // TODO: add error display if any ticker is invalid
  return (
    <div className="container-fluid compare-funds">
      <div className="row">
        <SearchBar
          value={tickerListString}
          onChange={handleChange}
          handleSearch={handleTickerListSearch}
          label={"List of symbols:"}
          searchBarId="tickerListSearchBar"
          placeholder="Enter comma-separated funds symbols"
        />
      </div>
      <div className="row fund-overview-table">
        {startDateStr && endDateStr ? (
          <h2>{`Fund comparision result (${startDateStr}-${endDateStr})`}</h2>
        ) : null}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Name</th>
              <th scope="col">Starting balance</th>
              <th scope="col">Ending balance</th>
              <th scope="col">YTD</th>
              <th scope="col">6M</th>
              <th scope="col">1Y</th>
              <th scope="col">3Y</th>
              <th scope="col">5Y</th>
              <th scope="col">10Y</th>
              <th scope="col">Max</th>
              <th scope="col">Expense Ratio</th>
              <th scope="col">Morningstar</th>
            </tr>
          </thead>
          <tbody>{tabelDataRows}</tbody>
        </table>
      </div>
      <div className="row comparing-chart">
        <CompareStockChart seriesOpts={seriesOpts} tickersPriceHistory={tickersPriceHistory}/>
      </div>
    </div>
  );
}
