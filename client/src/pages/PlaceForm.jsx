import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import ImageViewer from "react-simple-image-viewer";
import NavLink from "./NavLink";
import { useDispatch } from "react-redux";
import { placesAsyncThunk } from "../redux/asyncThunk/places.asyncThunk";
import { useEffect } from "react";
const PlaceForm = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [title, setTitle] = useState("home");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState(
    "https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/19642a01-9946-4480-a2f7-373f3a32d24c.jpeg?im_w=960"
  );
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(0);
  // GET USER DETAILS FOR UPDATE

  useEffect(() => {
    if (id) {
      dispatch(placesAsyncThunk.getPlaceDetails({ id }))
        .unwrap()
        .then((res) => {
          setTitle(res.title);
          setAddress(res.address);
          setDescription(res.description);
          setCheckIn(res.checkIn);
          setCheckOut(res.checkOut);
          setMaxGuests(res.maxGuests);
          setExtraInfo(res.extraInfo);
          setPerks(res.perks);
          setAddedPhotos(res.photos);
          setPrice(res.price);
        });
    }
  }, [id]);

  const handleInputTitleBar = (title, description) => (
    <>
      <h2 className="text-2xl mt-2">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </>
  );

  const addPhotoByLink = (ev) => {
    ev.preventDefault();
    dispatch(placesAsyncThunk.uploadImageByLink({ link: photoLink }))
      .unwrap()
      .then((res) => {
        const imageUrl = `http://localhost:5252/uploads/${res.data}`;
        setAddedPhotos((prevPhotos) => [...prevPhotos, imageUrl]);
      });
  };

  const uploadPhotoHandler = (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    dispatch(placesAsyncThunk.uploadSytemImage(data))
      .unwrap()
      .then((res) => {
        const imageUrls = res.data.map(
          (link) => `http://localhost:5252/uploads/${link}`
        );
        setAddedPhotos((prevPhotos) => [...prevPhotos, ...imageUrls]);
      });
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleSubmit = (ev) => {
    setLoading(true);
    ev.preventDefault();
    const data = {
      title,
      address,
      extraInfo,
      description,
      checkIn,
      price: +price,
      checkOut,
      maxGuests,
      perks,
      photos: addedPhotos,
    };
    if (id) {
      dispatch(placesAsyncThunk.updatePlaceDetails({ ...data, id }))
        .unwrap()
        .then((res) => {
          navigate("/account/places");
        });

      // update place
    } else {
      dispatch(placesAsyncThunk.addPlacesAsyncThunk(data))
        .unwrap()
        .then((res) => {
          navigate("/account/places");
        });
    }
  };

  const removePhotoHandler = (link) => {
    setAddedPhotos(addedPhotos.filter((item) => item !== link));
  };
  const handleCoverPhoto = (link, index) => {
    setAddedPhotos([link, ...addedPhotos.filter((item) => item != link)]);
  };

  return (
    <div>
      <NavLink />
      <form onSubmit={handleSubmit}>
        {handleInputTitleBar(
          "Title",
          "Title for your place (should be concise)"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Enter title"
        />

        {handleInputTitleBar("Address", "Address of the place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Enter address"
        />

        {handleInputTitleBar("Photos", "Add photos of the place")}
        <div className="flex gap-2">
          <input
            type="text"
            value={photoLink}
            onChange={(ev) => setPhotoLink(ev.target.value)}
            placeholder="Enter photo link"
          />
          <button
            onClick={addPhotoByLink}
            className="bg-primary text-white px-4 rounded-2xl"
          >
            Add Photo
          </button>
        </div>
        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos?.length > 0 &&
            addedPhotos?.map((link, index) => {
              return (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => removePhotoHandler(link)}
                    className="absolute bottom-1 right-11 p-1.5 bg-black text-white bg-opacity-50 rounded-2xl "
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCoverPhoto(link, index)}
                    className="absolute bottom-1 right-1 p-1.5 bg-black text-white bg-opacity-50 rounded-2xl "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={index == 0 ? "w-6 h-6 fill-white " : "w-6 h-6"}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </button>
                  <img
                    onClick={() => openImageViewer(index)}
                    className="rounded-2xl  object-cover cursor-pointer "
                    src={link}
                    alt="link"
                  ></img>
                </div>
              );
            })}
          {isViewerOpen && (
            <ImageViewer
              src={addedPhotos}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}

          <label className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 ">
            <input
              multiple="multiple"
              type="file"
              onChange={uploadPhotoHandler}
              className="hidden"
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
            Upload
          </label>
        </div>

        {handleInputTitleBar("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Enter description"
        />

        {handleInputTitleBar("Perks", "Select all perks")}
        <Perks perks={perks} setPerks={setPerks} />

        {handleInputTitleBar(
          "Extra Info",
          "House rules, additional information, etc."
        )}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          placeholder="Enter extra information"
        />

        {handleInputTitleBar(
          "Check-in & Check-out Time",
          "Specify check-in and check-out times"
        )}
        <div className="grid sm:grid-cols-3 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check-in Time</h3>
            <input
              type="number"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="e.g., 14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out Time</h3>
            <input
              type="number"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="e.g., 12:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              placeholder="Enter maximum number of guests"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              placeholder="Enter maximum number of guests"
            />
          </div>
        </div>

        <div>
          <button
            className={`w-full mx-auto bg-primary py-2 rounded-full text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white flex"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25 text-center "
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceForm;
