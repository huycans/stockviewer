import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListOfTickers } from "../../API/tickerAPI";
import { RootState } from "../store";
import { Response, ServerError } from "./serverTypes";
import { TickerInfoType } from "./tickerSlice";

const initialState = {
  isLoading: false,
  timestamps: [] as number[],
  ticker_price_history: {} as {
    [tickerName: string]: number[];
  },
  info: {} as {
    [tickerName: string]: TickerInfoType;
  },
  error: ""
};

export const getListOfTickers = createAsyncThunk(
  "compare/fetchList",
  async (tickerList: string[], { rejectWithValue, dispatch }) => {
    try {
      const response: Response = await fetchListOfTickers(tickerList);
      if (response.status === "ok") {
        // dispatch(clearTickerError());
        return response.data;
      } else if (response.error) throw response.error;
    } catch (error) {
      return rejectWithValue(error); //will asssign 'error' as 'action.payload' in the reducer
    }
  }
);

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    // clearTickerError(state) {
    //   state.error = "";
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListOfTickers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getListOfTickers.fulfilled, (state, action) => {
        let payload = action.payload;
        state.timestamps = payload.timestamps;
        state.ticker_price_history = payload.ticker_price_history;
        state.info = payload.info;
        state.isLoading = false;
      })
      .addCase(getListOfTickers.rejected, (state, action) => {
        let payload = action.payload as ServerError;
        state.error = payload.description;
        state.isLoading = false;
      });
  }
});

export const selectCompareIsLoading = (state: RootState) =>
  state.compare.isLoading;
export default compareSlice.reducer;
