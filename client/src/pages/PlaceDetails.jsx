import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { placesAsyncThunk } from "../redux/asyncThunk/places.asyncThunk";
import NavLink from "./NavLink";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import BookingWidget from "./BookingWidget";

const PlaceDetailsPage = () => {
  const [placeDetails, setPlaceDetails] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(placesAsyncThunk.getPlaceDetails({ id }))
        .unwrap()
        .then((res) => {
          setPlaceDetails(res);
        })
        .catch((err) => {
          navigate(-1);
        });
    } else {
      navigate(-1);
    }
  }, [id]);

  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {placeDetails.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
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
          {placeDetails?.photos?.length > 0 &&
            placeDetails.photos.map((photo) => (
              <div>
                <img src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative mt-8 ">
        <h1 className="text-3xl">{placeDetails.title}</h1>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold text-blue-600"
          href={`https://maps.google.com/?q=${placeDetails?.address}`}
        >
          {placeDetails?.address}
        </a>
        <div className="grid gap-1 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {placeDetails.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover"
                  src={placeDetails.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {placeDetails.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={placeDetails.photos[1]}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {placeDetails.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover relative top-2"
                  src={placeDetails.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="grid  md:grid-cols-1 grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl ">More aboute this place</h2>
            {placeDetails.description}
          </div>
          Check In {placeDetails?.checkIn} <br />
          Check Out {placeDetails?.checkOut} <br />
          Max number of guets {placeDetails?.maxGuests}
        </div>
        <div>
          <BookingWidget placeDetails={placeDetails} />
        </div>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-2xl ">Extra Info</h2>
      </div>
      <div className="text-sm mt-4 text-gray-700  leading-4 ">
        {placeDetails.extraInfo}
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
