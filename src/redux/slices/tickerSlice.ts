import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTickerInfo } from "../../API/tickerAPI";
import { EquityInfoType } from "../../components/TickerInfo/EquityInfo";
import { FundInfoType } from "../../components/TickerInfo/FundInfo";
import { RootState } from "../store";

export interface TickerState {
  name: string;
  info: EquityInfoType | FundInfoType | null;
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

// Action creators are generated for each case reducer function
// export const {  } = tickerSlice.actions

export const getTickerInfo = createAsyncThunk(
  "ticker/get_info",
  async (tickerName: string, { rejectWithValue }) => {
    try {
      const data = await fetchTickerInfo(tickerName);
      if (data.error) throw data.error;
      return data;
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
        state.info = action.payload.info;
        state.priceHistory = action.payload.price_history;
        state.isLoading = false;
      })
      .addCase(getTickerInfo.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

//selectors
export const selectTickerInfo = (state: RootState) => state.ticker.info;
export const selectTickerError = (state: RootState) => state.ticker.error;
export const selectTickerIsLoading = (state: RootState) => state.ticker.isLoading;
export const selectTickerPriceHistory = (state: RootState) => state.ticker.priceHistory;


export default tickerSlice.reducer;
