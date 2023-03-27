import * as React from 'react';
import { GetStaticProps, GetStaticPaths  } from 'next';
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
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { useDispatch } from 'react-redux';
import { Course, Courses } from '../../stores/course';
import { Cart, removeFromCart, addToCart } from '../../stores/cart';
import { useGetCoursesQuery } from '../../stores/api';

interface courseInterface {
    id: number
    name: string
    description: string
    link: string
    prices: Array<object>
    instructor: string
}

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Catalog', url: '/catalog' },
  { title: 'About', url: '/about' },
];

const theme = createTheme();

export async function getData(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/courses/data`);
  const data = await res.json();
  return data;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const itemID = context.params?.id;
  const data = await getData();
  const foundItem = data.courses.find((item: courseInterface) => itemID?.toString() === item.id.toString());

  if (!foundItem) {
    return {
      props: { hasError: true },
    }
}

return {
  props: {
    specificCourseData: foundItem
  }
}
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const pathsWithParams = data.courses.map((course: courseInterface) => ({ params: { id: course.id.toString() }}))

  return {
      paths: pathsWithParams,
      fallback: true
  }
}

function Details(props: { specificCourseData: courseInterface, 
  hasError: boolean }) {
    const [openFeedback, setOpenFeedback] = React.useState(false);
    const [feedbackMessage, setFeedbackMessage] = React.useState("");
    const [courses, setCourses] = React.useState<Courses>();
    const router = useRouter();
    const state = useSelector((state: RootState) => state);
    const cart = state.cart;
    const isThisCourseInCart = cart.find(item => item.id === props.specificCourseData.id);
    const { data } = useGetCoursesQuery();
    const isAuthenticated = state.app.authenticated;
    const user = state.app.user;
    const dispatch = useDispatch();

    React.useEffect(() => {
      setCourses(data);
    }, [data]);

    const ButtonFeedback = ({ title }: { title: string}) => {
      return (
        <Snackbar
          open={openFeedback}
          autoHideDuration={6000}
          onClose={() => { console.log(`onClose`)}}
          message={`title`}
          action={action}
        />
      );
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

    const handleAddToCartClick = () => {
      const prices = props.specificCourseData.prices;
      if (isAuthenticated) {
        const employmentCategories: any = prices.map((i, v) => parseInt(Object.keys(i)[0], 10));

        let itemToAdd: Cart | undefined = undefined;
        if ((user.employment in prices)) { // cek apakah ada kecocokan status karir
          // dengan tipe harga training
          const courseSelected: Course = courses!.find((x: Course) => x.id === props.specificCourseData.id)!;
          const selectedPrice = prices[user.employment];
          itemToAdd = {...courseSelected, price: selectedPrice}
        } else if ((employmentCategories.includes(7)) || (employmentCategories.includes(2))) { // cek apakah ada harga training
          // untuk tipe Umum || Karyawan
          const courseSelected: Course = courses!.find((x) => x.id === props.specificCourseData.id)!;
          const selectedPrice = courseSelected.prices.find((x) => x[2]) || courseSelected.prices.find((x) => x[7]);
          itemToAdd = {...courseSelected, price: selectedPrice as object}
        } else if (Object.keys(prices).length === 0) {
          const courseSelected = courses!.find((x) => x.id === props.specificCourseData.id)!;
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

    const handleRemoveFromCartClick = () => {
      dispatch(removeFromCart(props.specificCourseData.id));
      setFeedbackMessage("Removed from cart");
      setOpenFeedback(true);
    }
  
    if (props.hasError) {
      return <h1>Error - please try another parameter</h1>
    }
  
    if (router.isFallback) {
        return <h1>Loading...</h1>
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
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}images/course/${props.specificCourseData.link}`}
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
                            {props.specificCourseData.name}
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
                      subheader={props.specificCourseData.instructor}
                      title={props.specificCourseData.name}
                    />
                    <Divider />
                    <CardContent>
                      <Typography>
                        {props.specificCourseData.description}
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
    )
  }
  
  export default Details;
