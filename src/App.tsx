import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from "react-redux";
import { getTickerInfo } from "./redux/slices/tickerSlice";
import { RootState } from "./redux/store";
import TickerInfo from './components/TickerInfo'
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

  const [tickerName, setTickerName] = useState("aapl");
  const tickerInfo = useSelector((state: RootState) => state.ticker.info);

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    setTickerName(target.value);
  };

  const handleTickerSearch = () => {
    dispatch(getTickerInfo(tickerName));
  };

  return (
    <div className="App container">
      <header className="App-header">
        <div>Header</div>
        <div>
          <input
            value={tickerName}
            id="searchbar"
            type="text"
            onChange={handleChange}
          />
          <h4>Current ticker symbol is {tickerName}</h4>
          <button onClick={handleTickerSearch}>
            Click here to search for ticker
          </button>
        </div>
      </header>
      <main>
        <div>
          {tickerInfo ? <TickerInfo {...tickerInfo}/> : null}
          
        </div>
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
