import React from "react";
import EquityInfo from "./EquityInfo";
import FundInfo from './FundInfo';
import ETFInfo from './ETFInfo';

export type TickerInfoProps = {
  quoteType: string
};

export default function TickerInfo(props: TickerInfoProps) {
  const {
    quoteType
  } = props;

  if (quoteType === "EQUITY") return <EquityInfo />
  else if (quoteType === "MUTUALFUND") return <FundInfo />
  else if (quoteType === "ETF") return <ETFInfo />
  return null;
}