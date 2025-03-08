import cors from "cors";
import express from "express";
import { PORT } from "./config/env.js";
import { router } from "./routers/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/users", async (req, res) => {
//   try {
//     const usersSnapshot = await db.collection("users").get();
//     const users = usersSnapshot.docs.map((doc) => doc.data());
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.use("/api/v1", router);

app.listen(PORT || "5200", () => {
  console.log("Server is running on port 5200");
});
