import { db } from "../config/firebase.js";
const eventsCollection = db.collection("events");

export const eventController = {
  createEvent: async (req, res) => {
    try {
      const docRef = await eventsCollection.add(mockEvent);

      res.status(201).json({ id: docRef.id, ...mockEvent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getEvents: async (req, res) => {
    try {
      const eventsSnapshot = await eventsCollection.get();
      const events = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
