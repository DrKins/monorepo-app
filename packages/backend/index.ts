import cors from "cors";
import express from "express";
import { seedDatabase } from "./config/seed";
import { router } from "./routes";

declare global {
  namespace Express {
    interface Request {
      body: {
        type: string;
      };
    }
  }
}

//create fresh tables and insert intital data into db.
seedDatabase();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("*", (req, res) => res.send(`api Server - path: "${req.path}"`));
app.listen(5000, "0.0.0.0", () => console.log("Server started"));
