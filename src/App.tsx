import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import TickerInfo from "./components/TickerInfo";
import Header from "./components/Header";
import ErrorDisplay from "./components/ErrorDisplay";
import StockChart from './components/StockChart';

import "./App.scss";

function App() {
  const tickerInfo = useSelector((state: RootState) => state.ticker.info);

  const dispatch = useDispatch();

  return (
    <div className="App container">
      <Header />
      <ErrorDisplay />

      <main>
        {tickerInfo ? <TickerInfo {...tickerInfo} /> : null}
        {tickerInfo ? <StockChart /> : null}
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
