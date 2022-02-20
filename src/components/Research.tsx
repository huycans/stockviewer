import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import classnames from "classnames";

import { getTickerInfo, selectTickerInfo } from "../redux/slices/tickerSlice";

export default function Research() {
  const [tickerName, setTickerName] = useState("VTHRX");
  const tickerInfo = useSelector(selectTickerInfo);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleTickerSearch = () => {
    dispatch(getTickerInfo(tickerName));
  };

  const handleChange = (event: React.ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    setTickerName(target.value);
  };

  const handleKeyPressed = (event: React.KeyboardEvent) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter" || event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      handleTickerSearch();
    }
  };

  const navItems = [
    {
      to: "summary",
      name: "Summary"
    },
    {
      to: "chart",
      name: "Chart"
    },
    {
      to: "profile",
      name: "Profile"
    }
  ];

  if (tickerInfo?.quoteType === "ETF" || tickerInfo?.quoteType === "MUTUALFUND")
    navItems.push({
      to: "holdings",
      name: "Holdings"
    });

  return (
    <div className="container">
      <div className="row">
        <div className="row searchBar">
          <div className="col-2 blank"></div>
          <div className="col-8">
            <label className="search-label" htmlFor="searchBar">
              Ticker symbol: 
            </label>
            <input
                value={tickerName}
                id="searchBar"
                type="text"
                onChange={handleChange}
                placeholder="Enter a stock ticker here"
                onKeyUp={handleKeyPressed}
              />
            <button id="searchBtn" onClick={handleTickerSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="col-2 blank"></div>
        </div>
        <div className="row research-tabs">
          {tickerInfo ? (
            <ul className="nav nav-tabs justify-content-center">
              {navItems.map((navItem) => {
                return (
                  <li className="nav-item" key={navItem.name}>
                    <NavLink
                      className={({ isActive }) =>
                        classnames("nav-link", {
                          active: isActive
                        })
                      }
                      to={navItem.to}
                    >
                      {navItem.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
