import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicturePath: {
    type: String,
    default: "",
  },
  favoriteMovies: {
    type: Array,
    default: [],
  },
  favortiteTVs: {
    type: Array,
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);
