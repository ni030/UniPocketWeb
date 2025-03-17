interface Complaint {
  id: string;
  description: string;
  status: string;
  type: string;
  userId: string;
  date: string;
}

interface Event {
  eventId: string;
  eventName: string;
  date: string;
  role: string;
  category: string;
  scanCount: number;
}

interface User {
  name: string;
  email: string;
  userId: string;
  phoneNum: string;
  block: string;
  room: string;
}

interface Merit {
  id: string;
  userId: string;
  events: Event[];
  totalMerits: number;
  ranking: number;
  user: User[];
}
