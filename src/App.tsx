import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TickerInfo from "./components/TickerInfo/TickerInfo";
import Header from "./components/Header";
import ErrorDisplay from "./components/ErrorDisplay";
import StockChart from "./components/StockChart";
import LoadSpinner from "./components/LoadSpinner";
import {selectTickerInfo} from './redux/slices/tickerSlice'

import "./App.scss";
import Footer from "./components/Footer";

function App() {
  const tickerInfo = useSelector(selectTickerInfo);

  const dispatch = useDispatch();

  return (
    <>
      <div className="App container">
        <Header />
        <ErrorDisplay />
        <main>
          <LoadSpinner />
          {tickerInfo ? <TickerInfo {...tickerInfo} /> : null}
          <hr />
          {tickerInfo ? <StockChart /> : null}
        </main>
        <div className="push"></div>
      </div>
      <Footer/>
    </>
  );
}

export default App;
