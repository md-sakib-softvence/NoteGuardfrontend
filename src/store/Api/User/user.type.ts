export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
  interests?: string[];
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

export interface UserInterestGroup {
  _id: string;
  users: Array<{ _id: string; name: string; email: string }>;
  count: number;
}

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: string;
  interests?: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllUsersResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    result: UserItem[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
}
