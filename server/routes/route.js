const express = require("express");
const loginController = require("../controller/auth");

const userctl = require("../controller/user");
const fs = require("fs");
const multer = require("multer");
const placectr = require("../controller/place");
const bookingsctrl = require("../controller/bookings");
const route = express.Router();

route.post("/signUp", userctl.userHandler);
route.post("/login", loginController);
route.get("/profile", userctl.userDetails);
route.post("/upload-by-link", placectr.uploadByLinkController);
route.post("/add-new-place", placectr.addNewPlace); // add new place
route.get("/place/:id", placectr.getPlaceDetails); // place details
route.patch("/place/:id", placectr.updatePlaceDetails); // place update
route.get("/user-places", placectr.getAllUserPlaces); // user created places
route.get("/all-places", placectr.getAllPlaces); // return all places stored in database

// Booking related

route.post("/bookings", bookingsctrl.createNewBooking);
route.get("/bookings", bookingsctrl.getAllBookings);
route.get("/booking/:id", bookingsctrl.getSingleBookings);
route.get("/my-bookings", bookingsctrl.getMyBookings);

const photosMiddleware = multer({ dest: "uploads/" });
route.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts?.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadFiles);
});
module.exports = route;
