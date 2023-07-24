import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAsyncThunk } from "../redux/asyncThunk/auth.asyncThunk";
import { Toaster } from "../utils/Toaster";
const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    name: "rahul",
    email: "test@yopmail.com",
    password: "123456",
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(authAsyncThunk.userSignUpAsyncThunk({ ...values }))
        .unwrap()
        .then((res) => {
          console.log("res", res);
          setIsLoading(false);
          Toaster.fire({
            position: "top-end",
            icon: "success",
            title: "Registration successfull",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toaster.fire({
            position: "top-end",
            icon: "error",
            title: err.error,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  });
  const { values, handleChange } = formik;

  return (
    <div className="mt-4 grow flex items-center justify-around ">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">RegisterPage</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            className="p-1"
            type="text"
            placeholder="john deo"
          ></input>
          {formik.errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </span>
          )}
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            className="p-1"
            type="text"
            placeholder="john@email.com"
          ></input>
          {formik.errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </span>
          )}
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            className="p-1"
            type="password"
            placeholder="password"
          ></input>
          {formik.errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </span>
          )}
          <button
            type="submit"
            className="bg-primary text-white rounded-full p-2 w-full mt-4 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0020 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
          <div className="text-center py-2 text-gray-500 ">
            Already have an account?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
