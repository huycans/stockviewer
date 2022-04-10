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
import CompareFunds from "./components/CompareFunds/CompareFunds";
import Research from "./components/Research";
import StockInfoChart from "./components/StockInfoChart";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <ErrorDisplay />
        <LoadSpinner />
        <main className="mainContent container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/research" element={<Research />}>
              <Route path="summary" element={<TickerInfo />} />
              <Route path="chart" element={<StockInfoChart />} />
              <Route path="profile" element={<Profile />} />
              <Route path="holdings" element={<Holdings />} />
            </Route>
            <Route path="/compare" element={<CompareFunds />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <div className="push"></div>
      </div>
      <Footer />
    </>
  );
}

export default App;
