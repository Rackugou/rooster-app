export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'admin' | 'user';
}

export interface AvailabilityEntry {
  date: string; // YYYY-MM-DD
  shiftType: 'avond' | 'niet_beschikbaar' | 'middag_avond' | 'middag' | null;
}

export interface WeeklyMaxTimes {
  weekId: number;
  maxTimes: number;
}

export interface EmployeeAvailability {
  userId: string;
  firstName: string;
  lastName: string;
  month: string; // YYYY-MM
  availability: AvailabilityEntry[];
  weeklyMaxTimes: WeeklyMaxTimes[];
}

export interface Comment {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  comment: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
}

// Simple in-memory database
const users: User[] = [
  {
    id: '1',
    email: 'Desmond.hiemstra@etbnl.eurofins.com',
    firstName: 'Desmond',
    lastName: 'Hiemstra',
    password: 'Eurofins',
    role: 'admin'
  },
  {
    id: '2',
    email: 'Koenvj@gmail.com',
    firstName: 'Koen',
    lastName: 'Janssen',
    password: 'Eurofins',
    role: 'user'
  }
];

const employeeAvailability: EmployeeAvailability[] = [];
const comments: Comment[] = [];

export const authenticateUser = (email: string, password: string): User | null => {
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
};

export const getUserById = (id: string): User | null => {
  return users.find((u) => u.id === id) || null;
};

export const getAllUsers = (): User[] => {
  return users;
};

export const saveEmployeeAvailability = (data: EmployeeAvailability): void => {
  // Check if an entry for this user and month already exists
  const existingIndex = employeeAvailability.findIndex(
    (entry) => entry.userId === data.userId && entry.month === data.month
  );

  if (existingIndex !== -1) {
    // Update existing entry
    employeeAvailability[existingIndex] = data;
  } else {
    // Add new entry
    employeeAvailability.push(data);
  }
  console.log("Saved Employee Availability:", employeeAvailability);
};

export const getEmployeeAvailability = (userId: string, month: string): EmployeeAvailability | null => {
  return employeeAvailability.find(
    (entry) => entry.userId === userId && entry.month === month
  ) || null;
};

export const saveComment = (comment: Omit<Comment, 'id' | 'timestamp'>): Comment => {
  const newComment: Comment = {
    ...comment,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };
  comments.push(newComment);
  console.log("Saved Comment:", newComment);
  return newComment;
};

export const getComments = (userId?: string): Comment[] => {
  if (userId) {
    return comments.filter((c) => c.userId === userId);
  }
  return comments;
};
