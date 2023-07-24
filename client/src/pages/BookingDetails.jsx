import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bookingAsyncThunk } from "../redux/asyncThunk/booking.asyncThunk";

const BookingDetails = () => {
  const [showAllImages, setAllImages] = useState(false);
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(bookingAsyncThunk.getSingleBookingDetailsAsyncThunk({ id }))
        .unwrap()
        .then((res) => {
          setDetails(res.data);
        })
        .catch((err) => {
          navigate(-1);
        });
    } else {
      return navigate(-1);
    }
  }, [id]);

  if (showAllImages) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">
              Photos of {details?.placeDetails.title}
            </h2>
            <button
              onClick={() => setAllImages(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {details?.placeDetails?.photos?.length > 0 &&
            details?.placeDetails.photos.map((photo) => (
              <div>
                <img src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl py-4">Booking Details</h1>
      <div className="bg-gray-100 rounded-lg p-8 mt-4 w-3/4">
        {details && (
          <div className="flex gap-4">
            <div className="w-60">
              <img
                onClick={() => setAllImages(true)}
                className="aspect-square object-cover cursor-pointer rounded-2xl"
                src={details?.placeDetails?.photos[0]}
                alt={details?.placeDetails?.title}
              />
            </div>
            <div>
              <div className="flex justify-between  text-center ">
                <h1 className="text-3xl">{details?.placeDetails?.title}</h1>
                <div className="flex gap-2 items-center ">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>

                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className="text-md underline text-blue-800">
                {details?.placeDetails?.address}
              </h1>
              <div className="my-4">
                <h2 className="text-xl">Booking Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold">Name:</p>
                    <p>{details?.name}</p>
                  </div>
                  <div>
                    <p className="font-bold">Phone:</p>
                    <p>{details?.phoneNo}</p>
                  </div>
                  <div>
                    <p className="font-bold">Number of Guests:</p>
                    <p>{details?.numberOfGuests}</p>
                  </div>
                  <div>
                    <p className="font-bold">Payment Status:</p>
                    <p>{details?.paymentStatus}</p>
                  </div>
                  <div>
                    <p className="font-bold">Check-In:</p>
                    <p>{format(new Date(details?.checkIn), "dd-MM-yyyy")}</p>
                  </div>
                  <div>
                    {details?.checkOut && (
                      <div>
                        <p className="font-bold">Check-Out:</p>
                        <p>
                          {format(new Date(details?.checkOut), "dd-MM-yyyy")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-4">
                <h2 className="text-xl">Extra Information</h2>
                <p className="text-sm">{details?.placeDetails?.extraInfo}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {!details && <h1>Loading....</h1>}
    </div>
  );
};

export default BookingDetails;
