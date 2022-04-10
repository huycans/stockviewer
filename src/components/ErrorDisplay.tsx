import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import {selectTickerError} from '../redux/slices/tickerSlice';
import {} from '../redux/slices/compareSlice';

export default function ErrorDisplay() {
  const location = useLocation();
  //TODO: read location, then display error based on location
  const tickerError = useSelector(selectTickerError);
  if (tickerError !== "") return <h3 className="errorContainer">{tickerError}</h3>
  else return null;
}
