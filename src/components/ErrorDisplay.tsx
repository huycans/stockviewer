import React from "react";

type ErrorDisplayType = {
  errorMessage: string;
};
export default function ErrorDisplay({ errorMessage }: ErrorDisplayType) {
  if (errorMessage !== "")
    return <h3 className="errorContainer">{errorMessage}</h3>;
  else return null;
}
