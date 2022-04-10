import React from "react";
import { useSelector } from "react-redux";
import { selectTickerInfo, TickerInfoType } from "../../redux/slices/tickerSlice";
import { formatNumber, formatPercent } from "../utils";
import InfoTable from "../InfoTable";
import FundCompositionPieChart from "./FundCompositionPieChart";
import BondRatingsPieChart from "./BondRatingsPieChart";
import SectorWeightingBarChart from "./SectorWeightingBarChart";
import { useNavigate, Navigate } from "react-router-dom";

export default function Holdings() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  let navigate = useNavigate();

  if (tickerInfo === null) {    
    return <Navigate to="/" replace={true} />
  }

  const {
    bondHoldings,
    equityHoldings,
    holdings,
  } = tickerInfo;

  const {
    creditQuality,
    duration,
    maturity,
  } = bondHoldings;

  const {
    priceToBook,
    priceToCashflow,
    priceToEarnings,
    priceToSales,
    threeYearEarningsGrowth,
  } = equityHoldings;

  const bondholdingTable = [
    {
      name: "Credit Quality",
      value: creditQuality
    },
    {
      name: "Duration",
      value: formatNumber(duration)
    },
    {
      name: "Maturity",
      value: formatNumber(maturity)
    }
  ];

  const stockHoldingTable = [
    {
      name: "Price/Book",
      value: formatNumber(priceToBook)
    },
    {
      name: "Price/Cashflow",
      value: formatNumber(priceToCashflow)
    },
    {
      name: "Price/Earnings",
      value: formatNumber(priceToEarnings)
    },
    {
      name: "Price/Sales",
      value: formatNumber(priceToSales)
    },
    {
      name: "3 Year Earnings Growth",
      value: formatNumber(threeYearEarningsGrowth)
    }
  ];

  let topHoldingPercentage = 0;

  const holdingsTable = holdings.map((holding) => {
    topHoldingPercentage += holding.holdingPercent;
    return {
      name:
        holding.holdingName +
        (holding.symbol ? " (" + holding.symbol + ")" : ""),
      value: formatPercent(holding.holdingPercent)
    };
  });

  return (
    <div className="container">
      <div className="row holding-section">
        <div className="col-md-6" id="fundCompositionPieChart">
          <h3 className="fw-bold">Fund composition</h3>
          <FundCompositionPieChart />
        </div>
        <div className="col-md-6" id="bondRatingPieChart">
          <h3 className="fw-bold">Bond ratings</h3>
          <BondRatingsPieChart/>
        </div>
      </div>
      <div className="row holding-section">
        <div className="col-md-6">
          <h3 className="fw-bold">
            Top {holdingsTable.length} holdings (
            {formatPercent(topHoldingPercentage)} of Total Assets)
          </h3>
          <InfoTable tableData={holdingsTable} />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">Equity holdings</h3>
          <InfoTable tableData={stockHoldingTable} />
          <br />
          <h3 className="fw-bold">Bond holdings</h3>
          <InfoTable tableData={bondholdingTable} />
        </div>
      </div>
      <div className="row holding-section">
        <div className="col-md-12" id="sectorWeightingsBarChart">
          <h3 className="fw-bold">
            Sector weightings
          </h3>
          <SectorWeightingBarChart />
        </div>
      </div>
    </div>
  );
}
