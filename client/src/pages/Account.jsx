import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tajmahal } from "../assets";
import { removeToken } from "../redux/slices/auth.slice";
import NavLink from "./NavLink";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleUserLogout = () => {
    dispatch(removeToken());
    navigate("/login");
  };

  return (
    <div>
      <NavLink />
      <div className="flex justify-center relative">
        <div className="bg-slate-400 shadow-lg w-full md:w-1/2 mt-5 flex flex-col items-center justify-center rounded-lg">
          <div className="w-full h-56 md:h-96 relative rounded-t-lg overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={tajmahal}
              alt="Taj Mahal"
            />
            <button className="outline outline-offset-0 absolute right-3 bottom-4 px-7 py-2 bg-primary text-white rounded-full shadow-lg">
              Follow
            </button>
            <div className="absolute bottom-1">
              <div className="bg-white rounded-full">
                <img
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full p-2 object-cover"
                  src="https://media.istockphoto.com/id/1312160562/photo/smiling-bearded-entrepreneur-chatting-with-friends-in-social-networks-watching-funny-video.jpg?s=612x612&w=0&k=20&c=bRa2LPPPlE_0BvNpGDe4kE8fE2AGAMY7RY7kRR2KTZo="
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full p-5 bg-slate-100 rounded-b-lg">
            <div className="flex flex-col items-center">
              <h1 className="text-xl md:text-2xl">{user?.name}</h1>
              <h3 className="text-sm">{user?.email}</h3>
              <div className="border border-b-3 mr-4 border-indigo-500 w-full my-3"></div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl">226k</h1>
                  <div className="text-xl">followers</div>
                </div>
              </div>
            </div>
            <div className="border border-red-400  py-6 col-span-2">
              <div className="flex">
                <div className="mx-8">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto object-cover"
                    src="https://media.istockphoto.com/id/1312160562/photo/smiling-bearded-entrepreneur-chatting-with-friends-in-social-networks-watching-funny-video.jpg?s=612x612&w=0&k=20&c=bRa2LPPPlE_0BvNpGDe4kE8fE2AGAMY7RY7kRR2KTZo="
                    alt=""
                  />
                </div>
                <div className="mr-3">
                  <div className="text-sm text-justify ">
                    “Be yourself, everyone. is fare in love and war"
                  </div>
                  <div className="flex items-center justify-around">
                    <div className="flex items-center">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-sm"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">15</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-sm"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">15 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-b-3 mr-4 border-indigo-500 w-full my-4"></div>
              <div className="flex">
                <div className="mx-8">
                  <img
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto object-cover"
                    src="https://media.istockphoto.com/id/1312160562/photo/smiling-bearded-entrepreneur-chatting-with-friends-in-social-networks-watching-funny-video.jpg?s=612x612&w=0&k=20&c=bRa2LPPPlE_0BvNpGDe4kE8fE2AGAMY7RY7kRR2KTZo="
                    alt=""
                  />
                </div>
                <div className="mr-3">
                  <div className="text-sm text-justify ">
                    “Be yourself, everyone. is fare in love and war"
                  </div>
                  <div className="flex items-center justify-around">
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-sm"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <span className="text-sm">15</span>
                    </div>
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-sm"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">15 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow"
          onClick={handleUserLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
