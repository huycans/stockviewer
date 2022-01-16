import React from "react";
import { useSelector } from "react-redux";
import {selectTickerError} from '../redux/slices/tickerSlice'

export default function ErrorDisplay() {
  const tickerError = useSelector(selectTickerError);
  if (tickerError !== "") return <h3 className="errorContainer">{tickerError}</h3>
  else return null;
}
