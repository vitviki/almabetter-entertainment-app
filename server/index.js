import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { Register } from "./controllers/user.js";
import { fileURLToPath } from "url";

dotenv.config({ path: ".env" });

// Cors Options
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// File Storage Options for profile picture.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Middleware for file upload
const upload = multer({ storage });

databaseConnection();

const app = express();

// Setup the middlewares
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// API routes.
// Sign up will be called here for middlware to take place
app.post("/api/v1/user/register", upload.single("picture"), Register);
app.use("/api/v1/user", userRoute);
app.use("/", (req, res) => res.send("Express on vercel"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server at port: ${PORT}`);
});
