import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverUrl } from '../../utils/serverUrl';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${serverUrl}/auth`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
          headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    
    register: builder.mutation({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),

    getMe: builder.query({
      query: () => '/me',
    }),

    logout: builder.mutation({
      queryFn: async () => {
        localStorage.removeItem('token')
        return { data: null }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
