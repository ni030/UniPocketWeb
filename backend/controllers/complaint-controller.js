import { db } from "../config/firebase.js";
const complaintsCollection = db.collection("complaints");
const usersCollection = db.collection("users");

export const complaintController = {
  getAllComplaints: async (req, res) => {
    try {
      const docRef = await complaintsCollection.get();
      const complaints = docRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const uniqueUserIds = [
        ...new Set(complaints.map((complaint) => complaint.userId)),
      ];

      let users = [];
      if (uniqueUserIds.length > 0) {
        const userQuery = await usersCollection
          .where(
            "userId",
            "in",
            // Firebase allows maximum 10 items in 'in' query
            uniqueUserIds.slice(0, 10)
          )
          .get();

        users = userQuery.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (uniqueUserIds.length > 10) {
          for (let i = 10; i < uniqueUserIds.length; i += 10) {
            const chunk = uniqueUserIds.slice(i, i + 10);
            const additionalQuery = await usersCollection
              .where("userId", "in", chunk)
              .get();

            users = [
              ...users,
              ...additionalQuery.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            ];
          }
        }
      }

      const userMap = {};
      users.forEach((user) => {
        userMap[user.userId] = user;
      });

      const completeComplaints = complaints.map((complaint) => ({
        ...complaint,
        user: userMap[complaint.userId],
      }));

      res.status(200).json(completeComplaints);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateComplaint: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const docRef = complaintsCollection.doc(id);
      await docRef.update({ status });

      res.status(200).json({ message: "Complaint updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
