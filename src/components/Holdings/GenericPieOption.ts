import Highcharts from "highcharts";

let genericOptions: Highcharts.Options = {
  chart: {
    plotShadow: false,
    type: "pie"
  },
  credits: {
    enabled: false
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  accessibility: {
    point: {
      valueSuffix: "%"
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %"
      }
    }
  }
};

export default genericOptions;