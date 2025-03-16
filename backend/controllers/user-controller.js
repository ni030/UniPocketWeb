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

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // getUserById: async (req, res) => {
  //   const { userId } = req.params;
  //   try {
  //     const userSnapshot = await db
  //       .collection("users")
  //       .where("userId", "==", userId)
  //       .get();
  //     const user = userSnapshot.data();
  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  //   try {
  //     const userSnapshot = await db
  //       .collection("users")
  //       .doc(req.params.id)
  //       .get();
  //     const user = userSnapshot.data();
  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
};
