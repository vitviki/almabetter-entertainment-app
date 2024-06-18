import express from "express";
import {
  Login,
  Logout,
  addRemoveFavoriteMovies,
  addRemoveFavoriteTV,
} from "../controllers/user.js";

const router = express.Router();

router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/:id/addRemoveFavoriteMovies").put(addRemoveFavoriteMovies);
router.route("/:id/addRemoveFavoriteTV").put(addRemoveFavoriteTV);

export default router;
