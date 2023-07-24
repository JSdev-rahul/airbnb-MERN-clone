export let SERVICE_ROUTES = {
  //---------------------Auth------------------//
  LOGIN: "/login", // Endpoint for user login
  SIGN_UP: "/signUp", // Endpoint for user sign up

  // PLACES
  UPLOAD_IMAGE_BY_LINk: "/upload-by-link", // Endpoint for uploading image by link
  UPLOAD_SYSTEM_IMAGE: "/upload", // Endpoint for uploading system image
  ADD_PLACES: "/add-new-place", // Endpoint for adding a new place
  GET_ALL_USER_PLACES: "/user-places", // Endpoint for retrieving all user places
  GET_ALL_PLACES: "/all-places", // Endpoint for retrieving all  places
  GET_PLACE_DETAILS: "/place/:id", // Endpoint for retrieving place details
  UPDATE_PLACE_DETAILS: "/place/:id", // Endpoint for updating place details

  // Booking

  CREATE_NEW_BOOKING: "/bookings",
  GET_ALL_BOOKINGS: "/bookings",
  GET_SINGLE_BOOKING_DETAILS: "/booking/:id",
  GET_MY_BOOKINGS: "/my-bookings",
};

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const replaceUrl = (url, data) => {
  var regex = new RegExp(":(" + Object.keys(data).join("|") + ")", "g");
  return url?.replace(regex, (m, $1) => data[$1] || m);
};
