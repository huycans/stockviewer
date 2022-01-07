import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTickerInfo } from "../../redux/slices/tickerSlice";
import { formatDate, formatMoney, formatNumber, formatPercent } from "../utils";

export type ETFInfoType = {
  symbol: string;
  longName: string;
  sector: string;
  country: string;
  currency: string;
  currentPrice: string;
  previousClose: number;
  quoteType: string;
  open: number;
  bid: number;
  bidSize: number;
  ask: number;
  askSize: number;
  dayLow: number;
  dayHigh: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  volume: number;
  averageVolume: number;
  marketCap: number;
  trailingPE: number;
  trailingEps: string;
  exDividendDate: number;
  lastDividendDate: number;
  earningsGrowth: number;
  lastFiscalYearEnd: number;
  ytdReturn: number;
  annualReportExpenseRatio: number;
  category: string;
  lastCapGain: number;
  morningStarOverallRating: number;
  morningStarRiskRating: number;
  totalAssets: number;
  beta: number;
  yield: number;
  fiveYearAverageReturn: number;
  annualHoldingsTurnover: number;
  lastDividendValue: number;
  fundInceptionDate: number;
  navPrice: number;
};

export default function ETFInfo() {
  const tickerInfo = useSelector(selectTickerInfo) as ETFInfoType;
  const {
    symbol,
    longName,
    sector,
    country,
    currency,
    currentPrice,
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
      value: formatPercent(trailingPE) 
    },
    {
      name: "Yield",
      value: formatPercent(etfYield )
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
            Currency: {currency}. Home country: {country}. Sector: {sector}
          </span>
        </div>
        <div className="row">
          <h1>Current price: {currentPrice}</h1>
        </div>
      </div>

      <div className="row justify-content-around detailedInfo">
        <div className="col" id="table_1">
          <table>
            <tbody>
              {table1Data.map((data) => (
                <tr>
                  <td className="fieldName">{data.name}</td>
                  <td className="fieldValue">{data.value === null ? "N/A" : data.value}</td>
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
                  <td className="fieldValue">{data.value === null ? "N/A" : data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
