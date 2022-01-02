import { DateTime } from "luxon";

const formatDate = (epochNumber: number) => {
  return DateTime.fromSeconds(epochNumber).toFormat('LLL dd, yyyy');
}

const formatNumber = (number: number)=>{
  return new Intl.NumberFormat('en-US', {
    
  }).format(number)
}

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

function formatMoney(number: number){

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier === 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(3) + suffix;
}

export {formatDate, formatNumber, formatMoney}