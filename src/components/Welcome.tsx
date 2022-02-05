import React from "react";
import { selectTickerInfo } from "../redux/slices/tickerSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Welcome() {
  const tickerInfo = useSelector(selectTickerInfo);
  if (tickerInfo === null) {
    return (
      <div>
        <h1>Welcome to Stockviewer.</h1>
        <p>
          Enter a ticker symbol (e.g AAPL for Apple) of a single stock, mutual fund or ETF on the search
          bar to see information about that ticker
        </p>
      </div>
    );
  }
  return <Navigate to={"/summary"} />;
}
