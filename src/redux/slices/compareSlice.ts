import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListOfTickers } from "../../API/tickerAPI";
import { RootState } from "../store";
import {Response, ServerError} from './serverTypes'


const initialState = {
  isLoading: false,
  tickerList: []
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
        state.tickerList = payload.ticker_list;
        state.isLoading = false;
      })
    //   .addCase(getTickerInfo.rejected, (state, action) => {
    //     let payload = action.payload as ServerError;
    //     state.error = payload.description;
    //     state.isLoading = false;
    //   });
  }
});

export const selectCompareIsLoading = (state: RootState) =>
  state.compare.isLoading;
export default compareSlice.reducer;