import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  subscribeTickers: [],
}

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    subscribeTicker: (state, action) => {
      if (state.subscribeTickers.some(item => item.ticker === action.payload.ticker)) {
        return
      } else {
        state.subscribeTickers = [...state.subscribeTickers, action.payload]
      }
    },
    unSubscribeTicker: (state, action) => {
      state.subscribeTickers = state.subscribeTickers.filter(item => item.ticker !== action.payload.ticker)
    }
  },
})

export const { subscribeTicker, unSubscribeTicker } = tickersSlice.actions

export default tickersSlice.reducer
