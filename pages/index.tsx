import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import MainFeatured from '../components/MainFeatured';
import Featured from '../components/Featured';
import Footer from '../components/Footer';

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Catalog', url: '/catalog' },
  { title: 'About', url: '/about' },
];

const mainFeaturedPost = {
  title: 'Courses by ITS Tekno Sains',
  description:
    "Kumpulan pelatihan, bootcamp, serta program-program pengembangan diri lainnya dari PT ITS Tekno Sains.",
  image: '/banner.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: '/banner.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: '/banner.jpg',
    imageLabel: 'Image Text',
  },
];

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Courses" sections={sections} />
        <main>
          <MainFeatured post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <Featured key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Courses By ITS Tekno Sains"
        description="A collection of trainings & bootcamps by ITS Tekno Sains"
      />
    </ThemeProvider>
  );
}