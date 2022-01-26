import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TickerInfo from "./components/TickerInfo/TickerInfo";
import ErrorDisplay from "./components/ErrorDisplay";
import StockChart from "./components/StockChart";
import LoadSpinner from "./components/LoadSpinner";
import Footer from "./components/Footer";

import "./App.scss";
import NotFound from "./components/NotFound";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile/Profile";
import Holdings from "./components/Holdings/Holdings";

function App() {
  return (
    <>
      <div className="App container">
        <Header />
        <ErrorDisplay />
        <LoadSpinner />
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/summary" element={<TickerInfo />} />
            <Route path="/chart" element={<StockChart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="*" element={<NotFound />} />
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
