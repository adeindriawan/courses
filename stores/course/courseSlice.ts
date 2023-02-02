import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

export const GET_COURSES = 'GET_COURSES';
export interface Course {
  id: number,
  name: string,
  shortDetail: string,
  instructor: string,
  prices: Array<object>,
  startDate: string,
  endDate: string,
  type: number,
  image: string
}
export interface Courses extends Array<Course>{}
export interface GetCourses {
  type: typeof GET_COURSES,
  courses: Courses
}
type CourseState = Courses;
const initialState: CourseState = [];

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    getCourses: (state, action: PayloadAction<Courses>) => {
      action.payload.map(v => state.push(v));
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getCourses.matchFulfilled,
      (state, { payload }) => {
        state = payload
      }
    )
  }
});

export const { getCourses } = courseSlice.actions;
export default courseSlice.reducer;