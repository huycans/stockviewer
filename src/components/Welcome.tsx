import React from "react";
import { useNavigate } from "react-router-dom";
import GlowButton from "./GlowButton";

export default function Welcome() {
  // const tickerInfo = useSelector(selectTickerInfo);
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <h1>Welcome to Stockviewer.</h1>
      <h2>What do you want to do?</h2>
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <GlowButton
            onClick={() => navigate("/research")}
            text="Research a security"
          />
          <h5 className="stock-typewrite">AAPL, AMZN, MSFT, etc</h5>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <GlowButton
            onClick={() => navigate("/compare")}
            text="Compare funds"
          />
          <h5 className="funds-typewrite">SPY vs QQQ</h5>
        </div>
      </div>
    </div>
  );
}
