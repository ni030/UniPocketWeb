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

      res.status(200).json(complaints);
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
