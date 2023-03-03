import Head from 'next/head';
import { 
  Box,
  Button, 
  Card,
  CardActionArea, 
  CardActions,
  CardContent,
  CardHeader, 
  CardMedia,
  Container, 
  CssBaseline,
  Divider, 
  Grid, 
  Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';

const theme = createTheme();

const Details = () => {
  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Courses', url: '/catalog' },
    { title: 'About', url: '/about' },
  ];
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);
  const isThisCourseInCart = cart.find(item => item.id === id);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header title="TSA Courses" sections={sections} />
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
                Details
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
                  <Card>
                    <CardActionArea>
                      <CardMedia 
                        component="img"
                        height="140"
                        image="/course.jpeg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                          >
                            Lorem ipsum
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xs={12}
                >
                  <Card>
                    <CardHeader 
                      subheader="This is course details"
                      title="Course Details"
                    />
                    <Divider />
                    <CardContent>
                      <Typography>
                        Lorem ipsum dolor sit amet.
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      {
                        isThisCourseInCart ?
                        <Button size="small" color="primary">
                          Remove from cart
                        </Button> :
                        <Button size="small" color="primary">
                          Add to cart
                        </Button>
                      }
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Details;
