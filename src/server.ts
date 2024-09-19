// Init server
import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import cron from "node-cron";

// Service
import sendRequestsToSmtpServer from "./service/mail";

// Router
import router from "./route";

const app = express();

// Server configuration
app.use(express.static(path.join(__dirname, "frontend"))); // this is frontend's build folder and serves as static file
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(
  cors({
    origin: process.env.ORIGIN, // for enabling cors
  })
);

// Inject routers
app.use("/", router);

// Cron job runs every 15 seconds
cron.schedule("*/15 * * * * *", () => {
  sendRequestsToSmtpServer();
  console.log("Running a task every 15 seconds");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port: " + process.env.PORT);
});
