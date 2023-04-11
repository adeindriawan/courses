import * as React from 'react';
import Link from 'next/link';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/AccountProfile';
import { AccountProfileDetails } from '../components/AccountProfileDetail';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const Account: NextPageWithLayout = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Akun
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
            <Button sx={{ marginTop: 2 }}>
              <Link href='/history'>Histori Pembelian</Link>
            </Button>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

Account.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Account;
