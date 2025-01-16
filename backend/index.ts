import cors from "cors";
import express from "express";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("*", (req, res) => res.send(`api Server - path: "${req.path}"`));
app.listen(5000, "0.0.0.0", () => console.log("Server started"));
