import { db } from "../config/firebase.js";
const eventsCollection = db.collection("events");

export const eventController = {
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
  getEventById: async (req, res) => {
    const { eventId } = req.params;

    try {
      const event = await eventsCollection.doc(eventId).get();

      if (!event.exists) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.status(200).json({ id: event.id, ...event.data() });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createEvent: async (req, res) => {
    const { newEvent } = req.body;

    if (!newEvent) {
      res.status(400).json({ message: "Please provide all fields" });
      return;
    }

    try {
      await eventsCollection.add(newEvent);

      res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateEvent: async (req, res) => {
    const { eventId } = req.params;
    const { updatedEvent } = req.body;

    if (!updatedEvent) {
      res.status(400).json({ message: "Please provide all fields" });
      return;
    }

    try {
      await eventsCollection.doc(eventId).update({
        ...updatedEvent,
      });

      res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteEvent: async (req, res) => {
    const { eventId } = req.params;

    try {
      await eventsCollection.doc(eventId).delete();

      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
