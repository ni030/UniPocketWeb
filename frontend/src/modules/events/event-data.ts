type Event = {
  eventId: string;
  eventName: string;
  role: "committee" | "participant";
  category: string;
  date: string;
};

export const events: Event[] = [
  {
    eventId: "EVT-001",
    eventName: "Annual Tech Conference",
    role: "committee",
    category: "Technology",
    date: "2025-04-15",
  },
  {
    eventId: "EVT-002",
    eventName: "Environmental Summit",
    role: "participant",
    category: "Environment",
    date: "2025-05-22",
  },
  {
    eventId: "EVT-003",
    eventName: "Marketing Workshop",
    role: "committee",
    category: "Business",
    date: "2025-03-30",
  },
  {
    eventId: "EVT-004",
    eventName: "Data Science Expo",
    role: "participant",
    category: "Technology",
    date: "2025-06-12",
  },
  {
    eventId: "EVT-005",
    eventName: "Leadership Training",
    role: "committee",
    category: "Professional Development",
    date: "2025-04-05",
  },
  {
    eventId: "EVT-006",
    eventName: "Healthcare Symposium",
    role: "participant",
    category: "Healthcare",
    date: "2025-07-18",
  },
  {
    eventId: "EVT-007",
    eventName: "Art Exhibition",
    role: "committee",
    category: "Arts",
    date: "2025-05-10",
  },
  {
    eventId: "EVT-008",
    eventName: "Finance Forum",
    role: "participant",
    category: "Finance",
    date: "2025-04-28",
  },
  {
    eventId: "EVT-009",
    eventName: "Educational Conference",
    role: "committee",
    category: "Education",
    date: "2025-08-14",
  },
  {
    eventId: "EVT-010",
    eventName: "Startup Pitch Day",
    role: "participant",
    category: "Business",
    date: "2025-03-21",
  },
  {
    eventId: "EVT-011",
    eventName: "Sustainability Workshop",
    role: "committee",
    category: "Environment",
    date: "2025-09-07",
  },
  {
    eventId: "EVT-012",
    eventName: "Product Design Sprint",
    role: "participant",
    category: "Design",
    date: "2025-04-19",
  },
  {
    eventId: "EVT-013",
    eventName: "Cybersecurity Summit",
    role: "committee",
    category: "Technology",
    date: "2025-05-30",
  },
  {
    eventId: "EVT-014",
    eventName: "HR Conference",
    role: "participant",
    category: "Human Resources",
    date: "2025-07-25",
  },
  {
    eventId: "EVT-015",
    eventName: "Innovation Hackathon",
    role: "committee",
    category: "Technology",
    date: "2025-06-02",
  },
  {
    eventId: "EVT-016",
    eventName: "Supply Chain Symposium",
    role: "participant",
    category: "Logistics",
    date: "2025-08-29",
  },
  {
    eventId: "EVT-017",
    eventName: "Digital Marketing Masterclass",
    role: "committee",
    category: "Marketing",
    date: "2025-04-11",
  },
  {
    eventId: "EVT-018",
    eventName: "Wellness Retreat",
    role: "participant",
    category: "Health",
    date: "2025-09-15",
  },
  {
    eventId: "EVT-019",
    eventName: "Scientific Research Forum",
    role: "committee",
    category: "Science",
    date: "2025-07-08",
  },
  {
    eventId: "EVT-020",
    eventName: "Global Economics Summit",
    role: "participant",
    category: "Economics",
    date: "2025-05-17",
  },
];
