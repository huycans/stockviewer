import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { selectTickerInfo, TickerInfoType } from "../redux/slices/tickerSlice";
import { formatNumber, formatPercent } from "./utils";
import InfoTable from "./InfoTable";

export default function Holdings() {
  const tickerInfo = useSelector(selectTickerInfo) as TickerInfoType;
  const colors = {
    blue: "#0d6efd",
    indigo: "#6610f2",
    purple: "#6f42c1",
    pink: "#d63384",
    red: "#dc3545",
    orange: "#fd7e14",
    yellow: "#ffc107",
    green: "#198754",
    teal: "#20c997",
    cyan: "#0dcaf0",
    black: "#000"
  };

  let {
    bondPosition,
    cashPosition,
    stockPosition,
    preferredPosition,
    convertiblePosition,
    otherPosition,
    bondHoldings,
    equityHoldings,
    holdings,
    bondRatings,
    sectorWeightings
  } = tickerInfo;

  const {
    creditQuality,
    creditQualityCat,
    duration,
    durationCat,
    maturity,
    maturityCat
  } = bondHoldings;

  const {
    priceToBook,
    priceToBookCat,
    priceToCashflow,
    priceToCashflowCat,
    priceToEarnings,
    priceToEarningsCat,
    priceToSales,
    priceToSalesCat,
    threeYearEarningsGrowth,
    threeYearEarningsGrowthCat
  } = equityHoldings;

  const fundCompositionPieData = [
    {
      name: "Stock",
      y: stockPosition * 100,
      color: colors.blue,
      selected: false
    },
    {
      name: "Bond",
      y: bondPosition * 100,
      color: colors.red,
      selected: false
    },
    {
      name: "Cash",
      y: cashPosition * 100,
      color: colors.green,
      selected: false
    },
    {
      name: "Preferred",
      y: preferredPosition * 100,
      color: colors.teal,
      selected: false
    },
    {
      name: "Convertible",
      y: convertiblePosition * 100,
      color: colors.orange,
      selected: false
    },
    {
      name: "Other",
      y: otherPosition * 100,
      color: colors.black,
      selected: false
    }
  ];

  const bondRatingPieData = bondRatings.map((rating, index) => {
    return {
      name: Object.keys(rating)[0].toUpperCase(),
      y: Object.values(rating)[0],
      colors: Object.values(colors)[index],
      selected: false
    };
  });

  let sectorWeightingsBarData = {
    categories: [] as string[],
    data: [] as number[]
  };

  sectorWeightings.forEach((sector, index) => {
    sectorWeightingsBarData.categories.push(
      Object.keys(sector)[0].toUpperCase()
    );
    sectorWeightingsBarData.data.push(Math.round((Object.values(sector)[0])*100*100)/100);
  });

  console.log(sectorWeightingsBarData);

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

  let fundCompositionPieOptions: Highcharts.Options = {
    ...genericOptions,
    series: [
      {
        name: "Percent",
        type: "pie",
        data: fundCompositionPieData
      }
    ],
    title: {
      text: ""
    },
    navigation: {
      bindingsClassName: "fundCompositionPieChart" // informs Highcharts where to look for HTML elements for adding technical indicators, annotations etc.
    }
  };

  const fundCompositionPieChartRef = useRef<HighchartsReact.RefObject>(null);
  const fundCompositionPieChart = (
    <HighchartsReact
      highcharts={Highcharts}
      options={fundCompositionPieOptions}
      ref={fundCompositionPieChartRef}
    />
  );

  let bondRatingPieOptions: Highcharts.Options = {
    ...genericOptions,
    series: [
      {
        name: "Percent",
        type: "pie",
        data: bondRatingPieData
      }
    ],
    title: {
      text: ""
    },
    navigation: {
      bindingsClassName: "bondRatingPieChart" // informs Highcharts where to look for HTML elements for adding technical indicators, annotations etc.
    }
  };

  const bondRatingPieChartRef = useRef<HighchartsReact.RefObject>(null);
  const bondRatingPieChart = (
    <HighchartsReact
      highcharts={Highcharts}
      options={bondRatingPieOptions}
      ref={bondRatingPieChartRef}
    />
  );

  const sectorWeightingsOptions: Highcharts.Options = {
    chart: {
      type: "bar"
    },
    title: {
      text: ""
    },
    subtitle: {
      text: ''
    },
    navigation: {
      bindingsClassName: "sectorWeightingsBarChart"
    },
    xAxis: {
      categories: sectorWeightingsBarData.categories,
      title: {
        text: ""
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Percentage",
        align: "middle"
      },
      labels: {
        overflow: "justify"
      }
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      // pointFormat: "<b>{series.name} {point.y:.1f}%</b>"
      pointFormat: '{point.y}%',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false
        }
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        dataSorting: {
          enabled: true
        },
        showInLegend: false,
        type:"bar",
        data: sectorWeightingsBarData.data,
        name: "Weight"
      }
    ]
  };
  
  const sectorWeightingsBarChartRef = useRef<HighchartsReact.RefObject>(null);
  const sectorWeightingsBarChart = (
    <HighchartsReact
      highcharts={Highcharts}
      options={sectorWeightingsOptions}
      ref={sectorWeightingsBarChartRef}
    />
  );

  const bondholdingTable = [
    {
      name: "Credit Quality",
      value: creditQuality
    },
    {
      name: "Duration",
      value: formatNumber(duration)
    },
    {
      name: "Maturity",
      value: formatNumber(maturity)
    }
  ];

  const stockHoldingTable = [
    {
      name: "Price/Book",
      value: formatNumber(priceToBook)
    },
    {
      name: "Price/Cashflow",
      value: formatNumber(priceToCashflow)
    },
    {
      name: "Price/Earnings",
      value: formatNumber(priceToEarnings)
    },
    {
      name: "Price/Sales",
      value: formatNumber(priceToSales)
    },
    {
      name: "3 Year Earnings Growth",
      value: formatNumber(threeYearEarningsGrowth)
    }
  ];

  let topHoldingPercentage = 0;

  const holdingsTable = holdings.map((holding) => {
    topHoldingPercentage += holding.holdingPercent;
    return {
      name:
        holding.holdingName +
        (holding.symbol ? " (" + holding.symbol + ")" : ""),
      value: formatPercent(holding.holdingPercent)
    };
  });

  return (
    <div className="container">
      <div className="row holding-section">
        <div className="col-md-6" id="fundCompositionPieChart">
          <h3 className="fw-bold">Fund composition</h3>
          {fundCompositionPieChart}
        </div>
        <div className="col-md-6" id="bondRatingPieChart">
          <h3 className="fw-bold">Bond ratings</h3>
          {bondRatingPieChart}
        </div>
      </div>
      <div className="row holding-section">
        <div className="col-md-6">
          <h3 className="fw-bold">
            Top {holdingsTable.length} holdings (
            {formatPercent(topHoldingPercentage)} of Total Assets)
          </h3>
          <InfoTable tableData={holdingsTable} />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">Equity holdings</h3>
          <InfoTable tableData={stockHoldingTable} />
          <br />
          <h3 className="fw-bold">Bond holdings</h3>
          <InfoTable tableData={bondholdingTable} />
        </div>
      </div>
      <div className="row holding-section">
        <div className="col-md-12" id="sectorWeightingsBarChart">
          <h3 className="fw-bold">
            Sector weightings
          </h3>
          {sectorWeightingsBarChart}
        </div>
      </div>
      
    </div>
  );
}
