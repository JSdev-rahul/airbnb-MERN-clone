import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingIndigator from "../component/LodingIndigator";
import Pagination from "../component/Pagination";
import { bookingAsyncThunk } from "../redux/asyncThunk/booking.asyncThunk";
import NavLink from "./NavLink";

const BookingPlace = () => {
  const dispatch = useDispatch();
  const { bookings, totalPages, status } = useSelector(
    (state) => state?.booking
  );
  console.log("bookings", bookings);
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(bookingAsyncThunk.getMyBookings(pageData));
  }, []);

  return (
    <>
      {bookings?.length >= 1 ? (
        <>
          <div>
            <NavLink />

            <div>
              <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bookings?.map((item) => (
                <Link
                  to={`/account/bookings/${item._id}`}
                  key={item._id}
                  className="hover:drop-shadow-2xl cursor-pointer"
                >
                  <div className="bg-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-gray-500 mb-2 rounded-2xl w-32 h-32 mr-3">
                        <img
                          className="rounded-2xl object-cover w-full h-full"
                          src={item?.placeDetails?.photos[0]}
                          alt="Property"
                        ></img>
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-lg font-bold">
                          {item?.placeDetails?.title}
                        </h1>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-bold text-blue-600"
                          href={`https://maps.google.com/?q=${item?.placeDetails?.address}`}
                        >
                          {item?.placeDetails?.address}
                        </a>
                        <div className="flex gap-2 mt-2">
                          <h2>
                            Check-In:{" "}
                            {format(new Date(item?.checkIn), "dd-MM-yyyy")}
                          </h2>
                          {item?.checkOut && (
                            <h2>
                              Check-Out:{" "}
                              {format(new Date(item?.checkOut), "dd-MM-yyyy")}
                            </h2>
                          )}
                        </div>
                        <div className="mt-4">
                          <h1 className="text-base">Name: {item?.name}</h1>
                          <h1 className="text-base">Price: {item?.price}</h1>
                          <h1 className="text-base">
                            Total Nights: {item?.totalNights}
                          </h1>
                          <h1 className="text-base">
                            Number of Guests: {item?.numberOfGuests}
                          </h1>
                          <h1 className="text-base">
                            Payment Status: {item?.paymentStatus}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h1 className="text-base font-bold">Property Details:</h1>
                      <p className="text-sm">
                        {item?.placeDetails?.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <LoadingIndigator></LoadingIndigator>
      )}
    </>
  );
};

export default BookingPlace;
