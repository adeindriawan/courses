import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './index';
import { Course, Courses } from './course';
import { APIURL } from '../config';

export const api = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: APIURL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from store (userSlice)
      const state = getState() as RootState;
      const token = state.app.token;

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

    register: builder.mutation({
      query: (credentials) => ({
        url: `register`,
        method: 'POST',
        body: credentials,
      }),
    }),

    getCourses: builder.query<Courses, void>({
      query: () => `courses`
    }),

    getCourseDetails: builder.query<Courses, number>({
      query: (id) => `courses/${id}/details`
    }),

    getUsers: builder.query({
      query: () => `users`,
    }),

    createVA: builder.mutation({
      query: (body) => ({
        url: `payment/va/create`,
        method: 'POST',
        body: body,
        prepareHeaders: (headers: Headers) => {
          headers.set("Content-Type", "application/json");
          headers.set("Authorization", `Basic ${process.env.NEXT_PUBLIC_XENDIT_API_KEY_BASE64}`);

          return headers;
        }
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUsersQuery, useGetCoursesQuery, useGetCourseDetailsQuery, useCreateVAMutation } = api;
