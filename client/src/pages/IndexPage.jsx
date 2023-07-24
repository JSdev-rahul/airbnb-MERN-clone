import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { placesAsyncThunk } from "../redux/asyncThunk/places.asyncThunk";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIndigator from "../component/LodingIndigator";
import PlaceTypeHeader, { PlaceTypesList } from "./PlaceTypeHeader";

const IndexPage = () => {
  const { allPlacesList, totalPages, totalPlacesCount } = useSelector(
    (state) => state.places
  );

  const [list, setList] = useState([]);

  useEffect(() => {
    setList([...list, ...allPlacesList]);
  }, [allPlacesList]);
  const dispatch = useDispatch();
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 5,
  });

  const fetchData = () => {
    dispatch(placesAsyncThunk.getAllPlaces(pageData));
  };

  useEffect(() => {
    fetchData();
  }, [pageData]);

  const loadMoreData = () => {
    setPageData((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  return (
    <>
      <PlaceTypesList />
      {list.length >= 1 ? (
        <InfiniteScroll
          dataLength={list.length}
          next={loadMoreData}
          hasMore={totalPages > pageData.page}
          loader={<h4>Loading...</h4>}
        >
          <div className="mt-8 grid gap-x-8 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {list.map((place) => (
              <Link to={`/place/${place._id}`} key={place._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {place?.photos?.length >= 1 ? (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={place?.photos[0]}
                      alt="img"
                    />
                  ) : null}
                </div>
                <h2 className="text-sm truncate leading-3">{place?.title}</h2>
                <h2 className="font-bold leading-6">{place?.address}</h2>
                <span className="text-sm">Price ${place?.price} /- night</span>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <LoadingIndigator />
      )}
    </>
  );
};

export default IndexPage;
