import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useDispatch } from "react-redux";
import { bookingAsyncThunk } from "../redux/asyncThunk/booking.asyncThunk";
import { useFormik } from "formik";
import * as Yup from "yup";

const BookingWidget = ({ placeDetails }) => {
  const dispatch = useDispatch();

  const [totalNights, setTotalNights] = useState(0);

  const validationSchema = Yup.object().shape({
    checkIn: Yup.string()
      .test(
        "checkDateIsgreatterThenTodaydate",
        "Check In date is not valid",
        function (value) {
          return new Date(value) > new Date();
        }
      )
      .required("Check In date is required"),

    checkOut: Yup.string()
      .test(
        "checkOutafterchecheckIn",
        "Check In date must be before Check Out date",
        function (value) {
          const { checkIn } = this.parent;
          return new Date(value) >= new Date(checkIn);
        }
      )
      .required("Check Out date is required"),
    numberOfGuests: Yup.number().min(1, "Number of guests must be at least 1"),
    name: Yup.string().required("Name is required"),
    phoneNo: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNo: "",
      checkIn: "",
      checkOut: "",
      numberOfGuests: 1,
    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (formik.values.checkIn && formik.values.checkOut) {
      const diff = differenceInCalendarDays(
        new Date(formik.values.checkOut),
        new Date(formik.values.checkIn)
      );
      setTotalNights(diff);
    }
  }, [formik.values.checkIn, formik.values.checkOut]);

  const handleSubmit = (values) => {
    const data = {
      place: placeDetails?._id,
      ...values,
      totalNights,
      price:
        totalNights > 0 ? totalNights * placeDetails.price : placeDetails.price,
      remark: "I want more space from your side",
    };
    dispatch(bookingAsyncThunk.createNewBookingAsyncThunk(data));
  };
  console.log("err", formik);

  return (
    <div className="bg-white border shadow-md mt-4 gap-8 border-l-rose-200 p-4 rounded-2xl">
      <div className="text-center text-2xl">
        Price: $ {placeDetails.price} /- night
      </div>
      <div className="border rounded-2xl mt-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <div className="p-2 px-4 border-r">
              <label>Check In</label>
              <input
                name="checkIn"
                value={formik.values.checkIn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="date"
                placeholder="Select Check In Date"
              />
              {formik.touched.checkIn && formik.errors.checkIn && (
                <div className="text-red-600">{formik.errors.checkIn}</div>
              )}
            </div>
            <div className="p-2 px-4">
              <label>Check out</label>
              <input
                name="checkOut"
                value={formik.values.checkOut}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="date"
                placeholder="Select Check Out Date"
              />
              {formik.touched.checkOut && formik.errors.checkOut && (
                <div className="text-red-600">{formik.errors.checkOut}</div>
              )}
            </div>
          </div>
          <div>
            <div className="p-2 px-4 border-t">
              <label>Number of guests</label>
              <input
                name="numberOfGuests"
                value={formik.values.numberOfGuests}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                placeholder="Enter Number of Guests"
              />
              {formik.touched.numberOfGuests &&
                formik.errors.numberOfGuests && (
                  <div className="text-red-600">
                    {formik.errors.numberOfGuests}
                  </div>
                )}
            </div>

            {totalNights > 0 && (
              <div>
                <div className="p-2 px-4">
                  <label>Enter your name</label>
                  <input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Enter Your Name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-600">{formik.errors.name}</div>
                  )}
                </div>
                <div className="p-2 px-4">
                  <label>Enter your Phone number</label>
                  <input
                    name="phoneNo"
                    value={formik.values.phoneNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="tel"
                    placeholder="Enter Your Phone Number"
                  />
                  {formik.touched.phoneNo && formik.errors.phoneNo && (
                    <div className="text-red-600">{formik.errors.phoneNo}</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-primary w-full mt-2 text-white rounded-2xl"
          >
            Book this place for {totalNights > 0 && totalNights} nights at{" "}
            {totalNights > 0 && totalNights * +placeDetails?.price}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingWidget;
