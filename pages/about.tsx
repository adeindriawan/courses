import * as React from 'react'
import { 
  Paper,
  Typography
 } from '@mui/material'
import styles from '../styles/Home.module.css'
import type { NextPageWithLayout } from './_app'
import Layout from '../components/Layout'

const About: NextPageWithLayout = () => {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>Upgrade Your Career in Just a Few Clicks</Typography>
      <Paper elevation={5}>
        <Typography mt={5} sx={{ padding: 2 }}>
          Looking to level up your skills and take your career to the next level? Look no further than Courses,
          the premier platform for signing up for trainings and bootcamps. With our extensive selection of courses,
          you&apos;re sure to find something that fits your needs and interests.
        </Typography>
      </Paper>
      <Paper elevation={5}>
        <Typography mt={1} sx={{ padding: 2 }}>
        Whether you&apos;re looking to learn a new programming language, improve your leadership skills, 
        or dive into the world of digital marketing, Courses has you covered. 
        Our expert instructors bring years of experience and knowledge to each course, 
        ensuring that you receive the highest quality education possible.
        </Typography>
      </Paper>
      <Paper elevation={5}>
        <Typography mt={1} sx={{ padding: 2 }}>
        But we don&apos;t just stop at the course material itself. Courses also offers a supportive community of fellow learners, 
        allowing you to connect with like-minded individuals and potentially even find new job opportunities. 
        Plus, our user-friendly platform makes signing up and accessing course materials a breeze. 
        Take the first step towards achieving your goals today with Courses.
        </Typography>
      </Paper>
    </>
  )
}

About.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default About
