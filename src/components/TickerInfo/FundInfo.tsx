import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTickerInfo } from "../../redux/slices/tickerSlice";
import { formatDate, formatMoney, formatNumber } from "../utils";

export type FundInfoType = {
  symbol: string;
  longName: string;
  country: string;
  currency: string;
  currentPrice: string;
  previousClose: number;
  quoteType: string;
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
};

export default function FundInfo() {
  const tickerInfo = useSelector(selectTickerInfo) as FundInfoType;
  const {
    symbol,
    longName,
    currency,
    currentPrice,
    previousClose,
    quoteType,
    ytdReturn,
    annualReportExpenseRatio,
    category,
    lastCapGain,
    morningStarOverallRating,
    morningStarRiskRating,
    totalAssets,
    beta,
    fiveYearAverageReturn,
    annualHoldingsTurnover,
    lastDividendValue,
    fundInceptionDate
  } = tickerInfo;
  const fundYield = tickerInfo.yield;
  const table1Data = [
    {
      name: "Previous Close",
      value: formatNumber(previousClose)
    },
    {
      name: "YTD Return",
      value: formatNumber(ytdReturn)
    },
    {
      name: "Expense Ratio (net)	",
      value: formatNumber(annualReportExpenseRatio * 100) + "%"
    },

    {
      name: "Category",
      value: category
    },

    {
      name: "Last Cap Gain",
      value: formatNumber(lastCapGain)
    },
    {
      name: "Morningstar Rating",
      value: morningStarOverallRating + "/5"
    },
    {
      name: "Morningstar Risk Rating",
      value: morningStarRiskRating + "/5"
    }
  ];

  const table2Data = [
    {
      name: "Net Assets",
      value: formatMoney(totalAssets)
    },
    {
      name: "Beta (5Y Monthly)",
      value: beta
    },

    {
      name: "Yield",
      value: formatNumber(fundYield * 100) + "%"
    },
    {
      name: "5y Average Return",
      value: fiveYearAverageReturn? formatNumber(fiveYearAverageReturn * 100) + "%": null
    },

    {
      name: "Holdings Turnover",
      value: formatNumber(annualHoldingsTurnover * 100) + "%"
    },

    {
      name: "Last Dividend",
      value: formatNumber(lastDividendValue)
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
          <span className="small-subtitle">Currency: {currency}.</span>
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
      </div>
    </div>
  );
}
