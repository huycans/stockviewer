import React from "react";
import EquityInfo from "./EquityInfo";
import FundInfo from './FundInfo';
import ETFInfo from './ETFInfo';
import { useSelector } from "react-redux";
import { selectTickerInfo } from "../../redux/slices/tickerSlice";



export default function TickerInfo() {
  const tickerInfo = useSelector(selectTickerInfo);

  if (tickerInfo !== null){
    const {
      quoteType
    } = tickerInfo;
  
    if (quoteType === "EQUITY") return <EquityInfo />
    else if (quoteType === "MUTUALFUND") return <FundInfo />
    else if (quoteType === "ETF") return <ETFInfo />
  }

  return null;
}
