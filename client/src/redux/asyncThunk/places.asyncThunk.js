import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../reduxConstant/redux.constant";
import { AuthService } from "../services/auth.service";
import { PlacesService } from "../services/places.service";

export class PlacesAsyncThunk {
  constructor() {
    this.placeService = new PlacesService();
  }

  uploadImageByLink = createAsyncThunk(
    ASYNC_ROUTES.UPLOAD_IMAGE_BY_LINk,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.placeService.uploadImageByLinkService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  uploadSytemImage = createAsyncThunk(
    ASYNC_ROUTES.UPLOAD_SYSTEM_IMAGE,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.placeService.uploadSystemImageService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  addPlacesAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.ADD_PLACES,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.placeService.addPlaceService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getAllUsersPlacesAsyncThunk = createAsyncThunk(
    ASYNC_ROUTES.GET_ALL_USER_PLACES,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.placeService.getAllUserPlacesService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  getPlaceDetails = createAsyncThunk(
    ASYNC_ROUTES.GET_PLACE_DETAILS,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.placeService.getPlaceDetails(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  updatePlaceDetails = createAsyncThunk(
    ASYNC_ROUTES.UPDATE_PLACE_DETAILS,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.placeService.updatePlaceDetailsService(
          payload
        );
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

  getAllPlaces = createAsyncThunk(
    ASYNC_ROUTES.GET_ALL_PLACES,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await this.placeService.getAllPlacesService(payload);
        return response;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
}

export const placesAsyncThunk = new PlacesAsyncThunk();
