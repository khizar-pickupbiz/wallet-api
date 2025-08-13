import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
//import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoutes from "./routes/transactionsRoutes.js";
import job from "./config/cron.js";
app.use(express.json());
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") job.start();

// middleware
// app.use(cors());
//app.use(rateLimiter);


const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/transaction", transactionsRoutes);
// app.use("/api/products",transactionsRoutes)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});
