import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTickerInfo, TickerInfoType } from '../../redux/slices/tickerSlice';
import { formatDate, formatMoney, formatNumber, formatPercent } from "../utils";

export default function ETFInfo() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const {
    symbol,
    longName,
    country,
    currency,
    regularMarketPrice,
    previousClose,
    open,
    bid,
    bidSize,
    ask,
    askSize,
    dayLow,
    dayHigh,
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh,
    volume,
    averageVolume,
    beta,
    trailingPE,
    quoteType,
    ytdReturn,
    annualReportExpenseRatio,
    totalAssets,
    fundInceptionDate,
    navPrice
  } = tickerInfo;

  const etfYield = tickerInfo.yield;

  const table1Data = [
    {
      name: "Previous Close",
      value: formatNumber(previousClose)
    },
    {
      name: "Open",
      value: formatNumber(open)
    },
    {
      name: "Bid",
      value: formatNumber(bid) + "*" + bidSize
    },

    {
      name: "Ask",
      value: formatNumber(ask) + "*" + askSize
    },

    {
      name: "Day Range",
      value: dayLow + " - " + dayHigh
    },
    {
      name: "52 Week Range",
      value: fiftyTwoWeekLow + " - " + fiftyTwoWeekHigh
    },
    {
      name: "Volume",
      value: formatNumber(volume)
    },
    {
      name: "Avg. Volume",
      value: formatNumber(averageVolume)
    }
  ];

  const table2Data = [
    {
      name: "Net Assets",
      value: formatMoney(totalAssets)
    },
    {
      name: "NAV",
      value: formatNumber(navPrice)
    },

    {
      name: "PE Ratio (TTM)",
      value: formatNumber(trailingPE)
    },
    {
      name: "Yield",
      value: formatPercent(etfYield)
    },

    {
      name: "YTD Daily Total Return",
      value: formatPercent(ytdReturn)
    },

    {
      name: "Beta (5Y Monthly)",
      value: formatNumber(beta)
    },

    {
      name: "Expense Ratio (net)",
      value: formatPercent(annualReportExpenseRatio)
    },

    {
      name: "Inception Date",
      value: formatDate(fundInceptionDate)
    }
  ];

  return (
    <div className="tickerInfo">
      <div className="row basicInfo">
        <div className="row">
          <h2>
            {longName}&nbsp;({symbol})
          </h2>
          <span className="small-subtitle">
            Currency: {currency ? currency : "N/A"}. Home country:{" "}
            {country ? country : "N/A"}
          </span>
        </div>
        <div className="row">
          <h1>Current price: {regularMarketPrice}</h1>
        </div>
      </div>

      <div className="row justify-content-around detailedInfo">
        <div className="col" id="table_1">
          <table>
            <tbody>
              {table1Data.map((data) => (
                <tr key={data.name}>
                  <td className="fieldName">{data.name}</td>
                  <td className="fieldValue">
                    {data.value === null ? "N/A" : data.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col" id="table_2">
          <table>
            <tbody>
              {table2Data.map((data) => (
                <tr>
                  <td className="fieldName">{data.name}</td>
                  <td className="fieldValue">
                    {data.value === null ? "N/A" : data.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
