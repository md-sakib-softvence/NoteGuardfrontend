import baseApi from "../BaseApi/BaseApi";
import type {
  INote,
  CreateNotePayload,
  UpdateNotePayload,
  NotesResponse,
  SingleNoteResponse,
} from "./note.type";

const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotes: builder.query<NotesResponse, Record<string, unknown> | void>({
      query: (params) => ({
        url: "/notes",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Note"],
    }),
    getSingleNote: builder.query<SingleNoteResponse, string>({
      query: (id) => `/notes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Note", id }],
    }),
    createNote: builder.mutation<SingleNoteResponse, CreateNotePayload>({
      query: (payload) => ({
        url: "/notes",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Note"],
    }),
    updateNote: builder.mutation<
      SingleNoteResponse,
      { id: string; payload: UpdateNotePayload }
    >({
      query: ({ id, payload }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useGetMyNotesQuery,
  useGetSingleNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApi;

export default noteApi;
