import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTickerInfo,
  selectTickerInfo
} from "../../redux/slices/tickerSlice";
import { getListOfTickers } from "../../redux/slices/compareSlice";
import SearchBar from "../SearchBar";

export default function CompareFunds() {
  const [tickerListString, setTickerListString] = useState("ftihx, fskax, bnd");
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    setTickerListString(target.value);
  };

  const handleTickerListSearch = () => {
    const tickerList = tickerListString
      .toUpperCase()
      .replaceAll(/ /g, "")
      .split(",");
      dispatch(getListOfTickers(tickerList));
  };

  return (
    <div className="container compare-funds">
      <div className="row">
        <SearchBar
          value={tickerListString}
          onChange={handleChange}
          handleSearch={handleTickerListSearch}
          label={"List of symbols:"}
          searchBarId="tickerListSearchBar"
          placeholder="Enter a list of mututal funds and/or ETF symbols"
        />
      </div>
      <div className="row fund-overview-table">fund-overview-table</div>
      <div className="row comparing-chart">comparing chart</div>
    </div>
  );
}
