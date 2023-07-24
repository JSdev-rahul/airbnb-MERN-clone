const jwt = require("jsonwebtoken");
const BookingsModel = require("../models/booking");
const PlaceModel = require("../models/places");
const jwtSecret = "sdfsdfjsdjfsdjfjs";

const bookingsctrl = {
  createNewBooking: async (req, res) => {
    try {
      const {
        body: data,
        headers: { authorization: token },
      } = req;
      const tokenData = jwt.verify(token, jwtSecret);
      const { id: userId } = tokenData;

      const bookingDoc = await BookingsModel.create({
        ...data,
        user: userId,
      });

      res.status(201).json(bookingDoc);
    } catch (error) {
      res.status(500).json({ error: "Failed to create new booking" });
    }
  },
  getAllBookings: async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalBookingsCount = await BookingsModel.countDocuments();
    const totalPages = Math.ceil(totalBookingsCount / limit);
    const bookings = await BookingsModel.find({})
      .skip(startIndex)
      .limit(endIndex);

    const result = {
      currentPage: page,
      totalBookingsCount,
      totalPages,
      data: [],
    };

    for (const booking of bookings) {
      const placeDetails = await PlaceModel.findById(booking.place);
      result.data.push({ ...booking._doc, placeDetails });
    }

    res.json(result).status(200);
  },
  getSingleBookings: async (req, res) => {
    const { id } = req.params;
    const bookingDoc = await BookingsModel.findById(id);
    const placeDetails = await PlaceModel.findById({ _id: bookingDoc.place });

    return res.json({ ...bookingDoc._doc, placeDetails }).status(200);
  },
  getMyBookings: async (req, res) => {
    const token = req.headers.authorization;
    const data = jwt.verify(token, jwtSecret);
    const id = data.id;
    console.log("id", id);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalBookingsCount = await BookingsModel.countDocuments();
    const totalPages = Math.ceil(totalBookingsCount / limit);
    const bookings = await BookingsModel.find({ user: id })
      .skip(startIndex)
      .limit(endIndex);

    const result = {
      currentPage: page,
      totalBookingsCount,
      totalPages,
      data: [],
    };

    for (const booking of bookings) {
      const placeDetails = await PlaceModel.findById(booking.place);
      result.data.push({ ...booking._doc, placeDetails });
    }

    res.json(result).status(200);
  },
};

module.exports = bookingsctrl;
