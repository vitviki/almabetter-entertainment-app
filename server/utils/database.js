import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("database connection: success");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default databaseConnection;
