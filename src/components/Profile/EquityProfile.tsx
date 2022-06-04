import React from "react";
import { useSelector } from "react-redux";
import {
  selectTickerInfo,
  TickerInfoType
} from "../../redux/slices/tickerSlice";
import { formatNumber } from "../utils";

export default function EquityProfile() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const {
    longName,
    address1,
    city,
    state,
    zip,
    phone,
    website,
    sector,
    industry,
    fullTimeEmployees,
    country
  } = tickerInfo;

  return (
    <div className="equityProfile profile">
      <h3>
        <b>{longName}</b>
      </h3>
      <div className="row">
        <div className="col-md-6 col-12">
          {address1} <br />
          {city} {state} {zip}
          <br />
          {country}
          <br />
          {phone}
          <br />
          {website}
          <br />
        </div>

        <div className="col-md-6 col-12">
          Sector: <span className="fw-bold">{sector}</span> <br />
          Industry: <span className="fw-bold">{industry}</span> <br />
          Fulltime employees: <span className="fw-bold">{formatNumber(fullTimeEmployees)}</span> <br />
        </div>
      </div>
    </div>
  );
}
