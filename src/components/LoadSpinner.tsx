import React from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";

export default function LoadSpinner() {
  const isLoading = useSelector((state: RootState) => state.ticker.isLoading);

  if (isLoading)
    return (
      <div className="loadSpinner">
        <div className="spinner-border text-primary" role="status"></div>
        <h4>The stock market waits for no one.</h4>
        <h4>...But surely you can wait while we fetch your data.</h4>
      </div>
    );
  else return null;
}
