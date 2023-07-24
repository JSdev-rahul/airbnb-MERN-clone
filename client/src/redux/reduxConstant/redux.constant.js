export const ASYNC_ROUTES = {
  // Authentication
  LOGIN: "auth/login",
  SIGN_UP: "auth/signup",

  // Places
  UPLOAD_IMAGE_BY_LINK: "places/upload-image-by-link",
  UPLOAD_SYSTEM_IMAGE: "places/upload-system-image",
  ADD_PLACE: "places/add-place",
  GET_ALL_USER_PLACES: "places/get-all-user-places",
  GET_ALL_PLACES: "places/get-all-places",
  GET_PLACE_DETAILS: "places/get-place-details",
  UPDATE_PLACE_DETAILS: "places/update-place-details",

  // Booking
  CREATE_NEW_BOOKING: "booking/create-new-booking",
  GET_ALL_BOOKINGS: "booking/get-all-bookings",
  GET_MY_BOOKINGS: "booking/GetMyBookings",
  GET_SINGLE_BOOKING_DETAILS: "booking/get-single-booking-details",
};

export const THUNK_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};
