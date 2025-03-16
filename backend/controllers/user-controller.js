import { db } from "../config/firebase.js";

const usersCollection = db.collection("users");

export const userController = {
  getUsers: async (req, res) => {
    try {
      const usersSnapshot = await db.collection("users").get();
      const users = usersSnapshot.docs.map((doc) => doc.data());
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getUserDetail: async (req, res) => {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const userSnapshot = await usersCollection
        .where("userId", "==", userId)
        .get();
      const user = userSnapshot.docs.map((doc) => doc.data())[0];
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
