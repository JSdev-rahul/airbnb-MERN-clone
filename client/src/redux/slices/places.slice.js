import { createSlice } from "@reduxjs/toolkit";
import { placesAsyncThunk } from "../asyncThunk/places.asyncThunk";

const initialState = {
  status: null,
  places: [],
  totalPlacesCount: 0,
  allPlacesList: [],
  allPlacesStatus: null,
  currentPage: 0,
  totalPages: 0,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        placesAsyncThunk.getAllUsersPlacesAsyncThunk.pending,
        (state) => {
          state.status = "pending";
        }
      )
      .addCase(
        placesAsyncThunk.getAllUsersPlacesAsyncThunk.fulfilled,
        (state, action) => {
          state.status = "fulfilled";
          state.places = action.payload.data;
        }
      )
      .addCase(
        placesAsyncThunk.getAllUsersPlacesAsyncThunk.rejected,
        (state) => {
          state.status = "rejected";
        }
      )
      .addCase(placesAsyncThunk.getAllPlaces.pending, (state) => {
        state.allPlacesStatus = "pending";
      })
      .addCase(placesAsyncThunk.getAllPlaces.fulfilled, (state, action) => {
        console.log("action", action);
        state.allPlacesStatus = "fulfilled";
        state.totalPlacesCount = action.payload.totalPlacesCount;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.allPlacesList = action.payload.data;
      })
      .addCase(placesAsyncThunk.getAllPlaces.rejected, (state) => {
        state.allPlacesStatus = "rejected";
      });
  },
});

export const selectAuthState = (state) => state.places;
export default placesSlice.reducer;
