import * as React from 'react';
import Grid from '@mui/material/Grid';
import MainFeatured from '../components/MainFeatured';
import Featured from '../components/Featured';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const mainFeaturedPost = {
  title: 'Courses by ITS Tekno Sains',
  description:
    "Transform Yourself into an Expert with the Best Training Programs on Courses!",
  image: '/banner.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Select the program',
    date: 'May 23',
    description:
      'Choose the training, course or bootcamp that interests you.',
    image: '/banner.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Easy payment',
    date: 'Jul 03',
    description:
      'Pay from the bank account of your choice. No confirmation needed.',
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
