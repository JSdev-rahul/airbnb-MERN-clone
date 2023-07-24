import { createSlice } from "@reduxjs/toolkit";
import { bookingAsyncThunk } from "../asyncThunk/booking.asyncThunk";

const initialState = {
  status: null,
  bookings: [],
  totalBookingsCount: 0,
  currentPage: 0,
  totalPages: 0,
  counter: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookingAsyncThunk.getMyBookings.pending, (state) => {
        state.status = "pending";
      })
      .addCase(bookingAsyncThunk.getMyBookings.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.totalBookingsCount = action.payload.totalBookingsCount;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.bookings = action.payload.data;
      })
      .addCase(bookingAsyncThunk.getMyBookings.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const selectBookingState = (state) => state.booking;
export default bookingSlice.reducer;
