import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTickerInfo,
  TickerInfoType
} from "../../redux/slices/tickerSlice";
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
          {longBusinessSummary}
        </div>

        <div className="col-md-6 col-12">
          <div className="col" id="table_1">
            <h3 className="fw-bold">Fund Overview</h3>
            <table>
              <tbody>
                {table1Data.map((data) => (
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
          <br />
          <div className="col" id="table_1">
            <h3 className="fw-bold">Fund Operations</h3>
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
    </div>
  );
}
