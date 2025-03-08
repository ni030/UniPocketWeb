import { db } from "../config/firebase.js";

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
};
