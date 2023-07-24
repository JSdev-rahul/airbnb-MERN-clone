const UserModel = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "sdfsdfjsdjfsdjfjs";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const passOk = await bcrypt.compare(password, userDoc.password);
    if (!passOk) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ id: userDoc._id }, jwtSecret);

    // Create a user object without the password
    const userWithoutPassword = {
      _id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email,
      createdAt: userDoc.createdAt,
      token: token,
    };

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = loginController;
