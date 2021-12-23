import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "../redux/store";
import { getTickerInfo } from "../redux/slices/tickerSlice";
import stockviewerLogo from '../assets/img/stockviewer.png'

export default function Header() {
  const [tickerName, setTickerName] = useState("aapl");
  const tickerInfo = useSelector((state: RootState) => state.ticker.info);

  const dispatch = useDispatch();

  const handleTickerSearch = () => {
    dispatch(getTickerInfo(tickerName));
  };

  const handleChange = (event: React.ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    setTickerName(target.value);
  };

  return (
    <header className="row">
      <div className="col-3 header-title">
        <img id="stockviewerLogo" src={stockviewerLogo} alt="Stockviewer logo"/>
      </div>
      <div className="col-6 header-searchBar">
        <input
          value={tickerName}
          id="searchBar"
          type="text"
          onChange={handleChange}
        />
        <button id="searchBtn" onClick={handleTickerSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="col-3 header-blank"></div>
    </header>
  );
}
