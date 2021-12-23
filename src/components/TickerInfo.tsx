import React from "react";
import { DateTime } from "luxon";

export type TickerInfoProps = {
  symbol: string;
  longName: string;
  sector: string;
  country: string;
  currency: string;
  currentPrice: string;
  previousClose: number;
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
  beta: string;
  trailingPE: string;
  trailingEps: string;
  exDividendDate: number;
  lastDividendDate: number;
  earningsGrowth: number;
  lastFiscalYearEnd: number;
};

export default function TickerInfo(props: TickerInfoProps) {
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
  } = props;

  const formatDate = (epochNumber: number) => {
    return DateTime.fromSeconds(epochNumber).toFormat('LLL dd, yyyy');
  }

  const formatNumber = (number: number)=>{
    return new Intl.NumberFormat('en-US', {
      
    }).format(number)
  }

  var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  function formatMoney(number: number){

      // what tier? (determines SI symbol)
      var tier = Math.log10(Math.abs(number)) / 3 | 0;

      // if zero, we don't need a suffix
      if(tier === 0) return number;

      // get suffix and determine scale
      var suffix = SI_SYMBOL[tier];
      var scale = Math.pow(10, tier * 3);

      // scale the number
      var scaled = number / scale;

      // format number and add suffix
      return scaled.toFixed(3) + suffix;
  }

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
      value: earningsGrowth
    },
    
    {
      name: "Beta (5Y Monthly)",
      value: beta
    },
    {
      name: "PE Ratio (TTM)",
      value: trailingPE
    },

    {
      name: "EPS (TTM)",
      value: trailingEps
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
          <span className="small-subtitle">Currency: {currency}. Home country: {country}. Sector: {sector}</span>
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
                  <td className="fieldValue">{data.value}</td>
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
                  <td className="fieldValue">{data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
