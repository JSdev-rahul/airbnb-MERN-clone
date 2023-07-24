import { sendRequest } from "../fetchApiHandler";
import {
  METHODS,
  replaceUrl,
  SERVICE_ROUTES,
} from "../reduxConstant/service.constant";

export class PlacesService {
  /**
   * Upload image by link service
   */
  uploadImageByLinkService = (payload) =>
    sendRequest(SERVICE_ROUTES.UPLOAD_IMAGE_BY_LINk, METHODS.POST, payload);

  /**
   * Upload system image service
   */
  uploadSystemImageService = (payload) =>
    sendRequest(SERVICE_ROUTES.UPLOAD_SYSTEM_IMAGE, METHODS.POST, payload, {
      "Content-Type": "multipart/form-data",
    });

  /**
   * Add place service
   */
  addPlaceService = (payload) =>
    sendRequest(SERVICE_ROUTES.ADD_PLACES, METHODS.POST, payload);

  /**
   * Get all user places service
   */
  getAllUserPlacesService = () =>
    sendRequest(SERVICE_ROUTES.GET_ALL_USER_PLACES, METHODS.GET);

  /**
   * Get place details service
   */
  getPlaceDetails = (payload) => {
    const { id } = payload;
    const url = replaceUrl(SERVICE_ROUTES.GET_PLACE_DETAILS, { id });
    return sendRequest(url, METHODS.GET);
  };

  /**
   * Update place details service
   */
  updatePlaceDetailsService = (payload) => {
    const { id, ...data } = payload;
    const url = replaceUrl(SERVICE_ROUTES.UPDATE_PLACE_DETAILS, { id });
    return sendRequest(url, METHODS.PATCH, data);
  };

  /**
   * Get all places service
   */
  getAllPlacesService = (params) => {
    return sendRequest(
      SERVICE_ROUTES.GET_ALL_PLACES,
      METHODS.GET,
      null,
      params
    );
  };
}
