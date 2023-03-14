import * as React from 'react'
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
  IconButton,
  Snackbar, 
  Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { useDispatch } from 'react-redux';
import { Course, Courses } from '../../stores/course';
import { Cart, removeFromCart, addToCart } from '../../stores/cart';
import { useGetCoursesQuery } from '../../stores/api';

const theme = createTheme();

const Details = () => {
  const dispatch = useDispatch();
  const [openFeedback, setOpenFeedback] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Courses', url: '/catalog' },
    { title: 'About', url: '/about' },
  ];
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);
  const state = useSelector((state: RootState) => state);
  const cart = state.cart;
  const { data } = useGetCoursesQuery();
  const courses: Courses = data ?? [];
  const details: Course = courses.find((x: Course) => x.id === id)!
  const prices = details!.prices;
  const name = details!.name;
  const instructor = details!.instructor;
  const shortDetail = details!.shortDetail;
  const user = state.app.user;
  const isAuthenticated = state.app.authenticated;
  const isThisCourseInCart = cart.find(item => item.id === id);
  const handleRemoveFromCartClick = () => {
    dispatch(removeFromCart(id));
    setFeedbackMessage("Removed from cart")
    setOpenFeedback(true)
  }


  const handleAddToCartClick = () => {
    if (isAuthenticated) {
      const employmentCategories: any = prices.map((i, v) => parseInt(Object.keys(i)[0], 10));

      let itemToAdd: Cart | undefined = undefined;
      if ((user.employment in prices)) { // cek apakah ada kecocokan status karir
        // dengan tipe harga training
        const courseSelected: Course = courses.find((x: Course) => x.id === id)!;
        const selectedPrice = prices[user.employment];
        itemToAdd = {...courseSelected, price: selectedPrice}
      } else if ((employmentCategories.includes(7)) || (employmentCategories.includes(2))) { // cek apakah ada harga training
        // untuk tipe Umum || Karyawan
        const courseSelected: Course = courses.find((x) => x.id === id)!;
        const selectedPrice = courseSelected.prices.find((x) => x[2]) || courseSelected.prices.find((x) => x[7]);
        itemToAdd = {...courseSelected, price: selectedPrice as object}
      } else if (Object.keys(prices).length === 0) {
        const courseSelected = courses.find((x) => x.id === id)!;
        const selectedPrice: object = { 0: 0 };
        itemToAdd = {...courseSelected, price: selectedPrice}
      } else {
        // eslint-disable-next-line no-alert
        alert('Tidak ada harga yang cocok untuk Anda!');
        console.log(user.employment);
        console.log(prices);
      }
      console.log(itemToAdd)

      if (itemToAdd !== undefined) {
        dispatch(addToCart(itemToAdd));
        setFeedbackMessage("Added to cart")
        setOpenFeedback(true)
      }
    } else {
      router.push('/signin')
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenFeedback(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const ButtonFeedback = ({ title }: { title: string}) => {
    return (
      <Snackbar
        open={openFeedback}
        autoHideDuration={6000}
        onClose={handleClose}
        message={title}
        action={action}
      />
    );
  }

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
                            {name}
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
                      subheader={instructor}
                      title={name}
                    />
                    <Divider />
                    <CardContent>
                      <Typography>
                        {shortDetail}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      {
                        isThisCourseInCart ?
                        <Button size="small" color="primary" onClick={ () => { handleRemoveFromCartClick() }}>
                          Remove from cart
                        </Button> :
                        <Button size="small" color="primary" onClick={ () => { handleAddToCartClick() }}>
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
        <ButtonFeedback title={feedbackMessage} />
      </Container>
    </ThemeProvider>
  );
};

export default Details;
