import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [], // This will hold the fetched trip data
    availableSeats:[],
};

const tripSlice = createSlice({
name: 'trips',
initialState,
reducers: {
    setTrips: (state, action) => {
    state.trips = action.payload;
    },
    clearTrips: () => initialState,
    setAvailableSeats: (state, action) => {
        state.availableSeats = action.payload;
    },
},
});

export const { setTrips,clearTrips,setAvailableSeats } = tripSlice.actions;

export default tripSlice.reducer;
