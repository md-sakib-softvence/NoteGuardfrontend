import baseApi from "../BaseApi/BaseApi";
import type {
  UserProfile,
  UpdateProfilePayload,
  UserInterestGroup,
  AllUsersResponse,
  UserPostsResponse,
} from "./user.type";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (id) => `/user/profile/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<
      { success: boolean; message: string; data: UserProfile },
      import("./user.type").CreateUserPayload
    >({
      query: (userData) => ({
        url: "/users/create-user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserProfile: builder.mutation<
      UserProfile,
      { id: string; payload: UpdateProfilePayload }
    >({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query<AllUsersResponse, Record<string, unknown> | void>({
      query: (params) => ({
        url: "/users/alluser",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUsersByInterests: builder.query<
      { statusCode: number; success: boolean; data: UserInterestGroup[] },
      void
    >({
      query: () => "/users/interests",
      providesTags: ["User"],
    }),
    getUserPosts: builder.query<UserPostsResponse, string>({
      query: (id) => `/users/${id}/posts`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useCreateUserMutation,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUsersByInterestsQuery,
  useGetUserPostsQuery,
} = userApi;
export default userApi;
