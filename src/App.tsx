import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TickerInfo from "./components/TickerInfo/TickerInfo";
import ErrorDisplay from "./components/ErrorDisplay";
import StockChart from "./components/StockChart";
import LoadSpinner from "./components/LoadSpinner";
import Footer from "./components/Footer";
import { selectTickerInfo } from "./redux/slices/tickerSlice";

import "./App.scss";

function App() {
  return (
    <>
      <div className="App container">
        <Header />
        <ErrorDisplay />
        <LoadSpinner />
        <main>
          <Routes>
            <Route path="/" element={<TickerInfo />} />
            <Route path="chart" element={<StockChart />} />
          </Routes>
          <hr />
        </main>
        <div className="push"></div>
      </div>
      <Footer />
    </>
  );
}

export default App;
