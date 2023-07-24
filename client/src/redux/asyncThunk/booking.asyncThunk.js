import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../reduxConstant/redux.constant";
import { BookingServices } from "../services/booking.service";

export class BookingAsyncThunk {
  constructor() {
    this.bookingService = new BookingServices();
  }

  createNewBookingAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.CREATE_NEW_BOOKING,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.bookingService.createNewBookingService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

  getALlBookings = createAsyncThunk(
    ASYNC_ROUTES.GET_ALL_BOOKINGS,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.bookingService.getAllBookingsService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getSingleBookingDetailsAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.GET_SINGLE_BOOKING_DETAILS,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.bookingService.getSingleBookingDetails(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getMyBookings = createAsyncThunk(
    ASYNC_ROUTES.GET_MY_BOOKINGS,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.bookingService.getMyBookings(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
}

export const bookingAsyncThunk = new BookingAsyncThunk();
