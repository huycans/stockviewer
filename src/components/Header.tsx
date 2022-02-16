import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classnames from "classnames";

import { getTickerInfo, selectTickerInfo } from "../redux/slices/tickerSlice";
import stockviewerLogo from "../assets/img/stockviewer.png";

export default function Header() {
  return (
    <header className="row">
      <div className="col-6 header-title">
        <Link to={"/"}>
          <img
            id="stockviewerLogo"
            src={stockviewerLogo}
            alt="Stockviewer logo"
          />
        </Link>
      </div>
      <div className="col-3">
        <Link to={"/research"}>
          <h5>Research a security</h5>
        </Link>
      </div>
      <div className="col-3">
        <Link to={"/compare"}>
          <h5>Compare funds</h5>
        </Link>
      </div>
    </header>
  );
}
