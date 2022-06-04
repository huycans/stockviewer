import React from "react";
import { useSelector } from "react-redux";
import {
  selectTickerInfo,
  TickerInfoType
} from "../../redux/slices/tickerSlice";
import InfoTable from "../InfoTable";
import { formatDate, formatMoney, formatNumber, formatPercent } from "../utils";

export default function FundProfile() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const {
    longName,
    address1,
    address2,
    address3,
    phone,
    longBusinessSummary,
    category,
    fundFamily,
    totalAssets,
    ytdReturn,
    morningStarOverallRating,
    fundInceptionDate,
    lastCapGain,
    lastDividendValue,
    annualHoldingsTurnover,
    annualReportExpenseRatio
  } = tickerInfo;

  const fundYield = tickerInfo.yield;

  const table1Data = [
    {
      name: "Category",
      value: category
    },
    {
      name: "Fund Family",
      value: fundFamily
    },

    {
      name: "Net Assets",
      value: formatMoney(totalAssets)
    },
    {
      name: "YTD Return",
      value: formatNumber(ytdReturn)
    },
    {
      name: "Yield",
      value: formatPercent(fundYield)
    },
    {
      name: "Morningstar Rating",
      value: morningStarOverallRating + "/5"
    },
    {
      name: "Inception Date",
      value: formatDate(fundInceptionDate)
    }
  ];

  const table2Data = [
    {
      name: "Last Dividend",
      value: formatNumber(lastDividendValue)
    },
    {
      name: "Last Cap Gain",
      value: formatNumber(lastCapGain)
    },
    {
      name: "Holdings Turnover",
      value: formatPercent(annualHoldingsTurnover)
    },
    {
      name: "Annual Report Expense Ratio",
      value: formatPercent(annualReportExpenseRatio)
    }
  ];

  return (
    <div className="equityProfile tickerInfo profile">
      <div className="row">
        <div className="col-md-6 col-12">
          <h3 className="fw-bold">{longName}</h3>
          {address1} <br />
          {address2} <br />
          {address3} <br />
          {phone}
          <br />
          <br />
          <h3 className="fw-bold">Fund description</h3>
          {longBusinessSummary}
        </div>

        <div className="col-md-6 col-12">
          <div className="col">
            <h3 className="fw-bold">Fund Overview</h3>
            <InfoTable tableData={table1Data} />
          </div>
          <br />
          <div className="col" id="table_1">
            <h3 className="fw-bold">Fund Operations</h3>
            <InfoTable tableData={table2Data} />
          </div>
        </div>
      </div>
    </div>
  );
}
