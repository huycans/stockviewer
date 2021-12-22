import React from "react";

export type TickerInfoProps = {
  symbol: string;
  longName: string;
  sector: string;
  country: string;
  currency: string;
  currentPrice: string;
  previousClose: string;
  open: string;
  bid: string;
  bidSize: string;
  ask: string;
  askSize: string;
  dayLow: string;
  dayHigh: string;
  fiftyTwoWeekLow: string;
  fiftyTwoWeekHigh: string;
  volume: string;
  averageVolume: string;
  marketCap: string;
  beta: string;
  trailingPE: string;
  trailingEps: string;
  exDividendDate: string;
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
    exDividendDate
  } = props;

  const table1Data = [
    {
      name: "Previous Close",
      value: previousClose
    },
    {
      name: "Open",
      value: open
    },
    {
      name: "Bid",
      value: bid + "*" + bidSize
    },

    {
      name: "Ask",
      value: ask + "*" + askSize
    },

    {
      name: "Day Range",
      value: dayLow + "-" + dayHigh
    },
    {
      name: "52 Week Range",
      value: fiftyTwoWeekLow + "-" + fiftyTwoWeekHigh
    },
    {
      name: "Volume",
      value: volume
    },
    {
      name: "Avg. Volume",
      value: averageVolume
    }
  ];

  const table2Data = [
    {
      name: "Market Cap",
      value: marketCap
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
      value: exDividendDate
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
