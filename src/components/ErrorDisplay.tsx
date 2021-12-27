import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
// TODO: create a proper error API instead of just a single string
export default function ErrorDisplay() {
  const tickerError = useSelector((state: RootState) => state.ticker.error);
  if (tickerError !== "") return <h3 className="errorContainer">{tickerError}</h3>
  else return null;
}
