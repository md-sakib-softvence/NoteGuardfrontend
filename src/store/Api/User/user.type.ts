export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
}

export interface UserInterestGroup {
  _id: string;
  users: Array<{ _id: string; name: string; email: string }>;
  count: number;
}

