import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './index';
import { Courses } from './course';

export const api = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://academy.beta/api/',
    prepareHeaders: (headers, { getState }) => {
      // Get token from store (userSlice)
      const state = getState() as RootState;
      const token = state.auth.token;

      // Add token to headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `login`,
        method: 'POST',
        body: credentials,
      }),
    }),

    getCourses: builder.query<Courses, void>({
      query: () => `courses`
    }),

    getUsers: builder.query({
      query: () => `users`,
    }),
  }),
});

export const { useLoginMutation, useGetUsersQuery, useGetCoursesQuery } = api;
