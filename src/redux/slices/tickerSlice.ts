import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {fetchTickerInfo} from '../../API/tickerAPI'

export interface TickerState {
  name: string,
  info: Object
}

const initialState: TickerState = {
  name: "",
  info: {}
}

export const getTickerInfo = createAsyncThunk(
  "ticker/get_info",
  async (tickerName: string) => {
    const data = await fetchTickerInfo(tickerName);
    return data;
  }
);

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickerInfo.fulfilled, (state, action) => {
        state.info = action.payload;
      })
  }
})

// Action creators are generated for each case reducer function
// export const {  } = tickerSlice.actions

export default tickerSlice.reducer