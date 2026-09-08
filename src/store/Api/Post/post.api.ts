import baseApi from "../BaseApi/BaseApi";
import type { PostItem, CreatePostPayload, UserPostsResponse, SinglePostResponse } from "./post.type";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserPosts: builder.query<UserPostsResponse, string>({
      query: (id) => `/posts/user/${id}`,
      providesTags: ["Post"],
    }),
    getAllPosts: builder.query<UserPostsResponse, void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    createPost: builder.mutation<SinglePostResponse, CreatePostPayload>({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetUserPostsQuery,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;
export default postApi;
