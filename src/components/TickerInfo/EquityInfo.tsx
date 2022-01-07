import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTickerInfo } from "../../redux/slices/tickerSlice";
import { formatDate, formatMoney, formatNumber, formatPercent } from "../utils";

export type EquityInfoType = {
  symbol: string;
  longName: string;
  sector: string;
  country: string;
  currency: string;
  currentPrice: number;
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
  beta: number;
  trailingPE: number;
  trailingEps: number;
  exDividendDate: number;
  lastDividendDate: number;
  earningsGrowth: number;
  lastFiscalYearEnd: number;
};

export default function EquityInfo() {
  const tickerInfo = useSelector(selectTickerInfo) as EquityInfoType;
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
    marketCap,
    beta,
    trailingPE,
    trailingEps,
    exDividendDate,
    lastDividendDate,
    earningsGrowth,
    lastFiscalYearEnd
  } = tickerInfo;

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
      name: "Market Cap",
      value: formatMoney(marketCap)
    },
    {
      name: "Earning growth",
      value: formatNumber(earningsGrowth)
    },

    {
      name: "Beta (5Y Monthly)",
      value: formatNumber(beta)
    },
    {
      name: "PE Ratio (TTM)",
      value: formatNumber(trailingPE)
    },

    {
      name: "EPS (TTM)",
      value: formatNumber(trailingEps)
    },

    {
      name: "Ex-Dividend Date",
      value: formatDate(exDividendDate)
    },

    {
      name: "Last Dividend Date",
      value: formatDate(lastDividendDate)
    },

    {
      name: "Last Fiscal Year End",
      value: formatDate(lastFiscalYearEnd)
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
