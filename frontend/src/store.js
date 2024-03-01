
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../src/slices/apiSlice'
import authSliceReducer from './slices/authSlice';
import tripReducer from './slices/tripSlice';
import ticketReducer from './slices/ticketSlice'





const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSliceReducer,
        trips: tripReducer,
        tickets:ticketReducer,
        
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat
    (apiSlice.middleware),
    devTools:true,
});

export default store;