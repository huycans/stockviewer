import { DateTime } from "luxon";

const formatDate = (epochNumber: number | null) => {
  if (typeof epochNumber === "number")
    return DateTime.fromSeconds(epochNumber).toFormat("LLL dd, yyyy");
  else return null;
};

const formatNumber = (number: number | null) => {
  if (typeof number === "number")
    return new Intl.NumberFormat("en-US", {}).format(number);
  else return null;
};

var MONEY_ABBR_SYMBOLS = ["", "K", "M", "B", "T"];

function formatMoney(number: number | null) {
  if (typeof number === "number") {
    // what tier? (determines SI symbol)
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier === 0) return number;

    // get suffix and determine scale
    var suffix = MONEY_ABBR_SYMBOLS[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(3) + suffix;
  } else return null;
}

const formatPercent = (number: number | null) => {
  if (typeof number === "number") return formatNumber(number * 100) + "%";
  else return null;
};

export { formatDate, formatNumber, formatMoney, formatPercent };
