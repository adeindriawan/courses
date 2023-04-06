import Link from 'next/link';
import { Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import { AccountProfile } from '../components/AccountProfile';
import { AccountProfileDetails } from '../components/AccountProfileDetail';

const theme = createTheme();

const Account = () => {
  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Catalog', url: '/catalog' },
    { title: 'About', url: '/about' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header title="Courses" sections={sections} />
        <main>
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
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Account;
