import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTickerInfo } from "../../API/tickerAPI";
import { TickerInfoProps } from "../../components/TickerInfo";

export interface TickerState {
  name: string;
  info: TickerInfoProps | null;
  error: string;
  priceHistory: number[][];
}

const initialState: TickerState = {
  name: "",
  info: null,
  error: "",
  priceHistory: []
};

export const getTickerInfo = createAsyncThunk(
  "ticker/get_info",
  async (tickerName: string, {rejectWithValue}) => {
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
      .addCase(getTickerInfo.fulfilled, (state, action) => {
        state.info = action.payload.info;
        state.priceHistory = action.payload.price_history;
      })
      .addCase(getTickerInfo.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

// Action creators are generated for each case reducer function
// export const {  } = tickerSlice.actions

export default tickerSlice.reducer;
