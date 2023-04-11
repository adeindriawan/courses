import * as React from 'react';
import Grid from '@mui/material/Grid';
import MainFeatured from '../components/MainFeatured';
import Featured from '../components/Featured';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

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

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MainFeatured post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <Featured key={post.title} post={post} />
        ))}
      </Grid>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Home;
