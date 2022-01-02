import React from "react";
import EquityInfo from "./EquityInfo";

export type TickerInfoProps = {
  quoteType: string
};

export default function TickerInfo(props: TickerInfoProps) {
  const {
    quoteType
  } = props;

  if (quoteType === "EQUITY") return <EquityInfo />
  return null;
}
