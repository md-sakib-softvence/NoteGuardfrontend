import baseApi from "../BaseApi/BaseApi";
import type {
  LoginPayload,
  SignupPayload,
  LoginApiResponse,
  SignupApiResponse,
} from "./auth.type";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginApiResponse, LoginPayload>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation<SignupApiResponse, SignupPayload>({
      query: (userData) => ({
        url: "/users/create-user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
export default authApi;
