import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ticket: [], // This will hold the fetched ticket data
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTicket: (state, action) => {
      state.ticket = action.payload;
    },
    clearTickets: () => initialState,
  },
});

export const { setTicket, clearTickets } = ticketSlice.actions;

export default ticketSlice.reducer;

