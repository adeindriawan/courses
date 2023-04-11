import * as React from 'react';
import { 
  Backdrop,
  CircularProgress,
  Container,
  Grid
 } from '@mui/material';
import CourseCard from '../components/CourseCard';
import { useGetCoursesQuery } from '../stores/api';
import { Course } from '../stores/course';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const Catalog: NextPageWithLayout = () => {
  const { 
    data,
    isLoading
  } = useGetCoursesQuery();

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
  );
}

Catalog.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Catalog;