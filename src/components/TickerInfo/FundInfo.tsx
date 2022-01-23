import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTickerInfo, TickerInfoType } from '../../redux/slices/tickerSlice';
import InfoTable from "../InfoTable";
import { formatDate, formatMoney, formatNumber, formatPercent } from "../utils";

export default function FundInfo() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const {
    symbol,
    longName,
    currency,
    regularMarketPrice,
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
      name: "Expense Ratio (net)",
      value: formatPercent(annualReportExpenseRatio)
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
      value: formatPercent(fundYield)
    },
    {
      name: "5y Average Return",
      value: formatPercent(fiveYearAverageReturn)
    },

    {
      name: "Holdings Turnover",
      value: formatPercent(annualHoldingsTurnover)
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
    <div>
      <div className="row basicInfo">
        <div className="row">
          <h2>
            {longName}&nbsp;({symbol})
          </h2>
          <span className="small-subtitle">Currency: {currency}.</span>
        </div>
        <div className="row">
          <h1>Current price: {regularMarketPrice}</h1>
        </div>
      </div>

      <div className="row justify-content-around detailedInfo">
        <div className="col">
          <InfoTable tableData={table1Data}/>
        </div>
        <div className="col">
          <InfoTable tableData={table2Data}/>
        </div>
      </div>
    </div>
  );
}
