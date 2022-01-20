import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTickerInfo,
  TickerInfoType
} from "../../redux/slices/tickerSlice";
import { formatDate, formatMoney, formatNumber, formatPercent } from "../utils";

export default function ETFProfile() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const {
    longName,
    phone,
    longBusinessSummary,
    category,
    fundFamily,
    totalAssets,
    ytdReturn,
    annualHoldingsTurnover,
    annualReportExpenseRatio,
    legalType,
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
      name: "Legal type",
      value: legalType
    }
  ];

  const table2Data = [
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

