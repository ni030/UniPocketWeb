import { db } from "../config/firebase.js";
const meritCollection = db.collection("merits");
const usersCollection = db.collection("users");

export const meritController = {
  getAllMerits: async (req, res) => {
    try {
      const meritSnapshot = await meritCollection.get();
      const merits = meritSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const meritWithUsers = await Promise.all(
        merits.map(async (merit) => {
          const usersSnapshot = await usersCollection
            .where("userId", "==", merit.userId)
            .get();
          const user = usersSnapshot.docs[0].data();
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          return { ...merit, user };
        })
      );
      return res.status(200).json(meritWithUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
