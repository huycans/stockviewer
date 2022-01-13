import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTickerInfo } from "../../API/tickerAPI";
import { EquityInfoType } from "../../components/TickerInfo/EquityInfo";
import { ETFInfoType } from "../../components/TickerInfo/ETFInfo";
import { FundInfoType } from "../../components/TickerInfo/FundInfo";
import { RootState } from "../store";

export interface TickerState {
  name: string;
  info: EquityInfoType | FundInfoType | ETFInfoType | null;
  error: string;
  priceHistory: number[][];
  isLoading: boolean;
}

const initialState: TickerState = {
  name: "",
  info: null,
  error: "",
  priceHistory: [],
  isLoading: false
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

// Action creators are generated for each case reducer function
// export const {  } = tickerSlice.actions

export const getTickerInfo = createAsyncThunk(
  "ticker/get_info",
  async (tickerName: string, { rejectWithValue }) => {
    try {
      const response: Response = await fetchTickerInfo(tickerName);
      if (response.status === "ok") {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickerInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTickerInfo.fulfilled, (state, action) => {
        let payload = action.payload;
        state.info = payload.info;
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

//selectors
export const selectTickerInfo = (state: RootState) => state.ticker.info;
export const selectTickerError = (state: RootState) => state.ticker.error;
export const selectTickerIsLoading = (state: RootState) =>
  state.ticker.isLoading;
export const selectTickerPriceHistory = (state: RootState) =>
  state.ticker.priceHistory;

export default tickerSlice.reducer;
