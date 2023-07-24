import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./auth.slice.js";
import BookingSlice from "./booking.slice.js";
import PlacesSlice from "./places.slice.js";

export default combineReducers({
  auth: AuthSlice,
  places: PlacesSlice,
  booking: BookingSlice,
});
