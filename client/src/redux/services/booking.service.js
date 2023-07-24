import { sendRequest } from "../fetchApiHandler";
import {
  METHODS,
  replaceUrl,
  SERVICE_ROUTES,
} from "../reduxConstant/service.constant";

export class BookingServices {
  /**
   * Upload image by link service
   */
  createNewBookingService = (payload) =>
    sendRequest(SERVICE_ROUTES.CREATE_NEW_BOOKING, METHODS.POST, payload);

  getAllBookingsService = (params) => {
    return sendRequest(
      SERVICE_ROUTES.GET_ALL_BOOKINGS,
      METHODS.GET,
      null,
      params
    );
  };

  getSingleBookingDetails = (payload) => {
    const { id } = payload;
    const url = replaceUrl(SERVICE_ROUTES.GET_SINGLE_BOOKING_DETAILS, { id });
    console.log(url);
    return sendRequest(url, METHODS.GET);
  };

  getMyBookings = (params) => {
    return sendRequest(SERVICE_ROUTES.GET_MY_BOOKINGS, METHODS.GET, {}, params);
  };
}
