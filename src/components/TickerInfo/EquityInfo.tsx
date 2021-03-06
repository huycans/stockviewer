import React from "react";
import { useSelector } from "react-redux";
import {
  selectTickerInfo,
  TickerInfoType
} from "../../redux/slices/tickerSlice";
import InfoTable from "../InfoTable";
import { formatDate, formatMoney, formatNumber } from "../utils";

export default function EquityInfo() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
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
    <div>
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

      <div className="row justify-content-around">
        <div className="col">
          <InfoTable tableData={table1Data} />
        </div>
        <div className="col">
          <InfoTable tableData={table2Data} />
        </div>
      </div>
    </div>
  );
}
