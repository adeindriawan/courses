import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  name: 'courses',
  initialState,
  reducers: {
    getCourses: (state, action: PayloadAction<Courses>) => {
      action.payload.map(v => state.push(v));
    }
  }
});

export const { getCourses } = courseSlice.actions;
export default courseSlice.reducer;