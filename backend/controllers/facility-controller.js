import { db } from "../config/firebase.js";

const facilitiesCollection = db.collection("facilities");

export const facilityController = {
  getAllFacilities: async (req, res) => {
    try {
      const snapshot = await facilitiesCollection.get();
      const facilities = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      res.status(200).json(facilities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getFacilityById: async (req, res) => {
    const { facilityId } = req.params;

    try {
      const facility = await facilitiesCollection.doc(facilityId).get();

      if (!facility.exists) {
        res.status(404).json({ message: "Facility not found" });
      } else {
        res.status(200).json({ id: facility.id, ...facility.data() });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createFacility: async (req, res) => {
    const { newFacility } = req.body;

    if (!newFacility) {
      res.status(400).json({ message: "Please provide all fields" });
      return;
    }

    try {
      await facilitiesCollection.add(newFacility);

      res.status(201).json({ message: "Facility created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateFacility: async (req, res) => {
    const { facilityId } = req.params;
    const { updatedFacility } = req.body;

    if (!updatedFacility) {
      res.status(400).json({ message: "Please provide all fields" });
      return;
    }

    try {
      await facilitiesCollection.doc(facilityId).update({
        ...updatedFacility,
      });

      res.status(200).json({ message: "Facility updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteFacility: async (req, res) => {
    const { facilityId } = req.params;

    if (!facilityId) {
      res.status(400).json({ message: "Please provide facility id" });
      return;
    }

    try {
      await facilitiesCollection.doc(facilityId).delete();

      res.status(200).json({ message: "Facility deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
