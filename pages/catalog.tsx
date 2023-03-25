import * as React from 'react';
import { 
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography
 } from '@mui/material';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { useGetCoursesQuery } from '../stores/api';
import { Course } from '../stores/course';
import Footer from '../components/Footer';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        TSA Courses
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Catalog() {
  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Courses', url: '/catalog' },
    { title: 'About', url: '/about' },
  ];
  const { 
    data,
    isLoading,
    isError,
    isSuccess,
    error 
  } = useGetCoursesQuery();
  
  let content;

  if (isLoading) {
    content = <CircularProgress />
  } else if (isSuccess) {
    content = data.map((c: Course) => (
      <Grid item key={c.id} xs={12} sm={6} md={4}>
        <CourseCard id={c.id} name={c.name} instructor={c.instructor} prices={c.prices} startDate={c.startDate} endDate={c.endDate} shortDetail={c.shortDetail} image={c.image} />
      </Grid>
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header title="Courses" sections={sections} />
        <main>
          {/* Hero unit */}
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {content}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Footer
          title="Courses By ITS Tekno Sains"
          description="A collection of trainings & bootcamps by ITS Tekno Sains"
        />
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}