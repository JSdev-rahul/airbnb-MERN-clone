import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useSelector } from "react-redux";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  axios.defaults.headers.common["Authorization"] = token;

  return <>{children}</>;
};

export default UserContextProvider;
