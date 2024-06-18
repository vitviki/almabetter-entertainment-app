import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Register a new user
// {firstName, lastName, email, password} are required components
export const Register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, profilePicturePath } =
      req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again",
        success: false,
      });
    }

    // Check if the user already exists.
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Email ID is already in use. Please try with another email ID",
        success: false,
      });
    }

    // Hash the password before saving it the DB
    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicturePath,
    });

    return res
      .status(201)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong, please try again",
      success: false,
    });
  }
};

// Login with an existing email ID
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again",
        success: false,
      });
    }

    // Check if the user exists.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Check if the provided password is correct or not
    const matchedPassword = await bcryptjs.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const tokenData = { id: user._id };
    const token = await jwt.sign(tokenData, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });

    // Remove password from the object before returning.
    delete user.password;

    return res
      .status(200)
      .cookie("token", token)
      .json({
        message: `Welcome back ${user.firstName}!`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Something went wrong, please try again",
      success: false,
    });
  }
};

// Logout current user and remove the cookie
export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true })
    .json({ message: "Logged out successfully", success: true });
};

// Update favorite list of movies
export const addRemoveFavoriteMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Find the user.
    const user = await User.findById(id);

    // Look for that specific movie id within the favorite movies array.
    const found = user.favoriteMovies.find((movie) => movie.id === data.id);

    // If found, then the movie is already in favorites. This means we need to remove it from favorites
    if (found) {
      user.favoriteMovies = user.favoriteMovies.filter(
        (movie) => movie.id !== data.id
      );
    } else {
      user.favoriteMovies.push(data);
    }

    // Save the new updates
    await user.save();

    // Remove password before returning
    delete user["password"];

    return res.status(200).json({
      message: "Favorite movie list updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "Something went wrong, please try again",
      success: false,
    });
  }
};

// Update favorite list of tv shows
export const addRemoveFavoriteTV = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Find the user.
    const user = await User.findById(id);

    // Look for that specific movie id within the favorite movies array.
    const found = user.favortiteTVs.find((show) => show.id === data.id);

    // If found, then the movie is already in favorites. This means we need to remove it from favorites
    if (found) {
      user.favortiteTVs = user.favortiteTVs.filter(
        (show) => show.id !== data.id
      );
    } else {
      user.favortiteTVs.push(data);
    }

    // Save the new updates
    await user.save();

    // Remove password before returning
    delete user.password;

    return res.status(200).json({
      message: "Favorite tv list updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "Something went wrong, please try again",
      success: false,
    });
  }
};
