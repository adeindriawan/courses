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
    { title: 'Cart', url: '/cart' },
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
        <CourseCard id={c.id} name={c.name} image={c.image} />
      </Grid>
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header title="TSA Courses" sections={sections} />
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
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}