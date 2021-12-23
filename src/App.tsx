import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from "react-redux";
import { getTickerInfo } from "./redux/slices/tickerSlice";
import { RootState } from "./redux/store";
import TickerInfo from "./components/TickerInfo";
import Header from "./components/Header";
import "./App.scss";

function App() {
  const options: Highcharts.Options = {
    title: {
      text: "My stock chart"
    },
    series: [
      {
        type: "line",
        data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
      }
    ]
  };
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const tickerInfo = useSelector((state: RootState) => state.ticker.info);

  const dispatch = useDispatch();

  return (
    <div className="App container">
      <Header />
      <main>
        <div>{tickerInfo ? <TickerInfo {...tickerInfo} /> : null}</div>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
            ref={chartComponentRef}
          />
        </div>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
