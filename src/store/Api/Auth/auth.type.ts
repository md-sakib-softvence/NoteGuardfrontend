export interface LoginPayload {
  email: string;
  password?: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password?: string;
  interests?: string[];
  role?: string;
}

export interface BackendResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken?: string;
  user?: {
    _id?: string;
    email: string;
    role: string;
    name?: string;
    interests?: string[];
  };
}

export interface SignupResponseData {
  _id: string;
  name: string;
  email: string;
  role: string;
  interests?: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type LoginApiResponse = BackendResponse<LoginResponseData>;
export type SignupApiResponse = BackendResponse<SignupResponseData>;
