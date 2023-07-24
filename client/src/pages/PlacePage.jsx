import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingIndigator from "../component/LodingIndigator";
import { placesAsyncThunk } from "../redux/asyncThunk/places.asyncThunk";
import NavLink from "./NavLink";

const PlacePage = () => {
  const { allPlacesList } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesAsyncThunk.getAllUsersPlacesAsyncThunk());
  }, []);

  return (
    <>
      {allPlacesList?.length >= 1 ? (
        <div>
          <NavLink />
          <div className="text-center mt-4">
            <Link
              className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full"
              to="/account/places/new"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>{" "}
              Add New Place
            </Link>
          </div>
          <div className="mt-4">
            {allPlacesList?.map((item) => (
              <Link
                to={`/account/places/update/${item._id}`}
                className="flex cursor-pointer gap-4 mt-4 bg-white p-4 rounded-2xl shadow-md"
                key={item._id}
              >
                <div className="w-32 h-32 bg-gray-200 overflow-hidden rounded-lg">
                  {item.photos.length > 0 && (
                    <img
                      src={item?.photos[0]}
                      alt="Place"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{item?.title}</h2>
                  <p className="text-sm mt-2">{item?.address}</p>
                  <p className="text-sm mt-2">{item?.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <LoadingIndigator />
      )}
    </>
  );
};

export default PlacePage;
