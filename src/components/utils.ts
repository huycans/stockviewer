import { DateTime } from "luxon";

const formatDate = (epochNumber: number) => {
  return DateTime.fromSeconds(epochNumber).toFormat('LLL dd, yyyy');
}

const formatNumber = (number: number)=>{
  return new Intl.NumberFormat('en-US', {
    
  }).format(number)
}

var MONEY_ABBR_SYMBOLS = ["", "K", "M", "B", "T"];

function formatMoney(number: number){

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier === 0) return number;

    // get suffix and determine scale
    var suffix = MONEY_ABBR_SYMBOLS[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(3) + suffix;
}

export {formatDate, formatNumber, formatMoney}