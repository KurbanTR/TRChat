import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverUrl } from '../../utils/serverUrl';

export const postsApi = createApi({
  reducerPath: 'postsApi',
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
  tagTypes: ['Posts', 'Tags'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ sort, tag }) => {
        const params = new URLSearchParams();
        if (sort) params.append('sort', sort);
        if (tag) params.append('tag', tag);
        return `posts?${params.toString()}`;
      },
      providesTags: ['Posts'],
    }),

    getPostById: builder.query({
      query: (id) => `posts/${id}`,
      invalidatesTags: (__, _, id) => [{ type: 'Posts', id }],
    }),

    createPost: builder.mutation({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    
    updatePost: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Posts', id: arg.id }],
    }),

    getTags: builder.query({
      query: () => 'tags',
      providesTags: ['Tags'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetTagsQuery,
  useDeletePostMutation,
} = postsApi;
