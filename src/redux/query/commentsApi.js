import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverUrl } from '../../utils/serverUrl';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${serverUrl}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
          headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => 'comments',
      providesTags: ['Comments'],
    }),

    createComment: builder.mutation({
      query: ({ postId, text }) => ({
        url: `/comments/${postId}`,
        method: 'POST',
        body: { text, postId },
      }),
    }),

    updateComment: builder.mutation({
      query: ({ id, text }) => ({
        url: `/comments/${id}`,
        method: 'PATCH',
        body: { text },
      }),
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
