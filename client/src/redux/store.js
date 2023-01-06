import { configureStore } from '@reduxjs/toolkit'
import tickersSlice from './features/tickersSlice'
import { tickersApi } from './services/tickersApi'

export const store = configureStore({
  reducer: {
    [tickersApi.reducerPath]: tickersApi.reducer,
    tickers: tickersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tickersApi.middleware),
})
