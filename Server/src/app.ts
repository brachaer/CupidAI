import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import corsOptionsConfig from "./config/corsOptions";
import notFound from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/error-handler";
import userRouter from "./routes/user";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptionsConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    const CONN = process.env.CONN;

    if (!CONN) {
      throw new Error(
        "Connection string (CONN) is not defined in the environment variables."
      );
    }

    await mongoose.connect(CONN);
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
