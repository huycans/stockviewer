import React from "react";
import EquityProfile from "./EquityProfile";
import FundProfile from "./FundProfile";
import ETFProfile from "./ETFProfile";
import { useSelector } from "react-redux";
import { selectTickerInfo } from "../../redux/slices/tickerSlice";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const tickerInfo = useSelector(selectTickerInfo);

  if (tickerInfo !== null) {
    const { quoteType } = tickerInfo;

    if (quoteType === "EQUITY") return <EquityProfile />;
    else if (quoteType === "MUTUALFUND") return <FundProfile />;
    else if (quoteType === "ETF") return <ETFProfile />;
  } 
  return <Navigate to="/" replace={true} />;
}
