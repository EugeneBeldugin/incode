import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from 'socket.io-client'

// Define a service using a base URL and expected endpoints
export const tickersApi = createApi({
  reducerPath: 'tickersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getTickers: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
      ) {
        try {
          await cacheDataLoaded;
     
          const socket = io(process.env.REACT_APP_IO_URL, {
            withCredentials: false,
          });
     
          socket.on('connect', () => {
            socket.emit('start');
          });
     
          socket.on('ticker', (tickers) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...tickers);
            });
          });
     
          await cacheEntryRemoved;
     
          socket.off('connect');
          socket.off('ticker');
        } catch {}
      },
    }),
  }),
})

export const { useGetTickersQuery } = tickersApi
