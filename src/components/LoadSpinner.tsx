import React from "react";
import { useSelector } from "react-redux";
import { selectTickerIsLoading } from "../redux/slices/tickerSlice";
import { selectCompareIsLoading } from "../redux/slices/compareSlice";
import logo from "../assets/img/stockviewer_transparent.png";

export default function LoadSpinner() {
  let isLoading = useSelector(selectTickerIsLoading); 
  isLoading = useSelector(selectCompareIsLoading) || isLoading;

  if (isLoading)
    return (
      <div className="loadSpinner">
        <div className="spin-container">
          <img className="spin-logo" alt="spinning logo" src={logo} />
          <div className="spin spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        {/* <h4>The stock market waits for no one.</h4>
        <h4>...But surely you can wait while we fetch your data.</h4> */}
      </div>
    );
  else return null;
}
