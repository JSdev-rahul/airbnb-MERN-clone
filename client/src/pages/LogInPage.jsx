import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authAsyncThunk } from "../redux/asyncThunk/auth.asyncThunk";
import { airbnbLogo } from "../assets";
import * as Yup from "yup";
import { Toaster } from "../utils/Toaster";

const LogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialValues] = useState({
    email: "test011@yopmail.com",
    password: "123456",
  });

  const { status } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(authAsyncThunk.loginAsyncThunk(values))
        .unwrap()
        .then((res) => {
          Toaster.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const { values, handleChange, handleSubmit, errors, touched } = formik;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8">
        <img src={airbnbLogo} alt="Logo" className="w-32 mx-auto mb-4" />
        <h1 className="text-3xl text-center mb-4">Log in</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            value={values.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className={
              errors.email && touched.email
                ? "input-field error"
                : "input-field"
            }
          />
          {errors.email && touched.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
          <input
            value={values.password}
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className={
              errors.password && touched.password
                ? "input-field error"
                : "input-field"
            }
          />
          {errors.password && touched.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
          <button
            type="submit"
            className="bg-primary text-white rounded-full p-2 w-full mt-4 flex items-center justify-center"
            disabled={status === "pending"}
          >
            {status === "pending" ? (
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
              "Log in"
            )}
          </button>
          <div className="text-center mt-4 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="text-blue-500 underline" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
