import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import classnames from "classnames";

import { getTickerInfo, selectTickerInfo, selectTickerError } from '../redux/slices/tickerSlice';
import SearchBar from "./SearchBar";
import ErrorDisplay from "./ErrorDisplay";

export default function Research() {
  const [tickerName, setTickerName] = useState("");
  const tickerInfo = useSelector(selectTickerInfo);
  const tickerError = useSelector(selectTickerError);

  const dispatch = useDispatch();

  const handleTickerSearch = () => {
    dispatch(getTickerInfo(tickerName));
  };

  const handleChange = (event: React.ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    setTickerName(target.value);
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
        <div className="row">
          <SearchBar
            value={tickerName}
            onChange={handleChange}
            handleSearch={handleTickerSearch}
            label={"Ticker symbol:"}
            searchBarId="searchBar"
            placeholder="Enter a stock ticker here"
          />
        </div>
        <div className="row">
          <ErrorDisplay errorMessage={tickerError}/>
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
