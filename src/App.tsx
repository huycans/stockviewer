import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from 'react-redux'
import {fetchTickerInfo} from './redux/slices/tickerSlice'
import { RootState } from './redux/store';
import "./App.css";

function App() {
  const options: Highcharts.Options = {
    title: {
      text: 'My stock chart'
    },
    series: [
      {
        type: 'line',
        data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
      }
    ]
  };
  const currentTicker = useSelector((state: RootState) => state.ticker.value)
  const dispatch = useDispatch();

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  
  const handleChange = (event: React.ChangeEvent) => {
    let target = event.target as HTMLInputElement
    dispatch(fetchTickerInfo(target.value))
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>Header</div>
        <div>
          <input id="searchbar" type="text" onChange={handleChange}/>
          <h4>Current ticker symbol is {currentTicker}</h4>
        </div>
      </header>
      <main>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
          ref={chartComponentRef}
        />
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
