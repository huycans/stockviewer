import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";

import { getTickerInfo, selectTickerInfo } from "../redux/slices/tickerSlice";
import stockviewerLogo from "../assets/img/stockviewer.png";

export default function Header() {
  const [tickerName, setTickerName] = useState("aapl");
  const tickerInfo = useSelector(selectTickerInfo);

  const dispatch = useDispatch();

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
    { to: "/", name: "Summary" },
    {
      to: "/chart",
      name: "Chart"
    }
  ];

  const location = useLocation();

  return (
    <header className="row">
      <div className="row">
        <div className="col-3 header-title">
          <img
            id="stockviewerLogo"
            src={stockviewerLogo}
            alt="Stockviewer logo"
          />
        </div>
        <div className="col-6 header-searchBar">
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
        <div className="col-3 header-blank"></div>
      </div>
      <div className="row">
        {tickerInfo ? (
          <ul className="nav nav-tabs justify-content-center">
            {navItems.map((navItem) => {
              return (
                <li className="nav-item" key={navItem.name}>
                  <Link
                    className={classnames("nav-link", {
                      active: location.pathname === navItem.to
                    })}
                    to={navItem.to}
                  >
                    {navItem.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </header>
  );
}
