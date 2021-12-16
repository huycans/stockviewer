import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TickerState {
  value: string
}

const initialState: TickerState = {
  value: "APPL",
}

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    // right now just fetch ticker info using async thunk action
    fetchTickerInfo: (state, action) => {
      state.value = action.payload// placeholder code
    }
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { fetchTickerInfo } = tickerSlice.actions

export default tickerSlice.reducer