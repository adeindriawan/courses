import * as React from 'react';
import { 
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid
 } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { useGetCoursesQuery } from '../stores/api';
import { Course } from '../stores/course';
import Footer from '../components/Footer';

const theme = createTheme();

export default function Catalog() {
  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Catalog', url: '/catalog' },
    { title: 'About', url: '/about' },
  ];
  const { 
    data,
    isLoading
  } = useGetCoursesQuery();
  
  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <Container>
        <Header title="Courses" sections={sections} />
        <main>
          {/* Hero unit */}
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {
                data && data.map((c: Course) => (
                  <Grid item key={c.id} xs={12} sm={6} md={4}>
                    <CourseCard id={c.id} name={c.name} instructor={c.instructor} prices={c.prices} startDate={c.startDate} endDate={c.endDate} shortDetail={c.shortDetail} type={c.type} image={c.image} />
                  </Grid>
                ))
              }
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