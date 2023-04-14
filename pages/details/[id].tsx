import * as React from 'react';
import { useRouter } from 'next/router'
import {
  Backdrop, 
  Box,
  Button, 
  Card,
  CardActionArea, 
  CardActions,
  CardContent,
  CardHeader, 
  CardMedia,
  Chip,
  CircularProgress,
  Container, 
  Divider, 
  Grid,
  IconButton,
  Snackbar, 
  Typography } from '@mui/material'
import { useGetCourseDetailsQuery } from '../../stores/api'
import { Close as CloseIcon } from '@mui/icons-material'
import { RootState } from '../../stores'
import { useDispatch, useSelector } from 'react-redux'
import { Course } from '../../stores/course'
import { Cart, removeFromCart, addToCart } from '../../stores/cart'
import { NextPageWithLayout } from '../_app';
import Layout from '../../components/Layout';

const CourseDetails: NextPageWithLayout = () => {
  const [openFeedback, setOpenFeedback] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const { query } = useRouter()
  const router = useRouter();
  const { 
    data,
    isLoading,
    error 
  } = useGetCourseDetailsQuery(query.id as unknown as number);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const cart = state.cart;
  const isAuthenticated = state.app.authenticated;
  const user = state.app.user;
  const isThisCourseInCart = cart.find(item => item.id == query.id as unknown as number);
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
        onClose={() => { setOpenFeedback(false) }}
        message={feedbackMessage}
        action={action}
      />
    );
  }

  const handleAddToCartClick = () => {
    if (isAuthenticated && data) {
      const prices = data[0].prices;
      const employmentCategories: any = prices.map((v) => parseInt(Object.keys(v)[0], 10));

      let itemToAdd: Cart | undefined = undefined;
      if ((user.employment in prices)) { // cek apakah ada kecocokan status karir
        // dengan tipe harga training
        const courseSelected: Course = data[0];
        const selectedPrice = prices[user.employment];
        itemToAdd = {...courseSelected, price: selectedPrice}
      } else if ((employmentCategories.includes(7)) || (employmentCategories.includes(2))) { // cek apakah ada harga training
        // untuk tipe Umum || Karyawan
        // const courseSelected: Course = course!.find((x) => x.id === query.course as unknown as number)!;
        const courseSelected: Course = data[0];
        const selectedPrice = courseSelected.prices.find((x) => x[2]) || courseSelected.prices.find((x) => x[7]);
        console.log(courseSelected)
        itemToAdd = {...courseSelected, price: selectedPrice as object}
      } else if (Object.keys(prices).length === 0) {
        const courseSelected = data[0];
        const selectedPrice: object = { 0: 0 };
        itemToAdd = {...courseSelected, price: selectedPrice}
      } else {
        // eslint-disable-next-line no-alert
        alert('Tidak ada harga yang cocok untuk Anda!');
        console.log(user.employment);
        console.log(prices);
      }

      if (itemToAdd !== undefined) {
        dispatch(addToCart(itemToAdd));
        setFeedbackMessage("Added to cart");
        setOpenFeedback(true);
      }
    } else {
      router.push('/signin')
    }
  }

  const handleRemoveFromCartClick = (id: number) => {
    dispatch(removeFromCart(id));
    setFeedbackMessage("Removed from cart");
    setOpenFeedback(true);
  }

  if (error) return <div>Failed to load data</div>
  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (!data) return null

  type Statuses = {
    [key: number]: string
  }

  const statuses: Statuses = {
    1: 'Student/College student',
    2: 'Employee/Professional',
    3: 'Freelancer/Self-employed',
    4: 'Unemployed/Jobseeker',
    5: 'Teacher/Lecturer/Academics',
    6: 'Manager/Director/Enterpreneur',
    7: 'Public'
  };

  const types = ["Online", "Offline", "Livestream"];

  return (
    <>
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
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}images/course/${data[0].image}`}
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
                        {data[0].name}
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
                  subheader={data[0].instructor}
                  title={data[0].name}
                />
                <Divider />
                <CardContent>
                  <Typography>
                    {data[0].shortDetail}
                  </Typography>
                  <Typography>
                    Date
                  </Typography>
                  <Typography>
                    {data[0].startDate}
                  </Typography>
                  <Typography>
                    Price
                  </Typography>
                  {
                    (data[0].prices.length > 0)
                    ? data[0].prices.map((v, i) => (
                      <Typography key={i}>
                        {`${statuses[Object.keys(v) as unknown as number]}: Rp${Object.values(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}
                      </Typography>
                    ))
                    : <Chip label="Free" />
                  }
                  <Typography>Type:</Typography>
                  <Typography paragraph>{types[data[0].type]}</Typography>
                  <Typography>Detail:</Typography>
                  <Typography>{data[0].detail}</Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  {
                    isThisCourseInCart ?
                    <Button size="small" color="primary" onClick={ () => { handleRemoveFromCartClick(data[0].id) }}>
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
      <ButtonFeedback title={feedbackMessage} />
    </>
  );
}

CourseDetails.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default CourseDetails;
