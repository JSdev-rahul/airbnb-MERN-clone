const mongoose = require("mongoose");
const bookingStatusEnum = ["confirmed", "pending", "cancelled"];
const paymentStatusEnum = ["pending", "completed", "failed"];

const bookingsModle = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  place: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  phoneNo: {
    type: Number,
    require: true,
  },
  checkIn: {
    type: Date,
    require: true,
  },
  checkOut: {
    type: Date,
    require: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  totalNights: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: bookingStatusEnum,
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: paymentStatusEnum,
    default: "pending",
  },
  remark: {
    type: String,
  },
});

const BookingsModel = mongoose.model("bookings", bookingsModle);

module.exports = BookingsModel;
