import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  CssBaseline,
  IconButton,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import UserInfo from '../components/UserInfo';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores';
import { emptyCart } from '../stores/cart';
import { setCartTotal } from '../stores/app';
import { useCreateVAMutation } from '../stores/api';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        TSA Courses
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Info akun', 'Rincian pembayaran', 'Detail order'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <UserInfo />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [bankSelectedAlertOpened, setBankSelectedAlertOpened] = React.useState(false);
  const [VA, setVA] = React.useState("");
  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Catalog', url: '/catalog' },
    { title: 'About', url: '/about' },
  ];
  const app = useSelector((state: RootState) => state.app)
  const cart = useSelector((state: RootState) => state.cart)
  let cartTotal = 0
  if (cart.length == 1) {
    cartTotal = Object.values(cart[0].price)[0];
  } else if (cart.length > 1) {
    cartTotal = cart.map(c => c.price).reduce((a, b) => a + Object.values(b)[0], 0);
  }
  const dispatch = useDispatch();
  const [createVA, {isLoading, data, error}] = useCreateVAMutation();

  React.useEffect(() => {
    if (app.bank !== "") {
      setBankSelectedAlertOpened(false)
    }
    dispatch(setCartTotal(cartTotal))
  }, [app.bank, cartTotal, dispatch])

  const handleNext = () => {
    if (activeStep === 1 && app.bank === "") {
      setBankSelectedAlertOpened(true)
    } else {
      setActiveStep(activeStep + 1);
    }

    if (activeStep === steps.length - 1) {
      createVA({
        "courses": cart,
        "amount": cartTotal,
        "userId": app.user.id,
        "email": app.user.email,
        "name": app.user.fname + " " + app.user.lname,
        "apiKey": process.env.NEXT_PUBLIC_XENDIT_API_KEY,
        "bankCode": app.bank
      });
      dispatch(emptyCart())
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header title="TSA Courses" sections={sections} />
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Your virtual account is ${data.data.VA.account_number}. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.`}
                  </Typography>
                </>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Collapse in={bankSelectedAlertOpened}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setBankSelectedAlertOpened(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Anda harus memilih bank dulu!
                  </Alert>
                </Collapse>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Kembali
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Buat order' : 'Lanjut'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}