import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTickerInfo } from "../../API/tickerAPI";
import { RootState } from "../store";
export interface TickerInfoType {
  symbol: string;
  longName: string;
  sector: string;
  country: string;
  currency: string;
  currentPrice: number;
  previousClose: number;
  quoteType: "EQUITY" | "MUTUALFUND" | "ETF";
  open: number;
  bid: number;
  bidSize: number;
  ask: number;
  askSize: number;
  dayLow: number;
  dayHigh: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  volume: number;
  averageVolume: number;
  marketCap: number;
  beta: number;
  trailingPE: number;
  trailingEps: number;
  exDividendDate: number;
  lastDividendDate: number;
  earningsGrowth: number;
  lastFiscalYearEnd: number;
  regularMarketPrice: number;
  ytdReturn: number;
  annualReportExpenseRatio: number;
  category: string;
  lastCapGain: number;
  morningStarOverallRating: number;
  morningStarRiskRating: number;
  totalAssets: number;
  yield: number;
  fiveYearAverageReturn: number;
  annualHoldingsTurnover: number;
  lastDividendValue: number;
  fundInceptionDate: number;
  navPrice: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  industry: string;
  fullTimeEmployees: number;
  longBusinessSummary: string;
  fundFamily: string;
  legalType: string;
  bondPosition: number;
  cashPosition: number;
  stockPosition: number;
  preferredPosition: number;
  convertiblePosition: number;
  otherPosition: number;
  bondHoldings: {
    creditQuality: string;
    creditQualityCat: string;
    duration: number;
    durationCat: number;
    maturity: number;
    maturityCat: number;
  };
  equityHoldings: {
    medianMarketCap: number;
    medianMarketCapCat: number;
    priceToBook: number;
    priceToBookCat: number;
    priceToCashflow: number;
    priceToCashflowCat: number;
    priceToEarnings: number;
    priceToEarningsCat: number;
    priceToSales: number;
    priceToSalesCat: number;
    threeYearEarningsGrowth: number;
    threeYearEarningsGrowthCat: number;
  };
  holdings: {
    holdingName: string;
    holdingPercent: number;
    symbol: string;
  }[];
  bondRatings: [
    {
      bb: number;
    },
    {
      aa: number;
    },
    {
      aaa: number;
    },
    {
      a: number;
    },
    {
      other: number;
    },
    {
      b: number;
    },
    {
      bbb: number;
    },
    {
      below_b: number;
    },
    {
      us_government: number;
    }
  ];
  sectorWeightings: [
    {
      realestate: number;
    },
    {
      consumer_cyclical: number;
    },
    {
      basic_materials: number;
    },
    {
      consumer_defensive: number;
    },
    {
      technology: number;
    },
    {
      communication_services: number;
    },
    {
      financial_services: number;
    },
    {
      utilities: number;
    },
    {
      industrials: number;
    },
    {
      energy: number;
    },
    {
      healthcare: number;
    }
  ];
}
export interface TickerState {
  name: string;
  info: TickerInfoType | null;
  error: string;
  priceHistory: number[][];
  isLoading: boolean;
}

const initialState: TickerState = {
  name: "",
  info: null,
  error: "",
  priceHistory: [],
  isLoading: true
};
export type ServerError = {
  code: string;
  name: string;
  description: string;
};
export type Response = {
  status: string;
  data: any;
  error: ServerError;
};

export const getTickerInfo = createAsyncThunk(
  "ticker/getInfo",
  async (tickerName: string, { rejectWithValue, dispatch }) => {
    try {
      const response: Response = await fetchTickerInfo(tickerName);
      if (response.status === "ok") {
        dispatch(clearTickerError());
        return response.data;
      } else if (response.error) throw response.error;
    } catch (error) {
      return rejectWithValue(error); //will asssign 'error' as 'action.payload' in the reducer
    }
  }
);

export const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    clearTickerError(state) {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickerInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTickerInfo.fulfilled, (state, action) => {
        let payload = action.payload;
        state.info = payload.info;
        if (state.info?.bondRatings) {
          state.info.bondRatings = state.info.bondRatings.sort(
            (rating1, rating2) => {
              const key1 = Object.keys(rating1)[0].toUpperCase();
              const key2 = Object.keys(rating2)[0].toUpperCase();
              if (key1 > key2) return -1;
              else if (key1 < key2) return 1;
              else return 0;
            }
          );
        }
        // if (state.info?.sectorWeightings) {
        //   state.info?.sectorWeightings.sort((sector1, sector2) => {
        //     return Object.values(sector1)[0] - Object.values(sector2)[0]
        //   })
        // }
        state.priceHistory = payload.price_history;
        state.isLoading = false;
      })
      .addCase(getTickerInfo.rejected, (state, action) => {
        let payload = action.payload as ServerError;
        state.error = payload.description;
        state.isLoading = false;
      });
  }
});

// Action creators are generated for each case reducer function
export const { clearTickerError } = tickerSlice.actions;

//selectors
export const selectTickerInfo = (state: RootState) => state.ticker.info;
export const selectTickerError = (state: RootState) => state.ticker.error;
export const selectTickerIsLoading = (state: RootState) =>
  state.ticker.isLoading;
export const selectTickerPriceHistory = (state: RootState) =>
  state.ticker.priceHistory;

export default tickerSlice.reducer;
