import cors from "cors";
import express from "express";
import taskRoutes from "./routes/card.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

app.get("*", (req, res) => res.send(`api Server - path: "${req.path}"`));
app.listen(5000, "0.0.0.0", () => console.log("Server started"));
