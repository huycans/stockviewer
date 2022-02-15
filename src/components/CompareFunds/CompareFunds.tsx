import React from "react";
import examplePhoto from "../../assets/img/compare_tool_example.png";
export default function CompareFunds() {
  return (
    <div>
      Compare funds component
      <p>
        <ul>
          <li>Compare funds tool will be different from ticker info.</li>
          <li>
            Should be in another redux slice, does not share state with
            tickerinfo.
          </li>
          <li>
            Include chart (with adjustable timeline) and basic info table.
          </li>
          <li>Need to redesign header in this case to provide link to compare fund tool</li>
        </ul>
      </p>
      <p>
        <h3>Look like this:</h3>
        <img width={"100%"} src={examplePhoto} alt="example" />
      </p>
    </div>
  );
}
