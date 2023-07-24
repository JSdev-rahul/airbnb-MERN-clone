const download = require("image-downloader");
const PlaceModel = require("../models/places");
const jwt = require("jsonwebtoken");
const jwtSecret = "sdfsdfjsdjfsdjfjs";

const placectr = {
  uploadByLinkController: async (req, res) => {
    try {
      const { link } = req.body;
      const newName = "photo" + Date.now() + ".jpg";
      const options = {
        url: link,
        dest: `/home/sabtophy/Desktop/project/airbnb-clone/server/uploads/${newName}`,
      };

      const { filename } = await download.image(options);
      console.log("Saved to", newName);

      res.status(200).json(newName);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addNewPlace: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const data = jwt.verify(token, jwtSecret);
      const id = data.id;

      const placeDoc = await PlaceModel.create({ owner: id, ...req.body });
      res.status(201).json(placeDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllUserPlaces: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const data = jwt.verify(token, jwtSecret);
      const id = data.id;

      const placesDoc = await PlaceModel.find({ owner: id }).select("-owner");
      res.status(200).json(placesDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getPlaceDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const placeDoc = await PlaceModel.findById(id);

      res.status(200).json(placeDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updatePlaceDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedPlace = await PlaceModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (updatedPlace) {
        res.status(200).json(updatedPlace);
      } else {
        res.status(404).json({ error: "Place not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllPlaces: async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1; // Get the page number from the query parameters, default to 1 if not provided
      const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Get the limit from the query parameters, default to 10 if not provided
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const totalPlacesCount = await PlaceModel.countDocuments();
      const totalPages = Math.ceil(totalPlacesCount / limit);
      const places = await PlaceModel.find({}).skip(startIndex).limit(limit);
      const response = {
        data: places,
        currentPage: page,
        totalPages: totalPages,
        totalPlacesCount: totalPlacesCount,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = placectr;
